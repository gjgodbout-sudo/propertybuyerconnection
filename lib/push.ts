// lib/push.ts
// Temporary no-op push notifications implementation.
// This keeps the API surface used by the rest of the app
// without requiring web-push or complex typings.

export type PushSubscription = any

export async function sendPush(
  _subscription: PushSubscription,
  _payload: unknown
) {
  // Push notifications disabled / not configured in this build.
  // This is intentionally a no-op to keep the server happy.
  console.log('sendPush called but push notifications are disabled.')
}
