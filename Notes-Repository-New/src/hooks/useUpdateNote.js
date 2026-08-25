import { useState } from "react";
import { updateNote } from "../utils/notesApi";

const useUpdateNote = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const update = async (id, formData) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const updatedNote = await updateNote(
                id,
                formData
            );

            setSuccess("Note Updated Successfully");

            return updatedNote;

        } catch (error) {
            console.error(
                "USE UPDATE NOTE ERROR:",
                error
            );

            setError(error.message);

            throw error;

        } finally {
            setLoading(false);
        }
    };

    return {
        update,
        loading,
        error,
        success,
    };
};

export default useUpdateNote;