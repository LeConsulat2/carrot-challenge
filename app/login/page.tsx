'use client';

import { useState } from 'react';
import { loginSubmit, FormData } from './components/validation';

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginSubmit(formData);

    if (result.success) {
      setMessage(result.message);
      setErrors({});
    } else {
      setErrors(result.errors as Partial<Record<keyof FormData, string>>);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-16">Login Page</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center space-y-6 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border-2 border-gray-300 rounded-md p-2"
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
