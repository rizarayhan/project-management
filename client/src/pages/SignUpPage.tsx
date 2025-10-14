import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import delay from "@/lib/delay";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import apiClient from "@/config/axios.ts";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email().min(1, {
      message: "Email is required",
    }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.post("/auth/register", values);
      toast(data.message, {
        onAutoClose: () => {
          setIsLoading(false);
          navigate("/");
        },
      });
    } catch (error: any) {
      toast(error.response.data.message, {
        onAutoClose: () => {
          setIsLoading(false);
        },
      });
    }
    console.log(values);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-md max-w-lg">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Welcome to Project Management</h1>
          <p className="text-muted-foreground">Signup with your account or create account first</p>
        </div>
        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignup)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
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
                  disabled={isLoading}
                >
                  {isLoading && <Loading />}
                  Sign Up
                </Button>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
