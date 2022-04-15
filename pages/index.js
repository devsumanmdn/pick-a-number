import Head from "next/head";
import { useEffect, useState } from "react";
import AvatarGenerator from "../lib/AvatarGenerator";
import PlayerModal from "../src/Components/PlayersModal";

import classes from "../styles/Home.module.css";

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
  "One Embarassing moment",
  "Best time in your life ",
  "Country you live in",
  "Pets",
  "Sports you play",
  "Talents",
  "Plan on getting married",
  "Future career choice",
  "Favorite subject",
];

const avatar = new AvatarGenerator();

function getUniqueColor(n) {
  const rgb = [0, 0, 0];

  for (let i = 0; i < 24; i++) {
    rgb[i % 3] <<= 1;
    rgb[i % 3] |= n & 0x01;
    n >>= 1;
  }

  return (
    "#" +
    rgb.reduce(
      (a, c) => (c > 0x0f ? c.toString(16) : "0" + c.toString(16)) + a,
      ""
    )
  );
}

const getPlayersObject = (addCount, prevCount = 0) => {
  return Array(addCount)
    .fill(0)
    .map((_, index) => {
      return {
        id: index + prevCount,
        color: getUniqueColor(index + prevCount),
        name: "",
        avatarSeedTry: 1,
        avatar: avatar.generateRandomAvatar(`Player ${index + prevCount}`),
      };
    });
};

export default function Home() {
  const [number, setNumber] = useState("");
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [parsedQuestion, setParsedQuestion] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playersModalOpen, setPlayersModalOpen] = useState(false);

  const init = () => {
    const parsed = data
      .sort(() => 0.5 - Math.random())
      .map((question, index) => ({ id: index, question }));

    setParsedQuestion(parsed);
    setNumber("");
    setUsedNumbers([]);
    setPlayers(getPlayersObject(2));

    const parsedQuestionString = Buffer.from(JSON.stringify(parsed)).toString(
      "base64"
    );
    localStorage.setItem("set", parsedQuestionString);
  };

  useEffect(() => {
    const parsedQuestionDataString = localStorage.getItem("set");

    if (parsedQuestionDataString) {
      const usedNumbersDataString = localStorage.getItem("taken");
      const playersDataString = localStorage.getItem("plrs");
      const parsedArray = JSON.parse(
        Buffer.from(parsedQuestionDataString, "base64").toString()
      );
      const playersArray = JSON.parse(
        Buffer.from(playersDataString, "base64").toString()
      );

      setParsedQuestion(parsedArray);
      setPlayers(playersArray);

      if (usedNumbersDataString) {
        const usedParsistedArray = JSON.parse(
          Buffer.from(usedNumbersDataString, "base64").toString()
        );

        setUsedNumbers([...usedParsistedArray]);
        setNumber(usedParsistedArray.slice(-1)[0]);
      }
    } else {
      init();
    }
  }, []);

  useEffect(() => {
    const dataString = Buffer.from(JSON.stringify(usedNumbers)).toString(
      "base64"
    );

    localStorage.setItem("taken", dataString);
  }, [usedNumbers]);

  useEffect(() => {
    setPlayersModalOpen(true);

    const dataString = Buffer.from(JSON.stringify(players)).toString("base64");
    localStorage.setItem("plrs", dataString);
  }, [players]);

  const handleNumber = (id) => {
    setUsedNumbers((existingNumbers) => [...existingNumbers, id]);
    setNumber(id);
  };

  const handleReset = async () => {
    const isOk = await confirm("Are you sure? All progress will be lost!");

    if (isOk) {
      init();
    }
  };

  const addPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      getPlayersObject(1, prevPlayers.length)[0],
    ]);
  };

  const questionToView = parsedQuestion[number]?.question;

  return (
    <div className={classes.container}>
      <Head>
        <title>Pick a Number</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <h1 className={classes.title}>Welcome to the GAME!</h1>
        <h2 className={classes.help}>Pick a number</h2>

        {questionToView ? (
          <>
            <h2>{questionToView ? `Quesion: ${questionToView}?` : ""}</h2>
            <button onClick={() => setNumber("")}>Done</button>
          </>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gridTemplateRows: "auto auto",
              }}
            >
              {parsedQuestion.map(({ id }) => (
                <button
                  disabled={usedNumbers.includes(id)}
                  role={"button"}
                  key={id}
                  onClick={() => handleNumber(id)}
                  style={{
                    margin: 4,
                    gridColumn: "auto",
                    minWidth: 30,
                    height: 30,
                    border: "2px solid #5aa",
                    borderRadius: 4,
                  }}
                >
                  {id}
                </button>
              ))}
            </div>

            {usedNumbers.length ? (
              <button onClick={handleReset}>Reset Game</button>
            ) : null}
          </>
        )}
      </main>
      <PlayerModal
        open={playersModalOpen}
        onClose={() => setPlayersModalOpen(false)}
        players={players}
        setPlayers={setPlayers}
        generateAvatar={avatar.generateRandomAvatar}
        addPlayer={addPlayer}
      />

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={classes.logo} />
        </a>
        &nbsp; |&nbsp;
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
