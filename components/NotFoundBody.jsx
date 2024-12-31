"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundBody() {
  const router = useRouter();
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      router.push("/");
    }

    return () => clearInterval(interval);
  }, [timer, router]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-black text-white px-4">
        <h1 className="text-9xl font-extrabold tracking-tight mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4">
          Oops! The page you are looking for does not exist.
        </h2>
        <div className="text-lg text-gray-400 text-center max-w-md">
          You’ll be redirected to the homepage in{" "}
          <div className="font-bold text-5xl text-center text-purple-300">
            {timer} seconds
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#bd2832] hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}