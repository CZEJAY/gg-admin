import React from 'react'
import prismadb from '@/lib/prismadb'
import {CategoryCollumn } from './_component/columns'
import {format} from "date-fns"
import CategoryClient from './_component/Client'

const CategoriesPage = async ({
  params
}: {
  params: {storeId: string}
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
        billboard: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const formattedCategories: CategoryCollumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billBoardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryClient data={formattedCategories} />
        </div>
    </div>
  )
}

export default CategoriesPage