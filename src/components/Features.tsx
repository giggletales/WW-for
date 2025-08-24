import { useState, useEffect } from 'react';
import { TradingState, TradeOutcome, Signal } from '../trading/types';
import { openTrade, closeTrade } from '../trading/tradeManager';
import { isDailyLossLimitReached } from '../trading/riskManager';
import { useUser } from '../contexts/UserContext';
import { useTradingPlan } from '../contexts/TradingPlanContext';
import api from '../api';
import ConsentForm from './ConsentForm';
import FuturisticScene from './3D/FuturisticScene';
import DashboardConcept1 from './DashboardConcept1';
import DashboardConcept2 from './DashboardConcept2';
import DashboardConcept3 from './DashboardConcept3';
import DashboardConcept4 from './DashboardConcept4';
import { logActivity } from '../api/activity';

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { user } = useUser();
  const { tradingPlan } = useTradingPlan();
  const [theme, setTheme] = useState(() => {
    // Load persisted theme from localStorage
    const savedTheme = localStorage.getItem('dashboard_selected_concept');
    return savedTheme || 'concept1';
  });
  const [tradingState, setTradingState] = useState<TradingState | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConsentForm, setShowConsentForm] = useState(false);

  // Check for consent on mount
  useEffect(() => {
    const consentGiven = localStorage.getItem('user_consent_accepted');
    if (!consentGiven && user?.setupComplete) {
      setShowConsentForm(true);
    }
  }, [user]);

  // Load initial data from API and localStorage
  useEffect(() => {
    const initializeData = async () => {
      if (user?.email) {
        setIsLoading(true);
        const stateKey = `trading_state_${user.email}`;
        
        // Restore dashboard state from user backup if available
        const backupData = localStorage.getItem(`user_backup_${user.email}`);
        if (backupData) {
          try {
            const backup = JSON.parse(backupData);
            if (backup.dashboardState) {
              // Restore dashboard preferences
              if (backup.dashboardState.activeTab) {
                localStorage.setItem(`dashboard_active_tab_${user.email}`, backup.dashboardState.activeTab);
              }
              if (backup.dashboardState.selectedTimezone) {
                localStorage.setItem(`dashboard_timezone_${user.email}`, backup.dashboardState.selectedTimezone);
              }
              if (backup.dashboardState.preferences) {
                localStorage.setItem(`dashboard_preferences_${user.email}`, backup.dashboardState.preferences);
              }
            }
          } catch (error) {
            console.warn('Could not restore dashboard state:', error);
          }
        }
        
        // Load data from localStorage first, then try API as enhancement
        const localDashboardData = localStorage.getItem(`dashboard_data_${user.email}`);
        const localState = localStorage.getItem(stateKey);
        const questionnaireData = localStorage.getItem('questionnaireAnswers');
        const riskPlanData = localStorage.getItem('riskManagementPlan');
        
        let parsedQuestionnaire = null;
        let parsedRiskPlan = null;
        
        try {
          parsedQuestionnaire = questionnaireData ? JSON.parse(questionnaireData) : null;
          parsedRiskPlan = riskPlanData ? JSON.parse(riskPlanData) : null;
        } catch (parseError) {
          console.warn('Error parsing questionnaire data, using defaults');
        }
        
        // Create dashboard data from questionnaire if available
        const accountValue = parsedQuestionnaire?.hasAccount === 'yes' 
          ? parsedQuestionnaire?.accountEquity 
          : parsedQuestionnaire?.accountSize;

        const fallbackDashboardData = {
          userProfile: {
            propFirm: parsedQuestionnaire?.propFirm || 'Not Set',
            accountType: parsedQuestionnaire?.accountType || 'Not Set',
            accountSize: accountValue || 100000,
            riskPerTrade: `${parsedQuestionnaire?.riskPercentage || 1}%`,
            experience: parsedQuestionnaire?.experience || 'intermediate',
            uniqueId: user?.uniqueId || 'Not Set'
          },
          performance: {
            accountBalance: accountValue || parsedRiskPlan?.accountSize || 100000,
            totalPnl: 0,
            winRate: 0,
            totalTrades: 0
          },
          riskProtocol: {
            maxDailyRisk: parsedRiskPlan?.dailyRiskAmount || 5000,
            riskPerTrade: parsedRiskPlan?.riskAmount || 1000,
            maxDrawdown: '10%'
          }
        };
        
        // Set dashboard data from localStorage or fallback
        if (localDashboardData) {
          try {
            setDashboardData(JSON.parse(localDashboardData));
          } catch {
            setDashboardData(fallbackDashboardData);
          }
        } else {
          setDashboardData(fallbackDashboardData);
        }
        
        // Initialize trading state
        if (localState) {
          try {
            setTradingState(JSON.parse(localState));
          } catch {
            // Create new state if parsing fails
            const initialEquity = (parsedQuestionnaire?.hasAccount === 'yes' 
              ? parsedQuestionnaire?.accountEquity 
              : parsedQuestionnaire?.accountSize) || parsedRiskPlan?.accountSize || 100000;
            const initialState: TradingState = {
              initialEquity,
              currentEquity: initialEquity,
              trades: [],
              openPositions: [],
              riskSettings: {
                riskPerTrade: parsedQuestionnaire?.riskPercentage || 1,
                dailyLossLimit: 5,
                consecutiveLossesLimit: 3,
              },
              performanceMetrics: {
                totalPnl: 0, winRate: 0, totalTrades: 0, winningTrades: 0, losingTrades: 0,
                averageWin: 0, averageLoss: 0, profitFactor: 0, maxDrawdown: 0,
                currentDrawdown: 0, grossProfit: 0, grossLoss: 0, consecutiveWins: 0,
                consecutiveLosses: 0,
              },
              dailyStats: { pnl: 0, trades: 0, initialEquity },
            };
            setTradingState(initialState);
            localStorage.setItem(stateKey, JSON.stringify(initialState));
          }
        } else {
          // Create initial state for new users
          const initialEquity = (parsedQuestionnaire?.hasAccount === 'yes' 
            ? parsedQuestionnaire?.accountEquity 
            : parsedQuestionnaire?.accountSize) || parsedRiskPlan?.accountSize || 100000;
          const initialState: TradingState = {
            initialEquity,
            currentEquity: initialEquity,
            trades: [],
            openPositions: [],
            riskSettings: {
              riskPerTrade: parsedQuestionnaire?.riskPercentage || 1,
              dailyLossLimit: 5,
              consecutiveLossesLimit: 3,
            },
            performanceMetrics: {
              totalPnl: 0, winRate: 0, totalTrades: 0, winningTrades: 0, losingTrades: 0,
              averageWin: 0, averageLoss: 0, profitFactor: 0, maxDrawdown: 0,
              currentDrawdown: 0, grossProfit: 0, grossLoss: 0, consecutiveWins: 0,
              consecutiveLosses: 0,
            },
            dailyStats: { pnl: 0, trades: 0, initialEquity },
          };
          setTradingState(initialState);
          localStorage.setItem(stateKey, JSON.stringify(initialState));
        }
        
        try {
          const response = await api.get('/api/dashboard-data');
          setDashboardData(response.data);
        } catch (error) {
          console.error('Failed to fetch dashboard data from API, using fallback.', error);
        }
        
        // Generate comprehensive mock dashboard data if none exists
        if (!localDashboardData) {
          const mockDashboardData = {
            user: {
              name: user.name || 'Trader',
              email: user.email,
              membershipTier: user.membershipTier || 'professional',
              joinDate: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            },
            account: {
              balance: tradingPlan?.userProfile?.initialBalance || 10000,
              equity: tradingPlan?.userProfile?.initialBalance || 10000,
              margin: 0,
              freeMargin: tradingPlan?.userProfile?.initialBalance || 10000,
              marginLevel: 0
            },
            performance: {
              totalPnl: 0,
              winRate: 0,
              totalTrades: 0,
              profitFactor: 0,
              maxDrawdown: 0
            },
            signals: [],
            news: [],
            lastUpdated: new Date().toISOString()
          };
          
          setDashboardData(mockDashboardData);
          localStorage.setItem(`dashboard_data_${user.email}`, JSON.stringify(mockDashboardData));
        }
        
        setIsLoading(false);
      }
    };
    initializeData();
  }, [user, tradingPlan]);

  // Persist data to localStorage on change
  useEffect(() => {
    if (user?.email && tradingState) {
      localStorage.setItem(`trading_state_${user.email}`, JSON.stringify(tradingState));
    }
    if (user?.email && dashboardData) {
      localStorage.setItem(`dashboard_data_${user.email}`, JSON.stringify(dashboardData));
    }
  }, [tradingState, dashboardData, user?.email]);

  const handleConsentAccept = () => {
    setShowConsentForm(false);
  };

  const handleConsentDecline = () => {
    onLogout();
  };

  const handleMarkAsTaken = (signal: Signal, outcome: TradeOutcome, pnl?: number) => {
    if (tradingState) {
      if (isDailyLossLimitReached(tradingState)) {
        alert("You have hit your daily loss limit. No more trades are allowed today.");
        return;
      }
      const stateAfterOpen = openTrade(tradingState, signal);
      const newTrade = stateAfterOpen.openPositions[stateAfterOpen.openPositions.length - 1];
      const finalState = closeTrade(stateAfterOpen, newTrade.id, outcome, pnl);
      setTradingState(finalState);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-inter overflow-hidden">
        <FuturisticBackground />
        <FuturisticCursor />
        
        {/* Futuristic Loading Animation */}
        <div className="relative z-10 text-center">
          {/* Main Loading Circle */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"></div>
              {/* Middle rotating ring */}
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              {/* Inner pulsing core */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Loading Text with Typewriter Effect */}
          <div className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              INITIALIZING DASHBOARD
            </span>
          </div>
          
          {/* Progress Bars */}
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="text-cyan-400 text-sm font-mono w-24 text-left">CORE_SYS</div>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
              <div className="text-cyan-400 text-xs font-mono w-8">85%</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-blue-400 text-sm font-mono w-24 text-left">DATA_SYNC</div>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" style={{width: '72%'}}></div>
              </div>
              <div className="text-blue-400 text-xs font-mono w-8">72%</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-purple-400 text-sm font-mono w-24 text-left">UI_LOAD</div>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{width: '91%'}}></div>
              </div>
              <div className="text-purple-400 text-xs font-mono w-8">91%</div>
            </div>
          </div>
          
          {/* Status Messages */}
          <div className="mt-6 text-gray-400 text-sm font-mono">
            <div className="animate-pulse">» Establishing secure connection...</div>
            <div className="animate-pulse" style={{animationDelay: '0.5s'}}>» Loading market data streams...</div>
            <div className="animate-pulse" style={{animationDelay: '1s'}}>» Initializing trading algorithms...</div>
          </div>
          
          {/* Scanning Effect */}
          <div className="absolute -inset-4 opacity-30">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user.setupComplete) {
    const message = user.membershipTier === 'kickstarter'
      ? "Your Kickstarter plan is awaiting approval. You will be notified once your account is active."
      : "Please complete the setup process to access your dashboard.";
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-inter">
        <FuturisticBackground />
        <FuturisticCursor />
        <div className="relative z-10 text-center">
          <div className="text-blue-400 text-xl animate-pulse mb-4">Awaiting Access</div>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    );
  }

  const renderTheme = () => {
    const props = {
      onLogout,
      tradingState,
      dashboardData,
      handleMarkAsTaken,
      setTradingState,
      user,
    };
    switch (theme) {
      case 'concept1':
        return <DashboardConcept1 {...props} />;
      case 'concept2':
        return <DashboardConcept2 {...props} />;
      case 'concept3':
        return <DashboardConcept3 {...props} />;
      case 'concept4':
        return <DashboardConcept4 {...props} />;
      default:
        return <DashboardConcept1 {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 font-inter relative">
    <FuturisticScene className="min-h-screen text-white overflow-hidden">
      <AnimatedBackground />
      <FuturisticCursor />
      <ConsentForm 
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-20">
            <HolographicText 
              className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
              glitchEffect={true}
              dataText="Unleash Your Trading Potential"
            >
              Unleash Your Trading Potential
            </HolographicText>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our platform is engineered with cutting-edge features to give you a decisive edge in the competitive world of prop firm trading.
            </p>
          </div>
        </ScrollReveal>
            setTheme(newTheme);
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            localStorage.setItem('dashboard_selected_concept', newTheme);
            <ScrollReveal key={index} delay={0.1 + index * 0.1}>
              <Card3D 
                className="p-8 group interactive-element"
                glowColor={feature.icon.props.className.includes('blue') ? 'blue' : 
                          feature.icon.props.className.includes('green') ? 'green' :
                          feature.icon.props.className.includes('purple') ? 'purple' :
                          feature.icon.props.className.includes('yellow') ? 'yellow' :
                          feature.icon.props.className.includes('red') ? 'red' : 'cyan'}
              >
                <div className="mb-6 text-center">
                  <div className="inline-block p-4 bg-gray-800/50 rounded-full group-hover:bg-blue-500/20 transition-all duration-300 float-animation">
                    {React.cloneElement(feature.icon, { className: `${feature.icon.props.className} group-hover:scale-110 transition-transform duration-300` })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-center">{feature.description}</p>
              </Card3D>
            </ScrollReveal>
        </select>
      </div>
        </div>
      {renderTheme()}
    </FuturisticScene>
  );
};

export default Dashboard;
