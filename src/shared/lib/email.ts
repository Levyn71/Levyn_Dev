/**
 * @module email
 * @description Sends contact form submissions to the portfolio inbox via EmailJS
 * @performance SDK bundled, credentials injected from environment variables
 */

import emailjs from '@emailjs/browser';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Destination inbox for all contact form submissions.
const CONTACT_RECIPIENT = 'levynbenjamin@gmail.com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Delivers a contact message to the portfolio owner's inbox.
 * Throws when the EmailJS credentials are missing or the request fails.
 */
export async function sendContactEmail({ name, email, message }: ContactMessage): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Email service is not configured');
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: CONTACT_RECIPIENT,
      from_name: name,
      from_email: email,
      reply_to: email,
      message,
    },
    { publicKey: PUBLIC_KEY }
  );
}
