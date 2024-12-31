"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInOut = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const logout = () => {
    setAuth(null);
    router.push("/login");
  };

  return (
    <div className="text-white">
      {auth ? (
        <>
          <span className="mx-2">Hello, {auth?.name?.split(' ')[0]}</span>
          <span className="mx-1"> | </span>
          <span className="cursor-pointer" onClick={logout}>
            Logout
          </span>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default SignInOut;
