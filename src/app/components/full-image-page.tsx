import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
    const idAsNumber = Number(props.id);
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

    const image = await getImage(idAsNumber);

    const userInfo = await clerkClient.users.getUser(image.userId);

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

    return (
        <div className="flex flex-col md:flex-row w-full h-full min-w-0 bg-black overflow-x-hidden p-4">
            <img src={image.url} className="w-full md:w-1/2 object-contain mb-4 md:mb-0 md:mr-4" />

            <div className="flex-shrink-0 flex-col border-l border-white md:pl-4">
                <div className="text-xl font-bold text-white p-5">
                    <div className="text-left p-2 border-b border-white">{formattedName.toUpperCase()}</div>
                    <div className="text-left p-2">ITEM: {itemNumber}</div>

                    <div className="text-left p-2 flex flex-col">
                        <span>Uploaded By: {userInfo.fullName}</span>
                    </div>

                    <div className="p-2 text-left flex flex-col">
                        <span>Created On: {new Date(image.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="p-2 pt-3 text-left flex flex-col">
                        <form action={async () => {
                            "use server";
                            await deleteImage(idAsNumber);
                        }}>
                            <Button type="submit" variant="destructive">
                                Delete
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
