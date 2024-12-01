import {db } from "@/lib/db";

export const getuserByEmail = async (email: string) => {
    try {
      console.log("Searching for user with email:", email);
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set');
      }
      const user = await db.user.findUnique({
        where: { email }
      });
      console.log("User found:", !!user);
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      return null;
    }
  };

export const getuserById = async (id: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });
        return user;   
    }     catch (error) {
        return null;
    }
}