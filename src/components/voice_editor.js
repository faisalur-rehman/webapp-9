import { EditorState, Modifier } from "draft-js";
import React, { useState } from "react";

import BrowserSpeechRecognition from "../utils/browser_speech_recognition";

const browserSpeechRecognition = new BrowserSpeechRecognition();
const recognition = browserSpeechRecognition.getRecognition();
recognition.continuous = true;

export default function VoiceEditor({ editorState, onChange, lang }) {
  const [isListening, setIsListening] = useState(false);

  const handleListening = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  recognition.onresult = (e) => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      transcript,
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  return (
    <button
      className="btn btn-danger btn-sm my-2 mx-2"
      onClick={handleListening}
    >
      <i
        className={`fa fa-microphone${isListening ? "-slash" : ""}`}
        aria-hidden="true"
      ></i>{" "}
      {isListening && <span className="spinner-grow spinner-grow-sm"></span>}
      {!isListening ? " Start Listening" : " Stop Listening ..."}
    </button>
  );
}
