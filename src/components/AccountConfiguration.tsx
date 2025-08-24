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
            <div className="space-y-6">
              <div>
              balance: tradingPlan?.userProfile?.initialBalance || 10000,
                    </Card3D>
                  </ScrollReveal>
                ))}
              </div>

          </ScrollReveal>
  useEffect(() => {
    if (user?.email && tradingState) {
          <ScrollReveal delay={0.6}>
            <div className="mb-12">
              <HolographicText className="text-2xl font-bold text-white mb-6 text-center">Select Challenge Type</HolographicText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {propFirm.rules.challengeTypes.map((type, index) => (
                  <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                    <Card3D
                      onClick={() => setSelectedType(type)}
                      className={`relative p-8 cursor-pointer transition-all duration-300 interactive-element ${
                        selectedType === type ? 'neon-border' : ''
                      }`}
                      glowColor={selectedType === type ? 'blue' : 'gray'}
                    >
                      {selectedType === type && (
                        <div className="absolute -top-3 -right-3">
                          <div className="bg-blue-500 rounded-full p-1 float-animation">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <HolographicText className="text-2xl font-bold text-white mb-2 capitalize">
                          {type.replace('-', ' ')} Challenge
                        </HolographicText>
                        <p className="text-gray-400 text-sm">
                          {getChallengeTypeDescription(type)}
                        </p>
      if (isDailyLossLimitReached(tradingState)) {

                      <div className="space-y-3">
                        {getChallengeTypeFeatures(type).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 float-animation" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card3D>
                  </ScrollReveal>
                ))}
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"></div>
          </ScrollReveal>
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              {/* Inner pulsing core */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
            <ScrollReveal delay={0.8}>
              <Card3D className="p-8 mb-8 holographic" glowColor="purple">
                <HolographicText className="text-2xl font-bold text-white mb-6 text-center">Configuration Summary</HolographicText>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2 counter-3d">
                      ${selectedSize.toLocaleString()}
                    </div>
                    <div className="text-gray-400">Account Size</div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  
                  <div className="text-center">
                    <HolographicText className="text-3xl font-bold text-purple-400 mb-2 capitalize">
                      {selectedType.replace('-', ' ')}
                    </HolographicText>
                    <div className="text-gray-400">Challenge Type</div>
            <div className="flex items-center space-x-3">
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2 counter-3d">
                      ${(selectedSize * propFirm.rules.profitTarget / 100).toLocaleString()}
                    </div>
                    <div className="text-gray-400">Profit Target</div>
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              </Card3D>
            </ScrollReveal>
              <div className="text-blue-400 text-xs font-mono w-8">72%</div>
            </div>
            <div className="flex items-center space-x-3">
          <ScrollReveal delay={1.0}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/setup/prop-firm')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors nav-item-3d"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Prop Firm</span>
              </button>
              
              <Button3D
                onClick={handleContinue}
                disabled={!selectedSize || !selectedType}
                variant={selectedSize && selectedType ? "primary" : "secondary"}
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
