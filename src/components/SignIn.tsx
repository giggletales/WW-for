import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Eye, EyeOff, AlertCircle, Mail, Lock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Header from './Header';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import Button3D from './3D/Button3D';
import HolographicText from './3D/HolographicText';
import AnimatedBackground from './3D/AnimatedBackground';
import '../styles/3d-animations.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected plan from location state
  const selectedPlan = location.state?.selectedPlan;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // First check if user exists in localStorage (from signup)
      const storedUserData = localStorage.getItem('user_data');
      const pendingSignupData = localStorage.getItem('pending_signup_data');
      
      let validCredentials = false;
      let userData = null;

      // Check against stored signup data
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData.email === email) {
          validCredentials = true;
          userData = parsedUserData;
        }
      }

      // Check against pending signup data
      if (!validCredentials && pendingSignupData) {
        const parsedSignupData = JSON.parse(pendingSignupData);
        if (parsedSignupData.email === email && parsedSignupData.password === password) {
          validCredentials = true;
          userData = {
            id: `user_${Date.now()}`,
            name: `${parsedSignupData.firstName} ${parsedSignupData.lastName}`,
            email: parsedSignupData.email,
            membershipTier: parsedSignupData.plan_type,
            accountType: 'personal' as const,
            riskTolerance: 'moderate' as const,
            isAuthenticated: true,
            setupComplete: true,
            selectedPlan,
            token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          };
        }
      }

      if (validCredentials && userData) {
        localStorage.setItem('access_token', userData.token);
        localStorage.setItem('current_user', JSON.stringify(userData));
        login(userData, userData.token, rememberMe);
        
        // Check if user needs to complete questionnaire
        const questionnaireCompleted = localStorage.getItem('questionnaire_completed');
        if (!questionnaireCompleted) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Try backend authentication
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('access_token', data.access_token);
          
          // Decode JWT to get user info
          const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
          
          const backendUserData = {
            id: tokenPayload.sub || '',
            name: tokenPayload.username || email,
            email: email,
            membershipTier: tokenPayload.plan_type || 'professional',
            accountType: 'personal' as const,
            riskTolerance: 'moderate' as const,
            isAuthenticated: true,
            setupComplete: true,
            selectedPlan,
            token: data.access_token
          };
          
          login(backendUserData, data.access_token, rememberMe);
          navigate('/dashboard');
        } else {
          setError('Invalid email or password. Please check your credentials or sign up first.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to sign in. Please check your credentials or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AnimatedBackground />
      <Header />
      <div className="flex items-center justify-center px-4">
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
              Welcome Back
            </HolographicText>
            <p className="text-gray-400">Sign in to continue your trading journey</p>
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
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg flex items-center space-x-2 neon-border">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(''); // Clear error when user starts typing
                      }}
                      className={`input-3d w-full pl-10 pr-4 py-3 ${
                        error ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(''); // Clear error when user starts typing
                      }}
                      className={`input-3d w-full pl-10 pr-12 py-3 ${
                        error ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 nav-item-3d">Forgot password?</a>
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
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button3D>
              </div>
            </form>
          </Card3D>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                state={{ selectedPlan }}
                className="text-blue-400 hover:text-blue-300 font-semibold nav-item-3d"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <Card3D className="mt-6 p-4" glowColor="green">
            <div className="text-center text-xs text-gray-400">
              <p>🔒 Your login is secured with industry-standard encryption</p>
              {selectedPlan && <p>Continue with your {selectedPlan.name} plan after signing in</p>}
            </div>
          </Card3D>
        </div>
      </div>
    </FuturisticScene>
  );
};

export default SignIn;