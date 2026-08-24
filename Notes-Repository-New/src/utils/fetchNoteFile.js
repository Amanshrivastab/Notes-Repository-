const fetchNoteFile = async(id) =>{
    const token = localStorage.getItem("token");

    if(!token){
         throw new error("You are not loged in.");
    }
    const response = await fetch(
         `http://localhost:5000/api/notes/${id}/file`,
         {
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
         }
    );

    if(!response.ok){
        let errorMessage = "Failed to fetch note file";

        try{
            const data  = await response.json();
            errorMessage = data.message || errorMessage;
        }catch(error){
            console.error(error);
        }

        throw new error(errorMessage);
    }
    return await response.blob();
};
export default fetchNoteFile;