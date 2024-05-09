import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const fileName = req.query.fileName as string
        const buffer = await readFile(path.join(process.cwd(), `/src/papers/${fileName}`));

        res.status(200).json(buffer)
    } catch (error) {
        console.log("hocam error: ", error)
    }

}