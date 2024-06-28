
export const CharacterAttributesEdit = (
  {
    character = {},
    onCharacterUpdate,
  }
) => {
  const handleAttributeUpdate = (attributeName, isIncreasing) => {
    character.increaseAttribute(attributeName, isIncreasing ? 1 : -1);
    onCharacterUpdate(character);
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
                      {attr.name}: {attr.points} (Modifier: {attr.modifier})<button onClick={() => {
                        handleAttributeUpdate(attr.name, true)
                      }}>+</button><button onClick={() => {
                        handleAttributeUpdate(attr.name, false)
                      }}>-</button>
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
}