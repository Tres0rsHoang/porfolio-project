type Params = {
  params: { id: string };
};
export default async function ProjectDetail({ params }: Params) {
  const { id } = params;
  console.log(id);

  return <div></div>;
}
