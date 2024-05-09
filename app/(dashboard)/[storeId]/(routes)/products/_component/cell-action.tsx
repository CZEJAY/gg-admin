"use client"
import React, { useState } from 'react'
import { ProductCollumn } from './columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/AlertModal'

interface CellActionProps {
    data: ProductCollumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Id Copied");
      };
      const onUpdate = (id: string) => {
        router.push(`/${params.storeId}/products/${id}`)
      }
      const onDelete = async () => {
        try {
          setLoading(true)
          axios.delete(`/api/${params.storeId}/products/${data.id}`)
          router.refresh()
          router.push(`/${params.storeId}/products`)
          toast.success("Product deleted")
        } catch (error) {
          toast.error("Something went wrong.")
        } finally{
          setLoading(false)
          setOpen(false)
        }
      }
  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={() => onDelete()} />
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
             variant={"ghost"}
             className='h-8 w-8 p-1'
            >
                <span className='sr-only'>open menu</span>
                <MoreHorizontal className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' >
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className='mr-2 h-4 w-4' />
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdate(data.id)}>
                <Edit className='mr-2 h-4 w-4' />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4 w-4' />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    </>
  )
}

export default CellAction