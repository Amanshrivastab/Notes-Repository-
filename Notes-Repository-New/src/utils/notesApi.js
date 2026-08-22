export const fetchNotes= async() =>{
    const token = localStorage.getItem("token");
    const response = await fetch (
         "http://localhost:5000/api/notes",
         {
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
    );
    const data = await response.json();
    console.log("HOME API RESPONSE  ",data);
    if(!response.ok){
        throw new error(
            data.message||"failed to fetch notes"
        );
    }
    return data.notes;
};