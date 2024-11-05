import React from "react";

const Nav = () => {
  return (
    <header>
      <div className="fixed top-0 z-50 flex h-[70px] w-full bg-white shadow-md lg:h-[80px] lg:justify-center">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-20 lg:px-24">
          <div className="shrink-0">
            <a aria-label="goes to home page" className="cursor-pointer" href="/">
              <picture>
                <source
                  srcSet="https://www.1acre.in/static/images/icons/logo.avif"
                  type="image/avif"
                />
                <source
                  srcSet="https://www.1acre.in/static/images/icons/logo.webp"
                  type="image/webp"
                />
                <img
                  src="https://www.1acre.in/static/images/icons/logo.png"
                  alt="logo"
                  width="93"
                  height="30"
                />
              </picture>
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-6">
            <a className="hover:underline hover:underline-offset-2" href="/">
              All Lands
            </a>
            <a className="hover:underline hover:underline-offset-2" href="/">
              Developers
            </a>
            <a
              className="group relative flex items-center hover:underline-offset-2"
              href="/"
            >
              <span className="group-hover:underline">Lakes</span>
            </a>
            <a
              className="hover:underline hover:underline-offset-2"
              href="/"
            >
              Premium
            </a>
            <span className="cursor-pointer hover:underline hover:underline-offset-2">
              Services
            </span>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              className="rounded-full border bg-neutral-50 px-3 py-2 font-semibold text-neutral-900 hover:shadow-lg"
              href=""
            >
              Sell your Land
            </a>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-300 text-black font-semibold hover:shadow-md">
              <span>Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-6 lg:hidden">
            <a className="rounded-lg border border-neutral-900 px-3 py-1" href="/">
              Sell Land
            </a>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
