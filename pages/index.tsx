import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { BasicIpfsData } from "./api/ipfs";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BasicIpfsData | null>(null);

  const [note, setNote] = useState<BasicIpfsData | null>(null);
  const [CID, setCID] = useState("");
  const [txt, setTxt] = useState("");

  const handleLoad = async () => {
    if (CID == "") {
      alert('Cannot be empty');
      return;
    }

    const { data } = await axios.get(`/api/ipfs?cid=${CID}`);
    console.log(data);
  };

  const handlePost = async () => {
    setLoading(true);
    const { data } = await axios.post('/api/ipfs');
    setResult(data);
    setLoading(false);
  };

  // avoiding ternary operators for classes
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-bold underline">IPFS Notes</div>
          {!!result ? (
            <div className="flex flex-col">
              <span>Content: {result.content}</span>
              <span>CID: {result.cid}</span>
            </div>
          ) : null}
          <div>
            <input
              type="text"
              placeholder="Enter text here"
              value={CID}
              onChange={(e) => setCID(e.target.value)}
            />
            <br />
            <button
              onClick={handleLoad}
              className={classNames(
                "bg-slate-300 hover:bg-slate-500 text-black rounded-md p-2 drop-shadow-md w-32",
                loading ? "animate-pulse" : ""
              )}
            >
              {loading ? "Loading..." : "Retrieve Data"}
            </button>
            <br />
            <button
              onClick={handlePost}
            >
              Upload  
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
