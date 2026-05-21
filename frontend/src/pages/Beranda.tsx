import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

import { useAuthStore } from "../Store/useAuthstore";

export default function Beranda() {

  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="bg-red-900 text-white px-10 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
            Invofest 2045
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/events">
            Event
          </Link>

          <Link to="/categories">
            Category
          </Link>

          <Link to="/speakers">
            Pembicara
          </Link>

          <Link to="/biodata">
            Biodata
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-red-900 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* HERO */}
      <div className="px-16">

        <section
          id="hero"
          className="py-10 flex gap-10 justify-between items-center"
        >

          <div className="w-2/3 flex flex-col gap-6">

            <img
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
              alt=""
              className="w-96"
            />

            <p className="text-gray-700 text-lg leading-relaxed">
              Invofest (Informatics Vocational Festival) adalah festival tahunan
              yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia
              dalam menghadapi era digital.
            </p>

            <div className="flex gap-4">

              <a href="#cards">
                <Button
                  label="Info Selengkapnya"
                  variant="primary"
                />
              </a>

              <Button
                label="Hubungi Panitia"
                variant="outline"
              />

            </div>

          </div>

          <div className="w-1/3">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
              alt=""
            />
          </div>

        </section>

      </div>

    </div>
  );
}