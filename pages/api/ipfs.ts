// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";
import { concat } from 'uint8arrays/concat'
import all from 'it-all';


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { fileContent, fileName } = req.query;

    try {
      const client = create();
      await client.files.mkdir('/DeSci', { parents: true });
      await client.files.write(`/DeSci/${fileName}.txt`, Buffer.from(fileContent), { create: true });

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

  const folderDataResponse = client.files.ls('/DeSci');
  const folderDataParsed = {};

  for await (const item of folderDataResponse) {
    const concatenatedBytesData = concat(await all(client.cat(item.cid.toString())))
    const decodedData = new TextDecoder().decode(concatenatedBytesData).toString();

    folderDataParsed[item.cid.toString()] = {
      'name': item.name,
      'content': decodedData
    }
  }

  res.status(200).json({ folderDataParsed });
};


export default handler ;
