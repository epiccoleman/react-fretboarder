import * as React from "react";
import { render } from "@testing-library/react";
import { VerticalFretboard } from './VerticalFretboard';

it('renders correctly', () => {
  const renderedFb = render(<VerticalFretboard />)
  expect(renderedFb).toMatchSnapshot();
});