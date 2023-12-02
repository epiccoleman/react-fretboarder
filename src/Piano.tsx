import * as React from "react";

import { useState, useEffect } from "react";

/**
 * Renders an SVG Piano with 2 octaves of keys.
 */
export type PianoProps = {
    octaves: number
    renderNoteLabels?: boolean
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
    const OCTAVE_WIDTH = WHITE_KEY_WIDTH * 7;
    const PIANO_WIDTH = WHITE_KEYS * WHITE_KEY_WIDTH;
    const BLACK_KEY_WIDTH = (WHITE_KEY_WIDTH * 2) / 3;
    const BLACK_KEY_HEIGHT = (PIANO_HEIGHT * 2) / 3;
    const WHITE_KEY_DOT_Y = PIANO_HEIGHT - ((PIANO_HEIGHT - BLACK_KEY_HEIGHT) / 2)
    const BLACK_KEY_DOT_Y = (BLACK_KEY_HEIGHT * 2 / 3)
    const DOT_RADIUS = 12
    const KEY_CORNER_RADIUS = 6

    const DIAGRAM_HEIGHT = PIANO_HEIGHT + ( renderNoteLabels ? NOTE_NAMES_AREA_HEIGHT : 0 ) + DIAGRAM_PADDING * 2
    const DIAGRAM_WIDTH = PIANO_WIDTH + DIAGRAM_PADDING * 2

    const setupPianoData = () => {
        const initialPianoData = {
            whiteKeys: {},
            blackKeys: {}
        }

        const whiteKeyNotes = [ "C", "D", "E", "F", "G", "A", "B"]
        const blackKeyNotes = [ "C#/Db", "D#/Eb", "", "F#/Gb", "G#/Ab", "A#/Bb", ""]

        let whiteKeyXLocations: number[] = [];
        for (let octave = 0; octave < octaves; octave++) {
            for (let key = 0; key < 7; key++) {
                const id = `w-${octave}-${key}`
                const x = key * WHITE_KEY_WIDTH + (octave * OCTAVE_WIDTH )
                const note = whiteKeyNotes[key]

                whiteKeyXLocations.push(x);
                initialPianoData.whiteKeys[id] = { id, x, note, selected: false}
            }
        }

        for (let octave = 0; octave < octaves; octave++) {
           for (let key = 0; key < 7; key++)  {
             if (key !== 2 && key !== 6) {
                const id = `b-${octave}-${key}`
                const x = (whiteKeyXLocations[(key + 1) + octave*7] - (BLACK_KEY_WIDTH / 2))
                // const x = (key * WHITE_KEY_WIDTH) + (BLACK_KEY_WIDTH) + (octave * OCTAVE_WIDTH)
                const note = blackKeyNotes[key]
                initialPianoData.blackKeys[id] = { id, x, note, selected: false}
             }
           }
        }

        return initialPianoData
    }

    const initialPianoData = setupPianoData()

    const [pianoData, setPianoData] = useState(initialPianoData)

    /**
     * This is necessary to be able to consume changes to octaves from outside the component. It re-creates the initial data
     * and then uses the state hook to set it. The tricky bit is that this needs some extra logic to merge the data. If we go with a simple
     * approach and just spread the newInitial and the prevData together, the result will have keys that no longer exist in the diagram
     * if the number of octaves is decreasing. So we need to check if a key exists in the newInitial and if it does, use the "selected" property
     * from the matching key in prevData.
     */
    useEffect(() => {
        const newInitial = setupPianoData()
        setPianoData((prevData) => {
            console.log(`ue`)
            console.log(newInitial)
            console.log(prevData)

            const newWhiteKeys = {}
            Object.keys(newInitial.whiteKeys).forEach(keyId => {
                console.log(`trying to access ${keyId}`)
                if(prevData.whiteKeys[keyId]) {
                    newWhiteKeys[keyId] = {...newInitial.whiteKeys[keyId], selected: prevData.whiteKeys[keyId].selected || false}
                } else {
                    newWhiteKeys[keyId] = newInitial.whiteKeys[keyId]
                }
            })
            const newBlackKeys = {}
            Object.keys(newInitial.blackKeys).forEach(keyId => {
                if(prevData.blackKeys[keyId]) {
                    newBlackKeys[keyId] = {...newInitial.blackKeys[keyId], selected: prevData.blackKeys[keyId].selected}
                } else {
                    newBlackKeys[keyId] = newInitial.blackKeys[keyId]
                }
            })

            return {
                whiteKeys: newWhiteKeys,
                blackKeys: newBlackKeys
            }
        })
    }, [octaves])

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

    const onClickWhiteKey = (id) => {
        console.debug(`you clicked ${id}`)
        setPianoData((prevData) => {
            const newWhiteKeys = prevData.whiteKeys
            const oldKey = prevData.whiteKeys[id]
            newWhiteKeys[id] = { ...oldKey, selected: !oldKey.selected }
            return {
                ...prevData,
                whiteKeys: newWhiteKeys,
            }
        })
    }

    const onClickBlackKey = (id) => {
        console.debug(`you clicked ${id}`)
        setPianoData((prevData) => {
            const newBlackKeys = prevData.blackKeys
            const oldKey = prevData.blackKeys[id]
            newBlackKeys[id] = { ...oldKey, selected: !oldKey.selected }
            return {
                ...prevData,
                blackKeys: newBlackKeys,
            }
        })
    }

  return (
    <svg style={{maxHeight: "100%", maxWidth: "100%"}}  viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}>
        <g transform={`translate(${DIAGRAM_PADDING},${DIAGRAM_PADDING})`} > {/* this g exists only for the sake of adding padding to the diagram */}
                <g id="white-keys" fill="white" stroke="black" strokeWidth={"0.5"} >
                {Object.entries(pianoData.whiteKeys).map(([id, data]) => {
                    const x1 = data.x
                    const x2 = WHITE_KEY_WIDTH
                    const y1 = 0;
                    const y2 = PIANO_HEIGHT;

                    const whiteKeyPath = roundedRectPath(0, x2, y1, y2)

                    return <g onClick={() => {onClickWhiteKey(id)}} id={id} transform={`translate(${x1},0)`}>
                        <path d={whiteKeyPath} />
                        { data.selected && <circle cx={WHITE_KEY_WIDTH / 2} cy={WHITE_KEY_DOT_Y} r={DOT_RADIUS} stroke="black" fill="black" shapeRendering="geometricPrecision"  />}
                        </g>
                })}
            </g>
            <g id="black-keys" fill="black">
                {Object.entries(pianoData.blackKeys).map(([id, data]) => {
                    const x1 = data.x
                    const x2 = BLACK_KEY_WIDTH
                    const y1 = 0
                    const y2 = BLACK_KEY_HEIGHT

                    const blackKeyPath = roundedRectPath(0, x2, y1, y2)

                    return <g onClick={() => {onClickBlackKey(id)}} id={id} transform={`translate(${x1},0)`} >
                            <path d={blackKeyPath} />
                            { data.selected && <circle cx={BLACK_KEY_WIDTH / 2} cy={BLACK_KEY_DOT_Y} r={DOT_RADIUS} stroke="white" fill="white" shapeRendering="geometricPrecision"  />}
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