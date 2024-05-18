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

    return (
        <div className="flex w-full h-full bg-black">
            <img src={image.url} className="w-96 object-contain" />
            <div className="w-48 flex-col">
                <div className="text-xl font-bold text-white p-5">
                    <div>{formattedName}</div>
                    <br />
                    <div>Item: {itemNumber}</div>
                </div>
            </div>
        </div>
    );
}
