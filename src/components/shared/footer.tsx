import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-10 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="gradient-separator mb-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-mono text-xs">
            &copy; {new Date().getFullYear()}{" "}
            <span className="gradient-text font-semibold">MJ.dev</span>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors text-xs">
              About
            </Link>
            <Link href="/projects" className="hover:text-primary transition-colors text-xs">
              Projects
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors text-xs">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors text-xs">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
