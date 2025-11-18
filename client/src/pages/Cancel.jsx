import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Why upgrade to Premium?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Unlimited subscriptions tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Advanced analytics and reports</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Export data to CSV</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Priority customer support</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Only <span className="font-semibold text-blue-600">$9.99/month</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              to="/dashboard"
              className="block w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            You can upgrade to Premium anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
