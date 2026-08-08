import { Link } from "react-router-dom";

const NoteCard = ({ id, title, subject, standard }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-bold text-gray-700">
        📄 {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {subject}
      </p>

      <p className="text-gray-600 mt-1">
        {standard}
      </p>

      <div className="flex gap-3 mt-4">
        <Link
          to={`/notes/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View
        </Link>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Download
        </button>
      </div>
    </div>
  );
};

export default NoteCard;