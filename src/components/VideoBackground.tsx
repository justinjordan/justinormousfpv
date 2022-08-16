import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player";
import useDimensions from "react-cool-dimensions";
import shuffle from "lodash/shuffle";
import debounce from "lodash/debounce";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

export const VideoBackground: React.FC<PropsWithChildren> = ({ children }) => {
  const { observe, width, height } = useDimensions();

  const [duration, setDuration] = useState(0);
  const [videos, setVideos] = useState<string[]>(["6FoEdq36gbI"]);
  const [currentVideo, setCurrentVideo] = useState<string | null>();

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

  const playNextVideo = useCallback(() => {
    setVideos((videos) => {
      const nextVideo = videos.shift();

      if (nextVideo) {
        videos.push(nextVideo);
        setCurrentVideo(nextVideo);
      }

      return videos;
    });
  }, []);

  const getVideos = useCallback(
    debounce(async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=rating&maxResults=30`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const videos = shuffle((await response.json()).items);

        setVideos(videos.map((video) => video.id.videoId));
        setCurrentVideo(videos[0].id.videoId);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        playNextVideo();
      }
    }, 500),
    []
  );

  const handleProgress = useCallback(
    ({ playedSeconds }: { playedSeconds: number }) => {
      if (playedSeconds > duration - 25) {
        playNextVideo();
      }
    },
    []
  );

  useEffect(() => {
    getVideos();
  }, [getVideos]);

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
            onDuration={(duration) => setDuration(duration)}
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
