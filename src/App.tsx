import React, { useState } from "react";
import Header from "./components/Header";
import "./style.css";
import InteractiveShape from "./components/Shape";

// Initial 2D array for creating our shapes
const Shape_Data = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const resultsArray: number[] = [];

Shape_Data.forEach((row) => {
  const result = row.reduce((acc, curr) => acc + curr, 0);

  resultsArray.push(result);
});

let amountOfShapes = 0;
amountOfShapes = resultsArray.reduce((acc, curr) => acc + curr, 0);

export default function App() {
  const sequenceSet = new Set<HTMLDivElement>(); // Sets are perfect for this question as they can only contain unique items

  const [sequence, setSequence] = useState(sequenceSet);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;

    // Clicking on our interactive shapes sets them as active. Sets preserve the order of sequence.
    if (target.matches(".int-shape")) {
      // Adding to sequence set
      target.classList.add("sequence-active");
      setSequence(sequence.add(target));
    }

    // Once every shape is activated, we will reverse the sequence and de-activate them after a delay.
    if (sequence.size === amountOfShapes) {
      let arrayFromSet = Array.from(sequence).reverse();

      // We will schedule incrementing setTimeouts to de-select our shapes, every timeout will be 500ms more delayed.
      for (let i = 0; i < arrayFromSet.length; i++) {
        setTimeout(() => {
          arrayFromSet[i].classList.remove("sequence-active");
        }, 800 * i);
      }

      setSequence(new Set()); // reset set back to empty default Set.
    }
  }

  return (
    <>
      <Header />
      <div className="main-container" onClick={handleClick}>
        {resultsArray.map((item, index) => {
          return <InteractiveShape amount={item} key={index} />;
        })}
      </div>
    </>
  );
}
