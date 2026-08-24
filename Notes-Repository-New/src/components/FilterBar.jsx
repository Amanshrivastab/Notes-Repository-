const FilterBar = ({
  subject, setSubject,
  level, setLevel,
  standard, setStandard,
  branch, setBranch
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto mb-4">

      {/* 1. Subject filter */}
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Subjects</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electronics">Electronics</option>
        <option value="Biotechnology">Biotechnology</option>
        <option value="AIML">AIML</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="Mathematics">Mathematics</option>
      </select>

      {/* 2. Level filter: School vs B.Tech */}
      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
          setStandard("");
          setBranch("");
        }}
        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Levels</option>
        <option value="school">School (9th-12th)</option>
        <option value="btech">B.Tech</option>
      </select>

      {/* 3. Class / Semester filter — depends on level */}
      <select
        value={standard}
        onChange={(e) => setStandard(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{level === "btech" ? "All Semesters" : "All Classes"}</option>
        {level === "btech"
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))
          : [9, 10, 11, 12].map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))
        }
      </select>

      {/* 4. Branch (B.Tech) / Stream (11th-12th) filter */}
      {level === "btech" && (
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="BT">Biotechnology</option>
          <option value="ME">Mechenical</option>
          <option value="AR">Robotics</option>
        </select>
      )}

      {level === "school" && (standard === "11" || standard === "12") && (
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Streams</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
        </select>
      )}

    </div>
  );
};

export default FilterBar;