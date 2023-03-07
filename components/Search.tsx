import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface SearchState {
  location: (value: string) => void;
}

export const Search = ({ location }: SearchState) => {
  return (
    <Popover className="relative">
      <>
        <Popover.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-[#7E7E7E]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 mt-3 right-0 w-[20rem]">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative  bg-white p-3 lg:grid-cols-2">
                <input
                  onChange={(e) => location(e.target.value)}
                  className="bg-gray-100 outline-none w-full h-10 rounded-md px-3"
                />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
};
