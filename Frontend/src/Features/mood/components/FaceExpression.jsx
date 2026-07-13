import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const mood = detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    if (!mood) return;

    // Camera band
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    onClick(mood);
  }

  return (
    <div className="face-expression">
      <div className="face-card">
        <video ref={videoRef} playsInline />
        <div className="ai-pulse"></div>

        <div className="face-status">
          {
expression==="Detecting..."
&&
<div className="loader"></div>
}

          <div className="mood-badge">

  {expression === "happy" && "😊 Happy"}

  {expression === "sad" && "😢 Sad"}

  {expression === "Neutral" && "😐 Neutral"}

  {expression === "surprised" && "😲 Surprised"}

  {expression === "Detecting..." && "🤖 Detecting..."}

</div>

          <p>AI is analysing your facial expression...</p>
        </div>

        <button className="detect-btn" onClick={handleClick}>
          Detect Expression
        </button>
      </div>
    </div>
  );
}
