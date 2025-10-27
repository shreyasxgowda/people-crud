import { useEffect, useState } from "react";
import { getPeople, createPerson, updatePerson, deletePerson } from "./api";
import PersonForm from "./Components/PersonForm";
import PeopleTable from "./Components/PeopleTable";

export default function App() {
  const [people, setPeople] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const flash = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const load = async () => {
    try {
      setLoading(true);
      const data = await getPeople();
      setPeople(data);
    } catch {
      setError("Failed to load data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (form) => {
    setError("");
    try {
      if (editing) {
        await updatePerson(editing.id, form);
        setEditing(null);
        flash("Updated successfully.");
      } else {
        await createPerson(form);
        flash("Saved successfully.");
      }
      await load();
    } catch (e) {
      setError(e?.response?.data?.detail || e?.response?.data?.message || "Save failed.");
    }
  };

  const onEdit = (person) => setEditing(person);
  const onCancelEdit = () => setEditing(null);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setError("");
    try {
      await deletePerson(id);
      setPeople((prev) => prev.filter((p) => p.id !== id));
      flash("Deleted successfully.");
    } catch (e) {
      setError(e?.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: 16 }}>
      <h1>People CRUD</h1>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <PersonForm initial={editing} onSubmit={handleSubmit} onCancel={onCancelEdit} />
      <hr />
      {loading ? <p>Loading...</p> : <PeopleTable people={people} onEdit={onEdit} onDelete={onDelete} />}
    </div>
  );
}