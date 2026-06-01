export interface ContactLink {
  label: string;
  href: string;
  icon: "mail" | "github" | "globe" | "linkedin";
}

export const contactProfile = {
  name: "MINJOO SUH",
  title: "",
  photo: "/images/profile.JPEG",
};

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:zzz1577@naver.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/MINJOOOONG", icon: "github" },
  { label: "Blog", href: "https://joodev-sandy.vercel.app/", icon: "globe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/minjooooo", icon: "linkedin" },
];
