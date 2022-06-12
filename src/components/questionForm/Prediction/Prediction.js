import { useContext, useState } from "react";
import { questions } from "../../db/database";
import { answers } from "../../db/database";


import { DataContext } from "../../../context/questionData";

import { ifIncludes } from "../QuestionForm";


export default function Prediction(props) {
  let [question, setQuestion] = useState(questions[0]);
  let [finalPrediction, setFinalPrediction] = useState("");

  let { predictionData, setPredictionData, score } = useContext(DataContext);

let questionPrediction = {
  value: question ? question : questions[0],
  totalScore: score,
  prediction: answers[props.random],
  count: 1,
};

// If nothing is in frequencyData
if (!predictionData.data.length) {
  setPredictionData({
    data: [...predictionData.data, questionPrediction],
  });
}

predictionData.data &&
  predictionData.data.map((el) => {
    let result = ifIncludes(question, predictionData.data);
    if (result) {
      setPredictionData({
        data: [...predictionData.data, questionPrediction],
      });
    }

    let predictionResult = el.totalScore / el.count;

    // Taken from https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
    let finalPredictionResult = answers.sort((a, b) => {
      return (
        Math.abs(a.score - predictionResult) -
        Math.abs(b.score - predictionResult)
      );
    })[0];

    setFinalPrediction(finalPredictionResult);

    if (el.value === question) {
      // Runs twice, if answer is already in array
      // Had to modify score to divide by 2
      setPredictionData((prevState) => ({
        ...prevState,
        totalScore: (el.totalScore = el.totalScore + score / 2),
        count: (el.count = el.count + 0.5),
        prediction: (el.prediction = finalPrediction),
      }));
    }
  });
}
