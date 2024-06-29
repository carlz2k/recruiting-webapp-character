import { useEffect, useMemo, useState } from "react";
import { useCharacterService } from "../context/ServicesProvider";
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
  const characterService = useCharacterService();

  const [characters, updateCharacters] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const characterList = useMemo(() => {
    return Object.values(characters);
  }, [characters]);

  const updateCharacter = (character) => {
    updateCharacters({ ...characters, [character.id]: character });
  };

  const addNewCharacter = () => {
    const newCharacter = characterService.create();
    updateCharacter(newCharacter);
  }

  const loadCharacters = async () => {
    const charactersObject = {};
    const characters = await characterService.getAll();
    characters.forEach(
      (character) => {
        charactersObject[character?.id] = character;
      }
    )
    updateCharacters(charactersObject);
  }

  const saveCharacter = async () => {
    setIsSaving(true);
    await characterService.save(Object.values(characters));
    setIsSaving(false);
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div>
      <button onClick={addNewCharacter}>
        Add a new character
      </button>

      <button onClick={saveCharacter} disabled={isSaving}>
        Save Characters
      </button>

      <CharacterClass />

      <table style={{
        borderCollapse: 'collapse',
        border: 'none'
      }}>
        {
          characterList.map(
            (character) => (
              <tr key={character.id}>
                <td>
                  <CharacterEdit originalCharacter={character} onChange={updateCharacter} />
                </td>
              </tr>
            )
          )
        }
      </table>
    </div>
  )
};