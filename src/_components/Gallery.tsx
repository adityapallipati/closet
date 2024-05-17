/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { getMyImages } from "~/server/queries";
// when i give user upload as an option need to force people to only have a the name like this 
// yproject-paris-best-distressed-cotton-sweatshirt-item-20261256

export default async function Gallery() {

    const homeIcon = await getMyImages();
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
                {[...homeIcon].map((image, index) => (
                    <div key={image.id + "-" + index} className="w-full p-4">
                        <img src={image.url} className="w-full h-auto object-cover" />
                        <h1 className="text-center whitespace-pre-line">{formatName(image.name)}</h1>
                    </div>
                ))}
                {/* grab user name and assign after sign in */}
            </div>
        </div>
    );
}


