import { PortfolioPage } from "@/components/shared/portfolio-page";

export const revalidate = 60;

export default function PortfolioRoute() {
  return <PortfolioPage />;
}
