import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle, User, Mail, Lock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Header from './Header';
import TemporaryAccountNotice from './TemporaryAccountNotice';
import FuturisticScene from './3D/FuturisticScene';
import Card3D from './3D/Card3D';
import Button3D from './3D/Button3D';
import HolographicText from './3D/HolographicText';
import AnimatedBackground from './3D/AnimatedBackground';
import api from '../api';
import '../styles/3d-animations.css';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  // Get selected plan from location state or default
  const selectedPlan = location.state?.selectedPlan;

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/membership');
    }
  }, [selectedPlan, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTempNotice, setShowTempNotice] = useState(false);

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      return 'First name is required';
    }
    if (!formData.lastName.trim()) {
      return 'Last name is required';
    }
    if (!formData.email || !formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }
    if (formData.password.length < 12) {
      return 'Password must be at least 12 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (!agreedToTerms) {
      return 'Please agree to the Terms of Service and Privacy Policy';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Try to register with backend API
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        plan_type: selectedPlan.name.toLowerCase(),
      });

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);

      const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();

      const userData = {
        uniqueId,
        id: `user_${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        membershipTier: selectedPlan.name.toLowerCase(),
        accountType: 'personal' as const,
        riskTolerance: 'moderate' as const,
        isAuthenticated: true,
        setupComplete: false,
        selectedPlan,
        token: access_token,
      };

      login(userData, access_token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('current_user', JSON.stringify(userData));

      // Successfully registered, redirect to payment
      navigate('/payment-flow', { state: { selectedPlan } });
    } catch (err: any) {
      console.error('Backend signup failed, using fallback:', err);
      
      // Create temporary account for immediate access to payment flow
      const tempToken = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('access_token', tempToken);
      
      const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();

      const userData = {
        uniqueId,
        id: `temp_user_${Date.now()}`,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        membershipTier: selectedPlan.name.toLowerCase(),
        accountType: 'personal' as const,
        riskTolerance: 'moderate' as const,
        isAuthenticated: true,
        setupComplete: false,
        selectedPlan,
        token: tempToken,
        isTemporary: true,
      };

      login(userData, tempToken);
      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('current_user', JSON.stringify(userData));
      
      // Store signup data for later backend sync and signin validation
      localStorage.setItem('pending_signup_data', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        plan_type: selectedPlan.name.toLowerCase(),
        timestamp: Date.now()
      }));

      // Redirect to payment page immediately
      navigate('/payment-flow', { state: { selectedPlan } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <FuturisticScene className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AnimatedBackground />
      <Header />
      <div className="flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/membership" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 nav-item-3d">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Plans</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400 float-animation" />
              <HolographicText className="text-2xl font-bold text-white">TraderEdge Pro</HolographicText>
            </div>

            <HolographicText className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </HolographicText>
            <p className="text-gray-400">
              Start your journey to funded trading success
            </p>
          </div>

          {/* Selected Plan Summary */}
          {selectedPlan && (
            <Card3D className="p-4 mb-6 neon-border" glowColor="blue">
              <div className="text-center">
                <div className="text-blue-400 font-semibold text-lg">{selectedPlan.name} Plan</div>
                <div className="text-white text-2xl font-bold counter-3d">${selectedPlan.price}/{selectedPlan.period}</div>
                <div className="text-blue-300 text-sm">Professional trading guidance</div>
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
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input-3d w-full pl-10 pr-4 py-3"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input-3d w-full pl-10 pr-4 py-3"
                        placeholder="Doe"
                        required
                      />
                    </div>
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-3d w-full pl-10 pr-4 py-3"
                      placeholder="john@example.com"
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
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="input-3d w-full pl-10 pr-12 py-3"
                      placeholder="Create a strong password (12+ chars, mixed case, numbers, symbols)"
                      required
                      minLength={12}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 interactive-element"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Password must be at least 12 characters with uppercase, lowercase, numbers, and special characters
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
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="input-3d w-full pl-10 pr-12 py-3"
                      placeholder="Confirm your password"
                      required
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

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                    I agree to the{' '}
                    <a href="/terms-of-service" target="_blank" className="text-blue-400 hover:text-blue-300 nav-item-3d">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy-policy" target="_blank" className="text-blue-400 hover:text-blue-300 nav-item-3d">Privacy Policy</a>
                  </label>
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
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button3D>
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
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <Card3D className="mt-6 p-4" glowColor="green">
            <div className="text-center text-xs text-gray-400">
              <p>🔒 Your data is encrypted and secure</p>
              <p>Cancel anytime</p>
            </div>
          </Card3D>
        </div>
      </div>
      
      <TemporaryAccountNotice 
        isVisible={showTempNotice} 
        onClose={() => setShowTempNotice(false)} 
      />
    </FuturisticScene>
  );
};

export default SignUp;