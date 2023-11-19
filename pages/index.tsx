import { useState } from "react";
import Head from "next/head";
import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


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
    <Container>
      <main>
        <Grid container justifyContent="center">
          <Grid item xs={5}>
            <Paper>
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
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default Home;
