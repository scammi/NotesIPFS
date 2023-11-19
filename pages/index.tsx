import { useState } from "react";
import Head from "next/head";
import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const enableUpload = !Boolean(fileContent && fileName);

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
          <Grid item xs={6}>
           <Paper elevation={4}>
              <Stack spacing={2}>
                <TextField
                  style={{ margin: "5px" }}
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  id="fileNameInput"
                  label="File name"
                />
                <TextField
                  style={{ margin: "5px" }}
                  multiline={true}
                  rows={3}
                  type="text"
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  id="fileNameInput"
                  label="Content"
                />
                {/* <button
                  onClick={handleLoad}
                  className={classNames(
                    "bg-slate-300 hover:bg-slate-500 text-black rounded-md p-2 drop-shadow-md w-32",
                    loading ? "animate-pulse" : ""
                  )}
                >
                  {loading ? "Loading..." : "Retrieve Data"}
                </button> */}
                <Button
                  disabled={enableUpload}
                  style={{ margin: "5px" }}
                  variant="outlined"
                  onClick={handlePost}
                >
                  Upload  
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default Home;
