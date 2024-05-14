/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {db} from "~/server/db";


export default async function HomeImage() {
    const homeIcon = await db.query.posts.findMany();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-wrap gap-4">
                {[...homeIcon].map((image, index) => (
                    <div key={image.id + "-" + index} className="w-48">
                        <img src={image.url} />
                        <h1 className="text-center">Welcome</h1>
                    </div>
                ))}
                     {/* grab user name and assign after sign in */}
                </div>
            </div>
    );
}

