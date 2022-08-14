import React from "react";
import { LogoWithSocial } from "./components/LogoWithSocial";
import { VideoBackground } from "./components/VideoBackground";

function App() {
  return (
    <div className="App">
      <VideoBackground>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vw",
            maxWidth: "800px",
          }}
        >
          <LogoWithSocial />
        </div>
      </VideoBackground>
    </div>
  );
}

export default App;
