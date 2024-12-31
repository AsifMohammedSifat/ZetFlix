"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import Headers from "@/components/Headers";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <Headers bg="black" />
      <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4 pt-32">
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-white text-3xl font-bold my-6">
              Create Your Account
            </h1>

            <RegisterForm />

            <div className="mt-6 text-white">
              Already have an account?
              <Link href="/login" className="text-white px-2 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
