export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-3">
          Property Buyer Connection
        </h1>
        <p className="text-gray-700 mb-4">
          If you can see this page, the site is deployed correctly on Vercel.
        </p>
        <p className="text-gray-600 mb-6">
          Next step: we’ll hook this up to the full app (founder page, agent
          signup, listings, etc.).
        </p>
        <a href="/founder" className="btn">
          Go to Founder Page
        </a>
      </div>
    </main>
  );
}
