import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0b1120] text-white px-4">

      <div className="text-center space-y-4">

        <h1 className="text-6xl font-bold text-blue-400">404</h1>

        <h2 className="text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-sm max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Go Home
        </Link>

      </div>

    </section>
  );
}