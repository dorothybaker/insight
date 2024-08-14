export default function LoaderPost() {
  return (
    <div className="flex items-center gap-x-10 odd:flex-row-reverse">
      <div className="flex-1 after:w-full after:h-full after:absolute after:-top-5 after:-left-5 after:bg-teal-600/10 relative after:z-[-1] z-10 md:flex hidden">
        <div className="w-full lg:h-[300px] h-[270px] bg-teal-500/5" />
      </div>
      <div className="flex-2 flex flex-col justify-between space-y-5">
        <div className="rounded-lg h-16 bg-teal-600/5 w-full" />
        <div className="rounded-lg h-[130px] bg-teal-600/5 w-full" />
        <div className="rounded-lg h-12 bg-teal-600/5 sm:w-[200px] w-full" />
      </div>
    </div>
  );
}
