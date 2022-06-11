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

export default function QuestionForm() {
  let {
    counter,
    setCounter,
    predictionData,
    setPredictionData,
    frequencyData,
    setFrequencyData,
  } = useContext(DataContext);

  let [question, setQuestion] = useState(questions[0]);
  let [answer, setAnswer] = useState("");

  let answerForm = questions.map((ans, idx) => (
    <option value={ans} key={idx}>
      {ans}
    </option>
  ));

  function handleQuestion(e) {
    setQuestion(e.target.value);
  }

  // console.log("predictionData length: ", predictionData);

  /* Checks:
  if question is already inside
  if answer is already inside that question
    Once you add score, and increment counter

  Data:
    Add all the points up per question
    divide the points by the amount of that many
      return back a number a find the nearest answer

    Ex. score:
      25, 50, 100, 10, 0 = 185
      score / count  = result
      185   /   5    = 37
      Find nearest to 37, which is 25
      Return score value that is 25
*/

  // custom includes function
  function ifIncludes(value, arr) {
    let result = true;
    arr.map((el) => {
      if (el.value === value) return (result = false);
    });
    // console.log('Result', result);
    return result;
  }

  function pickAnswer() {
    let random = Math.floor(Math.random() * answers.length);

    let choosenAnswer = answers[random].value;
    let score = answers[random].score;

    setAnswer(choosenAnswer);
    setCounter(counter + 1);

    let intitalData = {
      value: choosenAnswer,
      score,
      frequency: 1,
    };

    let questionPrediction = {
      value: question ? question : questions[0],
      totalScore: score,
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

        if (el.value === question) {
          // Runs twice, if answer is already in array
          // Had to modify score to divide by 2
          setPredictionData((prevState) => ({
            ...prevState,
            totalScore: (el.totalScore = el.totalScore + score / 2),
          }));
        }
      });
    // ##################################################################
    // ##################################################################
    // ##################################################################
    // ##################################################################
    // ##################################################################
    // ##################################################################

    // If nothing is in frequencyData
    if (!frequencyData.data.length) {
      setFrequencyData({
        data: [...frequencyData.data, intitalData],
      });
    }
    console.log('counter', counter);
    frequencyData.data &&
      frequencyData.data.map((el) => {
        let result = ifIncludes(answer, frequencyData.data);

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

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl onSubmit={pickAnswer}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Stranger Things Magic 8 Ball Questions
        </InputLabel>
        <NativeSelect
          defaultValue={questions[0]}
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
            <Button
              className="button"
              type="submit"
              onClick={pickAnswer}
              variant="outlined"
            >
              Shake the Magic 8 ball!
            </Button>
          </span>{" "}
          <span>
            <Button className="button" variant="outlined">
              Luck is on my side!
            </Button>
          </span>
        </div>
        {/* <div>Question that is picked: {data.activeAnswer}</div> */}
      </FormControl>
    </Box>
  );
}
