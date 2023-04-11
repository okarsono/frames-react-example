import "./styles.css";
import { Frames, CardNumber, ExpiryDate, Cvv } from "frames-react";

export default function App() {
  return (
    <div className="App">
      <Frames
        config={{
          publicKey: "pk_sbox_ogynfaoply5o6ksuw3d3hcee3ez",
          modes: ['cvv_optional'],
        }}
        cardTokenized={(e) => {
          alert(e.token);
        }}
      >
        <CardNumber />
        <div className="date-and-code">
          <ExpiryDate />
        </div>

        <button
          id="pay-button"
          onClick={() => {
            Frames.submitCard();
          }}
        >
          PAY GBP 25.00
        </button>
      </Frames>
    </div>
  );
}
