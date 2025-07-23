//app/profile/components/LogoutButton.tsx
'use client';

import { logoutAction } from '../actions';

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
    >
      Logout
    </button>
  );
}
