import React from "react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="container-main">
      <div className="bg-gray-200 p-2">
        <div className="container mx-auto">
          <Link to="/" className="text-blue-600">
            Homepage
          </Link>{" "}
          &gt; Contact Us
        </div>
      </div>

      <main className="container mx-auto p-5 flex flex-col md:flex-row justify-center items-start gap-4">
        <div className="w-full md:w-5/12 p-5 bg-white shadow rounded-lg mb-5 md:mb-0">
          <h2 className="text-2xl font-bold mb-5 text-center">Contact Us</h2>
          <div className="mb-5">
            <h3 className="text-xl font-semibold">Contact information</h3>
            <hr className="border-gray-300 my-2" />
            <h4 className="font-bold">Hour of operation</h4>
            <p>
              Monday - Friday: <span className="font-bold">09:30 - 21:00</span>
            </p>
            <p>
              Saturday & Sunday:{" "}
              <span className="font-bold">10:30 - 22:30</span>
            </p>
          </div>
          <div className="mb-5">
            <h4 className="font-bold">Contact</h4>
            <p>Mobile: 058 26359 996</p>
            <p>Hotline: 1900 26886</p>
            <p>E-mail: info@example.com</p>
          </div>
          <div>
            <h4 className="font-bold">Address</h4>
            <p>272 Rodney St, Brooklyn</p>
            <p>NY 11211 76 East Houston Street New York City</p>
          </div>
        </div>

        <div className="w-full md:w-5/12 p-5 bg-white shadow rounded-lg">
          <form action="#" method="POST">
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-full"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-full"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="block mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-2 border border-gray-300 rounded-full"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2">
                Your message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border border-gray-300 rounded-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
