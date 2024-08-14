import { useParams } from "react-router-dom";
// import { GoTrash } from "react-icons/go";
import Menu from "../components/Menu";
import SingleLoader from "../components/loading/SingleLoader";
import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";

import moment from "moment";

export default function SinglePost() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["singlePost"],
    queryFn: async () => {
      try {
        const res = await API.get(`/posts/${id}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // const { data: user } = useQuery({ queryKey: ["authUser"] });

  return (
    <section className="flex items-start py-10 px-4 gap-x-7">
      {isLoading && <SingleLoader />}

      {!isLoading && (
        <div className="flex-2 flex flex-col space-y-4">
          <div>
            <img
              src={post.image}
              alt=""
              className="md:h-[300px] sm:h-[270px] h-[220px] object-cover w-full rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div>
                <img
                  src={`https://avatar.iran.liara.run/username?username=${
                    post.creator.fullName.split(" ")[0][0]
                  }+${post.creator.fullName.split(" ")[1][0]}`}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span>{post.creator.fullName}</span>
                <span className="text-sm text-slate-300">
                  {moment(post.createdAt).format("Do MMMM, YYYY")}
                </span>
              </div>
            </div>
            {/* {user?._id === post.creator._id && (
              <div>
                <button className="size-8 bg-red-600 rounded-full flex items-center justify-center">
                  <GoTrash />
                </button>
              </div>
            )} */}
          </div>
          <h1 className="sm:text-3xl text-2xl text-white font-semibold">
            {post.title}
          </h1>
          <p className="whitespace-pre-line text-base/7 text-justify">
            {post.description}
          </p>
        </div>
      )}
      <div className="flex-1 md:flex hidden">
        <Menu category={post?.category} id={post?._id} />
      </div>
    </section>
  );
}
