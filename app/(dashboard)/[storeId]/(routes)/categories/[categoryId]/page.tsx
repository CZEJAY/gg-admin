

import Heading from '@/components/Heading'
import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './_components/CategoryForm'

const BillboardPage = async ({
    params
}: {
    params: {categoryId: string, storeId: string}
}) => {
    let category = null
    if(params.categoryId !== "new"){
        category = await prismadb.category.findFirst({
            where: {
                id: params.categoryId
            }
        })
    }

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })
    
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-8">
            <CategoryForm billboards={billboards} initialData={category} />
        </div>
    </div>
  )
}

export default BillboardPage