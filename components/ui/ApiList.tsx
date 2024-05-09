"use client"
import useOrigin from '@/hooks/use-origin'
import { useParams } from 'next/navigation'
import React from 'react'
import ApiAlert from './ApiAlert'

interface ApiListProps {
    entityName: string,
    entityIdName: string
}

const ApiList: React.FC<ApiListProps> = ({
    entityIdName,
    entityName
}) => {
    const params = useParams()
    const origin = useOrigin()
    const baseUrl = `${origin}/api/${params.storeId}`
  return (
    <>
        <ApiAlert 
            title='GET'
            variant='public'
            description={ `${baseUrl}/${entityName}`}
        />
        <ApiAlert 
            title='GET'
            variant='public'
            description={ `${baseUrl}/{${entityIdName}}`}
        />
        <ApiAlert 
            title='POST'
            variant='admin'
            description={ `${baseUrl}/${entityName}`}
        />
        <ApiAlert 
            title='PATCH'
            variant='admin'
            description={ `${baseUrl}/${entityName}`}
        />
        <ApiAlert 
            title='DELETE'
            variant='admin'
            description={ `${baseUrl}/${entityName}`}
        />
    </>
  )
}

export default ApiList