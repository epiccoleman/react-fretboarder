import * as React from "react";

import { useState } from "react";

export const VerticalFretboard = () => {
  return (
    <svg viewBox="0 0 400 1000">

        <g id='strings'>
        <line x1="50" y1="0" x2="50" y2="500" stroke="black" stroke-width="2"/>
        <line x1="100" y1="0" x2="100" y2="500" stroke="black" stroke-width="2"/>
        <line x1="150" y1="0" x2="150" y2="500" stroke="black" stroke-width="2"/>
        <line x1="200" y1="0" x2="200" y2="500" stroke="black" stroke-width="2"/>
        <line x1="250" y1="0" x2="250" y2="500" stroke="black" stroke-width="2"/>
        <line x1="300" y1="0" x2="300" y2="500" stroke="black" stroke-width="2"/>
        </g>

        <g id='frets'>
        <line x1="0" y1="100" x2="300" y2="100" stroke="black" stroke-width="2"/>
        <line x1="0" y1="200" x2="300" y2="200" stroke="black" stroke-width="2"/>
        <line x1="0" y1="300" x2="300" y2="300" stroke="black" stroke-width="2"/>
        <line x1="0" y1="400" x2="300" y2="400" stroke="black" stroke-width="2"/>
        <line x1="0" y1="500" x2="300" y2="500" stroke="black" stroke-width="2"/>
        </g>

        <circle cx="150" cy="200" r="10" fill="red"/>

        <text x="145" y="205" font-family="Verdana" font-size="15" fill="white">A</text>
    </svg>

  )
}
