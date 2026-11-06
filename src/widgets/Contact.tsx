/**
 * @module Contact
 * @description Contact section with info panel and message form
 * @performance In-view reveals, simulated submit with success state
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Button, GlassCard, SocialIcon } from '@/shared/ui';
import { portfolioData, PRIMARY_SOCIAL_PLATFORMS } from '@/shared/config';
import { sendContactEmail } from '@/shared/lib';
import { useInView } from '@/shared/hooks';

const INPUT_CLASS =
  'w-full rounded-xl border border-border bg-void/40 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-accent-1/60 focus:outline-none focus:ring-2 focus:ring-accent-1/20';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await sendContactEmail({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setError(
        `Sorry, your message couldn't be sent right now. Please try again, or email me directly at ${portfolioData.contact.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const availabilityLabel =
    portfolioData.contact.availability === 'available'
      ? 'Available for new projects'
      : 'Limited availability';

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-32 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent-1/10 blur-[150px]" />
        <div className="absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-2/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind? Let's create something amazing together."
          index={6}
        />

        <div ref={ref} className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 font-mono text-sm text-green-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              {availabilityLabel}
            </span>

            <div>
              <h3 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
                Let's Start a Conversation
              </h3>
              <p className="mt-4 max-w-md text-slate-400">
                Whether you have a question about my work, want to discuss a project, or just want
                to say hi, I'm always open to new opportunities and connections.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur-sm transition-all hover:border-accent-1/40 hover:bg-surface/70"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-1/30 bg-accent-1/10 text-accent-1">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    Email
                  </span>
                  <span className="block truncate text-white">{portfolioData.contact.email}</span>
                </span>
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-accent-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-2/30 bg-accent-2/10 text-accent-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    Location
                  </span>
                  <span className="block text-white">Remote / Worldwide</span>
                </span>
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                Connect
              </span>
              <div className="mt-3 flex gap-3">
                {portfolioData.social
                  .filter((link) => PRIMARY_SOCIAL_PLATFORMS.has(link.platform))
                  .map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-accent-1/50 hover:text-white"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard glow className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10">
                    <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl font-semibold text-white">Message Sent!</h4>
                  <p className="mt-2 text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      Send a message
                    </span>
                    <h4 className="mt-1 font-display text-xl font-semibold text-white">
                      Tell me about your project
                    </h4>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                        required
                        className={INPUT_CLASS}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                        required
                        className={INPUT_CLASS}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      required
                      rows={5}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-accent-3/30 bg-accent-3/10 px-4 py-3 text-sm text-accent-3"
                    >
                      {error}
                    </p>
                  )}

                  <Button type="submit" size="lg" magnetic className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
