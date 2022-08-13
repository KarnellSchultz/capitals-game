export type GuessGridItemProps = {
  guess: string;
  hintCount: number;
  isCorrect: boolean;
};
const GuessGridItem = ({ guess, hintCount, isCorrect }: GuessGridItemProps) => {
  const gridItemDetailStyles = `flex items-center justify-center border-2 h-8 col-span-1 rounded`;
  const gridItemGuessStyles = `h-full col-span-5 flex justify-center border-2 items-center rounded uppercase`;

  return (
    <>
      <div className={gridItemGuessStyles}>{guess}</div>
      <div className={gridItemDetailStyles}>{hintCount}</div>
      <div className={gridItemDetailStyles}>{isCorrect ? "🟩" : "🟥 "}</div>
    </>
  );
};

const EmptyGridItem = () => (
  <div className="h-8 col-span-7 bg-slate-200 border-2 rounded"></div>
);

export const GuessGridContainer = () => {
  const gridItemsArray = new Array(6).fill(null);

  return (
    <div className="w-full grid gap-1 grid-cols-7 text-center">
      <GuessGridItem guess="hello" hintCount={1} isCorrect={false} />
      <EmptyGridItem />
      {gridItemsArray.map((_gridItem, idx) => {
        return <EmptyGridItem key={idx} />;
        // return <GuessGridItem guess="hello" hintCount={1} isCorrect={false} />;
      })}
    </div>
  );
};
