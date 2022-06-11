import { useState, createContext } from "react";
import { answers } from "../components/db/database";

export const DataContext = createContext({});

function DataProvider(props) {
  const [frequencyData, setFrequencyData] = useState({
    data: [],
  });

  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);

  const [predictionData, setPredictionData] = useState({
    data: [],
  });

  return (
    <DataContext.Provider
      value={{
        score,
        setScore,
        counter,
        setCounter,
        predictionData,
        setPredictionData,
        frequencyData,
        setFrequencyData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;