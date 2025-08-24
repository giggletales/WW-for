import React from 'react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const PaymentIntegration: React.FC = () => {
  return (
    <FuturisticScene className="min-h-screen">
      <AnimatedBackground />
      
      <div className="flex items-center justify-center px-4 py-12">
        <Card3D className="p-8 max-w-md mx-auto text-center" glowColor="purple">
          <div className="text-6xl mb-6">💳</div>
          <HolographicText className="text-2xl font-bold text-white mb-4">
            Payment Integration
          </HolographicText>
          <p className="text-gray-400">
            Secure payment processing will be available soon. Stay tuned for updates!
          </p>
        </Card3D>
      </div>
    </FuturisticScene>
  );
};

export default PaymentIntegration;