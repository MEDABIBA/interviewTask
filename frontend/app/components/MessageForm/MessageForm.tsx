"use client";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useEditMessageMutation,
  usePostMessageMutation,
} from "@/app/services/messages";
import { useEffect, useState } from "react";

const MessageForm = ({ data }: { data?: { id: number; message: string } }) => {
  const [isEdit, setIsedit] = useState(false);
  const [postMessage] = usePostMessageMutation();
  const [editMessage] = useEditMessageMutation();
  const formSchema = z.object({
    message: z
      .string()
      .min(2, {
        message: "Message must be at least 2 characters.",
      })
      .max(120, {
        message: "A lot of text for aliens",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: data?.message ?? "message is undefined",
    },
  });
  useEffect(() => {
    form.reset({ message: data?.message ?? "" });
    setIsedit((prev) => (data?.message ? true : false));
  }, [data?.id]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEdit && data?.id !== undefined) {
        console.log("edit line");
        // console.log(values);
        const response = await editMessage({
          id: data.id,
          message: values.message,
        });
        if (response.data) {
          toast.success(response.data);
          setIsedit(false);
          // console.log(response.data)
        } else {
          toast.error("message already exist");
        }
      } else {
        console.log("post line");
        const response = await postMessage(values);
        if (response.data) {
          toast.success(response.data);
          setIsedit(false);
          // console.log(response.data)
        } else {
          toast.error("message already exist");
        }
      }
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="message" {...field} />
              </FormControl>
              <FormDescription>Input your message to aliens</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="button" type="submit">
          {isEdit ? "Edit" : "Submit"}
        </Button>{" "}
      </form>
    </Form>
  );
};
export default MessageForm;
