import { useState, createContext } from "react";
import { answers } from "../components/db/database";

export const DataContext = createContext({});

function DataProvider(props) {
  const [data, setData] = useState({
    activeAnswer: "",
    frequencyData: [],
  });

  const [counter, setCounter] = useState(0);

  const [predictionData, setPredictionData] = useState({
    data: []
  });

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        counter,
        setCounter,
        predictionData,
        setPredictionData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;

/* 

data: [
  [
    questions: [{
      answer: '',
      count: 0,
    },
    {
      answer: '',
      count: 0,
    },
  ],
  questions: [{
      answer: '',
      count: 0,
    },
    {
      answer: '',
      count: 0,
    },
  ]
  ]
]


*/
