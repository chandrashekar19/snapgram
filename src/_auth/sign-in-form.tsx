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
import { SignInValidation } from "@/lib/validations";
import Loader from "@/components/shared/loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/contexts/auth-context";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {
    // console.log("we are in");
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      // console.log({ session });

      if (!session) {
        toast({
          title: "Something went wrong. Please login with your new account",
        });

        navigate("/sign-in");

        return;
      }

      const isLoggedIn = await checkAuthUser();

      // console.log({ isLoggedIn });

      if (isLoggedIn) {
        form.reset();

        // console.log("NAVIGATING");

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center  flex-col pt-5 sm:pt-12">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold">Login to your account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          Welcome back! Please enter your details.
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
        className="flex flex-col gap-5 w-full mt-4"
      >
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
          {isSigningInUser || isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
        <p className="text-small-regular text-light-2 text-center ">
          Don't have an account?
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

export default SigninForm;
