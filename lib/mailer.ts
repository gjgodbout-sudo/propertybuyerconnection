// lib/mailer.ts

/**
 * TEMPORARY STUB
 * ---------------
 * Real implementation used `nodemailer` to send emails.
 * For now we just log and pretend everything worked,
 * so the build doesn't need the `nodemailer` package.
 */

export type NewListingEmailPayload = {
  agentEmail?: string;
  [key: string]: any;
};

export async function sendNewListingEmail(
  payload: NewListingEmailPayload
): Promise<void> {
  // You can log to Vercel logs for debugging if needed
  console.log("sendNewListingEmail stub called with payload:", payload);
  // Do nothing – no real email is sent in this stub.
}
