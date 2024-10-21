import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForm from "./_auth/sign-in-form";
import { Home } from "./_root/pages";
import SignUpForm from "./_auth/sign-up-form";
import AuthLayout from "./_auth/auth-layout";
import RootLayout from "./_root/root-layout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;