import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-2xl">🏘️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NextLand</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                About
              </Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Manage Your Society<br />
            <span className="text-blue-600">Smarter & Together</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            A comprehensive open-source platform for managing society content, governance, 
            facilities, and community engagement all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <a 
              href="https://github.com/abhishek--ranjan/nextland" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon="📋"
            title="Content Management"
            description="Share announcements, documents, and updates with your community"
            href="/dashboard/content"
          />
          <FeatureCard
            icon="🗳️"
            title="Governance"
            description="Manage meetings, proposals, voting, and committee decisions"
            href="/governance"
          />
          <FeatureCard
            icon="🏢"
            title="Facilities"
            description="Book facilities, track maintenance, and manage visitors"
            href="/facilities"
          />
          <FeatureCard
            icon="👥"
            title="Community"
            description="Connect with neighbors through forums, events, and activities"
            href="/community"
          />
        </div>

        {/* About Section */}
        <div id="about" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Open Source & Community Driven
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            NextLand is built with modern technologies and is completely open source. 
            We believe in transparency, collaboration, and building tools that serve communities worldwide.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">MIT</div>
              <div className="text-gray-600 dark:text-gray-400">License</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">Free</div>
              <div className="text-gray-600 dark:text-gray-400">Forever</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>Built with ❤️ for communities worldwide</p>
          <p className="mt-2">
            <a 
              href="https://github.com/abhishek--ranjan/nextland" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Contribute on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, href }: { 
  icon: string; 
  title: string; 
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
}
