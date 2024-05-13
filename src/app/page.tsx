import Link from "next/link";
import { db } from "../server/db/index";
import HomeImage  from "../components/HomeImage";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="" >
      <HomeImage />
    </main>
  );
}
