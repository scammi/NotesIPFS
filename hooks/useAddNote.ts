import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useWeb3Context } from "../context/Web3";

const useAddNote = () => {
  const queryClient = useQueryClient()
  const { sign } = useWeb3Context();

  return useMutation({
    mutationFn: async (note) => {
      const signature = await sign(note.fileContent);

      return axios.post(
        `/api/ipfs?fileName=${note.fileName}&fileContent=${note.fileContent}&signature=${signature}`
      );
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export default useAddNote;