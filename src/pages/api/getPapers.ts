import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const reviewerId = req.query.reviewerId as string

        const prisma = new PrismaClient();

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
        console.log("server aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", error)
    }



}