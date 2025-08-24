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
    <FuturisticScene className="min-h-screen">
      <AnimatedBackground />

      
        return;
      }
      const stateAfterOpen = openTrade(tradingState, signal);
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <Link to="/" className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-400 mb-8 nav-item-3d">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              
              <HolographicText 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                glitchEffect={true}
                dataText="Choose Your Plan"
              >
                Choose Your Plan
              </HolographicText>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Select the perfect plan to accelerate your prop firm success with our professional clearing service.
              </p>
            </div>
          </ScrollReveal>
        
        {/* Futuristic Loading Animation */}
        <div className="relative z-10 text-center">
          {/* Main Loading Circle */}
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <Card3D
                  className={`relative p-6 transition-transform duration-300 ${
                    plan.popular ? 'scale-105 shadow-2xl' : ''
                  }`}
                  glowColor={plan.color === 'border-blue-500' ? 'blue' : 
                            plan.color === 'border-yellow-500' ? 'yellow' :
                            plan.color === 'border-purple-500' ? 'purple' : 'gray'}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold neon-border">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="text-blue-500 mb-4 flex justify-center float-animation">
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-green-400 counter-3d">FREE</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-white counter-3d">${plan.price}</span>
                          <span className="text-gray-400">/{plan.period}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {(plan as any).isAffiliate ? (
                    <Button3D
                      onClick={() => window.location.href = '/affiliate-links'}
                      variant="secondary"
                      className="w-full"
                    >
                      Get Started
                    </Button3D>
                  ) : (
                    <Button3D
                      onClick={() => handlePlanSelect(plan)}
                      variant="primary"
                      className="w-full"
                    >
                      Get Started
                    </Button3D>
                  )}
                </Card3D>
              </ScrollReveal>
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
