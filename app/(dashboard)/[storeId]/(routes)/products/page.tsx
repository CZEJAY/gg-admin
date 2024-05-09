import React from 'react'
import ProductClient from './_component/ProductClient'
import prismadb from '@/lib/prismadb'
import { ProductCollumn } from './_component/columns'
import {format} from "date-fns"

const ProductsPage = async ({
  params
}: {
  params: {storeId: string}
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const formattedProducts: ProductCollumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    isDiscounted: item.isDiscounted,
    isNew: item.isNew,
    percentage: item.percentage,
    price: item.price,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default ProductsPage