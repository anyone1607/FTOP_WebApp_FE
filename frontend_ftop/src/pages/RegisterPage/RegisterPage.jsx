import React from "react";

const RegisterPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex h-screen items-center justify-center">
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">

          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-gray-800 italic">
            GoSignUp System
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <a href="/auth/admin/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>

            <form className="mt-6">
              {/* <div>
                <label htmlFor="name" className="block text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                  placeholder="John Doe"
                />
              </div> */}
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm text-gray-600">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                  placeholder="********"
                  autoComplete="on"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="confirm-password" className="block text-sm text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
                  placeholder="********"
                  autoComplete="on"
                />
              </div>

              <button className="w-full px-4 py-2 mt-6 text-white bg-cyan-500 rounded hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                Sign up
              </button>
            </form>

            <div className="mt-4 text-center text-gray-600">OR</div>
            <div className="flex mt-4 justify-between">
              <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
            </div>
            {/* <div className="flex mt-4 justify-between">
              <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Continue with Facebook
              </button>
            </div> */}
          </div>

          <div className="w-1/2 bg-cyan-500 text-white p-8 relative">
            {/* <h3 className="text-xl font-bold mb-4 italic">
              Reach financial goals faster
            </h3> */}
            <p className="mb-4 italic">
              {/* Use your F_TOP card around the world with no hidden fees. Hold,
              transfer and spend money. */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeqPLYDJJU0mcIAdIuigsAEf2eMPOHu7_1jxnFPGIPZ4mV_Xt31DdvIAki1VYmqSbKBnE&usqp=CAU"
                alt="CardImage"
                className="w-full h-auto mb-4 rounded-lg"
              />
            </p>
            {/* <button className="bg-white text-cyan-500 px-4 py-2 rounded italic hover:bg-gray-100">
              Learn more
            </button> */}
            {/* <div className="mt-6">
              <p className="italic">Earnings</p>
            </div> */}
            {/* <div className="absolute bottom-8">
              <h4 className="text-lg font-semibold italic">
                Introducing new features
              </h4>
              <p className="text-sm text-gray-300 mt-2 italic">
                Analyzing previous trends ensures that businesses always make
                the right decision.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
