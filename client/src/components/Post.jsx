import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="flex items-center gap-x-10 odd:flex-row-reverse">
      <div className="flex-1 after:w-full after:h-full after:absolute after:-top-5 after:-left-5 after:bg-teal-600 relative after:z-[-1] z-10 md:flex hidden">
        <img
          src={post.image}
          alt=""
          className="w-full lg:h-[300px] h-[270px] object-cover"
        />
      </div>
      <div className="flex-2 flex flex-col justify-between space-y-5">
        <Link
          to={`/posts/${post._id}`}
          className="sm:text-4xl text-3xl font-semibold line-clamp-2"
        >
          {post.title}
        </Link>
        <p className="text-lg line-clamp-4">{post?.description}</p>
        <Link
          className="sm:w-max w-full px-12 text-primary rounded-xl h-11 flex items-center justify-center bg-teal-600 font-semibold transition duration-300 hover:bg-primary hover:text-teal-600"
          to={`/posts/${post._id}`}
        >
          <span>Read more</span>
        </Link>
      </div>
    </div>
  );
}
