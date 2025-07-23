//app/profile/page.tsx
import { getSession } from '../lib/session';
import { redirect } from 'next/navigation';
import { PrismaClient } from '../generated/prisma';
import LogoutButton from './components/LogoutButton';

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: {
        select: {
          posts: true,
          likes: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.username}
                </h1>
                <p className="text-gray-400 mb-4">{user.email}</p>
                <div className="flex space-x-6 text-sm text-gray-300">
                  <div>
                    <span className="font-semibold text-white">
                      {user._count.posts}
                    </span>{' '}
                    Posts
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      {user._count.likes}
                    </span>{' '}
                    Likes Given
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>{' '}
                    Joined
                  </div>
                </div>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>

          {user.posts.length > 0 ? (
            <div className="space-y-4">
              {user.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-700 rounded-lg p-6 border border-gray-600"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-400">
                Start sharing your thoughts with the community!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
