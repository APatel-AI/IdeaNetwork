import prisma from "../../../prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in." });
    }

    //Delete Post
    try {
      
        
      const postId = req.body
      const result = await prisma.post.delete({
        where: {
            id: postId, 
        },
      })
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error deleting the post" });
    }
  }
}
