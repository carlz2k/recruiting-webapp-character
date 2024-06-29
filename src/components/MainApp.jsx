import { useEffect, useMemo, useState } from "react";
import { useCharacterService } from "../context/ServicesProvider";
import { CharacterEdit } from "./CharacterEdit";
import { PartySkillCheck } from "./PartySkillCheck";

/**
 * the main view
 * 
 * normally I'd like to use a state management library such as Redux
 * for managing states globally, but for a 2 hour exercise, we will just useState
 * to manage states locally.
 * 
 * @returns main view component
 */
export const MainApp = () => {
  const characterService = useCharacterService();

  const [characters, updateCharacters] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const charactersObject = {};
    const characters = await characterService.getAll();
    characters.forEach(
      (character) => {
        charactersObject[character?.id] = character;
      }
    )
    updateCharacters(charactersObject);
    setIsLoading(false);
  }

  const saveCharacter = async () => {
    setIsSaving(true);
    await characterService.save(Object.values(characters));
    setIsSaving(false);
  }

  const resetData = async () => {
    setIsSaving(true);
    await characterService.reset();
    updateCharacters([]);
    setIsSaving(false);
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <div>
      {
        !!characterList?.length && (
          <PartySkillCheck characters={characters} />
        )
      }

      <button onClick={addNewCharacter}>
        <h3>Add a new character</h3>
      </button>

      <button onClick={saveCharacter} disabled={isSaving}>
        <h3>Save Characters</h3>
      </button>

      <button onClick={resetData} disabled={isSaving}>
        <h3>Reset</h3>
      </button>
      {
        isLoading ? (<div>Loading...</div>) : (<></>)
      }
      <table>
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