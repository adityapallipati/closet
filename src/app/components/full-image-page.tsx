import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
    const image = await getImage(props.id);

    const formatName = (name: string): { formattedName: string; itemNumber: string } => {
        // Remove the file extension
        const nameWithoutExtension = name.replace(/\.[^/.]+$/, "");
        // Split the name into parts
        const parts = nameWithoutExtension.split("-");
        // Extract the item number
        const itemNumber = parts.pop() ?? "";
        // Remove the word "Item" if it exists
        const filteredParts = parts.filter(word => word.toLowerCase() !== "item");
        // Capitalize each word and join them
        const formattedName = filteredParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        return { formattedName, itemNumber };
    };

    const { formattedName, itemNumber } = formatName(image.name);
    
    const uploaderInfo = await clerkClient.users.getUser(image.userId);
    return (

        <div className="flex w-full h-full min-w-0 bg-black overflow-x-hidden p-4">

            <img src={image.url} className="flex-shrink object-contain" />

            <div className="w-48 flex-shrink-0 flex-col border-l">
                <div className="text-xl font-bold text-white p-5">
                    <div className="w-screen p-2 border-white">{formattedName.toUpperCase()}</div>
                    <br />
                    <div className="w-screen p-2">ITEM: {itemNumber}</div>

                    <div className="p-2 w-screen flex flex-col">
                        <span>Uploaded By: {uploaderInfo.fullName} </span>
                    </div>

                    <div className="p-2 w-screen flex flex-col">
                        <span>Created On: {new Date(image.createdAt).toLocaleDateString()} </span>
                    </div>
                </div>
            </div>
            </div>


    );
}
