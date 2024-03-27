import React from "react";

const AddProducts = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
        <p className="text-xl pb-6 flex items-center">
          <i className="fas fa-list mr-3"></i> Add Category
        </p>
        <div className="leading-loose">
          <form className="p-10 bg-white rounded shadow-xl">
            <div className="">
              <label className="block text-sm text-gray-600" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="name"
                name="name"
                type="text"
                required=""
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                id="email"
                name="email"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div className="mt-2">
              <label className=" block text-sm text-gray-600" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                id="message"
                name="message"
                rows="6"
                required=""
                placeholder="Your inquiry.."
                aria-label="Email"
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
