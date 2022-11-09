export const highlightString = (
  queryString: string,
  search: string
): JSX.Element => {
  const matchString = search.split(new RegExp(`(${queryString})`, "gi"));
  return (
    <>
      {matchString.map((string, index) => {
        return string === queryString ? (
          <strong key={index}>{string}</strong>
        ) : (
          <span key={index}>{string}</span>
        );
      })}
    </>
  );
};
