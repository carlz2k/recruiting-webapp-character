import { useEffect, useState } from "react";
import { SKILL_LIST } from "../consts";
import { SkillCheck } from "./SkillCheck";

export const PartySkillCheck = ({
  characters
}) => {
  const [shouldShowWidget, openWidget] = useState(false);
  const [skill, setSkill] = useState(SKILL_LIST[0].name);
  const [character, setCharacter] = useState();

  const _getCharacterTotalSkillValue = (character, skillName) => {
    const skillFound = character.getSkill(skillName);
    return skillFound?.getTotalValue() || 0;
  };

  const handleOpenWidgetClick = () => {
    openWidget(true);
  };

  const _getCharacterWithHighestSkillValue = () => {
    return Object.keys(characters).reduce(
      (currentCharacter, id) => {
        const nextCharacter = characters[id];
        if (currentCharacter) {
          const currentCharacterSkillValue = _getCharacterTotalSkillValue(currentCharacter, skill);
          const nextCharacterSkillValue = _getCharacterTotalSkillValue(nextCharacter, skill);
          if (nextCharacterSkillValue > currentCharacterSkillValue) {
            return nextCharacter;
          } else {
            return currentCharacter;
          }
        } else {
          return nextCharacter;
        }
      }, undefined
    );
  }

  useEffect(() => {

  })

  useEffect(() => {
    if (skill) {
      const characterWithHighestSkill = _getCharacterWithHighestSkillValue();

      if (characterWithHighestSkill) {
        setCharacter(characterWithHighestSkill);
      }
    }
  }, [skill, characters]);

  return (
    <div>
      <button onClick={handleOpenWidgetClick}><h3>Party Skill Check</h3></button>
      {
        shouldShowWidget ? (
          <div>
            <SkillCheck character={character} onSkillChange={
              (value) => {
                setSkill(value);
              }
            } />
          </div>
        ) : (<></>)
      }
    </div>
  )
};
