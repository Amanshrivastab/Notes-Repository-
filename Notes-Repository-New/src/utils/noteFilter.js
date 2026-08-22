export const filterNotes = (notes,
    search,
    subject,
    branch,
    semester
) =>{
    const searchText = search.toLowerCase().trim();

    return notes.filter((note)=>{
        const matchesSearch =
            note.title.toLowerCase().includes(searchText)||
            note.description.toLowerCase().includes(searchText) ||
            note.subject.toLowerCase().includes(searchText) ||
            note.branch.toLowerCase().includes(searchText) ||
            note.semester.toString().includes(searchText);
        

            // search by filter of subject and semester or class

             const matchesSubject =
            subject === "" ||
            note.subject === subject;

            const matchesSemester =
            semester === "" ||
            note.semester === Number(semester);


            return (
            matchesSearch &&
            matchesSubject &&
            matchesSemester 
        );


    });
};