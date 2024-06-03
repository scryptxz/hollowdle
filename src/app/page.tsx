"use client";
import Image from "next/image";
import HollowdleLogo from "@/assets/images/hollowdle-logo.png";
import CharactersData from "@/assets/json/characters_data.json";
import { FormEvent, Fragment, useEffect, useState } from "react";
import Suggestions from "@/components/suggestions";
import Guesses from "@/components/guesses";

interface CharactersDataInterface {
  name: string;
  characterIcon: string;
  location: string;
  locationIcon: string;
  health: number;
  geo_drop: number;
  gender: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestionsBox, setSuggestionsBox] = useState(false);
  const [charactersData, setCharactersData] = useState<
    CharactersDataInterface[]
  >([]);
  const [guessed, setGuessed] = useState(false);

  const [hints, setHints] = useState<CharactersDataInterface[]>([]);

  useEffect(() => {
    const filteredCharactersData = CharactersData.filter((e) =>
      e.name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())
    );

    setCharactersData(filteredCharactersData);
  }, [query]);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    setHints([]);
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log(data.get("characterValue"));
    setGuessed(true);

    const selectedCharacter = CharactersData.find(
      (a) => a.name === data.get("characterValue")
    );

    if (selectedCharacter) {
      setHints([...hints, selectedCharacter]);
    }
    setQuery("");
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center py-24"
      onClick={() => setSuggestionsBox(false)}
    >
      <Image
        src={HollowdleLogo}
        alt="Hollowdle logo"
        title="Logo generated by HOLLOW KNIGHT TITLE GENERATOR [https://prashantmohta.github.io/TitleGenerator.HollowKnight]"
        width={350}
        className="mb-12"
      />
      <form
        className="flex gap-2 text-neutral-200 px-6"
        onClick={(e) => e.stopPropagation()}
        onSubmit={formSubmit}
        autoComplete="false"
      >
        <div className="relative max-w-[40rem]">
          <input
            type="text"
            placeholder="Type a character name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSuggestionsBox(true);
            }}
            name="characterValue"
            onFocus={() => setSuggestionsBox(true)}
            // autoFocus
            size={200}
            className="w-full p-2 rounded bg-transparent border border-neutral-600"
          />
          {suggestionsBox && (
            <Suggestions
              charactersData={charactersData}
              setQuery={setQuery}
              setSuggestionsBox={setSuggestionsBox}
            />
          )}
        </div>
        <button className="bg-neutral-200 text-black px-4 rounded">
          Guess
        </button>
      </form>
      {guessed && (
        <div className="flex flex-col gap-12">
          {[...hints].reverse().map((e, i) => (
            <Fragment key={i}>
              <Guesses hints={e} index={i} guesses={hints} />
            </Fragment>
          ))}
        </div>
      )}
    </main>
  );
}
