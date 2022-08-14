import React, { PropsWithChildren, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useDimensions from "react-cool-dimensions";
import shuffle from "lodash/shuffle";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

console.log({ apiKey, channelId });

export const VideoBackground: React.FC<PropsWithChildren> = ({ children }) => {
  const { observe, width, height } = useDimensions();

  const [videos, setVideos] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState("_19DH6qjWNA");

  const aspectRatio = width / height;
  const standardWidth = 16;
  const standardHeight = 9;

  const style =
    aspectRatio <= standardWidth / standardHeight
      ? {
          width: (height * standardWidth) / standardHeight,
          height,
        }
      : {
          width,
          height: (width * standardHeight) / standardWidth,
        };

  const handleProgress = (progress: any) => {
    console.log(progress);
  };

  const getVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=rating&maxResults=5`
      );

      const videos = shuffle((await response.json()).items);

      console.log(videos);

      setVideos(videos);
      setCurrentVideo(videos[0].id.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div
      ref={observe}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      {currentVideo && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            transform: "translate(-50%, -50%) scale(1.1)",
            left: "50%",
            top: "50%",
            ...style,
          }}
        >
          <ReactPlayer
            url={"https://youtu.be/" + currentVideo}
            muted
            loop
            playing
            controls={false}
            width="100%"
            height="100%"
            onProgress={handleProgress}
          />
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
