import React from 'react';
import Closet from "../_components/Closet";
import Gallery from "../_components/Gallery";
import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Closet from '~/_components/Closet';


export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="">
      <SignedIn>
        <Gallery />
      </SignedIn>
      <SignedOut>
        <Closet />
      </SignedOut>
    </main>
  );
}
