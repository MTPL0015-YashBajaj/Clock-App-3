// import React, { useState, useEffect } from "react";

// function Timer() {
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isRunning]);

//   const handleStartStop = () => {
//     setIsRunning((prevIsRunning) => !prevIsRunning);
//   };

//   const handleReset = () => {
//     setElapsedTime(0);
//     setIsRunning(false);
//   };

//   return (
//     <div>
//       <h1>Timer: {elapsedTime} seconds</h1>
//       <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   );
// }

// export default Timer;


import React, { useState, useEffect } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const handlePause = () => {
    setIsRunning(false);
    setTotalTime(totalTime + elapsedTime);
  };

  const handleContinue = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTotalTime(totalTime + elapsedTime);
    setElapsedTime(0);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setTotalTime(0);
  };

  return (
    <div>
      <h1>Timer: {Math.floor(elapsedTime / 1000)} seconds</h1>
      {isRunning ? (
        <>
        <div style={{display:"flex", gap:"2rem"}}>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>  
        </>
      ) : (
        <>
        <div style={{display:"flex", gap:"2rem"}}>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleReset}>Reset</button>
          </div>
        </>
      )}
      {totalTime > 0 && <p>Total Time: {Math.floor(totalTime / 1000)} seconds</p>}
      {!isRunning && totalTime === 0 && <p>Click Start to begin the timer.</p>}
    </div>
  );
}

export default Timer;
