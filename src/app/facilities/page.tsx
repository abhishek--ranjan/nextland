import Link from "next/link";

export default function Facilities() {
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
              <span className="text-3xl">🏢</span>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Facilities Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/facilities/booking" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Book Facility</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reserve common areas</p>
          </Link>
          <Link href="/facilities/maintenance" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Maintenance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Report issues</p>
          </Link>
          <Link href="/facilities/visitors" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Visitor Pass</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Register visitors</p>
          </Link>
        </div>

        {/* Available Facilities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Available Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FacilityCard
              name="Community Hall"
              capacity="100 people"
              status="available"
              nextAvailable="Available now"
            />
            <FacilityCard
              name="Swimming Pool"
              capacity="30 people"
              status="available"
              nextAvailable="Available now"
            />
            <FacilityCard
              name="Gym"
              capacity="20 people"
              status="occupied"
              nextAvailable="Available at 6:00 PM"
            />
            <FacilityCard
              name="Playground"
              capacity="50 people"
              status="available"
              nextAvailable="Available now"
            />
            <FacilityCard
              name="Meeting Room A"
              capacity="15 people"
              status="occupied"
              nextAvailable="Available tomorrow"
            />
            <FacilityCard
              name="Tennis Court"
              capacity="4 people"
              status="available"
              nextAvailable="Available now"
            />
          </div>
        </div>

        {/* Recent Bookings & Maintenance */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              <BookingItem
                facility="Community Hall"
                user="John Doe"
                date="Jan 20, 2026"
                time="6:00 PM - 9:00 PM"
              />
              <BookingItem
                facility="Meeting Room A"
                user="Jane Smith"
                date="Jan 21, 2026"
                time="3:00 PM - 5:00 PM"
              />
              <BookingItem
                facility="Tennis Court"
                user="Mike Johnson"
                date="Jan 22, 2026"
                time="7:00 AM - 8:00 AM"
              />
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Maintenance Requests</h2>
            <div className="space-y-3">
              <MaintenanceItem
                issue="Broken elevator"
                location="Building A"
                status="in-progress"
                priority="high"
              />
              <MaintenanceItem
                issue="Leaking faucet"
                location="Floor 3, Unit 302"
                status="pending"
                priority="medium"
              />
              <MaintenanceItem
                issue="Garden lighting"
                location="Main garden"
                status="completed"
                priority="low"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacilityCard({ name, capacity, status, nextAvailable }: {
  name: string;
  capacity: string;
  status: string;
  nextAvailable: string;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
        <span className={`text-xs px-2 py-1 rounded ${
          status === 'available'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">👥 {capacity}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{nextAvailable}</p>
      <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Book Now
      </button>
    </div>
  );
}

function BookingItem({ facility, user, date, time }: {
  facility: string;
  user: string;
  date: string;
  time: string;
}) {
  return (
    <div className="border-l-4 border-blue-600 pl-4 py-2">
      <h4 className="font-semibold text-gray-900 dark:text-white">{facility}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">By {user}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500">{date} • {time}</p>
    </div>
  );
}

function MaintenanceItem({ issue, location, status, priority }: {
  issue: string;
  location: string;
  status: string;
  priority: string;
}) {
  const statusColors = {
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    'pending': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{issue}</h4>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">📍 {location}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Priority: {priority}</p>
    </div>
  );
}
