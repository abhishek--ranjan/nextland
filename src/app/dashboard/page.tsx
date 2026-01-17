import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-2xl">🏘️</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NextLand</h1>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, Admin</span>
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your society efficiently</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Residents" value="245" icon="👥" color="blue" />
          <StatCard title="Active Proposals" value="5" icon="🗳️" color="green" />
          <StatCard title="Pending Requests" value="12" icon="📋" color="yellow" />
          <StatCard title="Upcoming Events" value="3" icon="📅" color="purple" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Announcements */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Announcements
            </h3>
            <div className="space-y-4">
              <AnnouncementItem
                title="Water Supply Disruption - Jan 20"
                time="2 hours ago"
                priority="high"
              />
              <AnnouncementItem
                title="Annual General Meeting - Jan 25"
                time="1 day ago"
                priority="medium"
              />
              <AnnouncementItem
                title="New Security Guidelines"
                time="3 days ago"
                priority="low"
              />
            </div>
            <Link href="/dashboard/content" className="block mt-4 text-blue-600 hover:underline">
              View all announcements →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <QuickActionButton href="/dashboard/content/new" icon="📝" label="New Announcement" />
              <QuickActionButton href="/governance/proposals/new" icon="➕" label="Create Proposal" />
              <QuickActionButton href="/facilities/booking" icon="🏢" label="Book Facility" />
              <QuickActionButton href="/community/events/new" icon="📅" label="Add Event" />
            </div>
          </div>
        </div>

        {/* Feature Modules */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Feature Modules
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModuleCard
              href="/dashboard/content"
              icon="📋"
              title="Content"
              description="Manage announcements, documents, and media"
            />
            <ModuleCard
              href="/governance"
              icon="🗳️"
              title="Governance"
              description="Proposals, voting, and meetings"
            />
            <ModuleCard
              href="/facilities"
              icon="🏢"
              title="Facilities"
              description="Bookings and maintenance"
            />
            <ModuleCard
              href="/community"
              icon="👥"
              title="Community"
              description="Forums, events, and engagement"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { 
  title: string; 
  value: string; 
  icon: string; 
  color: string 
}) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20",
    green: "bg-green-50 dark:bg-green-900/20",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20",
    purple: "bg-purple-50 dark:bg-purple-900/20",
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
}

function AnnouncementItem({ title, time, priority }: { 
  title: string; 
  time: string; 
  priority: string 
}) {
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  };

  return (
    <div className="border-l-4 border-blue-600 pl-4 py-2">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{time}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[priority as keyof typeof priorityColors]}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}

function QuickActionButton({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-gray-900 dark:text-white">{label}</span>
    </Link>
  );
}

function ModuleCard({ href, icon, title, description }: { 
  href: string; 
  icon: string; 
  title: string; 
  description: string 
}) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}
