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
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

import useNotes from "../hooks/useNotes";
import useAddNote from "../hooks/useAddNote";

const Home = () => {
  const [ fileName, setFileName ] = useState("");
  const [ fileContent, setFileContent ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("");

  const enableUpload = !Boolean(fileContent && fileName);

  const { mutate: addNote, isPending: isNoteBeingAdded }  = useAddNote();
  const { data: notes, isLoading: isNotesLoading } = useNotes();

  const handleFileChange = (event) => {
    console.log('asdf')
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the content of the file
        const content = e.target.result;

        // file.name contains the name of the file
        const name = file.name;

        // Set state with file content and name
        setFileContent(content);
        setFileName(name);

        // Now you can use fileContent and fileName as needed
        console.log('File Content:', content);
        console.log('File Name:', name);
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };

  const Notes = () => {
    // Convert object to array of key-value pairs
    const notesArray = Object.entries(notes);

    // Filter and map notes based on search term
    return notesArray
      .filter(([key, value]) =>
        searchTerm ? value.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      )
      .map(([key, value]) => (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{value.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ wordWrap: 'break-word' }}>{value.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ));
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Stack spacing={3}>
            <Paper elevation={4}>
              <Stack spacing={2}>
                <Typography variant="h5" style={{ marginTop: "10px", marginLeft: "10px" }}> Add note </Typography>
                <Divider variant="middle" style={{ marginTop: "5px" }}/>
                <TextField
                  style={{ margin: "10px" }}
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  id="fileNameInput"
                  label="File name"
                />
                <TextField
                  style={{ margin: "10px" }}
                  multiline={true}
                  rows={3}
                  type="text"
                  value={fileContent}
                  id="fileNameInput"
                  label="Content"
                  onChange={(e) => setFileContent(e.target.value)}
                />
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  style={{ marginLeft: "10px", marginRight: '10px' }}
                >
                  <input
                    type="file"
                    id="docpicker"
                    accept=".txt"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  Load file
                </Button>
                <Button
                  disabled={enableUpload}
                  style={{ margin: "10px" }}
                  variant="outlined"
                  onClick={() => addNote({ fileName, fileContent })}
                >
                  {isNoteBeingAdded ? <CircularProgress /> : 'Upload'}  
                </Button>
              </Stack>
            </Paper>
            <Paper elevation={4}>
              <TextField
                  style={{ margin: "10px", marginTop: "15px", width: "95%" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="filterNotes"
                  label="Search notes"
              />
              <Box style={{ margin: "10px" }}>
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
