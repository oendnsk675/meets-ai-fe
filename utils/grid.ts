export type GridLayoutDefinition = {
  name: string;
  columns: number;
  rows: number;
  minTiles: number;
  maxTiles: number;
  minWidth: number;
  minHeight: number;
};

export const GRID_LAYOUTS: GridLayoutDefinition[] = [
  {
    columns: 1,
    rows: 1,
    name: "1x1",
    minTiles: 1,
    maxTiles: 1,
    minWidth: 0,
    minHeight: 0,
  },
  {
    columns: 1,
    rows: 2,
    name: "1x2",
    minTiles: 2,
    maxTiles: 2,
    minWidth: 0,
    minHeight: 0,
  },
  {
    columns: 2,
    rows: 1,
    name: "2x1",
    minTiles: 2,
    maxTiles: 2,
    minWidth: 900,
    minHeight: 0,
  },
  {
    columns: 2,
    rows: 2,
    name: "2x2",
    minTiles: 3,
    maxTiles: 4,
    minWidth: 560,
    minHeight: 0,
  },
  {
    columns: 3,
    rows: 2,
    name: "3x3",
    minTiles: 5,
    maxTiles: 6,
    minWidth: 700,
    minHeight: 0,
  },
  {
    columns: 3,
    rows: 3,
    name: "3x3",
    minTiles: 5,
    maxTiles: 9,
    minWidth: 700,
    minHeight: 0,
  },
  {
    columns: 4,
    rows: 3,
    name: "4x3",
    minTiles: 10,
    maxTiles: 12,
    minWidth: 960,
    minHeight: 0,
  },
  {
    columns: 4,
    rows: 4,
    name: "4x4",
    minTiles: 10,
    maxTiles: 16,
    minWidth: 960,
    minHeight: 0,
  },
  {
    columns: 5,
    rows: 5,
    name: "5x5",
    minTiles: 17,
    maxTiles: 25,
    minWidth: 1100,
    minHeight: 0,
  },
];

export function selectGridLayout(
  layouts: GridLayoutDefinition[],
  tileCount: number,
  width: number,
  height: number
): GridLayoutDefinition {
  let currentLayoutIndex = 0;
  let layout = layouts.find((layout_, index, allLayouts) => {
    currentLayoutIndex = index;
    const isBiggerLayoutAvailable =
      allLayouts.findIndex(
        (l, i) => i > index && l.maxTiles === layout_.maxTiles
      ) !== -1;
    return layout_.maxTiles >= tileCount && !isBiggerLayoutAvailable;
  });

  if (!layout) {
    layout = layouts[layouts.length - 1];
    console.warn(
      `No layout found for: tileCount: ${tileCount}, width/height: ${width}/${height}. Fallback to biggest available layout (${layout?.name}).`
    );
  }

  if (layout && (width < layout.minWidth || height < layout.minHeight)) {
    if (currentLayoutIndex > 0) {
      const smallerLayout = layouts[currentLayoutIndex - 1];
      layout = selectGridLayout(
        layouts.slice(0, currentLayoutIndex),
        smallerLayout.maxTiles,
        width,
        height
      );
    }
  }

  return layout || layouts[0];
}
