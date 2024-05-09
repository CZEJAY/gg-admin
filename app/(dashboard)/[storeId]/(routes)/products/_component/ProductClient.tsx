"use client"
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import { ProductCollumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/ApiList";

interface ProductClientProps {
  data: ProductCollumn[]
}

const ProductClient: FC<ProductClientProps> = ({
  data
}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length ?? <Loader className="animate-spin h-4 w-4"/>})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data}/>
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
