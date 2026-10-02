export default function Navbar() {
  const listNav = [
    {
      name: " Skills",
      url: " /Skills",
    },
    {
      name: "Educations",
      url: "/Educations",
    },
    {
      name: "Projects",
      url: "/Projects",
    },
  ];
  return (
    <nav className="  absolute z-30 top-0 w-full  h-20 flex items-center justify-center">
      <div className="  md:bg-white bricolage-grotesque rounded-4xl px-3.5 py-2 shadow-md  flex items-center justify-center">
        <span className=" font-bold text-lg uppercase p-2 grow ">Sarakroetth</span>
        <div className=" bricolage-grotesque hidden  md:flex items-center gap-4">
          {listNav.map((item, index) => {
            return (
              <span
                key={index}
                className="px-3.5 py-2 cursor-pointer transition-colors duration-200 ease-in hover:bg-black/20 rounded-4xl"
              >
                {item.name}
              </span>
            );
          })}
        </div>
        <div className=" ml-4 hidden md:flex bg-black hover:brightness-50 cursor-pointer  px-3.5 py-2 rounded-4xl items-center gap-1">
          <span className=" text-white ">Contact </span>
          <div className=" ">
            <svg className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6L6 18M8 6h10v10"
              />
            </svg>
          </div>
        </div>
        <div className=" bg-white">

        </div>
      </div>
    </nav>
  );
}
