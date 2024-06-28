
export const CharacterSkillsEdit = (
  {
    character = {},
    onCharacterUpdate,
  }
) => {
  const totalAvaialbleSkillPoints = character?.getTotalSkillPointsAvailable();

  const handleSkillUpdate = (skillName, isIncreasing) => {
    character.increaseSkill(skillName, isIncreasing);
    onCharacterUpdate(character);
  }

  return (
    <div>
      <div>
        <p>Total Skill Points Available: {totalAvaialbleSkillPoints}</p>
      </div>
      <table style={{
        borderCollapse: 'collapse',
        border: 'none'
      }}>
        <tbody>
          {
            character.skills.map(
              (skill) => (
                <tr style={
                  {
                    border: 'none'
                  }
                } key={skill.name}>
                  <td style={
                    {
                      border: 'none'
                    }
                  }>
                    <span>
                      {skill.name}: {skill.points} (Modifier: {skill.relatedAttribute.name}): {skill.relatedAttribute.modifier}
                      <button disabled={totalAvaialbleSkillPoints <= 0} onClick={() => {
                        handleSkillUpdate(skill.name, true)
                      }}>+</button> <button disabled={skill.points <= 0} onClick={() => {
                        handleSkillUpdate(skill.name, false)
                      }}>-</button> total: {skill.getTotalValue()}
                    </span>
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
};
