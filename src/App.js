import { useState } from "react";
import "./App.css";
import Axios from "axios";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);

  function previewFile() {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        // console.log(reader.result);
        const str = reader.result;
        const index = str.search(",");
        const finStr = str.slice(index + 1, str.length);
        preview.src = reader.result;
        Axios.post(
          "https://automl.googleapis.com/v1beta1/projects/942932012465/locations/us-central1/models/ICN6250510298650771456:predict",
          {
            payload: {
              image: {
                imageBytes: `${finStr}`,
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${"ya29.c.Kp8B_wex_VQNQfLSyaBweecOI0gH3TsHW9d6Dsb4Gj0I95jv_f5UIbfQ-OhB_ZQwKVKeIgC6smohP4SGZvq6iYfY28RCZlUKug-y7TPadgG6OfYtbySErlPv3G26-GSYPKP5dDShCvqRjsRinH5QY_Td9pO33EmYejC5OEO05PuHBzGaBVW-5rKdSdgehZxPCgyXvxpl5q5jJAKcjZkBh2U5"}`,
            },
          }
        ).then((res) => {
          console.log(res.data.payload[0]);
          setResult(res.data.payload[0]);
        });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="App">
      <h1>
        <u>Covid Classifier</u>
      </h1>
      <input multiple type="file" onChange={previewFile} />
      <img src="" height="200" alt="preview..."></img>
      {result ? (
        <>
          <h1>Confidence Score: {result.classification.score}</h1>
          <h1>Predicted Label: {result.displayName}</h1>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
