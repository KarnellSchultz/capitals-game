import { countries } from "countries-list";
import { countriesList } from "../constants/countries";
import { Nav } from "ui";
import { useState } from "react";
import { GuessGridContainer } from "../components/GuessGridContainer";

export default function Web() {
  const [country] = useState(countries.AU);



  return (
    <div className="flex justify-center items-center flex-col mx-2 text-gray-700">
      <div className="w-1/2 flex justify-center items-center flex-col mx-2">
        <Nav />
        <h2 className="text-6xl my-4 font-bold text-gray-700">
          {country.name}
        </h2>
        <h2 className="text-6xl my-4">{country.emoji}</h2>

        <GuessGridContainer />

        <input
          className="w-full shadow appearance-none border border-blue-500
        rounded py-2 px-3 my-2 text-gray-700 mb-1 leading-tight
        focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="capital"
          value={"hello"}
        ></input>
        <button className="w-full rounded py-2 px-6 border-2">Guess</button>
        <button className="w-full rounded py-2 px-6 my-2 border-2">Hint</button>
      </div>
    </div>
  );
}
