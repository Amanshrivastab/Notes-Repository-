const NoteCard =({title, subject, standard}) =>{
    return (
        <div className="bg-white shadow-md rounded-x1 p-6 hover:shadow-lg transition  ">
            <h2 className="text-x1 font-bold text-gray-600">
               📄  {title}
            </h2>
            <p className="text-gray-500 mt-2">
                {subject}
            </p>
            <p className="text-gray-500 mt-2">
                {standard}
            </p>
            <div className=" flex gap-3 mt-6">
                <button className="bg-blue-500 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition">
                    View
                </button>

                <button className="bg-green-500 text-white px-6 py-4 rounded-md hover:bg-green-700 transition">
                    download
                </button>

            </div>
        </div>
    );
};

export default NoteCard;