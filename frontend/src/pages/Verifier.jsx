import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function Verifier() {
  const [result, setResult] = useState("");

  return (
    <div style={{ padding: "40px" }}>
      <h2>Verifier Portal</h2>

      <div style={{ width: "300px" }}>
        <Scanner
          onScan={(data) => {
            if (data) {
              setResult(data[0].rawValue);
            }
          }}
          onError={(err) => console.error(err)}
        />
      </div>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Scanned Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
