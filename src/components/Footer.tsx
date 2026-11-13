import { ArrowUp } from "lucide-react";
import type { Profile } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-9 text-[0.95rem] text-ash sm:flex-row sm:items-center sm:justify-between md:px-8">
        <Wordmark className="text-base text-bone" />
        <p>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Built in{" "}
          {profile.location.split(",")[0]}.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-bone"
        >
          Back to top
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
