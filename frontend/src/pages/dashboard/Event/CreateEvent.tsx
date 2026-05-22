// src/pages/dashboard/Event/CreateEvent.tsx

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../../../components/Forminput";
import { Button } from "../../../components/ui/Button";

type FormData = {
  nama: string;
  categoryId: string;
  speakerId: string;
  lokasi: string;
  tanggal: string;
  deskripsi: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama event wajib diisi"),
  categoryId: z.string().min(1, "Category wajib dipilih"),
  speakerId: z.string().min(1, "Speaker wajib dipilih"),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export default function CreateEvent() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // GET EVENTS
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET CATEGORY & SPEAKER
  const fetchDropdownData = async () => {
    try {
      const categoryResponse = await axios.get(`${API}/categories`);

      setCategories(categoryResponse.data);

      const speakerResponse = await axios.get(`${API}/speakers`);

      setSpeakers(speakerResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchDropdownData();
  }, []);

  // CREATE & UPDATE
  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.nama,
        categoryId: Number(data.categoryId),
        speakerId: Number(data.speakerId),
        location: data.lokasi,
        dateEvent: data.tanggal,
        description: data.deskripsi,
      };

      // UPDATE
      if (editId) {
        await axios.put(`${API}/events/${editId}`, payload);

        alert("Event berhasil diupdate");
      } else {
        // CREATE
        await axios.post(`${API}/events`, payload);

        alert("Event berhasil ditambahkan");
      }

      fetchEvents();

      reset();

      setEditId(null);
    } catch (error) {
      console.log(error);

      alert("Terjadi kesalahan");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/events/${id}`);

      alert("Event berhasil dihapus");

      fetchEvents();
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus");
    }
  };

  // EDIT
  const handleEdit = (event: any) => {
    setEditId(event.id);

    setValue("nama", event.name);
    setValue("categoryId", String(event.categoryId));
    setValue("speakerId", String(event.speakerId));
    setValue("lokasi", event.location);

    setValue("tanggal", event.dateEvent.split("T")[0]);

    setValue("deskripsi", event.description);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* BUTTON BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        ← Dashboard
      </button>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">
          {editId ? "Edit Event" : "Create Event"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            label="Nama Event"
            name="nama"
            register={register}
            error={errors.nama?.message}
            type="text"
            placeholder="Nama event"
          />

          {/* CATEGORY */}
          <div>
            <label className="font-medium">Category</label>

            <select
              {...register("categoryId")}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Pilih Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId?.message}
            </p>
          </div>

          {/* SPEAKER */}
          <div>
            <label className="font-medium">Pembicara</label>

            <select
              {...register("speakerId")}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Pilih Pembicara</option>

              {speakers.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </option>
              ))}
            </select>

            <p className="text-red-500 text-sm mt-1">
              {errors.speakerId?.message}
            </p>
          </div>

          <FormInput
            label="Lokasi"
            name="lokasi"
            register={register}
            error={errors.lokasi?.message}
            type="text"
            placeholder="Lokasi event"
          />

          <FormInput
            label="Tanggal"
            name="tanggal"
            register={register}
            error={errors.tanggal?.message}
            type="date"
          />

          <FormInput
            label="Deskripsi"
            name="deskripsi"
            register={register}
            error={errors.deskripsi?.message}
            type="text"
            placeholder="Deskripsi event"
          />

          <Button
            label={editId ? "Update" : "Simpan"}
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
          />
        </form>
      </div>

      {/* TABLE */}
      <div className="mt-10 bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="p-4 w-16">ID</th>

              <th className="p-4 w-48">Nama Event</th>

              <th className="p-4 w-36">Category</th>

              <th className="p-4 w-36">Pembicara</th>

              <th className="p-4 w-40">Lokasi</th>

              <th className="p-4 w-32">Tanggal</th>

              <th className="p-4 w-52">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t text-center">
                <td className="p-4 break-all">{event.id}</td>

                <td className="p-4 break-all">{event.name}</td>

                <td className="p-4 break-all">{event.category?.name}</td>

                <td className="p-4 break-all">{event.speaker?.name}</td>

                <td className="p-4 break-all">{event.location}</td>

                <td className="p-4 break-all">
                  {new Date(event.dateEvent).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
