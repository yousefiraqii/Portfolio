import { socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-[10px] uppercase tracking-[0.4em] text-silver/60">
          © {new Date().getFullYear()} Yousef Al Iraqi — Student Innovator
        </p>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[10px] font-medium uppercase tracking-[0.35em] text-silver transition-colors duration-300 hover:text-acid"
            >
              <span className="mr-2 inline-block h-px w-4 bg-acid/40 align-middle transition-all duration-500 group-hover:w-7 group-hover:bg-acid" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
