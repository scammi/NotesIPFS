import { useState } from "react";

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
import AppHeader from "../components/Header";

import useNotes from "../hooks/useNotes";
import useAddNote from "../hooks/useAddNote";
import { getShortAddress } from "../utils/address";
import { useWeb3Context } from "../context/Web3";

const Home = () => {
  const [ fileName, setFileName ] = useState("");
  const [ fileContent, setFileContent ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("");
  
  const { mutate: addNote, isPending: isNoteBeingAdded }  = useAddNote();
  const { data: notes, isLoading: isNotesLoading, isError: isNotesError } = useNotes();
  const { web3 } = useWeb3Context();

  const enableUpload = !Boolean(fileContent && fileName && web3.user);

  const handleFileLoad = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const name = file.name;

        setFileContent(content);
        setFileName(name);
      };

      reader.readAsText(file);
    }
  };

  const Notes = () => {
    if (notes == undefined) {
      return 'No notes ';
    }

    if (isNotesError) {
      return 'Error getting notes';
    }

    const notesArray = Object.entries(notes);
    // Filter and map notes based on search term
    return notesArray
      .filter(([key, value]) =>
        searchTerm ? value.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      )
      .map(([key, value]) => (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{value.name.replace(/\.[^.]+$/, '')}</Typography>
              <Typography variant="overline">{getShortAddress(value.signer, 14)}</Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ wordWrap: 'break-word' }}>{value.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ));
  }

  return (
    <>
    <AppHeader />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <Stack spacing={3}>
              <Paper elevation={4}>
                <Stack spacing={2}>
                  <Typography variant="h5" style={{ marginTop: "10px", marginLeft: "10px" }}> Add note </Typography>
                  <Divider variant="middle" style={{ marginTop: "5px", marginBottom: "10px" }}/>
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
                    style={{ marginLeft: "10px", marginRight: '10px', marginTop: '0px' }}
                  >
                    <input
                      type="file"
                      id="docpicker"
                      accept=".txt"
                      onChange={handleFileLoad}
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
                    {isNoteBeingAdded ? <CircularProgress size={24} /> : 'Upload'}  
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
                <Box style={{
                  margin: "10px",
                  overflowY: 'auto',
                  maxHeight: '40vh',
                }}>
                  {!isNotesLoading ? <Notes /> : <Skeleton variant="rectangular" height={200}/>}
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
