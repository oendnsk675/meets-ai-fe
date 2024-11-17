import { type RefObject, useEffect, useState } from "react";
import { type GridLayoutDefinition } from "../utils/grid";
import { GRID_LAYOUTS } from "../utils/grid";
import { selectGridLayout } from "../utils/grid";

export function useGridLayout(
  gridRef: RefObject<HTMLElement>,
  tileCount: number
): { layout: GridLayoutDefinition } {
  const [layout, setLayout] = useState<GridLayoutDefinition>(GRID_LAYOUTS[0]);

  useEffect(() => {
    const updateLayout = () => {
      if (gridRef.current) {
        const { width, height } = gridRef.current.getBoundingClientRect();
        const newLayout = selectGridLayout(
          GRID_LAYOUTS,
          tileCount,
          width,
          height
        );
        setLayout(newLayout);

        gridRef.current.style.setProperty(
          "--col-count",
          newLayout.columns.toString()
        );
        gridRef.current.style.setProperty(
          "--row-count",
          newLayout.rows.toString()
        );
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [gridRef, tileCount]);

  return { layout };
}
