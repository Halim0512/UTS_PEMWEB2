import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../Store/useAuthstore";

export default function Beranda() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const eventRes = await axios.get("http://localhost:3000/events");

      const categoryRes = await axios.get("http://localhost:3000/categories");

      const speakerRes = await axios.get("http://localhost:3000/speakers");

      setEvents(eventRes.data);
      setCategories(categoryRes.data);
      setSpeakers(speakerRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Yakin hapus event?")) return;

    await axios.delete(`http://localhost:3000/events/${id}`);

    fetchData();
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Yakin hapus kategori?")) return;

    await axios.delete(`http://localhost:3000/categories/${id}`);

    fetchData();
  };

  const handleDeleteSpeaker = async (id: number) => {
    if (!confirm("Yakin hapus pembicara?")) return;

    await axios.delete(`http://localhost:3000/speakers/${id}`);

    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-red-900 text-white px-10 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invofest 2045</h1>

        <div className="flex gap-6 items-center">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/events">Event</Link>

          <Link to="/categories">Category</Link>

          <Link to="/speakers">Pembicara</Link>

          <Link to="/biodata">Biodata</Link>

          <button
            onClick={handleLogout}
            className="bg-white text-red-900 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-10">
        {/* EVENT */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Data Event</h2>

            <Link
              to="/events"
              className="bg-red-900 text-white px-4 py-2 rounded"
            >
              + Tambah
            </Link>
          </div>

          <table className="w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Nama Event</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Pembicara</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{event.name}</td>
                  <td className="p-3">{event.category?.name}</td>
                  <td className="p-3">{event.speaker?.name}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to="/events"
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Detail
                      </Link>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CATEGORY */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Data Kategori</h2>

            <Link
              to="/categories"
              className="bg-red-900 text-white px-4 py-2 rounded"
            >
              + Tambah
            </Link>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span>{category.name}</span>

              <div className="flex gap-2">
                <Link
                  to="/categories"
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Detail
                </Link>

                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SPEAKER */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Data Pembicara</h2>

            <Link
              to="/speakers"
              className="bg-red-900 text-white px-4 py-2 rounded"
            >
              + Tambah
            </Link>
          </div>

          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold">{speaker.name}</h3>

                  <p className="text-gray-500 text-sm">{speaker.role}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/speakers"
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Detail
                </Link>

                <button
                  onClick={() => handleDeleteSpeaker(speaker.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
