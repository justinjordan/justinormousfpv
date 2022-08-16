import React from "react";
import { LogoWithSocial } from "./components/LogoWithSocial";
import { VideoBackground } from "./components/VideoBackground";

function App() {
  return (
    <div className="App">
      <VideoBackground>
        <div className="flex h-full">
          <div className="m-auto max-w-[90vw] max-h-[90vh]">
            <LogoWithSocial />
          </div>
        </div>
      </VideoBackground>
    </div>
  );
}

export default App;
