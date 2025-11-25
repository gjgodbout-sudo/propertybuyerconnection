// lib/push.ts
import webPush from 'web-push';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:admin@propertybuyerconnection.com';

// Only configure if keys exist (so the build doesn’t crash if they’re missing)
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

// Type alias so TypeScript knows what a subscription looks like
export type PushSubscription = webPush.PushSubscription;

// 👇 THIS is the important part: a *named* export called sendPush
export async function sendPush(
  subscription: PushSubscription,
  payload: unknown
) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.warn('VAPID keys are not configured; skipping push notification.');
    return;
  }

  await webPush.sendNotification(subscription, JSON.stringify(payload));
}
