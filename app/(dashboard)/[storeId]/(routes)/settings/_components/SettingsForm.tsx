"use client";
import Heading from "@/components/Heading";
import AlertModal from "@/components/modals/AlertModal";
import ApiAlert from "@/components/ui/ApiAlert";
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
import useOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter()
  const params = useParams()
  const onSubmit = async (data: SettingsFormValue) => {
    console.log(data)
    try {
        setLoading(true)
        await axios.patch(`/api/stores/${params.storeId}`, data)
        router.refresh()
        toast.success("Store Updated")
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true)
      axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store deleted")
    } catch (error) {
      toast.error("Make sure to remove all products and caftegories first.")
    } finally{
      setLoading(false)
      setOpen(false)
    }
  }

  const origin = useOrigin()
  return (
    <>
    <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete}/>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store Preference" />
        <Button disabled={loading} variant={"destructive"} size={"icon"} onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
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
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="" disabled={loading} type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
      title="NEXT_PUBLIC_API_URL" 
      description={`${origin}/api/${params.storeId}`}
      variant="public"/>
    </>
  );
};

export default SettingsForm;
