import React from 'react'
import SizesClient from './_component/SizesClient'
import { SizesCollumn } from './_component/columns'
import {format} from "date-fns"
import prismadb from "../../../../../lib/prismadb"

const SizesPage = async ({
  params
}: {
  params: {storeId: string}
}) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const formattedSizes: SizesCollumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizesClient data={formattedSizes} />
        </div>
    </div>
  )
}

export default SizesPage