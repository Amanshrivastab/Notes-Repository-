import { useState } from "react";
import { deleteNote } from "../utils/notesApi";

const useDeleteNote = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const remove = async (id) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response = await deleteNote(id);

            setSuccess(
                "Note deleted successfully"
            );

            return response;

        } catch (error) {

            console.error(
                "USE DELETE NOTE ERROR:",
                error
            );

            setError(error.message);

            throw error;

        } finally {
            setLoading(false);
        }
    };

    return {
        remove,
        loading,
        error,
        success,
    };
};

export default useDeleteNote;