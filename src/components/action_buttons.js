import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ActionButtons({
  onSave,
  onEmail,
  onCopyToClipboard,
  currentContent,
  disabled,
}) {
  return (
    <React.Fragment>
      <button
        className="btn btn-link btn-md font-weight-bold"
        onClick={onSave}
        disabled={disabled}
      >
        Save
      </button>
      <CopyToClipboard text={currentContent} onCopy={onCopyToClipboard}>
        <button
          className="btn btn-link btn-md font-weight-bold"
          disabled={disabled}
        >
          Copy
        </button>
      </CopyToClipboard>
      <button
        className="btn btn-link btn-md font-weight-bold"
        onClick={onEmail}
        disabled={disabled}
      >
        Email
      </button>
    </React.Fragment>
  );
}
