import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Zap, Award } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import Button3D from './3D/Button3D';
import ScrollReveal from './3D/ScrollReveal';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const stats = [
  { number: '2,847+', label: 'Successful Traders', description: 'Cleared challenges' },
  { number: '94%', label: 'Success Rate', description: 'With our methodology' },
  { number: '$2.4M+', label: 'Funded Capital', description: 'Secured for traders' },
  { number: '24/7', label: 'Expert Support', description: 'Always available' }
];

const steps = [
  { step: '1', title: 'Choose Your Plan', description: 'Select the perfect plan for your trading goals and experience level' },
  { step: '2', title: 'Complete Assessment', description: 'Answer our comprehensive questionnaire to create your custom plan' },
  { step: '3', title: 'Get Your Strategy', description: 'Receive a personalized trading plan tailored to your prop firm' },
  { step: '4', title: 'Execute & Track', description: 'Follow your plan and track progress with our advanced dashboard' },
  { step: '5', title: 'Get Funded', description: 'Successfully clear your challenge and secure your funded account' }
];

const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Custom Trading Plans',
    description: 'Personalized strategies based on your prop firm requirements and trading style',
    color: 'text-blue-400'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Risk Management',
    description: 'Advanced risk protocols to protect your account and maximize success rates',
    color: 'text-green-400'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Real-time Tracking',
    description: 'Monitor your progress with live analytics and performance metrics',
    color: 'text-purple-400'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Expert Guidance',
    description: '24/7 support from professional traders who have cleared multiple challenges',
    color: 'text-yellow-400'
  }
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Professional Trader',
    content: 'TraderEdge Pro helped me clear my $100K FTMO challenge in just 3 weeks. The risk management plan was spot on.',
    rating: 5,
    profit: '$12,500',
    image: 'AC'
  },
  {
    name: 'Sarah Johnson',
    role: 'Forex Trader',
    content: 'The personalized trading plan made all the difference. I finally understand how to manage risk properly.',
    rating: 5,
    profit: '$8,750',
    image: 'SJ'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Day Trader',
    content: 'Best investment I made for my trading career. The support team is incredibly knowledgeable.',
    rating: 5,
    profit: '$15,200',
    image: 'MR'
  }
];

const LandingPage: React.FC = () => {
  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden hero-3d">
        <div className="max-w-7xl mx-auto relative z-10 hero-content">
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
      </section>

      {/* Process Section */}
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
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform -translate-y-1/2 neon-border"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, index) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 border-t border-gray-800">
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

          <ScrollReveal delay={0.4}>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 TraderEdge Pro. All rights reserved. | 
                <span className="text-blue-400 ml-1">Empowering traders worldwide</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </FuturisticScene>
  );
};

export default LandingPage;