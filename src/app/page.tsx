import { db } from "../server/db/index";
import HomeImage  from "../components/HomeImage";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="" >
      {/* mock db test */}
      {posts.map(post => (<div key={post.id}>{post.name}</div>))}
      <HomeImage />
    </main>
  );
}
