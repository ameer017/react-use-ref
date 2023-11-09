import { useState, useRef } from 'react';
import { BiReset } from 'react-icons/bi'
import { GrStopFill } from 'react-icons/gr';
import { MdNotStarted } from 'react-icons/md'

// how to build a react timer with useRef
// 
function App() {
  const [randomInput, setRandomInput] = useState('');
  const [seconds, setSeconds] = useState(0);

  // 2. set the refs a. values stays the same between renders b. 
  const renders = useRef(0);

  // step 4 ... useRef will have 0 at first
  const inputRef = useRef();

  // step 6
  const timerId = useRef();


  const handleChange = (e) => {
    setRandomInput(e.target.value);

    // step 3.
    renders.current++;
  }

  // step 7
  const startTimer = () => {
    timerId.current = setInterval(() => {
      renders.current++;
      setSeconds(prev => prev + 1);
    }, 1000)
    inputRef.current.focus();
  }

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    inputRef.current.focus();
  }

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      renders.current++;
      setSeconds(0);
    }
    inputRef.current.focus();
  }

  // step 5 - to be refactored
  // const focusOnInput = () => {
  //   inputRef.current.focus()
  // }

  return (
    // 1. structure the following without the functions
    <main className="App">
      <input
        ref={inputRef} //...step 4 - to be removed later
        type="text"
        value={randomInput}
        placeholder="Random Input"
        onChange={handleChange}
      />
      <p>Renders: {renders.current}</p>
      <br /><br />
      <section>
        {/* <button onClick={focusOnInput}>Focus</button> step 5 continues */} 
        {/* step 8 */}
        <button onClick={stopTimer}> <GrStopFill/> </button>
        <button onClick={startTimer}> <MdNotStarted/> </button>
      </section>
        <button onClick={resetTimer}><BiReset/></button>
      <br /><br />
      <p>Seconds: {seconds}</p>
      <br /><br />
      <p>{randomInput}</p>
    </main>
  );
}

export default App;