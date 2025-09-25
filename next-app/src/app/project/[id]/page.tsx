export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Project {id}</h1>
      <p>{id}</p>
    </div>
  );
}
