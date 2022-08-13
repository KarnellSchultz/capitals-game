import { GuessGridContainer } from "../components/GuessGridContainer";
import { Nav } from "../components/Nav";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { GameStatus, useCapitalGameStore } from "../stores/capitalGameStore";
import { HintDetails } from "../components/HintDetails";

const MAX_GUESSES = 6;

export default function Web() {
  const country = useCapitalGameStore(({ country }) => country);
  const hintCount = useCapitalGameStore(({ hintCount }) => hintCount);
  const incrementHintCount = useCapitalGameStore(
    ({ incrementHintCount }) => incrementHintCount
  );
  const setGameStateSlices = useCapitalGameStore(
    ({ setGameStateSlices }) => setGameStateSlices
  );
  const gameStateSlices = useCapitalGameStore(
    ({ gameStateSlices }) => gameStateSlices
  );
  const guesses = useCapitalGameStore(({ guesses }) => guesses);
  const setGuesses = useCapitalGameStore(({ setGuesses }) => setGuesses);
  const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus);
  const setGameStatus = useCapitalGameStore(
    ({ setGameStatus }) => setGameStatus
  );
  const guessInputValue = useCapitalGameStore(
    ({ guessInputValue }) => guessInputValue
  );
  const setGuessInputValue = useCapitalGameStore(
    ({ setGuessInputValue }) => setGuessInputValue
  );

  const isCorrect = guesses.includes(country.capital.toLocaleLowerCase());

  useEffect(() => {
    if (isCorrect) {
      setGameStatus(GameStatus.COMPLETE);
    }
  }, [isCorrect, setGameStatus]);

  const guessCount = new Set([...guesses]).size;

  const isWinner = gameStatus === GameStatus.COMPLETE && isCorrect;
  const isLoser =
    gameStatus === GameStatus.COMPLETE &&
    !isCorrect &&
    guessCount === MAX_GUESSES;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGuessInputValue(e.currentTarget.value);
  };

  const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGuesses(guessInputValue);
    setGameStateSlices();
    setGuessInputValue("");
  };

  return (
    <div className="flex justify-center items-center flex-col mx-2 text-gray-700">
      <div className="sm:w-1/2 w-full flex justify-center items-center flex-col mx-2 uppercase">
        <Nav />
        <h2 className="text-6xl my-4 text-center font-bold text-gray-700">
          {country.name}
        </h2>
        <h2 className="text-6xl my-4">{country.emoji}</h2>

        <HintDetails />
        <GuessGridContainer />

        <form className="w-full" onSubmit={handleGuessSubmit}>
          <input
            className="w-full shadow appearance-none border border-blue-600
          rounded py-2 px-3 my-2 text-gray-700 mb-1 leading-tight
          focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="capital"
            value={guessInputValue}
            onChange={handleInputChange}
          ></input>
        </form>
        <button className="w-full rounded py-2 px-6 border-2">Guess</button>
        <button
          onClick={incrementHintCount}
          className="w-full rounded py-2 px-6 my-2 border-2"
        >
          Hint
        </button>
        {gameStatus === GameStatus.COMPLETE && "WOOOTT"}
      </div>
    </div>
  );
}
