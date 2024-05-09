"use client";
import Heading from "@/components/Heading";
import ImageUploader from "@/components/ImageUploader";
import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ColorFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(3).regex(/^#/, {
    message: "String must be a valid hex code."
  }),
});

type ColorFormValue = z.infer<typeof formSchema>;

const ColorForm: FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Colors" : "Create Colors"
  const description = initialData ? "Edit a Colors" : "Add a New Colors"
  const toastMessage = initialData ? "Colors updated." : "Colors Created."
  const action = initialData ? "Save Changes" : "Create"
  
  const form = useForm<ColorFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || ""
    }
  });
  const router = useRouter()
  const params = useParams()
  const onSubmit = async (data: ColorFormValue) => {
    console.log(data)
    try {
        setLoading(true)
        if(initialData){
          await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
        } else {
          await axios.post(`/api/${params.storeId}/colors`, data)
        }
        router.refresh()
        router.push(`/${params.storeId}/colors`)
        toast.success(toastMessage)
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true)
      axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
      router.refresh()
      window.location.assign(`/${params.storeId}/colors`)
      toast.success("Size deleted")
    } catch (error) {
      toast.error("Make sure to remove all products first using this size.")
    } finally{
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
    <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete}/>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {
          initialData && (
            <Button disabled={loading} variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
          )
        }
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                    <Input
                      disabled={loading}
                      placeholder="Color Value"
                      {...field}
                    />
                    <div 
                      className="border p-4 rounded-full"
                      style={{backgroundColor: field.value}}
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="" disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForm;
