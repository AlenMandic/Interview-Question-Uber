import React from "react";
import '../style.css';

type ourProps = {
    amount: number,
}

export default function InteractiveShape({amount}: ourProps) {

  let arrayOfShapes = []

  for(let i = 0; i < amount; i++) {
    arrayOfShapes.push(<div className="int-shape" key={i}></div>)
  }

  return <div className="shape-container">
   {arrayOfShapes.map(shape => shape)}
   </div>

}