import { LogoMark } from "./Logo";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-6">
        <div className="flex items-center gap-3">
          <LogoMark className="h-7 w-7" />
          <span className="font-display text-sm font-bold text-white">{site.name}</span>
        </div>
        <p className="text-xs text-zinc-600">{site.email}</p>
        <p className="text-xs text-zinc-600">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}