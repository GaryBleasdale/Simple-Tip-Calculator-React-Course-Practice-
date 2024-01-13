import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [billValue, setBillValue] = useState(0);
  const [personalEval, setPersonalEval] = useState(0.1);
  const [friendEval, setFriendEval] = useState(0.1);
  const [tip, setTip] = useState(0);

  function handlePersonalEval(e) {
    const newPersonalEval = parseFloat(e.target.value);
    setPersonalEval(newPersonalEval);
    calculateTip(billValue, newPersonalEval, friendEval);
  }

  function handleFriendEval(e) {
    const newFriendEval = parseFloat(e.target.value);
    setFriendEval(newFriendEval);
    calculateTip(billValue, personalEval, newFriendEval);
  }

  function handleBillValue(e) {
    const inputValue = e.target.value;
    const newBillValue = inputValue ? parseFloat(inputValue) : 0;

    if (!isNaN(newBillValue)) {
      setBillValue(newBillValue);
      calculateTip(newBillValue, personalEval, friendEval);
    } else {
      setBillValue(0);
    }
  }

  function calculateTip(billValue, personalEval, friendEval) {
    const average = (personalEval + friendEval) / 2;
    const tipValue = Math.round(average * billValue);
    setTip(tipValue);
  }

  function resetValues() {
    setBillValue(0);
    setFriendEval(0.1);
    setPersonalEval(0.1);
    calculateTip(0, 0, 0);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'Column', gap: '10px' }}>
      <BillValue onBillChange={handleBillValue} billValue={billValue} />
      <PersonalEvaluation
        onPersonalEvalChange={handlePersonalEval}
        personalEval={personalEval}
      />
      <FriendEvaluation
        onFriendEvalChange={handleFriendEval}
        friendEval={friendEval}
      />
      <Total billValue={billValue} tip={tip} onReset={resetValues} />
    </div>
  );
}

function BillValue({ onBillChange, billValue }) {
  return (
    <>
      <span>How much was the bill?</span>
      <input type="text" onChange={onBillChange} value={billValue} />
    </>
  );
}

function PersonalEvaluation({ onPersonalEvalChange, personalEval }) {
  return (
    <>
      <span>How much did you like the service?</span>
      <select onChange={onPersonalEvalChange} value={personalEval}>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.05}> It was OK (5%)</option>
        <option value={0}> It was poor (0%) </option>
      </select>
    </>
  );
}

function FriendEvaluation({ onFriendEvalChange, friendEval }) {
  return (
    <>
      <span>How much did your friend like the service?</span>
      <select onChange={onFriendEvalChange} value={friendEval}>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.05}>It was OK (5%)</option>
        <option value={0}>It was poor (0%) </option>
      </select>
    </>
  );
}

function Total({ billValue, tip, onReset }) {
  if (billValue == 0) {
    return <div>Please insert your bill value to begin</div>;
  }

  return (
    <>
      <span>
        You pay ${billValue + tip} (bill of ${billValue} + tip of ${tip})
      </span>
      <button onClick={onReset}>Reset</button>
    </>
  );
}
