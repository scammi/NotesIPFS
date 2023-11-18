import Head from "next/head";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [CID, setCID] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleLoad = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/ipfs');
    console.log(data);
    setLoading(false);
  };

  const handlePost = async () => {
    await axios.post(
      `/api/ipfs?fileName=${fileName}&fileContent=${fileContent}`
    );
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
          <div>
            <input
              type="text"
              placeholder="File name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Content"
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
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
