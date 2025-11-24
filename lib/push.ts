// lib/push.ts

/**
 * TEMPORARY STUB
 * ---------------
 * Real implementation used `web-push` for browser notifications.
 * For now we just log and do nothing.
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
  // No push notification in this stub.
}
