import Link from "next/link";
import { mock } from "node:test";

const mockUrls = [
  "https://utfs.io/f/6669f6a1-d9e7-47b8-85b8-8c22e1a4251b-1u7qm.png",
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}))


export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">{
        mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))
      }
    </div>
    <h1>Test</h1>
    </main>
  );
}
