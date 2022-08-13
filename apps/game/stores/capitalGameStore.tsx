import { countries, Country } from "countries-list";
import create from "zustand";

export enum GameStatus {
  PLAYING = "PLAYING",
  COMPLETE = "COMPLETE",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export type GameStatusType = keyof typeof GameStatus;
export type GameStateSliceType = {
  guesses: string[];
  guess: string;
  hintCount: number;
  isCorrect: boolean;
};

export type CapitalGameStore = {
  gameStatus: GameStatusType;
  country: Country;
  guesses: string[];
  guessInputValue: string;
  hintCount: number;
  gameStateSlices: GameStateSliceType[];
  incrementHintCount: () => void;
  setGameStateSlices: () => void;
  setGuessInputValue: (value: string) => void;
  setGameStatus: (gameStatus: GameStatusType) => void;
  setGuesses: (guess: string) => void;
};

export const useCapitalGameStore = create<CapitalGameStore>((set) => ({
  country: countries.JP,
  gameStatus: GameStatus.PLAYING,
  guesses: [],
  guessInputValue: "",
  hintCount: 0,
  gameStateSlices: [],
  incrementHintCount: () =>
    set((state) => ({ ...state, hintCount: state.hintCount + 1 })),
  setGameStateSlices: () =>
    set((state) => {
      const currentGuess = [...state.guesses].pop()?.toLocaleLowerCase().trim();
      const isCorrect =
        currentGuess === state.country.capital.toLocaleLowerCase();
      return {
        ...state,
        gameStateSlices: [
          ...state.gameStateSlices,
          {
            guesses: state.guesses,
            hintCount: state.hintCount,
            isCorrect,
            guess: state.guessInputValue,
          },
        ],
      };
    }),
  setHintCount: () =>
    set((state) => ({ ...state, hintCount: state.hintCount + 1 })),
  setGuessInputValue: (value) =>
    set((state) => ({
      ...state,
      guessInputValue: value,
    })),
  setGameStatus: (gameStatus: GameStatusType) =>
    set((state) => ({
      ...state,
      gameStatus,
    })),
  setGuesses: (guess) =>
    set((state) => ({
      ...state,
      guesses: [...state.guesses, guess.toLocaleLowerCase().trim()],
    })),
}));
