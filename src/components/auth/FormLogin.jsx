import React from "react";

const FormLogin = () => {
  return (
    <div>
      <section className="py-12 xl:px-28">
        <form className="max-w-[555px] h-auto bg-white m-auto px-14 py-10 rounded-md">
          <div className="w-full flex flex-col mx-32">
            <img src="/images/zara-logo-2019.png" alt="" width={"50%"} />
          </div>

          <h3 className="title">ACCESS YOUR ACCOUNT</h3>
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember me</p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forgot Password ?
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button type="submit" className="bg-black bg-dark-button">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormLogin;
