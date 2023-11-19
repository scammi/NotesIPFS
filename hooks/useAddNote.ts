import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useAddNote = () => {
	const queryClient = useQueryClient()

	return useMutation({
    mutationFn: (note) => {
			return axios.post(
				`/api/ipfs?fileName=${note.fileName}&fileContent=${note.fileContent}`
			);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
	});
};

export default useAddNote;