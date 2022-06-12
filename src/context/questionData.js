import { useState, createContext } from "react";
export const DataContext = createContext({});

function DataProvider(props) {
  const [frequencyData, setFrequencyData] = useState({
    data: [],
  });
  const [counter, setCounter] = useState(0);
  const [predictionData, setPredictionData] = useState({
    data: [],
  });

  return (
    <DataContext.Provider
      value={{
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
