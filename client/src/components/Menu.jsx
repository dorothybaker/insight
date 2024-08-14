import { Link } from "react-router-dom";
import MenuLoader from "./loading/MenuLoader";
import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import { useEffect } from "react";

export default function Menu({ category, id }) {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["relatedPosts"],
    queryFn: async () => {
      try {
        const res = await API.get(`/posts/related/${category}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [category]);

  const filteredPosts = posts?.filter((post) => post._id !== id);

  return (
    <section className="flex flex-col space-y-2 w-full">
      <h2 className="text-base text-slate-300">Other posts your may like</h2>
      <div className="flex flex-col space-y-3 w-full">
        {!isLoading &&
          filteredPosts.length > 0 &&
          filteredPosts.map((post) => (
            <div key={post._id} className="flex flex-col space-y-1">
              <div>
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-[220px] rounded-xl object-cover"
                />
              </div>
              <h1 className="text-lg font-semibold line-clamp-2">
                {post.title}
              </h1>
              <Link
                className="bg-teal-500 text-[#0e0c16] h-10 font-semibold rounded-xl flex items-center justify-center"
                to={`/posts/${post._id}`}
              >
                Read more
              </Link>
            </div>
          ))}

        {isLoading && [1, 2, 3].map((idx) => <MenuLoader key={idx} />)}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-xl text-primary/50 mt-4">
            No related posts found of this post!
          </div>
        )}
      </div>
    </section>
  );
}
