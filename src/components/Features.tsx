import React from 'react';
import { TrendingUp, Shield, Zap, Award, BarChart3, Users, Clock, Target } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import ScrollReveal from './3D/ScrollReveal';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const features = [
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
    title: 'Custom Trading Plans',
    description: 'Personalized strategies tailored to your prop firm requirements, trading style, and risk tolerance for maximum success rates.'
  },
  {
    icon: <Shield className="w-8 h-8 text-green-400" />,
    title: 'Advanced Risk Management',
    description: 'Sophisticated risk protocols and position sizing algorithms to protect your account and ensure consistent profitability.'
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    title: 'Real-time Analytics',
    description: 'Live performance tracking with detailed metrics, drawdown analysis, and progress monitoring for informed decision making.'
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    title: 'Expert Mentorship',
    description: '24/7 access to professional traders who have successfully cleared multiple prop firm challenges and manage funded accounts.'
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-red-400" />,
    title: 'Performance Optimization',
    description: 'AI-powered analysis of your trading patterns with actionable insights to improve your win rate and profit factor.'
  },
  {
    icon: <Users className="w-8 h-8 text-cyan-400" />,
    title: 'Community Support',
    description: 'Join our exclusive community of successful prop firm traders sharing strategies, tips, and market insights.'
  },
  {
    icon: <Clock className="w-8 h-8 text-orange-400" />,
    title: 'Time Management',
    description: 'Optimized trading schedules and session planning to maximize your efficiency and maintain work-life balance.'
  },
  {
    icon: <Target className="w-8 h-8 text-pink-400" />,
    title: 'Goal Achievement',
    description: 'Structured milestone tracking and achievement systems to keep you motivated and on track to funding success.'
  }
];

const Features: React.FC = () => {
  return (
    <FuturisticScene className="min-h-screen text-white overflow-hidden">
      <AnimatedBackground />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default Features;