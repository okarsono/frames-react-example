import "./styles.css";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";
import { useState } from "react";

export default function App() {
  const [timing, setTiming] = useState({show: false, prev: 0, now: 0});

  const handleClick = () => {
    console.log(`[${Date.now()}] starting tokenization`);
    setTiming((timing) => ({...timing, show: false, prev: timing["now"], now: Date.now()}));
    Frames.submitCard();
  }

  const tokenizationListener = (e) => {
    setTiming((timing) => { return {...timing, show: true, prev: timing["now"], now: Date.now()}});
    console.log(`[${Date.now()}] tokenized ${e.token}`);
  }

  return (
    <div className="App">
      <Frames
        config={{
          publicKey: "pk_sbox_4v4makjv7vb24jdkn4ugtdu5jmc",
          modes: ['cvv_hidden'],
        }}
        cardTokenized={tokenizationListener}
      >
        <CardNumber />
        <div className="date-and-code">
          <ExpiryDate />
        </div>

        <button
          id="pay-button"
          onClick={handleClick}
        >
          PAY GBP 25.00
        </button>
      </Frames>

      <div>
        { timing.show && showTiming(timing) }
      </div>
    </div>
  );
}

function showTiming(timing) {
  return (
    <>
      Tokenization duration = <b>{(timing["now"] - timing["prev"])/1000} sec</b>
    </>
  );
}
