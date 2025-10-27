function formatDate(iso) {
  try {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function PeopleTable({ people, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>Saved People</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>State</th>
            <th>District</th>
            <th>Date of Birth</th>
            <th>Language</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#666" }}>
                No data
              </td>
            </tr>
          ) : (
            people.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td>{p.state}</td>
                <td>{p.district}</td>
                <td>{formatDate(p.dateOfBirth)}</td>
                <td>{p.language}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Edit</button>
                  <button onClick={() => onDelete(p.id)} className="danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}