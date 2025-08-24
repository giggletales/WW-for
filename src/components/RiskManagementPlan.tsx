import { useState, useEffect } from 'react';
import { TradingState, TradeOutcome, Signal } from '../trading/types';
import { openTrade, closeTrade } from '../trading/tradeManager';
import { isDailyLossLimitReached } from '../trading/riskManager';
import { useUser } from '../contexts/UserContext';
import { useTradingPlan } from '../contexts/TradingPlanContext';
import api from '../api';
import ConsentForm from './ConsentForm';
import FuturisticScene from './3D/FuturisticScene';
import '../styles/3d-animations.css';
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

    <FuturisticScene className="min-h-screen text-white flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <div className="relative w-full max-w-3xl z-10">
        <Card3D className="p-8 form-3d" glowColor="cyan">
          <div className="relative z-10">
            <HolographicText className="text-3xl font-bold mb-6 text-center text-blue-400">Trading Preferences</HolographicText>
            <p className="mb-8 text-center text-gray-400">Help us tailor your experience by answering a few questions.</p>
            experience: parsedQuestionnaire?.experience || 'intermediate',
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
            <div className="space-y-6">
              <div>
                <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 float-animation">
                  <AlertTriangle className="w-5 h-5 text-red-400 float-animation" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                <HolographicText className="text-lg font-semibold text-red-400">Risk Parameters</HolographicText>
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Loading Text with Typewriter Effect */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-12">
            </span>
              <Button3D
                  <span className="text-red-400 font-bold counter-3d">${(planData.riskAmount || 0).toFixed(2)}</span>
                variant="accent"
                size="lg"
          <div className="space-y-3 max-w-md mx-auto">
                <Shield className="w-5 h-5 mr-2" />
                Proceed to Upload Screenshot
                <Shield className="w-5 h-5 ml-2" />
              </Button3D>
            <div className="flex items-center space-x-3">
              <Button3D
              </div>
                <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 float-animation">
                  <Clock className="w-5 h-5 text-blue-400 float-animation" />
            <div className="flex items-center space-x-3">
                <HolographicText className="text-lg font-semibold text-blue-400">Trading Schedule</HolographicText>
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
                  <span className="text-red-400 font-bold counter-3d">${(planData.dailyRiskAmount || 0).toFixed(2)}</span>
          
          {/* Scanning Effect */}
          <div className="absolute -inset-4 opacity-30">
                  <span className="text-green-400 font-bold counter-3d">${(planData.dailyProfitTarget || 0).toFixed(2)}</span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </Card3D>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  if (!user.setupComplete) {
                variant="accent"
                size="lg"
      ? "Your Kickstarter plan is awaiting approval. You will be notified once your account is active."
                <Brain className="w-5 h-5 mr-2" />
                {fromQuestionnaire ? 'Save Plan & Go to Dashboard' : 'Proceed to Dashboard'}
                <Target className="w-5 h-5 ml-2" />
              </Button3D>
          <div className="text-blue-400 text-xl animate-pulse mb-4">Awaiting Access</div>
          <p className="text-gray-400">{message}</p>
        </ScrollReveal>
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
      <FuturisticBackground />
      <FuturisticCursor />
      <ConsentForm 
        isOpen={showConsentForm}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
      />
      <div className="theme-switcher fixed top-4 right-4 z-50">
        <select 
          onChange={(e) => {
            const newTheme = e.target.value;
            setTheme(newTheme);
            // Persist theme selection to localStorage
            localStorage.setItem('dashboard_selected_concept', newTheme);
            logActivity('theme_change', { theme: newTheme });
          }}
          value={theme}
          className="bg-gray-800 text-white p-2 rounded border border-gray-600"
        >
          <option value="concept1">Concept 1</option>
          <option value="concept2">Concept 2</option>
          <option value="concept3">Concept 3</option>
          <option value="concept4">Concept 4</option>
        </select>
      </div>
      {renderTheme()}
    </FuturisticScene>
  );
};

export default Dashboard;
