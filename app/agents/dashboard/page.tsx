import { getCurrentAgentId } from '@/lib/auth';

export default async function Dashboard() {
  const agentId = getCurrentAgentId();

  if (!agentId) {
    return (
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Agent Dashboard</h1>
        <p className="text-gray-700">
          Please sign in as an agent to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Agent Dashboard</h1>
        <p className="text-gray-700">
          The detailed listings & stats section is temporarily disabled while
          we finish the database configuration.  
          The rest of the site can still be used normally.
        </p>
      </div>
    </div>
  );
}
