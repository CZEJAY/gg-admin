

import Heading from '@/components/Heading'
import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './_components/BillBoardForm'

const BillboardPage = async ({
    params
}: {
    params: {billboardId: string}
}) => {
    let billboard = null
    if(params.billboardId !== "new"){
        billboard = await prismadb.billboard.findFirst({
            where: {
                id: params.billboardId
            }
        })
    }
    
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-8">
            <BillBoardForm initialData={billboard} />
        </div>
    </div>
  )
}

export default BillboardPage