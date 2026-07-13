import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

// ===============================
// Initialize MediaPipe
// ===============================

export const init = async ({
  landmarkerRef,
  videoRef,
  streamRef,
}) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  landmarkerRef.current =
    await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      },

      outputFaceBlendshapes: true,

      runningMode: "VIDEO",

      numFaces: 1,
    });

  streamRef.current =
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

  videoRef.current.srcObject =
    streamRef.current;

  await videoRef.current.play();
};

// =======================================
// Helper
// =======================================

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// =======================================
// Detect
// =======================================

export const detect = async ({
  landmarkerRef,
  videoRef,
  setExpression,
}) => {
  if (!landmarkerRef.current || !videoRef.current)
    return null;

  if (
    videoRef.current.readyState < 2 ||
    videoRef.current.videoWidth === 0
  ) {
    setExpression("Camera not ready...");
    return null;
  }

  setExpression("Scanning...");

  const moodCounter = {
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
  };

  // Confidence accumulator

  const confidenceCounter = {
    happy: 0,
    sad: 0,
    surprised: 0,
    neutral: 0,
  };

  //----------------------------------
  // Analyse 10 Frames
  //----------------------------------

  for (let i = 0; i < 10; i++) {
    const result =
      landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

    if (!result.faceBlendshapes?.length) {
      await wait(120);
      continue;
    }

    const blend =
      result.faceBlendshapes[0].categories;

    const score = (name) =>
      blend.find(
        (item) => item.categoryName === name
      )?.score || 0;

    //----------------------------------
    // Features
    //----------------------------------

    const smile =
      score("mouthSmileLeft") +
      score("mouthSmileRight");

    const frown =
      score("mouthFrownLeft") +
      score("mouthFrownRight");

    const jaw =
      score("jawOpen");

    const brow =
      score("browInnerUp");

    const eyeWide =
      score("eyeWideLeft") +
      score("eyeWideRight");

    //----------------------------------
    // Happy
    //----------------------------------

    if (smile > 1.0) {
      moodCounter.happy++;

      confidenceCounter.happy += smile;
    }

    //----------------------------------
    // Sad
    //----------------------------------

    else if (
      frown > 0.15 &&
      brow > 0.12
    ) {
      moodCounter.sad++;

      confidenceCounter.sad +=
        frown + brow;
    }

    //----------------------------------
    // Surprise
    //----------------------------------

    else if (
      jaw > 0.35 &&
      eyeWide > 0.55
    ) {
      moodCounter.surprised++;

      confidenceCounter.surprised +=
        jaw + eyeWide;
    }

    //----------------------------------
    // Neutral
    //----------------------------------

    else {
      moodCounter.neutral++;

      confidenceCounter.neutral += 1;
    }

    await wait(120);
  }

  //----------------------------------
  // Winner
  //----------------------------------

  const winner = Object.entries(
    moodCounter
  ).sort((a, b) => b[1] - a[1])[0];

  const mood = winner[0];

  const frameCount = winner[1];

  const confidence = Math.round(
    (frameCount / 10) * 100
  );

  setExpression(
    `${mood} (${confidence}%)`
  );

  return {
    mood,
    confidence,
  };
};