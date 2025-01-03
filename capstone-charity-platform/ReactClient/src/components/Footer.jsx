import { Link } from "react-router-dom"
import logo from "./pictures/logo.png";

const Footer = () => {
    return (
    

      //some of these design elements are sourced from :

      <footer className="bg-brand-offWhite">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-8">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <a
              className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // stops the default anchor behavior
                window.scrollTo({ top: 0, behavior: "smooth" }); //scrols to the top of until the top margin is 0, also uses smooth scroll behavior
              }}
            >
              <span className="sr-only">go to the top of whatever page</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <img src={logo} alt="Logo" className="h-16" />
              <div className="flex justify-center text-teal-600 lg:justify-start"></div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                Help make a change in your community by learning more about
                Hands Together
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-3 text-center lg:text-left">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
              <Link to="/how-it-works" className="hover:underline">
                How it works
              </Link>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
              <Link to="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </nav>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright HandsTogether &copy; 2024. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  export default Footer;