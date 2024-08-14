import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/makeRequest";

export default function Navbar() {
  const links = [
    { name: "Lifestyle", href: "/?category=lifestyle" },
    { name: "Technology", href: "/?category=technology" },
    { name: "Businness", href: "/?category=business" },
    { name: "Entertainment", href: "/?category=entertainment" },
    { name: "Fashion", href: "/?category=fashion" },
    { name: "Culture", href: "/?category=culture" },
  ];

  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: handleSignout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signout", {});

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
      window.location.reload();
    },
  });

  return (
    <nav className="flex items-end justify-between p-4 shadow-sm shadow-teal-50/[0.03]">
      <div>
        <Link to={"/"} className="w-max flex items-center gap-x-2">
          <img src="/favicon.svg" alt="" className="size-7" />
          <span className="text-2xl text-teal-600 font-bold">Insight</span>
        </Link>
      </div>
      <ul className="flex items-center gap-x-3 *:cursor-pointer *:text-lg">
        {links.map((link) => (
          <li key={link.name} className="md:block hidden">
            <Link to={link.href}>{link.name}</Link>
          </li>
        ))}
        {user ? (
          <li
            className="text-white"
            onClick={handleSignout}
            aria-disabled={isPending}
          >
            Sign out
          </li>
        ) : (
          <li className="text-white">
            <Link to={"/signin"}>Sign in</Link>
          </li>
        )}
        <li>
          <Link
            to={user ? "/posts/write" : "/signin"}
            className="text-teal-600 font-semibold"
          >
            Write
          </Link>
        </li>
      </ul>
    </nav>
  );
}
