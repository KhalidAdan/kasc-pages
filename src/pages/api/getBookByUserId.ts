// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const getBookByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  const books = await prisma.book.findMany({
    where: {
      userId: req.query.userId as string,
    },
    orderBy: {
      modifiedDate: "desc",
    },
  });
  res.status(200).json(books);
};

export default getBookByUserId;
