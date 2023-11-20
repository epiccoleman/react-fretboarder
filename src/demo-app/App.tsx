import * as React from "react";
import { useState } from "react";


import "./App.css"
import { VerticalFretboard } from '../VerticalFretboard';
import { Piano } from '../Piano';

export function App() {
  return <>
    {/* <VerticalFretboard /> */}
    <Piano />
  </>
}