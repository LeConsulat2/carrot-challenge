//app/login/page.tsx

'use client';

import { useState } from 'react';
import { FormData, loginSubmit } from './components/validation';

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string[]>>
  >({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginSubmit(formData);

      if (result.success) {
        setMessage(result.message);
        setErrors({});
        // Reset form on success
        setFormData({ email: '', username: '', password: '' });
      } else {
        setErrors(result.errors || {});
        setMessage('');
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Login
        </h1>
        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.email &&
                errors.email.map((error, index) => (
                  <p key={index} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.password &&
                errors.password.map((error, index) => (
                  <p key={index} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 fcous:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
                required
              />
              {errors.password &&
                errors.password.map((error, index) => {
                  <p key={index} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>;
                })}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justfiy-center py-2 px-4 border boredr-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2  focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.includes('successful')
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
