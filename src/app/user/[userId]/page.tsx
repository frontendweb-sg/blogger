export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <div>
      <h1>Dashboard- {userId}</h1>
      <p>Welcome to the dashboard</p>
    </div>
  );
}
