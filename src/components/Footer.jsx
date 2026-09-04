import { ArrowUp } from 'lucide-react';
import { profile } from '../data/content';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-slate-200/70 py-8 text-sm text-slate-500 sm:flex-row sm:items-center dark:border-white/10 dark:text-slate-400">
      <p>© 2026 {profile.name}.</p>
      <button
        onClick={scrollTop}
        className="group inline-flex items-center gap-2 font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400"
      >
        Back to top
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5 dark:border-white/10">
          <ArrowUp size={15} />
        </span>
      </button>
    </footer>
  );
}
