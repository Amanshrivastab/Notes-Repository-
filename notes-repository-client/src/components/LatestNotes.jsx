import NoteCard from "./noteCard";

const LatestNotes = () => {
    return(
        <section className="max-auto-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">
                Latest Notes
            </h2>
            <div className=" grid grid:cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NoteCard 
                    title="Data Science "
                    subject="Computer Science "
                    standard="B tech (CSE)"
                />
                <NoteCard  
                    title="digital Electronics"
                    subject=" Electronics "
                    standard="B tech(ECE) "

                />
                <NoteCard 
                    title="Microbiology "
                    subject="Biotechnology "
                    standard="B tech (BT)"
                />
            </div>
        </section>
    );
};
export default LatestNotes;