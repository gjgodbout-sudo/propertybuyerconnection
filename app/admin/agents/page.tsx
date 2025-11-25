import { cookies } from 'next/headers';

function isAuthorized() {
  const jar = cookies();
  const key = jar.get('admin_key')?.value;
  const secret = process.env.ADMIN_SECRET;
  return !!secret && key === secret;
}

export default async function AdminAgentsPage() {
  const ok = isAuthorized();

  if (!ok) {
    return (
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Admin Access Required</h1>
        <p className="text-gray-700">
          Set <code>ADMIN_SECRET</code> then visit{' '}
          <code>/api/admin/login?key=YOUR_SECRET</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
      <p className="text-gray-700">
        The detailed agents table is temporarily disabled while we finish the
        database setup.
      </p>
    </div>
  );
}

