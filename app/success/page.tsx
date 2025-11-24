import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">You’re in, Founder! 🎉</h1>

        <p className="text-lg">
          Your subscription is active and your founder pricing is locked in
          for as long as you stay subscribed.
        </p>

        <div className="text-left text-sm border rounded-lg p-4 space-y-2">
          <p className="font-semibold">What happens next?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your email for your welcome message.</li>
            <li>We’ll send your onboarding link shortly.</li>
            <li>You can cancel anytime in your Stripe billing portal.</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Back to PropertyBuyerConnection
        </Link>
      </div>
    </main>
  );
}
