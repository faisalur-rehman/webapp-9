import React from "react";

import { languages } from "../utils/languages";

function SelectLanguage({ language, onChangeLang }) {
  const handleChange = (e) => {
    onChangeLang(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="language">Please select your language</label>
      <select
        name="language"
        id="language"
        className="form-control"
        onChange={handleChange}
        defaultValue={language}
      >
        {languages.map((lang) => (
          <option value={lang.code} key={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectLanguage;
