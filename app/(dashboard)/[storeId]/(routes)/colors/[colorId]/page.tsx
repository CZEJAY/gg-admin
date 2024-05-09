

import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForm from './_components/ColorForm'

const ColorPage = async ({
    params
}: {
    params: {colorId: string}
}) => {
    let size = null
    if(params.colorId !== "new"){
        size = await prismadb.colors.findFirst({
            where: {
                id: params.colorId
            }
        })
    }
    
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-8">
            <ColorForm initialData={size} />
        </div>
    </div>
  )
}

export default ColorPage