import { useState } from "react";
import { CharacterClass } from "./CharacterClass";
import { CharacterEdit } from "./CharacterEdit";

/**
 * the main view
 * 
 * normally I'd like to use a state management library such as Redux
 * for managing states globally, but for a 2 hour exercise, we will just useState
 * to manage states locally
 * 
 * @returns main view component
 */
export const MainApp = () => {
  const [characters, updateCharacters] = useState({});
  const allIds = Object.keys(characters);

  const currentCharacter = allIds.length ? characters[allIds[0]] : undefined;
  const updateCharacter = (character) => {
    updateCharacters({...characters, [character.id]: character});
  };

  return (
    <div>
      <CharacterClass />
      <CharacterEdit character={currentCharacter} onChange={updateCharacter} />
    </div>
  )
};