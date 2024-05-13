// import User from "../components/User";
// url

const homeIcon = [
    "https://utfs.io/f/6669f6a1-d9e7-47b8-85b8-8c22e1a4251b-1u7qm.png",
];

const homeImage = homeIcon.map((url, index) => ({
    id: index + 1,
    url,
}))

export default function HomeImage() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-wrap gap-4">
                {homeImage.map((image) => (
                <div key={image.id} className="w-48">
                    <img src={image.url} alt="image" />
                    <h1 className="text-center">Welcome</h1> {/* grab user name and assign after sign in */}
                </div>
        ))}
            </div>
        </div>


    );
}

