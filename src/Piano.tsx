import * as React from "react";

import { useState } from "react";

const WHITE_KEYS = 14
const WHITE_KEY_WIDTH = 30;
const PIANO_WIDTH = WHITE_KEYS * WHITE_KEY_WIDTH;
const PIANO_HEIGHT = 210;
const BLACK_KEY_WIDTH = (WHITE_KEY_WIDTH * 2) / 3;
const BLACK_KEY_HEIGHT = (PIANO_HEIGHT * 2) / 3;

/**
 * Renders an SVG Piano with 2 octaves of keys.
 */
export const Piano = () => {

    const whiteKeyXLocations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390]
    const blackKeyLocations = [30, 60, 120, 150, 180, 240, 270, 330, 360, 390]

    const roundedRectPath = (x1, x2, y1, y2, corner_radius ) => {
        return [
            `M${x1},${y1}`,
            `H${x2}`,
            `V${y2 - corner_radius}`,
            `Q${x2},${y2},${x2 - corner_radius},${y2}`,
            `H${x1 + corner_radius}`,
            `Q${x1},${y2},${x1},${y2 - corner_radius}`,
            `V${y1}`
        ].join('')
    }

  return (
    <svg viewBox={`0 0 ${PIANO_WIDTH + 4} ${PIANO_HEIGHT + 4}`}>
        <g transform="translate(2,2)" > {/* this g exists only for the sake of adding padding to the diagram */}
            <g id="white-keys" fill="white" stroke="black" strokeWidth={"0.5"} >
            {whiteKeyXLocations.map((x1) => {
                const x2 = x1 + WHITE_KEY_WIDTH;

                const y1 = 0;
                const y2 = PIANO_HEIGHT;

                const corner_radius = 3;

                const whiteKeyPath = roundedRectPath(x1, x2, y1, y2, corner_radius)

                return <path d={whiteKeyPath} />
            })}
        </g>
        <g id="black-keys" fill="black">
            {blackKeyLocations.map((xCenter) => {
                const x1 = xCenter - (BLACK_KEY_WIDTH / 2)
                const x2 = x1 + BLACK_KEY_WIDTH
                const y1 = 0
                const y2 = BLACK_KEY_HEIGHT
                const corner_radius = 3

                const blackKeyPath = roundedRectPath(x1, x2, y1, y2, corner_radius)

                return <path d={blackKeyPath} />
            })}
        </g>
        </g>
    </svg>
  );
};
