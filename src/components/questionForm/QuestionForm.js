import {
  Box,
  InputLabel,
  FormControl,
  NativeSelect,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { questions } from "../db/database";
import { answers } from "../db/database";

import { DataContext } from "../../context/questionData";
import "./QuestionForm.css";

// Prediction
// import prediction from './Prediction/prediction';

// custom includes function
function ifIncludes(value, arr) {
  let result = true;
  arr.map((el) => {
    if (el.value === value) return  result = false;
  });
  // console.log('Result', result);
  return result;
}

export default function QuestionForm() {
  let {
    counter,
    setCounter,
    predictionData,
    setPredictionData,
    frequencyData,
    setFrequencyData,
    score,
    setScore,
  } = useContext(DataContext);

  let [question, setQuestion] = useState(questions[0]);
  let [answer, setAnswer] = useState("");
  let [finalPrediction, setFinalPrediction] = useState("");
  let [lucky, setLucky] = useState(false);

  let answerForm = questions.map((ans, idx) => (
    <option value={ans} key={idx}>
      {ans}
    </option>
  ));

  function handleQuestion(e) {
    setQuestion(e.target.value);
  }

  function pickAnswer() {
    // Picks a random Number for us
    let random = Math.floor(Math.random() * answers.length);

    let choosenAnswer = answers[random].value;
    setAnswer(choosenAnswer);

    let scoreData = answers[random].score;
    setScore(scoreData);

    setCounter(counter + 1);

    // If we are lucky, it will run again if the score is below average
    if (lucky && score < 49) {
      let random = Math.floor(Math.random() * answers.length);
      let choosenAnswer = answers[random].value;
      setAnswer(choosenAnswer);
    }

    // ################## Prediction ####################

    let questionPrediction = {
      value: question ? question : questions[0],
      totalScore: score,
      prediction: answer,
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

        setFinalPrediction(finalPredictionResult.value);

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

    // ################## Frequency ####################

    let intitalData = {
      value: choosenAnswer,
      score,
      frequency: 1,
    };

    // If nothing is in frequencyData
    if (!frequencyData.data.length) {
      setFrequencyData({
        data: [...frequencyData.data, intitalData],
      });
    }

    function ifIncludes2() {
      let result = true;
      frequencyData.data.map((el) => {
        if (el.value === choosenAnswer) return (result = false);
      });
      return result;
    }

    frequencyData.data &&
      frequencyData.data.map((el) => {
        // If i reuse the function ifIncludes, it breaks my code and adds repetative data
        let result = ifIncludes2();
        // let result = ifIncludes(choosenAnswer, predictionData.data);


        // if new answer is not inside array, add it
        if (result) {
          setFrequencyData({
            data: [...frequencyData.data, intitalData],
          });
        }

        if (el.value === choosenAnswer) {
          // Runs twice, if answer is already in array
          // Had to modify frequency++ to add only 0.5
          setFrequencyData((prevState) => ({
            ...prevState,
            frequency: (el.frequency = el.frequency + 0.5),
          }));
        }
      });
  }

  function luckyPicked() {
    setLucky(true);
    pickAnswer();
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Stranger Things Magic 8 Ball Questions
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          onInput={handleQuestion}
        >
          {answerForm}
        </NativeSelect>
        <div>
          <span>
            <Button className="button" onClick={pickAnswer} variant="outlined">
              Shake the Magic 8 ball!
            </Button>
          </span>{" "}
          <span>
            <Button className="button" variant="outlined" onClick={luckyPicked}>
              Luck is on my side!
            </Button>
          </span>
        </div>
      </FormControl>
      <div className='answer'>The Magic 8 Ball says!!</div>
      <div className='answer'>{'>>'} {answer}</div>
    </Box>
  );
}
