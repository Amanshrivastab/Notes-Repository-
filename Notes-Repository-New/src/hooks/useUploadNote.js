import { useState } from "react";
import { uploadNote } from "../utils/notesApi";

const useUploadNote = ()=>{
    const [loading , setLoading] = useState(false);
    const[error, setError] = useState("");
    const [success , setSuccess] = useState("");

    const upload = async(fromData)=>{
        try{
        setLoading(true);
        setError("");
        setSuccess("");

        const uploadedNote = await uploadNote(
            fromData
        );
        setSuccess("Note uploaded successfully ");
        return uploadedNote;

    }catch(error){
        console.error("USE UPLOAD NOTE ERROR ",error);
        setError(error);
        throw error;
    }finally{
        setLoading(false);
    };

}

    return{
        upload,
        loading,
        error,
        success
    };



};
export default useUploadNote;