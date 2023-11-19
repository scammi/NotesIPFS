import { Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useNotes = () => {
  return useQuery(
    {
      queryKey: ['notes'],
      queryFn: async () => await axios.get('/api/ipfs'),
      select: (response) => response?.data?.folderDataParsed,
    }
  )
};

export default useNotes;