import { useState } from "react";
import { SKILL_LIST } from "../consts";
import { useRandomGenerator } from "../context/ServicesProvider";

export const SkillCheck = ({
  character,
  onSkillChange,
}) => {
  const randomGenerator = useRandomGenerator();
  const [skill, setSkill] = useState(SKILL_LIST[0].name);
  const [minPoints, setMinPoints] = useState(0);
  const [rolledPoints, setRolledPoints] = useState(0);

  const handleOnSkillSelected = (event) => {
    const selectedSkill = event.target.value;
    setSkill(selectedSkill);
    onSkillChange?.(selectedSkill);
  };

  const handleMinPointsChange = (event) => {
    const value = event.target.value;
    setMinPoints(Number.isInteger(parseInt(value)) ? value : 0);
  }

  const _getSkillTotalValue = () => {
    if (skill) {
      return character?.getSkill(skill)?.getTotalValue() || 0;
    }

    return 0;
  }

  const rollRandomPoints = () => {
    setRolledPoints(randomGenerator.nextInt(1, 20));
  }

  const totalSkillPonts = rolledPoints + _getSkillTotalValue();

  return (
    <div>
      <select onChange={handleOnSkillSelected}>
        {
          SKILL_LIST.map(
            (skill) => (
              <option value={skill.name} key={skill.name}>{skill.name}</option>
            )
          )
        }
      </select>
      <input type="text" onChange={handleMinPointsChange} />
      <button onClick={rollRandomPoints}>Roll</button>

      <p>DC: {minPoints}</p>
      <p>{character?.name}'s total {skill} skill points rolled: {totalSkillPonts}</p>
      <p>Pass the skill check? {totalSkillPonts >= minPoints ? 'Yes' : 'No'}</p>
    </div>
  )
};
