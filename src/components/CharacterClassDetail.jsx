
export const CharacterClassDetail = ({
  attributes
}) => {
  return (
    Object.keys(attributes).map(
      (key) => (
        <div>
          <p>{key}: {attributes[key]}</p>
        </div>
      )
    )
  );
}