import { useEffect, useState } from "react";
import { fetchNoteById } from "../utils/notesApi";

const useOneNote = (id) => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNote = async () => {
            try {
                setLoading(true);
                setError("");

                const noteData = await fetchNoteById(id);

                setNote(noteData);
            } catch (error) {
                console.error("USE ONE NOTE ERROR:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (!id) {
            setError("Invalid note ID");
            setLoading(false);
            return;
        } 
        loadNote();
        
    }, [id]);

    return {
        note,
        loading,
        error
    };
};

export default useOneNote;