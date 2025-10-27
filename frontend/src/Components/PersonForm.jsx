import { useEffect, useMemo, useState } from "react";
import { languages, states as statesMap } from "../constants";

const empty = {
  name: "",
  address: "",
  state: "",
  district: "",
  dateOfBirth: "",
  language: "",
};

const todayStr = new Date().toISOString().slice(0, 10);

function validate(form) {
  const errs = {};
  if (!form.name?.trim()) errs.name = "Name is required.";
  else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
  else if (form.name.trim().length > 100) errs.name = "Name must be 100 characters or fewer.";

  if (!form.address?.trim()) errs.address = "Address is required.";
  else if (form.address.trim().length < 5) errs.address = "Address must be at least 5 characters.";
  else if (form.address.trim().length > 255) errs.address = "Address must be 255 characters or fewer.";

  if (!form.state) errs.state = "State is required.";
  if (!form.district) errs.district = "District is required.";

  if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required.";
  else if (form.dateOfBirth > todayStr) errs.dateOfBirth = "Date of birth cannot be in the future.";

  if (!form.language) errs.language = "Please select a language.";
  return errs;
}

export default function PersonForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        address: initial.address || "",
        state: initial.state || "",
        district: initial.district || "",
        dateOfBirth: initial.dateOfBirth?.slice(0, 10) || "",
        language: initial.language || "",
      });
    } else {
      setForm(empty);
    }
    setTouched({});
  }, [initial]);

  const errors = useMemo(() => validate(form), [form]);

  const districts = useMemo(() => {
    if (!form.state) return [];
    return statesMap[form.state] || [];
  }, [form.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { district: "" } : {}),
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show all errors if user clicks Save without touching fields
    setTouched({
      name: true,
      address: true,
      state: true,
      district: true,
      dateOfBirth: true,
      language: true,
    });
    if (Object.keys(errors).length > 0) return;

    const payload = {
      ...form,
      name: form.name.trim(),
      address: form.address.trim(),
      dateOfBirth: new Date(form.dateOfBirth).toISOString(),
    };
    onSubmit(payload);
  };

  const canSubmit =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.address &&
    form.state &&
    form.district &&
    form.dateOfBirth &&
    form.language;

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{initial ? "Edit Person" : "Add Person"}</h2>

      <div className="grid">
        <div className="field">
          <label>
            Name <span className="req">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter name"
            aria-invalid={!!errors.name}
          />
          {touched.name && errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="field">
          <label>
            Address <span className="req">*</span>
          </label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter address"
            aria-invalid={!!errors.address}
          />
          {touched.address && errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div className="field">
          <label>
            State <span className="req">*</span>
          </label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.state}
          >
            <option value="">-- Select State --</option>
            {Object.keys(statesMap).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {touched.state && errors.state && <div className="error">{errors.state}</div>}
        </div>

        <div className="field">
          <label>
            District <span className="req">*</span>
          </label>
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!form.state}
            aria-invalid={!!errors.district}
          >
            <option value="">-- Select District --</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {touched.district && errors.district && <div className="error">{errors.district}</div>}
        </div>

        <div className="field">
          <label>
            Date of Birth <span className="req">*</span>
          </label>
          <input
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            max={todayStr}
            aria-invalid={!!errors.dateOfBirth}
          />
          {touched.dateOfBirth && errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
        </div>

        <div className="field">
          <fieldset className="radio-fieldset" aria-invalid={!!errors.language}>
            <legend>
              Language <span className="req">*</span>
            </legend>
            <div className="radio-row">
              {languages.map((lang) => (
                <label key={lang} className="radio-label">
                  <input
                    type="radio"
                    name="language"
                    value={lang}
                    checked={form.language === lang}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {lang}
                </label>
              ))}
            </div>
            {touched.language && errors.language && <div className="error">{errors.language}</div>}
          </fieldset>
        </div>
      </div>

      <div className="actions">
        <button type="submit" disabled={!canSubmit}>
          {initial ? "Update" : "Save"}
        </button>
        {initial && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}