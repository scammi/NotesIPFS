import { useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import useNotes from "../hooks/useNotes";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const enableUpload = !Boolean(fileContent && fileName);

  const { data: notes, isLoading: isNotesLoading } = useNotes();
  console.log(notes)

  const handlePost = async () => {
    await axios.post(
      `/api/ipfs?fileName=${fileName}&fileContent=${fileContent}`
    );
  };

  const Notes = () => {
    return Object.entries(notes).map(([key, value]) => (
      <div key={key}>
        {value?.name}
      </div>
    ));
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Stack spacing={5}>
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
            {!isNotesLoading ? <Notes /> : <Skeleton variant="rectangular" height={200}/>}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
