"use client"
import { ImagePlus, Trash } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploaderProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}


const ImageUploader: FC<ImageUploaderProps> = ({
    onChange,
    onRemove,
    value,
    disabled
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!isMounted) {
        return null;
    }

  return (
    <div>
        <div className="flex mb-4 items-center gap-4">
            {
             value.map((url) => (
                <div key={url}  className="relative w-full h-[200px] rounded-sm overflow-hidden">
                    <div className="absolute z-10 top-2 right-2">
                        <Button type='button' onClick={() => onRemove(url)} variant={"destructive"} size={"icon"}>
                        <Trash className='h-4 w-4'/>
                        </Button>
                    </div>
                    <Image 
                     fill
                     className='w-full object-cover'
                     alt='Image'
                     src={url}
                    />
                </div>
             ))   
            }
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='JSO_Dremify'>
            {
                ({open}) => {
                    const onClick = () => {
                        open()
                    }

                    return (
                        <Button
                          type='button'
                          disabled={disabled}
                          variant={"secondary"}
                          onClick={onClick}
                        >
                            <ImagePlus className='h-4 w-4 mr-2'/>
                            Upload an Image
                        </Button>
                    )
                }

            }
        </CldUploadWidget>
    </div>
  )
}

export default ImageUploader