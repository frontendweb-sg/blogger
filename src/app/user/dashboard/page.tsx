import { getFeeds } from "../actions/feed";

export default async function Page() {
  const feeds = await getFeeds();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      {JSON.stringify(feeds)}
    </div>
  );
}
