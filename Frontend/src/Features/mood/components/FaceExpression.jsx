import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

import "../styles/faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Ready");
  const [isDetecting, setIsDetecting] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {

    init({
      landmarkerRef,
      videoRef,
      streamRef,
    });

    return () => {

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach(track => track.stop());
      }

    };

  }, []);

  //---------------------------------------------------

  const handleClick = async () => {

    setIsDetecting(true);

    const result = await detect({

      landmarkerRef,
      videoRef,
      setExpression,

    });

    if (!result) {

      setIsDetecting(false);
      return;

    }

    setExpression(
      `${result.mood.toUpperCase()} • ${result.confidence}%`
    );

    // Small delay so user sees result
    setTimeout(() => {

      setClosing(true);

    }, 700);

    // Smooth close

    setTimeout(() => {

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach(track => track.stop());
      }

      onClick(result.mood);

    }, 1300);

  };

  //---------------------------------------------------

  return (

    <div
      className={`face-expression ${
        closing ? "closing" : ""
      }`}
    >

      <div className="face-card">

        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
        />

        <div className="face-status">

          {isDetecting ? (

            <>

              <div className="ai-loader"></div>

              <div className="mood-badge">

                {expression}

              </div>

              <p>

                AI is analysing your face...

              </p>

            </>

          ) : (

            <>

              <div className="mood-badge">

                😊 Ready to Detect

              </div>

              <p>

                Look straight into the camera

              </p>

            </>

          )}

        </div>

        <button

          className="detect-btn"

          disabled={isDetecting}

          onClick={handleClick}

        >

          {isDetecting

            ? "Detecting..."

            : "Detect Expression"}

        </button>

      </div>

    </div>

  );

}