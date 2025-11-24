// lib/push.ts

/**
 * TEMPORARY STUB
 * ---------------
 * Real implementation used `web-push` to send browser notifications.
 * For now we just log and return, so the build doesn't need `web-push`.
 */

export type NewListingPushPayload = {
  title?: string;
  body?: string;
  [key: string]: any;
};

export async function sendNewListingPush(
  payload: NewListingPushPayload
): Promise<void> {
  console.log("sendNewListingPush stub called with payload:", payload);
  // No real push notification in this stub.
}
