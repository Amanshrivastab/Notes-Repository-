import { useEffect, useState } from "react";
import { fetchNotes } from "../utils/notesApi";

const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const notesData = await fetchNotes();
                setNotes(notesData);
            } catch (err) {
                console.error("USE NOTES ERROR:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    return {
        notes,
        loading,
        error
    };
};

export default useNotes;