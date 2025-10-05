import { DashboardSection } from '../components/sections/DashboardSection';

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-8">
      <DashboardSection isVisible={true} />
    </div>
  );
}