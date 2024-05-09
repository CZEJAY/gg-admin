

import Heading from '@/components/Heading'
import prismadb from '@/lib/prismadb'
import React from 'react'
import ProductForm from './_components/ProductForm'

const ProductPage = async ({
    params
}: {
    params: {productId: string, storeId: string}
}) => {
    let product = null
    if(params.productId !== "new"){
        product = await prismadb.product.findFirst({
            where: {
                id: params.productId
            },
            include: {
                images: true
            }
        })
    }

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const colors = await prismadb.colors.findMany({
        where: {
            storeId: params.storeId
        }
    })
    
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-8">
            <ProductForm 
            // @ts-ignore
            initialData={product} 
            colors={colors}
            sizes={sizes}
            categories={categories}
            />
        </div>
    </div>
  )
}

export default ProductPage