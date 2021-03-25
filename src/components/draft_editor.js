import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import draftToHtml from "draftjs-to-html";

import "./draft_editor.css";
import VoiceEditor from "./voice_editor";
import ClearButton from "./clear_button";
import ActionButtons from "./action_buttons";
import { toolbarOptions } from "../utils/toolbar";

const DraftEditor = ({ language }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isCopy, setIsCopy] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    console.log("save content to file on the server ..");
    setIsLoading(true);

    await apiCall(() => {
      return axios.post("http://localhost:8000/api/save-content", {
        content: getHTMLFromState(),
      });
    });
  };

  const handleEmail = async () => {
    setIsLoading(true);

    await apiCall(() => {
      return axios.post("http://localhost:8000/api/send-email", {
        message: getHTMLFromState(),
      });
    });
  };

  const handleCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  const apiCall = async (request) => {
    try {
      await request();
      console.log("done");
      setIsLoading(false);
      setIsSuccess(true);
      setError(false);
    } catch (ex) {
      console.log("error");
      setIsLoading(false);
      setIsSuccess(false);
      setError(true);
    }
  };

  const getHTMLFromState = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div>
      <Editor
        initialEditorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={setEditorState}
        toolbar={toolbarOptions}
        toolbarCustomButtons={[
          <VoiceEditor lang={language} />,
          <ClearButton />,
        ]}
      />
      <div className="my-3">
        <ActionButtons
          onEmail={handleEmail}
          onSave={handleSave}
          onCopyToClipboard={handleCopy}
          currentContent={getHTMLFromState()}
          disabled={!editorState.getCurrentContent().hasText()}
        />
      </div>

      {isLoading && <div className="spinner-border text-center"></div>}
      {isSuccess && (
        <div className="alert alert-success my-3">Succesfull ...</div>
      )}
      {error && (
        <div className="alert alert-danger my-3">
          Some error while performing action ..
        </div>
      )}
      {isCopy && <p className="alert alert-success">Copy to clipboard</p>}
    </div>
  );
};

export default DraftEditor;
