"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { calculateDiscountedPrice, cn, formatPrice } from "@/lib/utils";
import { formatter } from '@/lib/utils'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductCollumn = {
  id: string;
  name: string;
  price: string | number;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  isNew: boolean;
  isDiscounted: boolean;
  percentage: number;
  createdAt: string;
};

export const columns: ColumnDef<ProductCollumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isDiscounted",
    header: "Dicounted",
  },
  {
    accessorKey: "isNew",
    header: "New",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => (
      <div className="flex flex-col items-center gap-x-2">
        <small className={cn(
          "text-sm",
          row.original.percentage ? "line-through" : ""
        )}>₦{formatPrice(Number(row.original.price)) }</small>
        <small className="text-sm font-semibold">
        ₦{formatPrice(calculateDiscountedPrice(row.original.price as number, row.original.percentage, row.original.isDiscounted))}
        </small>
      </div>
    )
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div 
          className="h-6 w-6 rounded-full border"
          style={{
            backgroundColor: row.original.color
          }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
