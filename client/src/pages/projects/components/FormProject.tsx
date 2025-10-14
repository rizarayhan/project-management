import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import ReactSelect from "react-select";
import delay from "@/lib/delay";
interface TagsOption {
  label: string;
  value: string;
}

const formSchema = z
  .object({
    projectId: z.string().optional().nullable(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    tags: z.array(z.string().min(1, { message: "Tags is required" })),
    dueDate: z.string().min(1, { message: "Due Date is required" }),
  })
  .superRefine((data, ctx) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.dueDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Due Date must be greater than today",
        path: ["dueDate"],
      });
    }
  });

const FormProject = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagsOption[]>([]);

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const getTags = async () => {
    try {
      const { data } = await apiClient.get("/tags");
      const result = data.map((tag: { tag_name: string }) => {
        return {
          label: tag.tag_name,
          value: tag.tag_name,
        };
      });
      setTags(result);
    } catch (error: any) {
      console.log(error);
      toast.error("Error getting tags");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: null,
      title: "",
      description: "",
      priority: "",
      tags: [],
      dueDate: "",
    },
  });

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.post("/project", values);
      toast.success(data.message, {
        onAutoClose: () => {
          setIsOpen(false);
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error creating project");
    }
  };

  useEffect(() => {
    if (isOpen) getTags();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Form Project</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleForm)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map((option: { label: string; value: string }, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <ReactSelect
                            options={tags}
                            isMulti
                            isClearable
                            placeholder="Select tags"
                            className="capitalize"
                            onChange={(value) => {
                              field.onChange(value ? value.map((item: { value: string }) => item.value) : []);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && <Loading />}
                      Save
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

export default FormProject;
