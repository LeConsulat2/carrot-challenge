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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
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
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              disabled={isLoading}
              required
            />
            {errors.email &&
              errors.email.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-400">
                  {error}
                </p>
              ))}
          </div>

          {/* Username - 버그 수정: errors.password → errors.username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.username ? 'border-red-500' : 'border-gray-600'
              }`}
              disabled={isLoading}
              required
            />
            {errors.username &&
              errors.username.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-400">
                  {error}
                </p>
              ))}
          </div>

          {/* Password - 버그 수정: return 추가 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
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
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              disabled={isLoading}
              required
            />
            {errors.password &&
              errors.password.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-400">
                  {error}
                </p>
              ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.includes('successful')
                  ? 'bg-green-900 text-green-300 border border-green-700'
                  : 'bg-red-900 text-red-300 border border-red-700'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
