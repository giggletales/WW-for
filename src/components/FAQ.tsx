import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import ScrollReveal from './3D/ScrollReveal';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const faqCategories = [
  {
    category: 'Getting Started',
    icon: <HelpCircle className="w-6 h-6 text-blue-400" />,
    questions: [
      {
        question: 'What is TraderEdge Pro and how does it work?',
        answer: 'TraderEdge Pro is a comprehensive prop firm clearing service that provides personalized trading plans, risk management protocols, and expert guidance to help traders successfully pass prop firm challenges and secure funded accounts.'
      },
      {
        question: 'Which prop firms do you support?',
        answer: 'We support all major prop firms including FTMO, MyForexFunds, The5ers, FundedNext, and many others. Our system is designed to adapt to any prop firm\'s specific rules and requirements.'
      },
      {
        question: 'How long does it take to get my trading plan?',
        answer: 'After completing our comprehensive questionnaire, you\'ll receive your personalized trading plan within 24-48 hours. The plan includes detailed strategies, risk parameters, and step-by-step guidance.'
      }
    ]
  },
  {
    category: 'Trading Plans',
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
    questions: [
      {
        question: 'Are the trading plans really personalized?',
        answer: 'Yes, absolutely. Each plan is created based on your specific prop firm, account size, trading experience, risk tolerance, and personal preferences. No two plans are identical.'
      },
      {
        question: 'Can I modify my trading plan after receiving it?',
        answer: 'Yes, we offer plan revisions and updates. As you progress or if market conditions change, we can adjust your strategy to ensure continued success.'
      },
      {
        question: 'What if my trading plan doesn\'t work for me?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your plan or don\'t see improvement in your trading, we\'ll provide a full refund.'
      }
    ]
  },
  {
    category: 'Risk Management',
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    questions: [
      {
        question: 'How do you ensure I don\'t blow my account?',
        answer: 'Our risk management system includes strict position sizing rules, daily loss limits, maximum drawdown protection, and real-time monitoring to prevent account violations.'
      },
      {
        question: 'What happens if I violate a rule?',
        answer: 'Our system provides early warning alerts before you approach any limits. If a violation occurs, we help you analyze what went wrong and adjust your strategy to prevent future issues.'
      },
      {
        question: 'Do you provide ongoing risk monitoring?',
        answer: 'Yes, our premium plans include continuous risk monitoring with real-time alerts, weekly performance reviews, and strategy adjustments as needed.'
      }
    ]
  },
  {
    category: 'Support & Success',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    questions: [
      {
        question: 'What kind of support do you provide?',
        answer: 'We offer 24/7 chat support, weekly strategy calls, performance analysis, and access to our community of successful prop firm traders.'
      },
      {
        question: 'What is your success rate?',
        answer: 'Our clients have a 94% success rate in passing prop firm challenges, significantly higher than the industry average of 10-15%.'
      },
      {
        question: 'Do you guarantee I\'ll pass my challenge?',
        answer: 'While we can\'t guarantee results (trading involves risk), we do guarantee our commitment to your success with our money-back guarantee and ongoing support.'
      }
    ]
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      <AnimatedBackground />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-20">
              <HolographicText 
                className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
                glitchEffect={true}
                dataText="Knowledge Base"
              >
                Knowledge Base
              </HolographicText>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Your questions, answered. Explore our FAQ to find the information you need to start your journey with TraderEdge Pro.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, catIndex) => (
              <ScrollReveal key={catIndex} delay={0.2 + catIndex * 0.1}>
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="float-animation">{category.icon}</div>
                    <HolographicText>{category.category}</HolographicText>
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <Card3D key={index} className="overflow-hidden interactive-element" glowColor="cyan">
                        <button
                          onClick={() => toggle(catIndex * 10 + index)}
                          className="w-full text-left flex justify-between items-center p-6 focus:outline-none"
                        >
                          <span className="text-xl font-medium text-white">{faq.question}</span>
                          <ChevronDown className={`w-6 h-6 text-blue-400 transform transition-transform ${open === (catIndex * 10 + index) ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`transition-all duration-500 ease-in-out ${open === (catIndex * 10 + index) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="p-6 pt-0">
                            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </Card3D>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default FAQ;