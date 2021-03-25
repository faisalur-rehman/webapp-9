import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./editor.css";
import BrowserSpeechRecognition from "../utils/browser_speech_recognition";

const browserSpeechRecognition = new BrowserSpeechRecognition();
const recognition = browserSpeechRecognition.getRecognition();
recognition.continuous = true;

function Editor({ language }) {
  const [content, setContent] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [error, setError] = useState(false);

  recognition.lang = language;

  if (!browserSpeechRecognition.isBrowserSupport()) {
    setError(true);
  }

  const handleToggle = () => {
    if (!isStart) {
      recognition.start();
      setIsStart(true);
    } else {
      recognition.stop();
      setIsStart(false);
    }
  };

  recognition.onresult = (e) => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;

    setContent(content + transcript);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <CKEditor
          config={{
            ckfinder: {
              uploadUrl:
                "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
            },
          }}
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
            setContent(data);
          }}
        />

        {error && (
          <p style={{ color: "red" }}>
            This browser doesn't support the voice feature. Please try with
            different browser ..
          </p>
        )}

        <div className="row mt-2">
          <div className="col-md-3">
            <button
              className="btn btn-primary btn-sm mt"
              onClick={handleToggle}
            >
              {!isStart ? "Start" : "Stop"}
            </button>
          </div>
          <div className="col-md-9">
            <ActionButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;

function ActionButton() {
  return (
    <div>
      <AppToolTip content="Copy" toolTip="Copy Text to Clip Board" />
      <AppToolTip content="Save" toolTip="Download File as plain text" />
      <AppToolTip content="Publish" toolTip="Publish your note online" />
      <AppToolTip content="Tweet" toolTip="Share on Twitter" />
      <AppToolTip content="Play" toolTip="Text to speech" />
      <AppToolTip content="Email" toolTip="Email This" />
      <AppToolTip content="Print" toolTip="Save as pdf or print" />
      <AppToolTip content="Clear" toolTip="Clear Notepad" />
    </div>
  );
}

function AppToolTip({ content, toolTip }) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 50, hide: 50 }}
      title="some"
      overlay={<Tooltip id={`tooltip`}>{toolTip}</Tooltip>}
    >
      <p variant="success" className="btn btn-sm btn-link">
        {content}
      </p>
    </OverlayTrigger>
  );
}
