import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Subscription not completed</h1>

        <p className="text-lg">
          It looks like you didn’t finish checking out. Your card was NOT charged.
        </p>

        <p className="text-sm text-gray-600">
          When you're ready, you can restart checkout and lock in your founder pricing.
        </p>

        <Link
          href="/founder"
          className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Back to Founder Pricing
        </Link>
      </div>
    </main>
  );
}
