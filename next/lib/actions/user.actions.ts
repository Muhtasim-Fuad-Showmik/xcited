"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

/**
 * Find a user by his/her id and update/insert updated
 * information into the connected database.
 *
 * Finally, revalidate the path if currently on the
 * 'Edit Profile' page.
 *
 * @param userId Id of the user that requires updates
 */
export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  // Begin by connecting to the database
  connectToDB();

  try {
    // Find a user with the userId as a filter and update (or insert, hence upsert)
    // the user's information with the provided information
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    // For edit profile pages, revalidate data associated
    // with a specific path. This will update cached data
    // without waiting for a revalidation period to expire
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
