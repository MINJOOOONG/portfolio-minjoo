import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="text-sm font-bold text-foreground">
              joodev
            </Link>
            <nav className="flex items-center gap-5">
              <Link href="/" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-[11px] text-foreground font-medium">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="min-h-screen">{children}</main>
      <footer className="py-6">
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          <div className="section-divider" />
          <p className="text-center text-[11px] text-muted-foreground/50 pt-4">
            &copy; {new Date().getFullYear()} joodev
          </p>
        </div>
      </footer>
    </>
  );
}
