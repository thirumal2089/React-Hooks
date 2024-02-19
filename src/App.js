import React, { useRef, useState, useEffect, useMemo, memo, useCallback } from 'react';

function App() {
  // Create a ref using the useRef hook
  const inputRef = useRef(null);

  // State to hold the value of the input
  const [inputValue, setInputValue] = useState('');

  // Function to handle changes in the input
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to focus the input field
  const focusInput = () => {
    inputRef.current.focus();
  };

  // useEffect with cleanup
  useEffect(() => {
    console.log('Component mounted');
    // Cleanup function
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  const countRef = useRef(0);

  // Function to increment count
  const incrementCount = () => {
    countRef.current += 1;
    console.log('Count:', countRef.current);
  };

  // memo
  const [name, setName] = useState('Thiru');

  const Greeting = memo(({ name }) => {
    console.log('Rendering memo example');
    return <div>Welcome {name}!</div>;
  });

  const handleChangeMemo = (event) => {
    setName(event.target.value);
  };

  // useMemo
  const [number, setNumber] = useState(0);

  const factorial = useMemo(() => {
    console.log('Calculating factorial');
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]); // Recalculate factorial only when the number changes

  const handleChangeUseMemo = (event) => {
    setNumber(Number(event.target.value));
  };

  const [count, setCount] = useState(0);

  // Callback function created without useCallback
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Memoized callback function using useCallback
  const incrementCallback = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input element
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={focusInput}>Focus Input</button>
      <div>
        <p>count : {countRef.current}</p>
        <button onClick={incrementCount}>Increment count</button>
      </div>
      <div>
        <input type="text" value={name} onChange={handleChangeMemo} />
        <Greeting name={name} />
      </div>
      <div>
        <input type="number" value={number} onChange={handleChangeUseMemo} />
        <p>Factorial of {number} is {factorial}</p>
      </div>
      <div>
        <p>Count: {count}</p>
        {/* Button using the callback without useCallback */}
        <button onClick={increment}>Increment without useCallback</button>
        {/* Button using the memoized callback with useCallback */}
        <button onClick={incrementCallback}>Increment with useCallback</button>
      </div>
    </div>
  );
}

export default App;
