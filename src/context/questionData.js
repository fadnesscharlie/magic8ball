import { useState, createContext } from "react";
import { answers } from "../components/db/database";

export const DataContext = createContext({});

function DataProvider(props) {
  const [data, setData] = useState({
    activeQuestion: "",
    activeAnswer: "",
    predictions: [],
  });

  const [counter, setCounter] = useState(0);

  const [questionData, setQuestionData] = useState({
    data: [
      {
        question: "",
        score: 0,
        count: 0,
      },
      {
        question: "",
        score: 0,
        count: 0,
      },
    ],
  });

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        counter,
        setCounter,
        questionData,
        setQuestionData,
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
