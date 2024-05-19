/* eslint-disable @typescript-eslint/no-unsafe-call */
import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {

    const user = auth();

    if (!user.userId) throw new Error ("Unauthorized");

    const images = await db.query.posts.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc}) => desc(model.id),
    });

    return images;
}

export async function getImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("");

    const image = await db.query.posts.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });
    if (!image) throw new Error ("Image not found");

    if (image.userId !== user.userId) throw new Error ("Unauthorized");
    return image;
}

export async function deleteImage(id: number) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
  
    await db
      .delete(posts)
      .where(and(eq(posts.id, id), eq(posts.userId, user.userId)));


      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      analyticsServerClient.capture({
        distinctId: user.userId,
        event: "delete-image",
        properties: {
            imageId: id,
        },
      })
      redirect("/");
  }