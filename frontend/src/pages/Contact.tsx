import { FC } from "react";

/**
 * Contact Page
 * - Form liên hệ (Họ tên, email, Nội Dung)
 * - Google Map embed
 */
const Contact: FC = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Liên hệ với chúng tôi</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🔹 Form liên hệ */}
        <form className="space-y-4 bg-white shadow rounded-lg p-6">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Nội dung"
            className="w-full border px-4 py-2 rounded h-32"
          ></textarea>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Gửi liên hệ
          </button>
        </form>

        {/* 🔹 Google Map */}
        <div className="rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5029!2d106.700981!3d10.776530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c0b7f0f0d%3A0x9a31f5b7a3a87a4f!2zSG8gQ2hpIE1pbmggS2h1!5e0!3m2!1svi!2s!4v1630652394123!5m2!1svi!2s"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
