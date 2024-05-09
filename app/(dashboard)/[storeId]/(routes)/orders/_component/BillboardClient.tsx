"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import { OrderCollumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/ApiList";

interface OrderClientProps {
  data: OrderCollumn[];
}

const BillboardClient: FC<OrderClientProps> = ({ data }) => {
  
  return (
    <>
      <Heading
        title={`Orders ${
          data.length ?? <Loader className="animate-spin h-4 w-4" />
        }`}
        description="Manage Orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
      
    </>
  );
};

export default BillboardClient;
