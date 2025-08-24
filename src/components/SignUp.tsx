import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, TrendingUp } from 'lucide-react';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import HolographicText from './3D/HolographicText';
import Button3D from './3D/Button3D';
import AnimatedBackground from './3D/AnimatedBackground';
import { useUser } from '../contexts/UserContext';
import '../styles/3d-animations.css';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useUser();
  
  const selectedPlan = location.state?.selectedPlan;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const user = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        membershipTier: selectedPlan?.name.toLowerCase() || 'professional',
        setupComplete: false,
        uniqueId: `TEP-${Date.now()}`
      };

      // Login user
      login(user);
      
      // Navigate to questionnaire or payment
      if (selectedPlan) {
        navigate('/questionnaire', { state: { fromPayment: true, plan: selectedPlan } });
      } else {
        navigate('/membership');
      }
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AnimatedBackground />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to={selectedPlan ? "/membership" : "/"} 
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 nav-item-3d"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {selectedPlan ? "Plans" : "Home"}</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400 float-animation" />
              <HolographicText className="text-2xl font-bold text-white">TraderEdge Pro</HolographicText>
            </div>

            <HolographicText className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </HolographicText>
            <p className="text-gray-400">Join thousands of successful prop firm traders</p>
          </div>

          {/* Selected Plan Summary */}
          {selectedPlan && (
            <Card3D className="p-4 mb-6 neon-border" glowColor="blue">
              <div className="text-center">
                <div className="text-blue-400 font-semibold text-lg">{selectedPlan.name} Plan</div>
                <div className="text-white text-2xl font-bold counter-3d">${selectedPlan.price}/{selectedPlan.period}</div>
                <div className="text-blue-300 text-sm">Continue with your selected plan</div>
              </div>
            </Card3D>
          )}

          {/* Form */}
          <Card3D className="p-8 form-3d" glowColor="cyan">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm neon-border">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-3d w-full pl-10 pr-4 py-3"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-3d w-full pl-10 pr-4 py-3"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input-3d w-full pl-10 pr-12 py-3"
                      placeholder="Create a password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 interactive-element"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="input-3d w-full pl-10 pr-12 py-3"
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 interactive-element"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button3D
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button3D>
              </div>
            </form>
          </Card3D>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/signin" 
                state={{ selectedPlan }}
                className="text-blue-400 hover:text-blue-300 font-semibold nav-item-3d"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <Card3D className="mt-6 p-4" glowColor="green">
            <div className="text-center text-xs text-gray-400">
              <p>🔒 Your data is protected with industry-standard encryption</p>
              {selectedPlan && <p>Continue with your {selectedPlan.name} plan after account creation</p>}
            </div>
          </Card3D>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default SignUp;