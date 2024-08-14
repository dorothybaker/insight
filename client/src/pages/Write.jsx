import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { API } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const categories = [
    "lifestyle",
    "technology",
    "business",
    "entertainment",
    "fashion",
    "culture",
  ];

  const [form, setForm] = useState({
    title: "",
    category: "lifestyle",
    image: "",
    description: "",
  });

  const [error, setError] = useState("");

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "e3xcyubv",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setForm({ ...form, image: result.info.secure_url });
        }
      }
    );
  }, []);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/posts/create", form);

        if (res.status === 201) {
          const data = res.data;

          setForm({
            title: "",
            category: "lifestyle",
            image: "",
            description: "",
          });

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      navigate("/");
    },
  });

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.description || !form.image) {
      setError("Please fill in all the required fields!");
      return;
    }

    setError("");
    mutate();
  };

  return (
    <form
      className="py-10 px-4 flex flex-col space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="The blog post title here..."
        className="h-12 px-4 bg-transparent border-2 border-teal-50/20 w-full rounded-lg outline-none"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="flex flex-col space-y-2">
        <h6>Select a category</h6>
        <div className="flex w-full gap-3 flex-wrap">
          {categories.map((category) => (
            <div>
              <label
                htmlFor={category}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <div className="p-[3px] rounded-full border border-teal-600">
                  <div
                    className={`size-[10px] rounded-full ${
                      category === form.category && "bg-teal-600"
                    }`}
                  />
                </div>
                <span className="capitalize text-sm">{category}</span>
              </label>
              <input
                type="radio"
                name="category"
                id={category}
                className="hidden"
                onChange={() => setForm({ ...form, category: category })}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <span>
          Blog post thumbnail &middot;{" "}
          <span
            className="text-teal-300 cursor-pointer"
            onClick={() => widgetRef.current?.open()}
          >
            {form.image
              ? "Image successfully uploaded"
              : "Click to upload image"}
          </span>
        </span>
      </div>

      <textarea
        className="border-2 min-h-64 w-full rounded-lg outline-none bg-transparent border-teal-50/20 p-4"
        placeholder="Blog description goes here..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>

      <button
        type="submit"
        className="w-max px-20 bg-teal-500 h-10 rounded-lg text-[#0e0c16] flex items-center justify-center font-semibold"
        disabled={isPending}
      >
        {isPending ? "Publishing" : "Publish"}
      </button>
    </form>
  );
}
