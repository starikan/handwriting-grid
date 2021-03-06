import { Property } from 'csstype';
import { sizes } from './models/pageSizes/pageSizesInit';
// STROKES

export interface Stroke {
  width: number;
  color: Property.BorderBottomColor;
  style: Property.BorderBottomStyle;
}

export type StrokeExtend = Stroke & { percent: number };

interface CellParams {
  width: number;
  height: number;
  border: { top: number; left: number; right: number; bottom: number };
  left: number;
  top: number;
}

export interface StrokesParams {
  strokesStyle?: Stroke;
  vertical?: Array<number | StrokeExtend>;
  horizontal?: Array<number | StrokeExtend>;
  diagonalUp?: Array<number | StrokeExtend>;
  diagonalDown?: Array<number | StrokeExtend>;
}

// CELL

export type CellType = {
  borderWidth?: number;
  borderWidthStrict?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  borderColor?: Property.Color;
  borderColorStrict?: {
    top: Property.Color;
    left: Property.Color;
    right: Property.Color;
    bottom: Property.Color;
  };
  borderStyle?: Property.BorderInlineStyle;
  borderStyleStrict?: {
    top: Property.BorderInlineStyle;
    left: Property.BorderInlineStyle;
    right: Property.BorderInlineStyle;
    bottom: Property.BorderInlineStyle;
  };
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  fontFamily?: Property.FontFamily;
  fontSize?: number;
  conture?: boolean;
  grid?: StrokesParams;
};

// BLOCK

export type BlockStyle = {
  position: Property.Position;
  left: number;
  top: number;
};

export interface BlockType {
  positionX?: number;
  positionY?: number;
  cells?: CellType[];
  multiply?: Array<{
    times: number;
    distance: number;
    direction: number;
  }>;
}

// PAGE
export interface PageType {
  id: string;
  width: number;
  height: number;
  visible: boolean;
  blocks: string[];
  color?: string;
  padding?: number;
  margin?: number;
  border?: number;
  shape?: unknown;
  angle?: number;
  externalUrl?: string;
}