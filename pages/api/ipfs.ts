// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

import { create } from "ipfs-http-client";
import { concat } from 'uint8arrays/concat'
import { toString } from 'uint8arrays/to-string'
import all from 'it-all';


// arbitrary response format
export type BasicIpfsData = {
  cid: string;
  content: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) => {
  if (req.method === "POST") {

    const fileName = 'text.txt';
    const fileContent = 'haaaaa';

    const client = create();

    try {
      await client.files.mkdir('/DeSci', { parents: true });
      await client.files.write(`/DeSci/${fileName}`, Buffer.from(fileContent), { create: true });

    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }

  } else {
    // Handle any other HTTP method
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
    const datares = concat(await all(client.cat(item.cid.toString())))
    const decodedData = new TextDecoder().decode(datares).toString();

    folderDataParsed[item.cid.toString()] = {
      'name': item.name,
      'content': decodedData
    }
  }

  res.status(200).json({ folderDataParsed });
};


export default handler ;
