import React from "react";
import { LogoWithSocial } from "./components/LogoWithSocial";
import { VideoBackground } from "./components/VideoBackground";

function App() {
  return (
    <div className="App">
      <VideoBackground>
        <div className="flex h-full">
          <div className="m-auto">
            <LogoWithSocial />
          </div>
        </div>
      </VideoBackground>
    </div>
  );
}

export default App;
