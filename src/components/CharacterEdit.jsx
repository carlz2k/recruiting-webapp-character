import { useEffect, useState } from "react";
import { CharacterAttributesEdit } from "./CharacterAttributesEdit";
import { CharacterSkillsEdit } from "./CharacterSkillsEdit";
import { CharacterClass } from "./CharacterClass";

export const CharacterEdit = (props) => {
  const [shouldExpand, expand] = useState(false);

  const [character] = useState(
    // make original value immutable
    props?.originalCharacter
  );

  return (
    <div>
      <span><h2>{character.name}</h2> <button onClick={() => {
        expand(!shouldExpand);
      }}>Expand</button></span>
      {
        shouldExpand && (
          <table style={{
            borderCollapse: 'collapse',
            border: 'none'
          }}>

            <tbody>
              <tr>
                <td><CharacterAttributesEdit {...props} character={character} /></td>
                <td><CharacterSkillsEdit {...props} character={character} /></td>
                <td><CharacterClass character={character} /></td>
              </tr>
            </tbody>
          </table>
        )
      }
    </div>
  );
};
