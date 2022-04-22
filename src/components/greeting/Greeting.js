import Social from "../social/Social";

export default function Greeting({
  url,
  isName,
  description,
  subdescription,
  isSocial,
}) {
  let showSocial = isSocial ? <Social /> : <div></div>;
  let name;
  if (isName) {
    name = (
      <h1 className="leading-tight text-3xl md:text-5xl font-lora">
        {" I'm "}
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-black dark:text-black">Srini</span>
        </span>
      </h1>
    );
  }
  return (
    <div className="relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12 lg:mb-64">
      <div className="col-span-full mb-12 lg:mb-0 flex items-center justify-center lg:col-span-9 lg:col-start-8 lg:-mt-24 lg:-mr-5vw lg:px-0">
        <img
          decoding="async"
          alt="work-from-book"
          src={url}
          className="h-auto w-full object-contain max-h-75vh"
        />
      </div>
      <div className="col-span-full pt-6 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col lg:col-span-7">
        <div className="flex flex-auto flex-col text-white p-5">
          <div className="mb-4">
            {name}
            <p className="text-3xl md:text-4xl pt-4 font-lora">{description}</p>
            <p className="text-2xl pt-4 font-inter text-gray-400">
              {subdescription}
            </p>
          </div>
          {showSocial}
        </div>
      </div>
    </div>
  );
}
