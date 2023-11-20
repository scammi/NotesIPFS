// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";
import { concat } from 'uint8arrays/concat'
import all from 'it-all';

const FOLDER = '/DeSci1'
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { fileContent, fileName, signature } = req.query;

    try {
      const client = create();
      
      const ipfsNote = {
        name: fileName,
        content: fileContent,
        signature
      }

      await client.files.mkdir(`${FOLDER}`, { parents: true });
      await client.files.write(`${FOLDER}/${fileName}.json`, Buffer.from(JSON.stringify(ipfsNote)), { create: true });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

  } else {
    retrieve(req, res);
  }
}

const retrieve = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const client = create();

  const folderDataResponse = client.files.ls(`${FOLDER}`);
  const folderDataParsed = {};

  for await (const note of folderDataResponse) {
    const concatenatedByteNote = concat(await all(client.cat(note.cid.toString())))
    const decodedNote = new TextDecoder().decode(concatenatedByteNote).toString();

    folderDataParsed[note.cid.toString()] = {
      'name': note.name,
      'content': decodedNote.content,
      'signature': decodedNote.signature
    }
  }

  res.status(200).json({ folderDataParsed });
};


export default handler ;
