import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-300 to-blue-300">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Welcome to the Game Hub
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Link href={"card"}>
          <p className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-500">
            Card Game
          </p>
        </Link>
        <Link href={"spinner"}>
          <p className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-500">
            Spinner Game
          </p>
        </Link>
      </div>
    </div>
  );
}
