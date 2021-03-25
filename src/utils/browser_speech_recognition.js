class BrowserSpeechRecognition {
  #SpeechRecognition;

  constructor() {
    this.#SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;
  }

  getRecognition() {
    return new this.#SpeechRecognition();
  }

  isBrowserSupport() {
    return this.#SpeechRecognition !== null ? true : false;
  }
}

export default BrowserSpeechRecognition;
