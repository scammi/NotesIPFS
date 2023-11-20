// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";
import { concat } from 'uint8arrays/concat'
import { recoverMessageAddress } from "viem";
import all from 'it-all';

const FOLDER = '/DeSci3'
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
  try {
    const client = create();
    const folderDataResponse = client.files.ls(`${FOLDER}`);
    const folderDataParsed = {};
    for await (const note of folderDataResponse) {
      // Concatenate chunks notes as bytes 
      const concatenatedByteNote = concat(await all(client.cat(note.cid.toString())))

      //  Decode array onto string
      const decodedNote = new TextDecoder().decode(concatenatedByteNote).toString();
      const ipfsNote = JSON.parse(decodedNote);
      
      folderDataParsed[note.cid.toString()] = {
        'name': note.name,
        'content': ipfsNote.content,
        'signature': ipfsNote.signature,
        'signer': await recoverMessageAddress({ message: ipfsNote.content, signature: ipfsNote.signature }),
      }
    }
  
    res.status(200).json({ folderDataParsed });
  } catch(error) {
    console.error('Error loading file to IPFS:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


export default handler ;
