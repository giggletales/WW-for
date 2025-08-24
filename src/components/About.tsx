import React from 'react';
import { Globe, Cpu, Zap } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import ScrollReveal from './3D/ScrollReveal';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const About: React.FC = () => {
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
                dataText="Pioneering the Future of Trading"
              >
                Pioneering the Future of Trading
              </HolographicText>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                TraderEdge Pro was forged from a single, powerful idea: to democratize institutional-grade trading technology and empower individual traders to compete on a level playing field. We are more than a service; we are your strategic partner in navigating the complexities of the financial markets.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <ScrollReveal delay={0.2}>
              <Card3D className="p-8 text-center holographic" glowColor="blue">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4 float-animation" />
                <h3 className="text-2xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-gray-400">To provide traders with an unfair advantage through superior technology, data-driven strategies, and unwavering support.</p>
              </Card3D>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <Card3D className="p-8 text-center holographic" glowColor="purple">
                <Cpu className="w-12 h-12 text-purple-400 mx-auto mb-4 float-animation" />
                <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-gray-400">To be the most trusted and innovative platform for prop firm traders globally, setting new standards for success and transparency.</p>
              </Card3D>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <Card3D className="p-8 text-center holographic" glowColor="yellow">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4 float-animation" />
                <h3 className="text-2xl font-bold text-white mb-2">Our Philosophy</h3>
                <p className="text-gray-400">Discipline, precision, and continuous adaptation are the pillars of profitable trading. Our tools are built to reinforce these core principles.</p>
              </Card3D>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default About;