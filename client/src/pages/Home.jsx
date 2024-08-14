import { useQuery } from "@tanstack/react-query";
import LoaderPost from "../components/loading/LoaderPost";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import { API } from "../utils/makeRequest";
import { useEffect } from "react";

export default function Home() {
  const { search } = useLocation();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      try {
        const res = await API.get(`/posts/all${search}`);

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
  }, [search]);

  return (
    <section className="py-10 px-4">
      <div className="flex flex-col space-y-20">
        {isLoading && [1, 2, 3, 4].map((idx) => <LoaderPost key={idx} />)}

        {!isLoading && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </section>
  );
}
