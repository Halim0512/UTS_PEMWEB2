import { useNavigate } from "react-router-dom";

import bgBiodata from "../assets/mendal.jpg";
import profile from "../assets/fotoyu.jpeg";

export default function Biodata() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* BUTTON BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl"
      >
        ← Dashboard
      </button>

      {/* CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div
          className="py-15 text-center text-white bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${bgBiodata})`,
          }}
        >

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            <img
              src={profile}
              alt="Profile"
              className="w-44 h-44 rounded-full mx-auto border-4 border-white object-cover shadow-xl"
            />

            <h1 className="text-5xl font-extrabold mt-6">
              Halim Wiko
            </h1>

            <p className="text-xl mt-3 tracking-wide text-orange-200">
              Pengusahawan Muda Generasi 2045
            </p>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-10 grid md:grid-cols-2 gap-10">

          {/* BIODATA */}
          <div>

            <h2 className="text-3xl font-bold mb-8 text-orange-500">
              Biodata Mahasiswa
            </h2>

            <div className="space-y-5 text-gray-700 text-lg">

              <div>
                <span className="font-semibold text-black">
                  Nama:
                </span>{" "}
                Halim Wiko Abiyunna
              </div>

              <div>
                <span className="font-semibold text-black">
                  NIM:
                </span>{" "}
                24090118
              </div>

              <div>
                <span className="font-semibold text-black">
                  Program Studi:
                </span>{" "}
                Rekayasa Informatika
              </div>

              <div>
                <span className="font-semibold text-black">
                  Fakultas:
                </span>{" "}
                Rekayasa Informatika
              </div>

              <div>
                <span className="font-semibold text-black">
                  Universitas:
                </span>{" "}
                Universitas Harkat Negeri Tegal
              </div>

              <div>
                <span className="font-semibold text-black">
                  Email:
                </span>{" "}
                halimabiyuna@gmail.com
              </div>

            </div>

          </div>

          {/* ABOUT */}
          <div>

            <h2 className="text-3xl font-bold mb-8 text-orange-500">
              Tentang Saya
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              Saya seorang yang suka hidup sehat, suka olahraga,
              suka makan makanan sehat, dan suka belajar hal baru
              terutama tentang teknologi. Saya juga suka traveling
              ke tempat baru untuk mencari pengalaman baru.
              Berkebun juga menjadi salah satu hobi saya untuk
              mengisi waktu luang dan menenangkan pikiran.
            </p>

            {/* SKILL */}
            <div className="mt-10">

              <h3 className="font-bold text-2xl mb-5 text-black">
                Teknologi
              </h3>

              <div className="flex flex-wrap gap-3">

                <span className="bg-orange-100 text-orange-600 px-5 py-3 rounded-xl font-semibold">
                  React TS
                </span>

                <span className="bg-orange-100 text-orange-600 px-5 py-3 rounded-xl font-semibold">
                  Express JS
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}