import { GuessGridContainer } from "../components/GuessGridContainer";
import { Nav } from "../components/Nav";
import React, { FormEvent, useRef } from "react";
import { useCapitalGameStore } from "../stores/capitalGameStore";
import { HintDetails } from "../components/HintDetails";

import { Select } from "@mantine/core";
import { capitals } from "../constants/capitals";
import { countries } from "countries-list";

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
  const guesses = useCapitalGameStore(({ guesses }) => guesses);
  const setGuesses = useCapitalGameStore(({ setGuesses }) => setGuesses);
  // const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus);
  // const gameStateSlices = useCapitalGameStore(
  //   ({ gameStateSlices }) => gameStateSlices
  // );

  const guessCount = guesses.length;
  const hasGuessesRemaining = MAX_GUESSES > guessCount;
  const isCorrect = guesses.includes(country.capital.toLocaleLowerCase());
  const isLoser = !isCorrect && guessCount === MAX_GUESSES;
  const gameOver = !hasGuessesRemaining || isCorrect || isLoser;

  const hasHintsRemaining = country.capital.length <= hintCount;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuesses(inputRef.current?.value ?? "");
    setGameStateSlices();
  };

  const handleGuessClick = () => {
    setGuesses(inputRef.current?.value ?? "");
    setGameStateSlices();
  };

  return (
    <div className="w-screen grid grid-cols-7 overflow-hidden">
      <div className="col-start-2 col-span-5 md:col-start-3 md:col-span-3">
        <Nav />
        <div className="">
          <h2 className="text-3xl my-4 text-center font-bold text-gray-700 uppercase">
            {country.name}
          </h2>
          <h3 className="text-3xl text-center my-4">{country.emoji}</h3>
        </div>

        <HintDetails />
        <GuessGridContainer />

        {/* <form className="w-ful" onSubmit={handleGuessSubmit}> */}
        <Select
          ref={inputRef}
          className="w-full appearance rounded
        text-gray-700 my-1 leading-tight
        focus:outline-none focus:shadow-outline"
          searchable
          placeholder="capital"
          nothingFound="No capitals"
          data={[...capitals]}
          disabled={gameOver}
        />
        {/* </form> */}
        <button
          className="w-full rounded py-1 px-6 border-2
        hover:bg-slate-50
        disabled:bg-slate-300 disabled:cursor-not-allowed"
          onClick={handleGuessClick}
          disabled={gameOver}
        >
          Guess
        </button>
        <button
          className="w-full rounded py-1 px-6 my-2 border-2 
        hover:bg-slate-50
        disabled:bg-slate-300 disabled:cursor-not-allowed"
          onClick={incrementHintCount}
          disabled={gameOver || hasHintsRemaining}
        >
          Hint
        </button>
      </div>
    </div>
  );
}
