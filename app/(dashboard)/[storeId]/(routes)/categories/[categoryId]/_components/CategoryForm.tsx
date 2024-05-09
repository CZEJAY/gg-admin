"use client";
import Heading from "@/components/Heading";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[] | null
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValue = z.infer<typeof formSchema>;

const CategoryForm: FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Create Category"
  const description = initialData ? "Edit a Category" : "Add a New Category"
  const toastMessage = initialData ? "Category updated." : "Category Created."
  const action = initialData ? "Save Changes" : "Create"
  
  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      billboardId: initialData?.billboardId || ""
    }
  });
  const router = useRouter()
  const params = useParams()
  const onSubmit = async (data: CategoryFormValue) => {
    console.log(data)
    try {
        setLoading(true)
        if(initialData){
          await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
        } else {
          await axios.post(`/api/${params.storeId}/categories`, data)
        }
        router.refresh()
        window.location.assign(`/${params.storeId}/categories`)
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
      axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success("Category deleted")
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select 
                  disabled={loading} 
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                         defaultValue={field.value}
                         placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        billboards?.map((billboard) => (
                          <SelectItem 
                            key={billboard.id}
                            value={billboard.id}
                          >
                            {billboard.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
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

export default CategoryForm;
