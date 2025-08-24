import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Award,
  Clock,
  DollarSign,
  Zap
} from 'lucide-react';
import Header from './Header';
import FuturisticScene from './3D/FuturisticScene';
import ScrollReveal from './3D/ScrollReveal';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import Button3D from './3D/Button3D';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const LandingPage = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Prop Firm Mastery",
      description: "Expert guidance for FTMO, MyForexFunds, The5%ers, and 150+ prop firms with proven success strategies",
      color: "text-blue-400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Management Excellence",
      description: "Advanced position sizing and drawdown protection tailored to each prop firm's specific rules",
      color: "text-green-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Custom Trading Plans",
      description: "Personalized multi-phase trading strategies designed for your account size and risk tolerance",
      color: "text-purple-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Signals",
      description: "Professional-grade trading signals with precise entry, stop loss, and take profit levels",
      color: "text-yellow-400"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Phase Tracking",
      description: "Complete progress monitoring through challenge phases to live funded account status",
      color: "text-red-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Support",
      description: "Dedicated support team with extensive prop firm experience and proven track record",
      color: "text-cyan-400"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Select Your Prop Firm",
      description: "Choose from 150+ supported prop firms with automatic rule extraction",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Configure Account",
      description: "Set your account size and challenge type (1-step, 2-step, instant funding)",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Risk Parameters",
      description: "Define your risk percentage and reward ratios for optimal position sizing",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Custom Trading Plan",
      description: "Receive a detailed, downloadable trading plan tailored to your setup",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      step: 5,
      title: "Live Dashboard",
      description: "Track progress, receive signals, and monitor your funded account journey",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const stats = [
    { number: "2,847", label: "Funded Accounts", description: "Successfully cleared" },
    { number: "94.7%", label: "Success Rate", description: "Challenge completion" },
    { number: "$12.8M", label: "Total Funded", description: "Across all prop firms" },
    { number: "150+", label: "Prop Firms", description: "Supported platforms" }
  ];

  const testimonials = [
    {
      name: "Marcus Chen",
      role: "FTMO $200K Funded Trader",
      content: "The custom trading plan was exactly what I needed. Cleared my FTMO challenge in 18 days following their strategy.",
      rating: 5,
      profit: "$47,230",
      image: "MC"
    },
    {
      name: "Sarah Williams",
      role: "MyForexFunds Elite",
      content: "Professional service with detailed risk management. Now managing a $500K funded account thanks to their guidance.",
      rating: 5,
      profit: "$89,450",
      image: "SW"
    },
    {
      name: "David Rodriguez",
      role: "The5%ers Funded",
      content: "The phase tracking and signals helped me stay disciplined. Cleared all phases without any rule violations.",
      rating: 5,
      profit: "$34,680",
      image: "DR"
    }
  ];

  return (
    <FuturisticScene className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden hero-3d">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 hero-content">
          <div className="text-center">
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
            
            <ScrollReveal delay={0.6}>
              <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                Professional clearing service for prop firm challenges with custom trading plans and expert guidance
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.8}>
              <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto">
                Join <span className="text-blue-400 font-semibold counter-3d">2,847 successful traders</span> who cleared their challenges with our proven methodology.
              </p>
            </ScrollReveal>
            
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

            {/* Stats */}
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
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative">
        <div className="max-w-7xl mx-auto">
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
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform -translate-y-1/2 neon-border"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                <Card3D className="p-8 group interactive-element" glowColor="green">
                  <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 float-animation`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative">
        <div className="max-w-7xl mx-auto">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-purple-900/20 relative">
        <div className="max-w-4xl mx-auto text-center">
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
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <HolographicText className="text-3xl md:text-5xl font-bold text-white mb-6">
                Membership Plans
              </HolographicText>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Choose the plan that's right for you.
              </p>
            </div>
          </ScrollReveal>
          
          {/* Membership Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'kickstarter',
                name: 'Kickstarter',
                price: 0,
                period: 'month',
                description: 'Buy funded account with our affiliate link and get access to premium features',
                icon: <Shield className="w-8 h-8" />,
                color: 'gray',
                isAffiliate: true,
                features: [
                  'Risk management plan for 1 month',
                  'Trading signals for 1 week',
                  'Standard risk management calculator',
                  'Phase tracking dashboard',
                  '3 prop firm rule analyzer',
                  'Access via affiliate purchase only'
                ],
              },
              {
                id: 'starter',
                name: 'Starter',
                price: 99,
                period: 'month',
                description: 'Essential features for serious traders',
                icon: <Star className="w-8 h-8" />,
                color: 'blue',
                features: [
                  'Risk management plan for 1 month',
                  'Trading signals for 1 month',
                  'Standard risk management calculator',
                  'Phase tracking dashboard',
                  '5 prop firm rule analyzer',
                  'Email support',
                  'Auto lot size calculator'
                ]
              },
              {
                id: 'pro',
                name: 'Pro',
                price: 199,
                period: 'month',
                description: 'Advanced features for professional traders',
                icon: <Zap className="w-8 h-8" />,
                color: 'yellow',
                popular: true,
                features: [
                  'Risk management plan for 1 month',
                  'Trading signals for 1 month',
                  'Standard risk management calculator',
                  'Phase tracking dashboard',
                  '15 prop firm rule analyzer',
                  'Priority chat and email support',
                  'Auto lot size calculator',
                  'Access to private community',
                  'Multi account tracker',
                  'Advanced trading journal',
                  'Backtesting tools',
                  'Instant access to new features'
                ]
              },
              {
                id: 'enterprise',
                name: 'Enterprise',
                price: 499,
                period: '3 months',
                description: 'Ultimate solution for trading teams and professionals',
                icon: <Award className="w-8 h-8" />,
                color: 'purple',
                features: [
                  'Risk management plan for 3 months',
                  'Trading signals for 3 months',
                  'Standard risk management calculator',
                  'Phase tracking dashboard',
                  '15 prop firm rule analyzer',
                  '24/7 priority chat and email support',
                  'Auto lot size calculator',
                  'Access to private community',
                  'Multi account tracker',
                  'Advanced trading journal',
                  'Professional backtesting suite',
                  'Chart analysis tools',
                  'Instant access to new features'
                ]
              }
            ].map((plan, index) => (
              <ScrollReveal key={index} delay={0.2 + index * 0.1}>
                <Card3D 
                  className={`relative p-6 transition-transform duration-300 ${
                    plan.popular ? 'scale-105 shadow-2xl' : ''
                  }`}
                  glowColor={plan.color}
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
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.isAffiliate ? (
                    <Button3D
                      onClick={() => window.location.href = '/affiliate-links'}
                      variant="secondary"
                      className="w-full"
                    >
                      Get Started
                    </Button3D>
                  ) : (
                    <Button3D
                      onClick={() => window.location.href = `/signup?plan=${plan.id}`}
                      variant="primary"
                      className="w-full"
                    >
                      Get Started
                    </Button3D>
                  )}
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto">
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
                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Subscribe to our newsletter</h4>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const email = (e.target as any).email.value;
                      await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });
                      alert('Successfully subscribed!');
                    }}
                  >
                    <div className="flex">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-semibold"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
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
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 TraderEdge Pro. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Trading involves substantial risk. Past performance does not guarantee future results.</span>
            </div>
          </div>
        </div>
      </footer>
    </FuturisticScene>
  );
};

export default LandingPage;