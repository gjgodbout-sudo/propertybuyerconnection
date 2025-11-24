// lib/mailer.ts

/**
 * TEMPORARY STUB
 * ---------------
 * Real implementation used `nodemailer` to send emails.
 * For now we just log and pretend everything worked.
 */

export type NewListingEmailPayload = {
  agentEmail?: string;
  [key: string]: any;
};

export async function sendNewListingEmail(
  payload: NewListingEmailPayload
): Promise<void> {
  console.log("sendNewListingEmail stub called with payload:", payload);
  // No real email sending in this stub.
}
