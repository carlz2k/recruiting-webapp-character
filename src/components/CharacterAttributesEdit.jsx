import { INTELLIGENCE_ATTRIBUTE, INTELLIGENCE_MODIFIER_MULTIPLIER, MAX_ATTRIBUTE_POINTS } from "../consts";

export const CharacterAttributesEdit = (
  {
    character = {},
    onChange,
  }
) => {
  const handleAttributeUpdate = (attributeName, isIncreasing) => {
    if (attributeName === INTELLIGENCE_ATTRIBUTE) {
      if (!isIncreasing && character?.getTotalSkillPointsAvailable() < INTELLIGENCE_MODIFIER_MULTIPLIER) {
        // ASSUMPTION: avoid decreasing intelligence attribute if
        // it is going to make total avialable skill points negative because then some of the skill points that already been
        // spent will have to be reset, which will make the behaviour more complicated.
        alert('Cannot decrease more Intelligence points because it will make total skill points avaiable negative.');

        return;
      }
    }

    character.increaseAttribute(attributeName, isIncreasing ? 1 : -1);
    onChange(character);
  }

  return (
    <div>
      <table style={{
        borderCollapse: 'collapse',
        border: 'none'
      }}>
        <tbody>
          {
            character.attributes.map(
              (attr) => (
                <tr style={
                  {
                    border: 'none'
                  }
                } key={attr.name}>
                  <td style={
                    {
                      border: 'none'
                    }
                  }>
                    <span>
                      {attr.name}: {attr.points} (Modifier: {attr.modifier})<button
                        disabled={character.getTotalAttributePoints() >= MAX_ATTRIBUTE_POINTS}
                        onClick={() => {
                          handleAttributeUpdate(attr.name, true)
                        }}>+</button><button disabled={attr.points <= 0} onClick={() => {
                          handleAttributeUpdate(attr.name, false)
                        }}>-</button>
                    </span>
                  </td>
                </tr>
              )
            )
          }
          <tr>Total Attributes: {character.getTotalAttributePoints()}</tr>
        </tbody>
      </table>
    </div>
  );
}