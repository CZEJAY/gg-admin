"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"


export type CategoryCollumn = {
  id: string,
  name: string,
  billBoardLabel: string,
  createdAt: string
}

export const columns: ColumnDef<CategoryCollumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({row}) => row.original.billBoardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
