import React, { useState } from "react";

import Editor from "../components/editor";
import DraftEditor from "../components/draft_editor";
import SelectLanguage from "../components/select_language";

const EditorScreen = () => {
  const [language, setLanguage] = useState("en-AU");

  const handleChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12">
              <SelectLanguage language={language} onChangeLang={handleChange} />
            </div>
          </div>
          <div className="mt-3">
            <DraftEditor language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorScreen;
