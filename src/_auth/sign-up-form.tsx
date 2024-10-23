import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SignUpValidation } from "@/lib/validations";
import Loader from "@/components/shared/loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { useCreateUserAccountMutation } from "@/lib/react-query/queries-and-mutations";

const SignUpForm = () => {
  const { toast } = useToast();
  const isLoading = true;

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccountMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.ss
  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // create the user .
    const newUser = createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed, Please try again.",
      });
    }
    console.log(newUser);

    // const session = signInAccount();
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center  flex-col pt-5 sm:pt-12">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use a snapgram enter your account details
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
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
                <Input type="email" className="shad-input" {...field} />
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
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="shad-button_primary" type="submit">
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader />
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center ">
          Already have an account?
          <Link
            className="text-primary-500 text-small-semibold ml-1"
            to="/sign-in"
          >
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
