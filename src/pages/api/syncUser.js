import { getAuth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await db.collection("users").findOne({ clerkId: userId });

    if (!user) {
      const newUser = await db.collection("users").insertOne({
        clerkId: userId,
        email: req.body.email,
        createdAt: new Date(),
      });

      return res.status(200).json({ user: newUser });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
