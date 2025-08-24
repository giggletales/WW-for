import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const PaymentFlow: React.FC = () => {
  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AnimatedBackground />
      
      <header className="nav-3d border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/membership" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors nav-item-3d"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Plans</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-blue-400 float-animation" />
            <HolographicText className="text-2xl font-bold text-white">TraderEdge Pro</HolographicText>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <HolographicText 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              glitchEffect={true}
              dataText="Complete Your Subscription"
            >
              Complete Your Subscription
            </HolographicText>
            <p className="text-gray-400">
              Secure your spot and start your prop firm success journey today
            </p>
          </div>

          <Card3D className="p-8 form-3d" glowColor="blue">
            <div className="text-center">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Integration Coming Soon</h2>
              <p className="text-gray-400 mb-8">
                We're currently setting up secure payment processing. In the meantime, you can:
              </p>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Browse our features and plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Join our community for updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Contact us for early access</span>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default PaymentFlow;