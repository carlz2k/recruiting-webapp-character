import { useState } from "react";
import { CharacterAttributesEdit } from "./CharacterAttributesEdit";
import { CharacterClass } from "./CharacterClass";
import { CharacterSkillsEdit } from "./CharacterSkillsEdit";
import { SkillCheck } from "./SkillCheck";

export const CharacterEdit = (props) => {
  const [shouldExpand, expand] = useState(false);

  const [character] = useState(
    props?.originalCharacter
  );

  return (
    <div>
      <div>
        <h2>{character.name}</h2> <button onClick={() => {
          expand(!shouldExpand);
        }}>{shouldExpand ? 'Close' : 'Expand'}</button>
      </div>
      {
        shouldExpand && (
          <div>
            <table>
              <tbody>
                <tr>
                  <td><CharacterAttributesEdit {...props} character={character} /></td>
                  <td><CharacterSkillsEdit {...props} character={character} /></td>
                  <td><CharacterClass character={character} /></td>
                  <td><SkillCheck character={character} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};
