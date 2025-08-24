import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Star, Zap, Crown, Gift } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import Button3D from './3D/Button3D';
import ScrollReveal from './3D/ScrollReveal';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const plans = [
  {
    name: 'Starter',
    price: 97,
    period: 'one-time',
    description: 'Perfect for new traders starting their prop firm journey',
    icon: <Star className="w-8 h-8" />,
    color: 'border-blue-500',
    popular: false,
    features: [
      'Personalized Trading Plan',
      'Basic Risk Management Protocol',
      'Email Support',
      'Community Access',
      'Trading Journal Template',
      '30-Day Money Back Guarantee'
    ]
  },
  {
    name: 'Professional',
    price: 197,
    period: 'one-time',
    description: 'Most popular choice for serious traders',
    icon: <Zap className="w-8 h-8" />,
    color: 'border-yellow-500',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced Risk Management',
      'Weekly Strategy Calls',
      'Priority Support',
      'Performance Analytics',
      'Plan Revisions (2x)',
      'Trading Psychology Guide',
      'Market Analysis Reports'
    ]
  },
  {
    name: 'Elite',
    price: 397,
    period: 'one-time',
    description: 'Premium service for professional traders',
    icon: <Crown className="w-8 h-8" />,
    color: 'border-purple-500',
    popular: false,
    features: [
      'Everything in Professional',
      '1-on-1 Mentorship Sessions',
      '24/7 Priority Support',
      'Unlimited Plan Revisions',
      'Custom Risk Algorithms',
      'Live Trading Room Access',
      'Monthly Performance Review',
      'Direct Trader Hotline'
    ]
  },
  {
    name: 'Free Access',
    price: 0,
    period: 'via affiliate',
    description: 'Get started with our affiliate program',
    icon: <Gift className="w-8 h-8" />,
    color: 'border-green-500',
    popular: false,
    isAffiliate: true,
    features: [
      'Basic Trading Plan',
      'Community Access',
      'Educational Resources',
      'Email Support',
      'Upgrade Anytime',
      'No Credit Card Required'
    ]
  }
];

const MembershipPlans: React.FC = () => {
  const handlePlanSelect = (plan: any) => {
    if (plan.isAffiliate) {
      window.location.href = '/affiliate-links';
    } else {
      window.location.href = `/signup?plan=${plan.name.toLowerCase()}`;
    }
  };

  return (
    <FuturisticScene className="min-h-screen">
      <AnimatedBackground />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          <ScrollReveal delay={0.8}>
            <div className="text-center mt-16">
              <Card3D className="p-8 max-w-2xl mx-auto" glowColor="green">
                <h3 className="text-2xl font-bold text-white mb-4">30-Day Money Back Guarantee</h3>
                <p className="text-gray-400 mb-6">
                  Not satisfied with your results? Get a full refund within 30 days, no questions asked.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Expert Support</span>
                  </div>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default MembershipPlans;