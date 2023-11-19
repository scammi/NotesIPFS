import { useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


import useNotes from "../hooks/useNotes";


const Home = () => {
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
      <Accordion key={key}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">{value.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{value.content}</Typography>
        </AccordionDetails>
      </Accordion>
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
                  id="fileNameInput"
                  label="Content"
                  onChange={(e) => setFileContent(e.target.value)}
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
            <Paper elevation={4}>
              <Box style={{ margin: "5px" }}>
                {!isNotesLoading ? <Notes /> : <Skeleton variant="rectangular" height={200}/>}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
