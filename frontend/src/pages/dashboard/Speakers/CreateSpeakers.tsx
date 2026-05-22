// src/pages/dashboard/Speakers/CreateSpeakers.tsx

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../../../components/Forminput";
import { Button } from "../../../components/ui/Button";

type FormData = {
  nama: string;
  role: string;
  image: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  role: z.string().min(1, "Role wajib diisi"),
  image: z.string().min(1, "Image wajib diisi"),
});

export default function CreateSpeakers() {

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

  // GET DATA
  const fetchSpeakers = async () => {

    try {

      const response = await axios.get(
        `${API}/speakers`
      );

      setSpeakers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // CREATE & UPDATE
  const onSubmit = async (data: FormData) => {

    try {

      const payload = {
        name: data.nama,
        role: data.role,
        image: data.image,
      };

      // UPDATE
      if (editId) {

        await axios.put(
          `${API}/speakers/${editId}`,
          payload
        );

        alert("Pembicara berhasil diupdate");

      } else {

        // CREATE
        await axios.post(
          `${API}/speakers`,
          payload
        );

        alert("Pembicara berhasil ditambahkan");
      }

      fetchSpeakers();

      reset();

      setEditId(null);

    } catch (error) {

      console.log(error);

      alert("Terjadi kesalahan");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/speakers/${id}`
      );

      alert("Guest Stars berhasil dihapus");

      fetchSpeakers();

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (speaker: any) => {

    setEditId(speaker.id);

    setValue("nama", speaker.name);
    setValue("role", speaker.role);
    setValue("image", speaker.image);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        ← Dashboard
      </button>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md">

        <h1 className="text-2xl font-bold mb-6">

          {editId
            ? "Edit Speaker"
            : "Create Pembicara "}

        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >

          <FormInput
            label="Nama"
            name="nama"
            register={register}
            error={errors.nama?.message}
            type="text"
            placeholder="Nama Pembicara"
          />

          <FormInput
            label="Role"
            name="role"
            register={register}
            error={errors.role?.message}
            type="text"
            placeholder="Role Nama Pembicara"
          />

          <FormInput
            label="Image URL"
            name="image"
            register={register}
            error={errors.image?.message}
            type="text"
            placeholder="https://..."
          />

          <Button
            label={
              editId
                ? "Update"
                : "Simpan"
            }
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

              <th className="p-4 w-16">
                ID
              </th>

              <th className="p-4 w-48">
                Nama
              </th>

              <th className="p-4 w-48">
                Role
              </th>

              <th className="p-4 w-40">
                Image
              </th>

              <th className="p-4 w-52">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {speakers.map((speaker) => (

              <tr
                key={speaker.id}
                className="border-t text-center"
              >

                <td className="p-4 break-all">
                  {speaker.id}
                </td>

                <td className="p-4 break-all">
                  {speaker.name}
                </td>

                <td className="p-4 break-all    ">
                  {speaker.role}
                </td>

                <td className="p-4">

                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => handleEdit(speaker)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(speaker.id)
                      }
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