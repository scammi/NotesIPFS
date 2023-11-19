import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddNote = () => {
	return useMutation({
    mutationFn: (fileName, fileContent) => {
			return axios.post(
				`/api/ipfs?fileName=${fileName}&fileContent=${fileContent}`
			);
    },
  })
};

export default useAddNote;