import * as React from "react";
import { useState } from "react";


import "./App.css"
import { VerticalFretboard } from '../VerticalFretboard';
import { Piano } from '../Piano';

enum Components {
  Piano,
  VerticalFretboard
}

export function App() {

  const [displayedComponent, setDisplayedComponent] = useState(Components.Piano)

  return <>
    <div style={{display: "flex"}}>
      <button onClick={() => setDisplayedComponent(Components.Piano)}>Piano</button>
      <button onClick={() => setDisplayedComponent(Components.VerticalFretboard)}>VerticalFretboard</button>

    </div>
    { displayedComponent == Components.Piano && <PianoWithControls />}
    { displayedComponent == Components.VerticalFretboard && <VerticalFretboardWithControls />}
  </>
}

const PianoWithControls = () => {
  const [octaves, setOctaves] = useState(1);
  const [renderNoteLabels, setRenderNoteLabels] = useState(false);

  const handleOctavesChange = (e) => {
    const newOctaves = parseInt(e.target.value, 10);
    setOctaves(newOctaves);
  };

  const handleRenderNoteLabelsChange = (e) => {
    const newRenderNoteLabels = e.target.checked;
    setRenderNoteLabels(newRenderNoteLabels);
  };

  return <>
  <div id="container" style={{width: 'auto', height: '50vh', maxHeight: '50vh'}}>
    <Piano octaves={octaves} renderNoteLabels={renderNoteLabels}/>
    </div>
    <div id="controls">
      <div>
        <label>
          Octaves:
          <input
            type="number"
            value={octaves}
            onChange={handleOctavesChange}
            min="1"
            max="8"
          />
        </label>
      </div>
      <div>
        <label>
          Render Note Labels:
          <input
            type="checkbox"
            checked={renderNoteLabels}
            onChange={handleRenderNoteLabelsChange}
          />
        </label>
      </div>
    </div>
  </>
}

const VerticalFretboardWithControls = () => {
  return <>
    <div id="container" style={{width: 'auto', height: '50vh', maxHeight: '50vh'}}>
      <VerticalFretboard/>
    </div>
    <div id="controls">
      controls
    </div>
  </>
}