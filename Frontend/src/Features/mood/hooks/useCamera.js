import { useRef, useState } from "react";

const useCamera = () => {
  const videoRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setIsCameraOpen(false);
  };

  return {
    videoRef,
    isCameraOpen,
    openCamera,
    closeCamera,
  };
};

export default useCamera;