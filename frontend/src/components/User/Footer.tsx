import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-10">
      <div className="container-main grid lg:grid-cols-4 mg:grid-cols-4 grid-cols-1 gap-12">
        <div>
          <div className="ps-4 py-4">
            <img src="../../../public/images/logo-website.png" alt="" />
          </div>
          <p className="text-white/50 py-5 text-sm">
            Condimentum adipiscing vel neque dis nam parturient orci at
            scelerisque neque dis nam parturient.
          </p>
          <span className="text-white/50 block  text-sm">
            451 Wall Street, UK, London
          </span>
          <span className="text-white/50 block  text-sm">
            Phone: (064) 332-1233
          </span>
          <span className="text-white/50 block  text-sm">
            Fax: (099) 453-1357
          </span>
        </div>
        <div>
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-xl font-bold w-fit tab-border-bottom relative text-white">
              Product Tags
            </h3>
          </div>
          <div>
            <div className="flex *:text-white/50 flex-wrap gap-2 pt-4 hover:*:text-white">
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                Accessories
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                Action
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                Adventure
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                Console
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                Gamepad
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500  text-sm"
                to={""}
              >
                HeaderPhone
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500"
                to={""}
              >
                Mouse & Keyboard
              </Link>
              <Link
                className="hover:bg-primary rounded-2xl py-1 px-2 duration-500"
                to={""}
              >
                Roll Player
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-xl font-bold w-fit after:!bg-green-400 tab-border-bottom  relative text-white">
              Footer Menu
            </h3>
          </div>
          <div>
            <div className="flex *:text-white/50 flex-wrap gap-2 pt-4">
              <ul className="*:flex *:gap-3 *:space-y-2 *:items-center">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-xl font-bold w-fit after:!bg-red-600 tab-border-bottom  relative text-white">
              Footer Categories
            </h3>
          </div>
          <div>
            <div className="flex *:text-white/50 flex-wrap gap-2 pt-4">
              <ul className="*:flex *:gap-3 *:space-y-2 *:items-center">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Accessories
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Console
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Gamepad
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    Games
                  </Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>

                  <Link to={""} className="pb-2  text-sm">
                    HeadPhone
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
