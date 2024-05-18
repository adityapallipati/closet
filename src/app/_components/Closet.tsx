import Image from 'next/image';

export default function Closet(): JSX.Element {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-wrap gap-4">
                <div className="w-48">
                    <Image src="/door.png" alt="Door" width={192} height={192} />
                    <h1 className="text-center text-xl text-bold">WELCOME</h1>
                </div>
            </div>
        </div>
    );
}
