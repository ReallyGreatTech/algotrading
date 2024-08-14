import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/Form/FormInput";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import { apiClient } from "../redux/api/apiClient";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (data:unknown) => {
    setIsPending(true);
    try {
      
      const response = await apiClient.post("/login", data);

      // Save token or other necessary data
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard or another page
      navigate("/");

      // Optionally show success toast
      toast.success("Login successful!");
    } catch (error) {
      // Handle error and show error message
      const errorMessage =  "Login failed";

      toast.error(errorMessage);
      // Route to home page - remove when integrated
      navigate("/")
    } finally {
      setIsPending(false); // Stop the loading indicator
    }
  };


  return (
    <section className=" h-screen flex justify-center items-center">
      <div className="container max-w-3xl mx-auto text-white/90">
        <div className="mb-10 ">
          <h1 className="text-2xl font-semibold text-center">
            Login to Ripley
          </h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(data) => handleLogin(data)}
        >
          {() => (
            <div className="grid grid-cols-2 gap-5 text-white mb-10 max-w-lg  mx-auto ">
              <div className="col-span-2">
                <FormInput
                  label="Email or Username"
                  name="username"
                  placeholder="Enter username or email"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="col-span-2 flex justify-between">
                <span className="flex  gap-2  items-center  justify-center">
                  <input id="rememberMe" type="checkbox" className="h-3.5 w-3.5" />
                  <label htmlFor="rememberMe"> Remember Me</label>
                </span>
                <span className="text-violet-500 font-bold">
                  <a href="">Forgot your password? </a>
                </span>
              </div>

              <div className="col-span-2">
                <FormSubmitButton
                  loading={isPending}
                  className={`w-full py-3 px-5 bg-primary rounded-lg text-white shadow-primary ml-auto ${
                    isPending ? "animate-pulse" : ""
                  }`}
                >
                  Login
                </FormSubmitButton>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginPage;
