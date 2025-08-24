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
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden hero-3d">
                currentDrawdown: 0, grossProfit: 0, grossLoss: 0, consecutiveWins: 0,
                consecutiveLosses: 0,
        <div className="max-w-7xl mx-auto relative z-10 hero-content">
              dailyStats: { pnl: 0, trades: 0, initialEquity },
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-6 neon-border">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">
                  Professional Prop Firm Clearing Service
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <HolographicText 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                glitchEffect={true}
                dataText="Master Your Funded Account Journey"
              >
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Funded Account</span> Journey
              </HolographicText>
            </ScrollReveal>
            initialEquity,
            <ScrollReveal delay={0.6}>
              <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                Professional clearing service for prop firm challenges with custom trading plans and expert guidance
              </p>
            </ScrollReveal>
            riskSettings: {
            <ScrollReveal delay={0.8}>
              <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto">
                Join <span className="text-blue-400 font-semibold counter-3d">2,847 successful traders</span> who cleared their challenges with our proven methodology.
              </p>
            </ScrollReveal>
            },
            <ScrollReveal delay={1.0}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button3D
                  onClick={() => window.location.href = '/membership'}
                  variant="primary"
                  size="lg"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
                </Button3D>
                <Button3D
                  onClick={() => window.location.href = '/membership'}
                  variant="secondary"
                  size="lg"
                >
                  View Pricing
                </Button3D>
                <Button3D
                  onClick={() => window.location.href = '/affiliate-links'}
                  variant="accent"
                  size="lg"
                >
                  Get Free Access <ArrowRight className="w-5 h-5 ml-2" />
                </Button3D>
              </div>
            </ScrollReveal>
            user: {
              name: user.name || 'Trader',
            <ScrollReveal delay={1.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <Card3D key={index} className="text-center p-4 stagger-animation" glowColor="blue">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 counter-3d">{stat.number}</div>
                    <div className="text-white font-medium mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-400">{stat.description}</div>
                  </Card3D>
                ))}
              </div>
            </ScrollReveal>
              freeMargin: tradingPlan?.userProfile?.initialBalance || 10000,
              marginLevel: 0
            },
            performance: {
              totalPnl: 0,
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative">
              totalTrades: 0,
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <HolographicText className="text-3xl md:text-5xl font-bold text-white mb-6">
                5-Step Clearing Process
              </HolographicText>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Our proven methodology takes you from prop firm selection to funded account success
              </p>
            </div>
          </ScrollReveal>
          };
          
          setDashboardData(mockDashboardData);
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform -translate-y-1/2 neon-border"></div>
        }
        
        setIsLoading(false);
                <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                  <Card3D className="relative p-6 group" glowColor="purple">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform float-animation">
                        <span className="text-white font-bold text-xl">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </Card3D>
                </ScrollReveal>
    }
    if (user?.email && dashboardData) {
      localStorage.setItem(`dashboard_data_${user.email}`, JSON.stringify(dashboardData));
    }
  }, [tradingState, dashboardData, user?.email]);

  const handleConsentAccept = () => {
    setShowConsentForm(false);
  };
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <HolographicText className="text-3xl md:text-5xl font-bold text-white mb-6">
                Professional-Grade Features
              </HolographicText>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Everything you need to successfully clear prop firm challenges and manage funded accounts
              </p>
            </div>
          </ScrollReveal>
    if (tradingState) {
      if (isDailyLossLimitReached(tradingState)) {
        alert("You have hit your daily loss limit. No more trades are allowed today.");
              <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                <Card3D className="p-8 group interactive-element" glowColor="green">
                  <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 float-animation`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </Card3D>
              </ScrollReveal>
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-inter overflow-hidden">
        <FuturisticBackground />
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <HolographicText className="text-3xl md:text-5xl font-bold text-white mb-6">
                Success Stories
              </HolographicText>
              <p className="text-lg text-gray-400 mb-2">Real results from traders who cleared their challenges</p>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-300">4.9/5 from 2,847 reviews</span>
              </div>
            </div>
          </ScrollReveal>
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              {/* Inner pulsing core */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"></div>
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <Card3D className="p-8 holographic" glowColor="yellow">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{testimonial.image}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg counter-3d">{testimonial.profit}</div>
                      <div className="text-xs text-gray-400">Total Profit</div>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" style={{width: '72%'}}></div>
              </div>
              <div className="text-blue-400 text-xs font-mono w-8">72%</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-purple-400 text-sm font-mono w-24 text-left">UI_LOAD</div>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
          <ScrollReveal delay={0.2}>
            <Card3D className="p-12 holographic" glowColor="cyan">
              <HolographicText className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Clear Your <span className="text-blue-400">Prop Firm Challenge</span>?
              </HolographicText>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful traders who achieved funded account status with our proven methodology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <Button3D
                  onClick={() => window.location.href = '/membership'}
                  variant="primary"
                  size="lg"
                >
                  Start Your Journey
                </Button3D>
                <Button3D
                  onClick={() => window.location.href = '/membership'}
                  variant="secondary"
                  size="lg"
                >
                  View Pricing
                </Button3D>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Custom Trading Plans</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Professional Support</span>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
    );
  }

  const renderTheme = () => {
    const props = {
      onLogout,
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400 float-animation" />
                  <HolographicText className="text-xl font-bold text-white">TraderEdge Pro</HolographicText>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Professional prop firm clearing service helping traders achieve funded account success through proven methodologies and expert guidance.
                </p>
                <div className="flex items-center space-x-4">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Trusted by <span className="counter-3d">2,847+</span> traders worldwide</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                  <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                  <li><Link to="/membership" className="hover:text-blue-400 transition-colors">Trading Plans</Link></li>
                  <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Progress Tracking</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                  <li><Link to="/customer-service" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
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
