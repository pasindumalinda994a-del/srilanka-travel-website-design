import { AdminCard } from "./AdminCard";

export type AdminStat = {
  label: string;
  value: string | number;
  hint?: string;
};

type AdminStatsProps = {
  stats: AdminStat[];
};

export function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {stats.map((stat) => (
        <AdminCard
          key={stat.label}
          title={stat.label}
          description={stat.hint}
        >
          <p className="text-2xl font-semibold text-[var(--foreground)] md:text-3xl tracking-tight">
            {stat.value}
          </p>
        </AdminCard>
      ))}
    </div>
  );
}
