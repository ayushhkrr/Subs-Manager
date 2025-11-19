import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Success = () => {
  const { refreshUser } = useAuth();

  useEffect(() => {
    // Refresh user data to get updated subscription status
    refreshUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Premium!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment was successful. You now have access to all premium features!
          </p>

          {/* Premium Features */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Premium Features:</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Unlimited subscriptions tracking</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Priority email reminders</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Advanced analytics and insights</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Export data to CSV</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Priority customer support</span>
              </li>
            </ul>
          </div>

          {/* Badge Display */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Your new status:</p>
            <span className="inline-block px-6 py-2 bg-linear-to-r from-yellow-400 to-yellow-600 text-white text-lg font-semibold rounded-full shadow-md">
              ⭐ Premium Member
            </span>
          </div>

          {/* Action Button */}
          <Link
            to="/dashboard"
            className="block w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            A confirmation email has been sent to your inbox.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
