import { Link } from "react-router-dom";

const NoteCard = ({ id, title, subject,description, semester, branch }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">

      <h3 className="text-xl font-bold text-gray-700">
        📄 {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {subject}
      </p>

      {/* Description */}
      <p className="text-gray-600 mt-2 line-clamp-2">
        {description}
      </p>

      <p className="text-gray-600 mt-1">
        semester: {semester}
      </p>

      <p className="text-gray-600 mt-1">
        branch: {branch}
      </p>

      <div className="flex gap-3 mt-4">

        <Link
          to={`/notes/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View
        </Link>

       
      </div>
    </div>
  );
};

export default NoteCard;