import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SampleScreen = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default SampleScreen;
