import Link from "next/link";

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              ← Back
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👥</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-1">245</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Residents</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-1">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Discussions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">New Members</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Discussion Forums */}
          <div className="lg:col-span-2 space-y-6">
            {/* Forums */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Discussion Forums</h2>
                <Link
                  href="/community/forums/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  New Topic
                </Link>
              </div>
              <div className="space-y-4">
                <ForumTopic
                  title="Best practices for waste segregation"
                  author="Sarah Wilson"
                  replies={15}
                  lastActive="2 hours ago"
                  category="Environment"
                />
                <ForumTopic
                  title="Organizing a weekend cultural event"
                  author="Raj Kumar"
                  replies={23}
                  lastActive="5 hours ago"
                  category="Events"
                />
                <ForumTopic
                  title="Improving security measures"
                  author="Mike Johnson"
                  replies={8}
                  lastActive="1 day ago"
                  category="Security"
                />
              </div>
            </div>

            {/* Events */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                <EventCard
                  title="Yoga & Meditation Session"
                  date="Jan 20, 2026"
                  time="6:00 AM - 7:00 AM"
                  location="Community Hall"
                  attendees={25}
                />
                <EventCard
                  title="Kids Art Workshop"
                  date="Jan 22, 2026"
                  time="4:00 PM - 6:00 PM"
                  location="Activity Room"
                  attendees={18}
                />
                <EventCard
                  title="Movie Night"
                  date="Jan 25, 2026"
                  time="7:00 PM - 10:00 PM"
                  location="Community Hall"
                  attendees={45}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <QuickLink href="/community/directory" icon="📖" label="Resident Directory" />
                <QuickLink href="/community/events" icon="📅" label="Events Calendar" />
                <QuickLink href="/community/forums" icon="💬" label="All Forums" />
                <QuickLink href="/community/feedback" icon="📝" label="Feedback" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <ActivityItem
                  user="John Doe"
                  action="joined the community"
                  time="1 hour ago"
                />
                <ActivityItem
                  user="Jane Smith"
                  action="posted in Maintenance forum"
                  time="3 hours ago"
                />
                <ActivityItem
                  user="Mike Johnson"
                  action="registered for Yoga Session"
                  time="5 hours ago"
                />
              </div>
            </div>

            {/* Member Spotlight */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Member Spotlight</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Wilson</h4>
                  <p className="text-sm opacity-90">Community Leader</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                &quot;Leading the green initiative and organizing weekly yoga sessions.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForumTopic({ title, author, replies, lastActive, category }: {
  title: string;
  author: string;
  replies: number;
  lastActive: string;
  category: string;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            by {author} • {replies} replies
          </p>
        </div>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded">
          {category}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500">Last active: {lastActive}</p>
    </div>
  );
}

function EventCard({ title, date, time, location, attendees }: {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
        <p>📅 {date} • {time}</p>
        <p>📍 {location}</p>
        <p>👥 {attendees} attending</p>
      </div>
      <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Join Event
      </button>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    </Link>
  );
}

function ActivityItem({ user, action, time }: { user: string; action: string; time: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm">👤</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-white">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">{time}</p>
      </div>
    </div>
  );
}
