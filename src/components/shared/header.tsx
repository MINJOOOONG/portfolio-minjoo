"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight gradient-text"
          >
            MJ.dev
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block w-6 h-0.5 bg-foreground transition-transform",
                  open && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-foreground transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-foreground transition-transform",
                  open && "-rotate-45 -translate-y-2"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "text-primary font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
