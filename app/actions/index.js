"use server";

import {
  checkIsUserSeenTheMovieFromDB,
  createUser,
  createWatchListToDB,
  findUserByCredentials,
} from "@/db/queries";
import { redirect } from "next/navigation";

async function registerUser(formData) {
  let redirectPath = null;
  try {
    const result = await createUser(formData);
    if (result) {
      redirectPath = `/login`;
    } else {
      throw new Error("User creation failed.");
    }
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred";
    return { success: false, error: errorMessage };
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

async function addToWatchList(movieData) {
  // console.log("from index",movieData);
  try {
    const result = await createWatchListToDB(movieData);
    if (!result) throw error;
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

async function checkIsUserSeenTheMovie(userId, movieId) {
  try {
    const result = await checkIsUserSeenTheMovieFromDB(userId, movieId);
    if (result) return true;
    return false;
  } catch (error) {
    const errorMessage = error.message || "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

async function performLogin(formData) {
  try {
    const credential = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const found = await findUserByCredentials(credential);

    if (!found) {
      return { error: "Invalid email or password" };
    }

    return { user: found };
  } catch (error) {
    return { error: error.message || "An unknown error occurred" };
  }
}

export { registerUser, performLogin, addToWatchList, checkIsUserSeenTheMovie };
