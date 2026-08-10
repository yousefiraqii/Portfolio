export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-[10px] uppercase tracking-[0.4em] text-silver/60">
          © MMXXVI — Dark Cinematic Portfolio
        </p>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-silver/60">
          <span className="h-px w-8 bg-acid/50" />
          Crafted in the dark
        </div>
      </div>
    </footer>
  );
}
