"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const [Loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values);
            toast.success("Created Store")
            console.log(response.data)
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            tittle="Create Store"
            description="Add a new store to manage product and categories"
            isOpen={StoreModal.isOpen}
            onclose={StoreModal.onClose}
        >
        <div>
            <div className="space-y-4 py-4 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={Loading} 
                                        placeholder="E-Commerce"
                                         {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       <div className="pt-6 space-x-2 flex items-center justify-end">
                            <Button 
                            disabled={Loading}
                            variant={"outline"}
                            onClick={StoreModal.onClose}
                            >Cancel</Button>
                            <Button disabled={Loading} type="submit">Continue</Button>
                       </div>

                    </form>
                </Form>
            </div>
        </div>
        </Modal>
    )
}