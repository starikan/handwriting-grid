import { Property } from 'csstype';

// Define the structure of DocumentType
export interface DocumentType {
  // document ID, required field
  id: string;

  // document name, optional field
  name?: string;

  // an array of pages, required field
  pages: Array<string | PageType>;

  // short link to document, optional field
  shortLink?: string;
}

// Type definition for the Page interface:
export interface PageType {
  // Unique identifier of the page
  id: string;

  // Size of the page
  size: PageSizesType;

  // Specifies whether the page is visible or not
  visible: boolean;

  // Array of strings representing the blocks in the page
  blocks: BlockType[];

  // Optional style of the page
  style?: PageStyleType;

  // Optional URL to an external source
  externalUrl?: string;
};

export interface PageStyleType {
  // Color property, it's optional and has a string type.
  color?: string;

  // Padding property, it's optional and hasnumber type.
  padding?: number;

  // Margin property, it's optional and has number type.
  margin?: number;

  // Border property, it's optional and has number type.
  border?: number;

  // Shape property, it is an object that stores path and angle.
  shape?: {
    // Path of the shape, it's required and has a string type.
    path: string;

    // Angle of the shape, it's optional and has number type.
    angle?: number;
  };
};

/**
 * PageSizesType type defines the size of a page.
 */
export interface PageSizesType {
  /**
   * width is the width of the page.
   *
   * Measurements are made in units of measurement specified in the field 'dimension'
   */
  width: number;

  /**
   * height is the height of the page.
   *
   * Measurements are made in units of measurement specified in the field 'dimension'
   */

  height: number;

  /**
   * dimension is an optional property that defines the unit of measurement for the page's size.
   */
  dimension?: 'cm' | 'mm' | 'inch' | 'px';

  /**
   * rotate is an optional property that defines the rotation of the page.
   */
  rotate?: 0 | 90 | 180 | 270;
};

// Definition of a block to be placed on document page.
export interface BlockType {
  position: {
    top: number; // Top position of the block in pixels or percent
    left: number; // Left position of the block in pixels or percent
  };
  size?: {
    width: number; // Optional width of the block in pixels or percent
    height: number; // Optional height of the block in pixels or percent
  };
  cells: CellType[]; // List of cells within the block
};

// Definition of cell structure
export interface CellType {
  style: string | CellStyleType; // Style definition for the cell
  styleText: string | CellStyleTextType;
  size: {
    width: number; // Width of the cell in pixels or percent
    height: number; // Height of the cell in pixels or percent
    dimension?: 'px' | '%'; // Unit used for width/height (pixels or percent)
  };
  position: {
    left: number; // Position of left edge of the cell in pixels or percent
    top: number; // Position of top edge of the cell in pixels or percent
    dimension?: 'px' | '%'; // Unit used for left/top position (pixels or percent)
  };
  grid?: Array<CellStrokesType | string>; // Optional grid lines within the cell
};

// Definition of the cell stroke lines
export interface CellStrokesType {
  id: string;
  style?: string | CellStrokesStyleType; // Optional styles for the cell stroke
  start: {
    top: number; // Start position of the stroke from top of the cell
    left: number; // Start position of the stroke from left of the cell
    dimension?: 'px' | '%'; // Unit used for start position (pixels or percent)
  };
  size: {
    length: number; // Length of the stroke
    dimension?: 'px' | '%'; // Unit used for size (pixels or percent)
    angle: number; // Angle of the stroke
  };
};

// Definition of style for cell strokes
export interface CellStrokesStyleType {
  id: string;
  thick: number; // Thickness of stroke
  dimension?: 'px' | '%'; // Unit used forstroke thickness (pixels or percent)
  color: Property.BorderBottomColor; // Color of the stroke
  style: Property.BorderBottomStyle; // Style of the stroke, e.g. solid
  opacity: number;
  conture?: boolean; // Optional, whether the stroke surrounds only the cell content
};

// Definition of the style for cell content
export interface CellStyleType {
  id: string;
  color: Property.Color; // Color of the cell content
  opacity: number;
};

export interface CellStyleTextType {
  id: string;
  conture?: boolean; // Optional, inserts conture around the text
  fontFamily?: Property.FontFamily; // Optional, font family used by the text
  fontSize?: number; // Optional, size of the font used by the text
  opacity: number;
};