import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/makeRequest";

export default function Signup() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signup", form);

        if (res.status === 201) {
          const data = res.data;

          setForm({ fullName: "", email: "", password: "" });
          setError("");

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSignup = () => {
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all the required fields!");
      return;
    }

    if (form.password.length < 7) {
      setError("Password must be atleast 7 characters long!");
      return;
    }

    setError("");
    mutate();
  };

  return (
    <>
      <div className="p-4 shadow-sm shadow-teal-50/[0.03]">
        <Link to={"/"} className="w-max flex items-center gap-x-2">
          <img src="/favicon.svg" alt="" className="size-7" />
          <span className="text-2xl text-teal-600 font-bold">Insight</span>
        </Link>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Unlock the power of knowledge with Insight! Join our community and
            elevate your understanding today!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 border border-primary/5"
          >
            <p className="text-center text-lg font-medium">
              Create an account with Insight
            </p>

            {error && (
              <span className="text-sm text-red-600 text-center block">
                {error}
              </span>
            )}

            <div>
              <input
                type="text"
                className="w-full rounded-lg border-2 border-primary/20 p-4 text-base outline-none  bg-transparent"
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full rounded-lg border-2 border-primary/20 p-4 text-base outline-none  bg-transparent"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full rounded-lg border-2 border-primary/20 p-4 text-base outline-none  bg-transparent"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-base font-medium text-white"
              disabled={isPending}
            >
              {isPending ? "Signing up" : "Sign up"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account &middot;{" "}
              <Link to={"/signin"} className="text-teal-600">
                Sign in!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
