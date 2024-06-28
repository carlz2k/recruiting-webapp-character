import { useState } from "react";
import { CLASS_LIST } from "../consts";
import { CharacterClassDetail } from "./CharacterClassDetail";

const CHARACTER_CLASS_NAMES = Object.keys(CLASS_LIST)

export const CharacterClass = () => {
  const [classSelected, setClassSelected] = useState('');

  return (
    CHARACTER_CLASS_NAMES.map(
      (name) => (
        <div key={name}>
          <a href="#" onClick={()=>{
            setClassSelected(name);
          }}><h3>{name}</h3></a>
          {
            (name === classSelected) ? (
              <CharacterClassDetail attributes={CLASS_LIST[name]}/>
            ) : (
              <></>
            )
          }
        </div>
      )
    )
  );
} 