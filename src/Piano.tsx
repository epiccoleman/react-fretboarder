import * as React from "react";

import { useState } from "react";

/**
 * Renders an SVG Piano with 2 octaves of keys.
 */
export type PianoProps = {
    octaves: number
    renderNoteLabels?: boolean
}

const pianoData = {
    white: [
        {
            note: "C",
            id: "c",
            dot: false
        }
    ]
}

export const Piano = (props: PianoProps) => {
    const {
        octaves, renderNoteLabels
    } = props

    const PIANO_HEIGHT = 420;
    const NOTE_NAMES_AREA_HEIGHT = 52;
    const DIAGRAM_PADDING = 4;
    const WHITE_KEYS = octaves * 7;
    const WHITE_KEY_WIDTH = 60;
    const PIANO_WIDTH = WHITE_KEYS * WHITE_KEY_WIDTH;
    const BLACK_KEY_WIDTH = (WHITE_KEY_WIDTH * 2) / 3;
    const BLACK_KEY_HEIGHT = (PIANO_HEIGHT * 2) / 3;
    const WHITE_KEY_DOT_Y = PIANO_HEIGHT - ((PIANO_HEIGHT - BLACK_KEY_HEIGHT) / 2)
    const BLACK_KEY_DOT_Y = (BLACK_KEY_HEIGHT * 2 / 3)
    const DOT_RADIUS = 12
    const KEY_CORNER_RADIUS = 6

    const DIAGRAM_HEIGHT = PIANO_HEIGHT + ( renderNoteLabels ? NOTE_NAMES_AREA_HEIGHT : 0 ) + DIAGRAM_PADDING * 2
    const DIAGRAM_WIDTH = PIANO_WIDTH + DIAGRAM_PADDING * 2

    let whiteKeyXLocations: number[] = [];
    for (let i = 0; i < WHITE_KEYS; i++) {
        whiteKeyXLocations.push(i * WHITE_KEY_WIDTH);
    }

    let blackKeyXLocations: number[] = [];
    for (let i = 0; i < octaves; i++) {
        blackKeyXLocations.push(whiteKeyXLocations[1 + i*7] - (WHITE_KEY_WIDTH / 2))
        blackKeyXLocations.push(whiteKeyXLocations[2 + i*7] - (WHITE_KEY_WIDTH / 2))
        blackKeyXLocations.push(whiteKeyXLocations[4 + i*7] - (WHITE_KEY_WIDTH / 2))
        blackKeyXLocations.push(whiteKeyXLocations[5 + i*7] - (WHITE_KEY_WIDTH / 2))
        blackKeyXLocations.push(whiteKeyXLocations[6 + i*7] - (WHITE_KEY_WIDTH / 2))
    }

    const roundedRectPath = (x1, x2, y1, y2, corner_radius = KEY_CORNER_RADIUS) => {
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
    <svg style={{maxHeight: "100%", maxWidth: "100%"}}  viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}>
        <g transform={`translate(${DIAGRAM_PADDING},${DIAGRAM_PADDING})`} > {/* this g exists only for the sake of adding padding to the diagram */}
                <g id="white-keys" fill="white" stroke="black" strokeWidth={"0.5"} >
                {whiteKeyXLocations.map((x1) => {
                    const x2 = WHITE_KEY_WIDTH
                    const y1 = 0;
                    const y2 = PIANO_HEIGHT;

                    const whiteKeyPath = roundedRectPath(0, x2, y1, y2)

                    return <g transform={`translate(${x1},0)`}>
                        <path d={whiteKeyPath} />
                        <circle cx={WHITE_KEY_WIDTH / 2} cy={WHITE_KEY_DOT_Y} r={DOT_RADIUS} stroke="black" fill="black" shapeRendering="geometricPrecision"  />
                        </g>
                })}
            </g>
            <g id="black-keys" fill="black">
                {blackKeyXLocations.map((x1) => {
                    const x2 = BLACK_KEY_WIDTH
                    const y1 = 0
                    const y2 = BLACK_KEY_HEIGHT

                    const blackKeyPath = roundedRectPath(0, x2, y1, y2)

                    return <g transform={`translate(${x1},0)`} >
                            <path d={blackKeyPath} />
                            <circle cx={BLACK_KEY_WIDTH / 2} cy={BLACK_KEY_DOT_Y} r={DOT_RADIUS} stroke="white" fill="white" shapeRendering="geometricPrecision"  />
                        </g>
                })}
            </g>

            {/* this is kinda gross, redo */}
            {renderNoteLabels && <g transform={`translate(0, ${PIANO_HEIGHT + 10})`} id="note-names">
                <g transform={`translate(0, 0)`} id="black-key-names">
                    {["C#/Db", "D#/Eb", "F#/Gb", "G#/Ab", "A#/Bb", "C#/Db", "D#/Eb", "F#/Gb", "G#/Ab", "A#/Bb"].map((note, i) => {
                        return <text style={{dominantBaseline: "hanging" , textAnchor: "middle", fontFamily: "sans-serif", fontSize: "6px"}} x={blackKeyXLocations[i]}>
                            {note}
                        </text>
                    })}
                </g>
                <g transform={`translate(0, 10)`} id="white-key-names">
                    {["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"].map((note, i) => {
                        return <text style={{dominantBaseline: "hanging" , textAnchor: "middle", fontFamily: "sans-serif", fontSize:"10px"}} x={whiteKeyXLocations[i] + WHITE_KEY_WIDTH / 2}>
                            {note}
                        </text>
                    })}
                </g>
            </g>}
        </g>
    </svg>
  );
};
