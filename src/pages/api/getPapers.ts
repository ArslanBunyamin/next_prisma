import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reviewerId = req.query.reviewerId as string

    const prisma = new PrismaClient();

    try {

        const papers = await prisma.papers.findMany({
            where: {
                review: {
                    reviewerId: reviewerId
                }
            },
            select: {
                fileName: true,
                uploadDate: true
            }
        })
        res.status(200).json(papers)
    } catch (error) {
        res.status(531).json("error geldi hocam:" + error)
    }



}