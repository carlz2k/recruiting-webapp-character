import { useState } from "react";
import { Character } from "../models/Charater";
import { CharacterAttributesEdit } from "./CharacterAttributesEdit";
import { CharacterSkillsEdit } from "./CharacterSkillsEdit";

export const CharacterEdit = (props) => {
  const [character] = useState(
    // make original value immutable
    props?.originalCharacter || new Character()
  );

  return (
    <div>
      <table style={{
        borderCollapse: 'collapse',
        border: 'none'
      }}>
        <tbody>
          <tr>
            <td><CharacterAttributesEdit {...props} character={character} /></td>
            <td><CharacterSkillsEdit {...props} character={character} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
