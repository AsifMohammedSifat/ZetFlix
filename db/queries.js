import userModel from "@/models/user-model";
import watchListModel from "@/models/watchList-model";
import { dbConnect } from "@/services/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";

async function createUser(user) {
  dbConnect();
  const existingUser = await userModel.findOne({ email: user.email });
  if (existingUser) {
    throw new Error(
      "Email is already in use. Please choose a different email."
    );
  }

  const result = await userModel.create(user);
  return result;
}

async function createWatchListToDB(movie) {
  dbConnect();
  const result = await watchListModel.create(movie);
  return result;
}

async function checkIsUserSeenTheMovieFromDB(userId, movieId) {
  dbConnect();
  try {
    const exists = await watchListModel.findOne({ userId,movieId });
    if(exists) return true;
    return false;
  } catch (error) {
    console.error("Error checking watchlist:", error);
    throw new Error({ error: "Internal Server Error" });
  }
}

async function findUserByCredentials(credentials) {
  dbConnect();
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

export {
  createUser,
  findUserByCredentials,
  createWatchListToDB,
  checkIsUserSeenTheMovieFromDB,
};
