import React from "react";
import { ContentState, EditorState } from "draft-js";

export default function ClearButton({ editorState, onChange }) {
  const handleClear = () => {
    onChange(
      EditorState.push(
        editorState,
        ContentState.createFromText(""),
        "insert-characters"
      )
    );
  };

  return (
    <button className="btn btn-info btn-sm my-2 mx-2" onClick={handleClear}>
      <i className="fa fa-ban" aria-hidden="true"></i> Clear
    </button>
  );
}
