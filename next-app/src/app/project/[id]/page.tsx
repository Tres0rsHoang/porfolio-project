import { PageProps } from "../../../../.next/types/app/project/[id]/page";

export default async function ProjectDetailPage(pageProps: PageProps) {
  const { id } = await pageProps.params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Project {id}</h1>
      <p>{id}</p>
    </div>
  );
}
