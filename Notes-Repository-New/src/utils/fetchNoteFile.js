import API_URL from "../services/api";

const fetchNoteFile = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("You are not logged in.");
    }

    const response = await fetch(
        `${API_URL}/notes/${id}/file`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        let errorMessage = "Failed to fetch note file";

        try {
            const data = await response.json();
            errorMessage = data.message || errorMessage;
        } catch (error) {
            console.error(error);
        }

        throw new Error(errorMessage);
    }

    return await response.blob();
};

export default fetchNoteFile;