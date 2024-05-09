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
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface BillBoardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillBoardFormValue = z.infer<typeof formSchema>;

const BillBoardForm: FC<BillBoardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard"
  const description = initialData ? "Edit a Billboard" : "Add a New Billboard"
  const toastMessage = initialData ? "Billboard updated." : "Billboard Created."
  const action = initialData ? "Save Changes" : "Create"
  
  const form = useForm<BillBoardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
      label: initialData?.label || ""
    }
  });
  const router = useRouter()
  const params = useParams()
  const onSubmit = async (data: BillBoardFormValue) => {
    console.log(data)
    try {
        setLoading(true)
        if(initialData){
          await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
        } else {
          await axios.post(`/api/${params.storeId}/billboards`, data)
        }
        router.refresh()
        router.push(`/${params.storeId}/billboards`)
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
      axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success("Billboard deleted")
    } catch (error) {
      toast.error("Make sure to remove all categories first using this billboard.")
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUploader 
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button className="" disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillBoardForm;
