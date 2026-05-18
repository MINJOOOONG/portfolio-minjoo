import { BadgeCard } from './BadgeCard';
import { BadgeLanyard } from './BadgeLanyard';

export const Badge = () => {
  return (
    <div className="flex flex-col items-center">
      <BadgeLanyard />
      <BadgeCard />
    </div>
  );
};
