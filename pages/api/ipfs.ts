// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { create } from "ipfs-http-client";
import { concat } from 'uint8arrays/concat'
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
    // Process a POST request
    const client = create();
    const string = "Hello world!!";
    const data = await client.add(string);
  
    res.status(200).json({ cid: data.path, content: string });
  } else {
    // Handle any other HTTP method
    retrieveData(req, res);
  }
}

const retrieveData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { cid } = req.query;

  const client = create();

  const datares = concat(await all(client.cat(cid)))

  const decodedData = new TextDecoder().decode(datares).toString();

  res.status(200).json({ decodedData });

};

export default handler ;
