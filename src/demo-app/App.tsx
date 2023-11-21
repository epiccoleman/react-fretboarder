import * as React from "react";
import { useState } from "react";


import "./App.css"
import { VerticalFretboard } from '../VerticalFretboard';
import { Piano } from '../Piano';

export function App() {
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
    {/* <VerticalFretboard /> */}
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



export const PianoPropsForm = ({ onPropsChange }) => {
  const [octaves, setOctaves] = useState(1);
  const [renderNoteLabels, setRenderNoteLabels] = useState(false);

  const handleOctavesChange = (e) => {
    const newOctaves = parseInt(e.target.value, 10);
    setOctaves(newOctaves);
    onPropsChange({ octaves: newOctaves, renderNoteLabels });
  };

  const handleRenderNoteLabelsChange = (e) => {
    const newRenderNoteLabels = e.target.checked;
    setRenderNoteLabels(newRenderNoteLabels);
    onPropsChange({ octaves, renderNoteLabels: newRenderNoteLabels });
  };

  return (
    <div>
      <div>
        <label>
          Octaves:
          <input
            type="number"
            value={octaves}
            onChange={handleOctavesChange}
            min="1"
            max="10"
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
  );
};