import AgentStudio from '@/components/AgentStudio';

export const revalidate = 0;

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <AgentStudio />
    </main>
  );
}
