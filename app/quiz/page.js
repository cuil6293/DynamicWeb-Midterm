"use client";
import { useState } from "react";
import styles from "../page.module.css";
import data from "../questionData.json";
import ResultCard from "../components/ResultCard";
import Link from "next/link";

const score = 0;

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const answerClick = (addScore) => {
    setScore((prevScore) => prevScore + addScore);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < data.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    if (score > 0) {
      return <ResultCard score={score} />;
    } else {
      return <ResultCard score={1} />;
    }
  }

  const currentQuestion = data[currentQuestionIndex];

  return (
    <div className={styles.quiz}>
      <main>
        <Link href={"/"} className={styles.quizGoBack}>
          <h1>Go Back</h1>
        </Link>
        <div className={styles.quizWrapper}>
          <h2>{currentQuestion.title}</h2>
          <p>{currentQuestion.question}</p>
          <img src={currentQuestion.image} alt="Image for the question" />
        </div>
        <div className={styles.quizAnswerWrapper}>
          {currentQuestion.answers.map((answer, i) => (
            <button key={i} onClick={() => answerClick(answer.addScore)}>
              {answer.answerText}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
