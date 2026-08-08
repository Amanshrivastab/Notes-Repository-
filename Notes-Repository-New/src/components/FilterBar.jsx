const FilterBar = ({ subject, setSubject, standard, setStandard }) => {
  return (
    <>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">All Subjects</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electronics">Electronics</option>
        <option value="Biotechnology">Biotechnology</option>
      </select>

      <select
        value={standard}
        onChange={(e) => setStandard(e.target.value)}
      >
        <option value="">All Standards</option>
        <option value="B.Tech (CSE)">B.Tech (CSE)</option>
        <option value="B.Tech (ECE)">B.Tech (ECE)</option>
        <option value="B.Tech (BT)">B.Tech (BT)</option>
      </select>
    </>
  );
};

export default FilterBar;