import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Chip from "@mui/material/Chip";
import React, { useTime, useRef, useEffect } from 'react'

function App() {
  const [questions, setQuestions] = useState([
    {
      question: "Html Stands For _______________________",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },
    {
      question: "Css Stands For _______________________",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "Js Stands For _______________________",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "Dom Stands For _______________________",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "Ram Stands For _______________________",
      options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correctAns: "Random Acccess Memory",
    },
    {
      question: "Rom Stands For _______________________",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  let checkQuestion = (a, b) => {
    if (a == b) {
      setScore(score + 1);
    }
    if (indexNumber + 1 == questions.length) {
      setShowResult(true);
    } else {
      setIndexNumber(indexNumber + 1);
    }
  };

  return (
    <div className="App">
     {showResult?<h1>your percentage is {(score/questions.length)*100}</h1>: <Box>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h6">
            Question # {indexNumber + 1}/{questions.length}
          </Typography>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h5">
            {questions[indexNumber].question}
          </Typography>
        </Box>
        <Box>
          <Grid container>
            {questions[indexNumber].options.map((x, i) => (
              <Grid key={i} item md={6}>
                <Chip
                  onClick={() =>
                    checkQuestion(x, questions[indexNumber].correctAns)
                  }
                  label={x}
                />
              </Grid>
            ))}
          </Grid>
        </Box>        
      </Box>}
    </div>
  );
}
const Countdown = () => {

  const Ref = useRef(null);

  const [timer, setTimer] = useTime('00:00:00');


  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }


  const startTimer = (e) => {
      let { total, hours, minutes, seconds } 
                  = getTimeRemaining(e);
      if (total >= 0) {

          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }


  const clearTimer = (e) => {
   
      setTimer('00:00:10');

      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }

  const getDeadTime = () => {
      let deadline = new Date();

      deadline.setSeconds(deadline.getSeconds() + 10);
      return deadline;
  }

  useEffect(() => {
      clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
      clearTimer(getDeadTime());
  }

  return (
      <div className="App">
          <h2>{timer}</h2>
          <button onClick={onClickReset}>Reset</button>
      </div>
  )
}

export default App;
