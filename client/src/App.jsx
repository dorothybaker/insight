import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Write from "./pages/Write";
import SinglePost from "./pages/SinglePost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileNavbar from "./components/MobileNavbar";
import { useQuery } from "@tanstack/react-query";
import { API } from "./utils/makeRequest";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <MobileNavbar />
      <main className="flex-1 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await API.get("/auth/me");

        if (res.status == 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/posts/write",
          element: user ? <Write /> : <Navigate to={"/signin"} />,
        },
        { path: "/posts/:id", element: <SinglePost /> },
      ],
    },
    { path: "/signin", element: user ? <Navigate to={"/"} /> : <Signin /> },
    { path: "/signup", element: user ? <Navigate to={"/"} /> : <Signup /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
