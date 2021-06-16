import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const data = [
  "Girl BFF",
  "Guy BFF",
  "Crush",
  "Ever fall in love",
  "Favorite food",
  "Last text",
  "Battery percentage",
  "Eye color",
  "Addiction",
  "Favorite song",
  "Favorite animal",
  "Favorite color",
  "Shoe size",
  "Sing in the shower",
  "First kiss",
  "Insecure",
  "Ever self-harmed",
  "Who you love",
  "Miss anyone",
  "Hair color",
  "Relationship status",
  "Last song you heard",
  "Biggest fear",
  "Believe in ghost",
  "Something you hate",
  "Favorite TV show",
  "Favorite movie",
  "Favorite book",
  "Favorite food",
  "Jealous of",
  "Star sign",
  "Middle name",
  "Worst habbit",
  "Number of siblings",
  "Name of siblings",
  "One wish",
  "One",
  "Best time in your life ",
  "Country you live in",
  "Pets",
  "Sports you",
  "Talents",
  "play",
  "Embarassing moment",
  "Plan on getting married",
  "Future career choice",
  "Favorite subject",
];

export default function Home() {
  const [number, setNumber] = useState("");
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [parsedQuestion, setParsedQuestion] = useState([]);

  useEffect(() => {
    setParsedQuestion(data.sort(() => 0.5 - Math.random()));
    setUsedNumbers([]);
    setNumber("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsedNumbers((existingNumbers) => [...existingNumbers, number]);
    setNumber("");
  };

  const questionToView = parsedQuestion[usedNumbers[usedNumbers.length - 1]];
  const isQuestionforCurrNumber = !!parsedQuestion[number];

  return (
    <div className={styles.container}>
      <Head>
        <title>Pick a Number</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the GAME!</h1>
        <h1 className={styles.title}>Pick a number</h1>
        {usedNumbers.includes(number) && (
          <p style={{ color: "tomato" }}>Already used number</p>
        )}
        {!!number && !isQuestionforCurrNumber && (
          <p style={{ color: "tomato" }}>
            No question available for this number
          </p>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button
            type="submit"
            disabled={usedNumbers.includes(number) && isQuestionforCurrNumber}
          >
            Confirm
          </button>
        </form>
        <h2>{questionToView ? `Quesion: ${questionToView}?` : ""}</h2>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
        By{" "}
        <a
          href="https://sumankundu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suman Kundu
        </a>
      </footer>
    </div>
  );
}
