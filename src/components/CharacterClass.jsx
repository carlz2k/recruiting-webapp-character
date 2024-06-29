import { useState } from "react";
import { CLASS_LIST } from "../consts";
import { CharacterClassDetail } from "./CharacterClassDetail";

const CHARACTER_CLASS_NAMES = Object.keys(CLASS_LIST)

export const CharacterClass = ({
  character
}) => {
  const [classSelected, setClassSelected] = useState('');

  return (
    CHARACTER_CLASS_NAMES.map(
      (name) => (
        <div key={name}>
          <a href="#" onClick={() => {
            setClassSelected(name);
          }}>{character?.isClass(name) ? (<h2 style={{
            color: 'red'
          }}>{name}</h2>) : (<h4>{name}</h4>)}</a>
          {
            (name === classSelected) ? (
              <CharacterClassDetail attributes={CLASS_LIST[name]} />
            ) : (
              <></>
            )
          }
        </div>
      )
    )
  );
} 