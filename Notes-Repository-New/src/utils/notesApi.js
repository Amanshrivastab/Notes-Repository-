export const fetchNotes = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        "http://localhost:5000/api/notes",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch notes"
        );
    }

    return data.notes;
};

//fetch api for latest notes 
export const fetchLatestNotes = async () => {

    const response = await fetch(
        "http://localhost:5000/api/notes/latest",
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch notes"
        );
    }

    return data.notes;
};

// fetch api for single note 
export const fetchNoteById = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `http://localhost:5000/api/notes/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    console.log("SINGLE NOTE API:", data);

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch note"
        );
    }

    return data.note;
};