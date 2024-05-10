import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';

export const config: PageConfig = {
    api: {
        bodyParser: false
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {



    const prisma = new PrismaClient()
    try {
        const blob = await put(req.query.fileName as string, req, {
            access: "public",
        })

        const documentAlreadyExists = await prisma.papers.findUnique({
            where: {
                url: blob.url
            }
        })
        if (!documentAlreadyExists) {
            const addPaper = await prisma.papers.create({
                data: {
                    fileName: blob.pathname,
                    url: blob.url,
                }
            })

            const addReview = await prisma.review.create({
                data: {
                    papersId: addPaper.id,
                    reviewerId: "clw10mqye0001135mkkdvtccx",
                    authorId: "clw10luub0000135mq6nlhnpc"
                }
            })

            res.status(200).json("Dosya yükleme başarılı!")
        } else {
            res.status(201).json("Dosya zaten yüklü!")
        }

    } catch (error) {
        res.status(531).json("hocam error: " + error)
    }

}