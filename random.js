import {
  Box,
  InputLabel,
  FormControl,
  NativeSelect,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { questions } from "../db/database";
import { answers } from "../db/database";

import { DataContext } from "../../context/questionData";
import "./QuestionForm.css";

export default function QuestionForm() {
  let { data, setData, counter, setCounter, questionData, setQuestionData } =
    useContext(DataContext);

  let [question, setQuestion] = useState("");

  let answerForm = questions.map((ans, idx) => (
    <option value={ans} key={idx}>
      {ans}
    </option>
  ));

  function handleQuestion(e) {
    setQuestion(e.target.value);
  }

  console.log("questionData", questionData.data);

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

  function pickAnswer() {
    let random = Math.floor(Math.random() * answers.length);

    let choosenAnswer = answers[random].value;
    let score = answers[random].score;

    setData({ ...data, activeAnswer: choosenAnswer });
    setCounter(counter + 1);

    let intitalData = {
      value: choosenAnswer,
      score,
      frequency: 1,
    };

    let questionPrediction = {
      question: question ? question : questions[0],
      score: questionData.data[0].score + score,
      count: questionData.data[0].count + 1,
    }
    

    questionData.data && questionData.data.map((el) => {
      let result = ifIncludes(el.question, question, questionData.data)
      console.log('result',result)

      if(result) {
        setQuestionData({
          data: [
            ...questionData.data,
            questionPrediction,
          ],
        });
      }
    });

    // If nothing is in predictions
    if (!data.predictions.length) {
      setData({
        predictions: [...data.predictions, intitalData],
      });
      // setQuestionData({
      //   data: [
      //     {
      //       question: data.activeQuestion,
      //       score,
      //       count: 1,
      //     },
      //   ],
      // });
    }

    // custom includes function
    function ifIncludes(value1, value2, arr) {
      let result = true;
      arr.map((el) => {
        if (value1 === value2) return (result = false);
      });
      return result;
    }

    data.predictions &&
      data.predictions.map((el) => {
        let result = ifIncludes(el.value, choosenAnswer, data.predictions);

        // if new answer is not inside array, add it
        if (result) {
          setData({
            predictions: [...data.predictions, intitalData],
          });
        }

        if (el.value === choosenAnswer) {
          // Runs twice, if answer is already in array
          // Had to modify frequency++ to add only 0.5
          setData((prevState) => ({
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
