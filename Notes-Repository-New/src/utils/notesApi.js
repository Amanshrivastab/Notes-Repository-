import API_URL from "../services/api";

export const fetchNotes = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `${API_URL}/api/notes`,
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
        `${API_URL}/api/notes/latest`,
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
        `${API_URL}/api/notes/${id}`,
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
// ========================================
// UPDATE NOTE API
// PUT /api/notes/:id
// ========================================
 export const updateNote = async(id,formData) =>{
    const token = localStorage.getItem("token");

    if(!token){
        throw new error(
            "Pleasse login frist"
        );
    };

    const response = await fetch(
        `${API_URL}/api/notes/${id}`,
        {
            method:"PUT",
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        }
    );

    const data = await response.json();

    console.log("UPDATE NOTE API",data)
    if(!response.ok){
        throw new error(
            error.message||"Failed to update note"
        );
    }
    return data.note;
} 

// ========================================
// UPLOAD NOTE API
// POST /api/notes
// ========================================

export const uploadNote =async (formData)=>{
    const token = localStorage.getItem("token");

    if(!token){
        throw new error(" Please login frist ");
    };

    const response = await fetch(
        `${API_URL}/api/notes`,
        {
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        },
    );

    const data = await response.json();
    console.log("upload note api",data);

    if(!response.ok){
        throw new error(
            error.message||"failed to upload error "
        );
    };
    return data.note;

};


// ========================================
// DELETE NOTE API
// DELETE /api/notes/:id
// ========================================

export const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `${API_URL}/api/notes/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    console.log("DELETE NOTE API:", data);

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete note"
        );
    }

    return data;
};