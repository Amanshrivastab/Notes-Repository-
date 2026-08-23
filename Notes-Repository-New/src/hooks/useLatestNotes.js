import { useEffect , useState } from "react";
import { fetchLatestNotes } from "../utils/notesApi";

const useLatestNotes = ()=>{
    const [notes ,setNotes] = useState([]);
    const [ loading , setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect (()=>{
        const laodLatestNotes = async ()=>{
            try{
                const data = await fetchLatestNotes();
                setNotes(data);
            }catch(error){
                console.error("FETCH LATEST NOTE ERROR",error);
                setError(error);
            }finally{
                setLoading(false);
            }
        };
        laodLatestNotes();
    },[]);
    return{
        notes,
        loading,
        error
    };
};
export default useLatestNotes;