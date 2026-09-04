import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, profile } from '../data/content';

export default function Footer() {
  const year = 2026; // update as needed
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="max-w-sm text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent2-500 font-display text-base font-bold text-white">
                N
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Nahid<span className="text-brand-500">.</span>
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {profile.role} building scalable, cloud-native backend systems from {profile.location}
              .
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-brand-400"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 sm:flex-row dark:border-white/10">
          <p className="text-center text-sm text-slate-400 sm:text-left">
            © {year} {profile.name}.
          </p>
          <button
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            Back to top
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5 dark:border-white/10">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
