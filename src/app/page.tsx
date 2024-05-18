import { SignedIn, SignedOut } from "@clerk/nextjs";
import Closet from "./_components/Closet";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { type Key } from "react";

export const dynamic = "force-dynamic";

// when i give user upload as an option need to force people to only have a the name like this 
// yproject-paris-best-distressed-cotton-sweatshirt-item-20261256

async function Gallery() {

    const images = await getMyImages();
    const formatName = (name: string): string => {
        // Remove the file extension
        const nameWithoutExtension = name.replace(/\.[^/.]+$/, "");
        // Split the name into parts
        const parts = nameWithoutExtension.split("-");
        // Extract the item number
        const itemNumber = parts.pop();
        // Capitalize each word and join them
        const formattedName = parts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        return `${formattedName}\nItem: ${itemNumber}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto">
                {images.map((image: { id: Key | null | undefined; url: string | StaticImport; name: string; }) => (
                    <div key={image.id} className="w-full p-4">
                        <Link href={`/img/${image.id}`}>
                        <Image 
                        src={image.url} 
                        style={{ objectFit: "contain" }}
                        width={480}
                        height={480}
                        alt={"images"}
                        />
                        </Link>
                        <h1 className="text-center whitespace-pre-line">{formatName(image.name)}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <Closet />
      </SignedOut>
      <SignedIn>
        <Gallery />
      </SignedIn>
    </main>
  );
}
