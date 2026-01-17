import Link from "next/link";

export default function Governance() {
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
              <span className="text-3xl">🗳️</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Governance</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Proposals</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-1">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Approved This Month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Meetings</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Proposals */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Active Proposals</h2>
              <Link
                href="/governance/proposals/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Proposal
              </Link>
            </div>
            <div className="space-y-4">
              <ProposalCard
                title="Install Solar Panels on Rooftop"
                description="Proposal to install solar panels to reduce electricity costs"
                votes={{ for: 123, against: 45 }}
                deadline="3 days left"
                status="active"
              />
              <ProposalCard
                title="Upgrade Security System"
                description="Replace existing CCTV cameras with HD cameras"
                votes={{ for: 89, against: 23 }}
                deadline="5 days left"
                status="active"
              />
              <ProposalCard
                title="Ban Plastic in Common Areas"
                description="Implement plastic-free policy in all common areas"
                votes={{ for: 156, against: 12 }}
                deadline="1 day left"
                status="active"
              />
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Meetings
            </h2>
            <div className="space-y-4">
              <MeetingCard
                title="Annual General Meeting"
                date="Jan 25, 2026"
                time="6:00 PM"
                location="Community Hall"
              />
              <MeetingCard
                title="Security Committee"
                date="Jan 28, 2026"
                time="7:00 PM"
                location="Meeting Room A"
              />
            </div>
            <Link href="/governance/meetings" className="block mt-4 text-blue-600 hover:underline">
              View all meetings →
            </Link>
          </div>
        </div>

        {/* Committees */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Committees</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <CommitteeCard name="Security Committee" members={5} />
            <CommitteeCard name="Finance Committee" members={4} />
            <CommitteeCard name="Maintenance Committee" members={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalCard({ title, description, votes, deadline, status }: {
  title: string;
  description: string;
  votes: { for: number; against: number };
  deadline: string;
  status: string;
}) {
  const total = votes.for + votes.against;
  const percentFor = (votes.for / total) * 100;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded">
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      
      {/* Vote Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>For: {votes.for}</span>
          <span>Against: {votes.against}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600"
            style={{ width: `${percentFor}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{deadline}</span>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          Vote
        </button>
      </div>
    </div>
  );
}

function MeetingCard({ title, date, time, location }: {
  title: string;
  date: string;
  time: string;
  location: string;
}) {
  return (
    <div className="border-l-4 border-blue-600 pl-4 py-2">
      <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        <p>📅 {date} at {time}</p>
        <p>📍 {location}</p>
      </div>
    </div>
  );
}

function CommitteeCard({ name, members }: { name: string; members: number }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{members} members</p>
    </div>
  );
}
