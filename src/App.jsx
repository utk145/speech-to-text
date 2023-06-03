import React, { useState, useEffect } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

const App = () => {
  const start = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const stop = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const [text, setText] = useState('');
  const [isCopied, setCopied] = useClipboard(text);


  // This is to populate the text
  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <>
      <div className="container">
        <h2>My Speech App</h2>
        <br />
        <p>
          Once the conversion is complete, you can easily copy the transcribed text and share it with others. Whether
          it's for collaboration, note-taking, or preserving important conversations, this app has got you covered!
        </p>
        <div className="main-content" onClick={() => setText(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? 'Copied! 👍' : 'Copy to clipboard'}
          </button>
          <button onClick={start}>Start Listening</button>
          <button onClick={stop}>Stop Listening</button>
        </div>
      </div>
    </>
  );
};

export default App;
