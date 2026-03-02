import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

/* ============================= */
/* TYPES */
/* ============================= */

type WeeklyRow = {
  week: string;
  total: number;
  present: number;
};

/* ============================= */
/* COMPONENT */
/* ============================= */

const AttendanceGrid = () => {
  const gridApiRef = useRef<GridApi | null>(null);

  const [rowData, setRowData] = useState<WeeklyRow[]>([
    { week: "2026-W01", total: 5, present: 4 },
    { week: "2026-W02", total: 6, present: 5 },
  ]);

  /* ============================= */
  /* COLUMN DEFINITIONS */
  /* ============================= */

  const columnDefs = useMemo<ColDef<WeeklyRow>[]>(() => [
    {
      headerName: "Week",
      field: "week",
      editable: false,
      minWidth: 120,
    },
    {
      headerName: "Total",
      field: "total",
      editable: true,
      type: "numericColumn",
    },
    {
      headerName: "Present",
      field: "present",
      editable: true,
      type: "numericColumn",
    },
    {
      headerName: "Attendance %",
      valueGetter: (params) => {
        const total = params.data?.total ?? 0;
        const present = params.data?.present ?? 0;
        if (total === 0) return "0%";
        return ((present / total) * 100).toFixed(2) + "%";
      },
      editable: false,
    },
  ], []);

  const defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
  };

  /* ============================= */
  /* GRID EVENTS */
  /* ============================= */

  const onGridReady = (event: GridReadyEvent) => {
    gridApiRef.current = event.api;
  };

  const onCellValueChanged = (event: CellValueChangedEvent<WeeklyRow>) => {
    const { data } = event;

    // Validation: present cannot exceed total
    if (data.present > data.total) {
      data.present = data.total;
    }

    // Force grid refresh
    gridApiRef.current?.refreshCells({ force: true });

    // Trigger React state update (important for overall calc)
    setRowData((prev) => [...prev]);
  };

  /* ============================= */
  /* OVERALL CALCULATION */
  /* ============================= */

  const overallTotal = rowData.reduce(
      (sum, r) => sum + (Number(r.total) || 0),
      0
  );

  const overallPresent = rowData.reduce(
      (sum, r) => sum + (Number(r.present) || 0),
      0
  );

  const overallPercent =
      overallTotal === 0 ? 0 : (overallPresent / overallTotal) * 100;

  /* ============================= */
  /* RENDER */
  /* ============================= */

  return (
      <div className="space-y-6">
        <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "100%" }}
        >
          <AgGridReact<WeeklyRow>
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
              stopEditingWhenCellsLoseFocus={true}
          />
        </div>

        {/* Overall Summary */}
        <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
          <h3 className="font-semibold mb-3 text-lg">
            Overall Attendance
          </h3>

          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-text-muted">Total Classes</div>
              <div className="font-medium">{overallTotal}</div>
            </div>

            <div>
              <div className="text-text-muted">Present</div>
              <div className="font-medium">{overallPresent}</div>
            </div>

            <div>
              <div className="text-text-muted">Percentage</div>
              <div className="font-medium">
                {overallPercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AttendanceGrid;