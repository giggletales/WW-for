import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Star, Zap, Crown, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import Header from './Header';
import FuturisticScene from './3D/FuturisticScene';
import ScrollReveal from './3D/ScrollReveal';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import Button3D from './3D/Button3D';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'kickstarter',
      name: 'Kickstarter',
      price: 0,
      period: 'month',
      description: 'Buy funded account with our affiliate link and get access to premium features',
      icon: <Shield className="w-8 h-8" />,
      color: 'border-gray-600',
      bgColor: 'bg-gray-800',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
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
      color: 'border-blue-500',
      bgColor: 'bg-blue-500/10',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
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
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-500/10',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
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
      icon: <Crown className="w-8 h-8" />,
      color: 'border-purple-500',
      bgColor: 'bg-purple-500/10',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
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
  ];

  const handlePlanSelect = (plan: any) => {
    if (plan.isAffiliate) return;
    
    // Navigate directly to sign up with the selected plan
    navigate('/signup', {
      state: { 
        selectedPlan: { 
          name: plan.name, 
          price: plan.price, 
          period: plan.period 
        } 
      }
    });
  };


  return (
    <FuturisticScene className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
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
            ))}
          </div>

          {/* FAQ Section */}
          <ScrollReveal delay={0.4}>
            <div className="mt-20">
              <HolographicText className="text-3xl font-bold text-white text-center mb-12">
                Frequently Asked Questions
              </HolographicText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="space-y-6">
                  <Card3D className="p-6" glowColor="blue">
                    <h3 className="text-lg font-medium text-white mb-2">Which prop firms do you support?</h3>
                    <p className="text-gray-400">We support over 150 of the top prop firms in the industry, including FTMO, MyForexFunds, The5%ers, and many more. Our platform automatically extracts the rules and objectives for your selected firm and challenge type.</p>
                  </Card3D>
                  <Card3D className="p-6" glowColor="green">
                    <h3 className="text-lg font-medium text-white mb-2">How does the trading plan work?</h3>
                    <p className="text-gray-400">Our proprietary algorithm generates a personalized, multi-phase trading plan based on your selected prop firm, account size, and risk tolerance. It provides clear guidelines on position sizing, daily loss limits, and profit targets to keep you on track.</p>
                  </Card3D>
                  <Card3D className="p-6" glowColor="purple">
                    <h3 className="text-lg font-medium text-white mb-2">How long does it take to clear a challenge?</h3>
                    <p className="text-gray-400">The time it takes to clear a challenge varies depending on the prop firm and your trading performance. Our tools and strategies are designed to help you clear challenges as quickly as possible, often within the first month.</p>
                  </Card3D>
                </div>
                <div className="space-y-6">
                  <Card3D className="p-6" glowColor="yellow">
                    <h3 className="text-lg font-medium text-white mb-2">What are the subscription options?</h3>
                    <p className="text-gray-400">We offer several subscription tiers, including a monthly and a yearly plan. We also have a free Kickstarter plan for those who use our affiliate links with supported prop firms. You can find more details on our Pricing page.</p>
                  </Card3D>
                  <Card3D className="p-6" glowColor="red">
                    <h3 className="text-lg font-medium text-white mb-2">Can I cancel my subscription?</h3>
                    <p className="text-gray-400">Yes, you can cancel your subscription at any time from your account dashboard. There are no long-term contracts or hidden fees. Your access will continue until the end of your current billing period.</p>
                  </Card3D>
                  <Card3D className="p-6" glowColor="cyan">
                    <h3 className="text-lg font-medium text-white mb-2">Is my trading account information secure?</h3>
                    <p className="text-gray-400">Absolutely. We use state-of-the-art encryption and security protocols to protect your data. We do not have direct access to your trading accounts or funds. Our platform only requires read-only data to track performance.</p>
                  </Card3D>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={0.6}>
            <div className="mt-20 text-center">
              <Card3D className="p-12 holographic" glowColor="cyan">
                <HolographicText className="text-3xl font-bold text-white mb-4">
                  Ready to Clear Your Challenge?
                </HolographicText>
                <p className="text-lg text-gray-300 mb-8">
                  Choose the plan that fits your trading goals and start your funded account journey today.
                </p>
                <Button3D
                  onClick={() => window.location.href = '/payment'}
                  variant="primary"
                  size="lg"
                >
                  Start Your Journey <Star className="w-5 h-5 ml-2" />
                </Button3D>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default MembershipPlans;