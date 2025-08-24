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
            <div className="space-y-6">
              <div>
                      >
                        <div className="flex items-center justify-between mb-4">
                          <HolographicText className="text-xl font-bold text-white">{firm.name}</HolographicText>
                          {firm.name === "FTMO" && (
                            <span className="text-xs font-bold bg-yellow-400 text-black px-2 py-1 rounded-full float-animation">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-4 h-16">{`A leading prop firm with various account types.`}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-400">
                            <span>Daily Loss:</span>
                            <span className="text-white">{firm.dailyLossLimit}</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Max Drawdown:</span>
                            <span className="text-white">{firm.maximumLoss}</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Profit Target:</span>
                            <span className="text-white">{firm.profitTargets.split(',')[0]}</span>
                          </div>
                        </div>
                      </Card3D>
                    </ScrollReveal>
                  );
                })}

        <FuturisticCursor />
          </ScrollReveal>
        {/* Futuristic Loading Animation */}
        <div className="relative z-10 text-center">
          {/* Main Loading Circle */}
            <ScrollReveal delay={0.8}>
              <Card3D className="p-8 mb-8 holographic" glowColor="purple">
                <HolographicText className="text-2xl font-bold text-white mb-6">
                  {selectedFirm} - Detailed Rules
                </HolographicText>
              {/* Middle rotating ring */}
                {(() => {
                  const firm = propFirms.find(f => f.name === selectedFirm);
                  if (!firm) return null;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card3D className="p-4" glowColor="blue">
                        <h4 className="text-white font-semibold mb-3">Account Types</h4>
                        <div className="space-y-2 text-sm">
                          {firm.accountTypes.map((type, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-gray-400">{type}</span>
                            </div>
                          ))}
                        </div>
                      </Card3D>
                      
                      <Card3D className="p-4" glowColor="green">
                        <h4 className="text-white font-semibold mb-3">Account Sizes</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sizes:</span>
                            <span className="text-white">{firm.accountSizes.join(', ')}</span>
                          </div>
                        </div>
                      </Card3D>
                      
                      <Card3D className="p-4" glowColor="purple">
                        <h4 className="text-white font-semibold mb-3">Rules</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Profit Targets:</span>
                            <span className="text-white">{firm.profitTargets}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Daily Loss Limit:</span>
                            <span className="text-white">{firm.dailyLossLimit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Maximum Loss:</span>
                            <span className="text-white">{firm.maximumLoss}</span>
                          </div>
                        </div>
                      </Card3D>
          
                  );
                })()}
              </Card3D>
            </ScrollReveal>
              <div className="text-blue-400 text-xs font-mono w-8">72%</div>
            </div>
            <div className="flex items-center space-x-3">
          <ScrollReveal delay={1.0}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors nav-item-3d"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              
              <Button3D
                onClick={handleContinue}
                disabled={!selectedFirm}
                variant={selectedFirm ? "primary" : "secondary"}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button3D>
            </div>
          </ScrollReveal>
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
