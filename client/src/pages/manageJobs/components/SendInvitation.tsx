import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiClient from "@/config/axios";
import delay from "@/lib/delay";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  projectId: z.string().min(1, { message: "Project Id is required" }),
});

const SendInvitation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { projectId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      projectId: projectId,
    },
  });

  const handleSendInvitation = async (values: z.infer<typeof formSchema>) => {
    try {
      await delay(500);
      const { data } = await apiClient.post("/invitation/send", values);
      toast.success(data.message, {
        onAutoClose: () => {
          setIsOpen(false);
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
        >
          <Send size={16} />
          Send Invitation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Invitation</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSendInvitation)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      Send Invitation
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SendInvitation;
