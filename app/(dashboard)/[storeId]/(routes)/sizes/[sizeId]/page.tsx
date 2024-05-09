

import Heading from '@/components/Heading'
import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './_components/SizeForm'

const BillboardPage = async ({
    params
}: {
    params: {sizeId: string}
}) => {
    let size = null
    if(params.sizeId !== "new"){
        size = await prismadb.size.findFirst({
            where: {
                id: params.sizeId
            }
        })
    }
    
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-8">
            <BillBoardForm initialData={size} />
        </div>
    </div>
  )
}

export default BillboardPage