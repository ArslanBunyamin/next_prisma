import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), "/src/papers");
    options.filename = (name, ext, part, form) => "" + part.originalFilename;

    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files })
        })
    })

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        fs.readdirSync(path.join(process.cwd(), "/src/papers"))
    } catch (error) {
        fs.mkdirSync(path.join(process.cwd(), "/src/papers"))
    }

    const formData = await readFile(req)


    const prisma = new PrismaClient()

    const documentAlreadyExists = await prisma.papers.findUnique({
        where: {
            fileName: "" + formData?.files?.fileData?.at(0)?.originalFilename
        }
    })
    if (!documentAlreadyExists) {
        const addPapers = await prisma.papers.create({
            data: {
                fileName: "" + formData?.files?.fileData?.at(0)?.originalFilename
            }
        })

        const addReview = await prisma.review.create({
            data: {
                papersId: addPapers.id,
                reviewerId: "clvteym9e000012kpznc0m07l",
                authorId: "clvtfq42m000112kpllahlf98"
            }
        })

        res.status(200).json("Dosya yükleme başarılı!")
    } else {
        res.status(201).json("Dosya zaten yüklü!")
    }





}