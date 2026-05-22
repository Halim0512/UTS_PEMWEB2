// src/pages/dashboard/categories/CreateCategory.tsx

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
};

const schema = z.object({
  nama: z.string().min(1, "Nama kategori wajib diisi"),
});

export default function CreateCategory() {
  const [categories, setCategories] = useState<any[]>([]);
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

  // GET
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE & UPDATE
  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.nama,
      };

      // UPDATE
      if (editId) {
        await axios.put(`${API}/categories/${editId}`, payload);

        alert("Category berhasil diupdate");
      } else {
        // CREATE
        await axios.post(`${API}/categories`, payload);

        alert("Category berhasil ditambahkan");
      }

      fetchCategories();

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
      await axios.delete(`${API}/categories/${id}`);

      alert("Category berhasil dihapus");

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (category: any) => {
    setEditId(category.id);

    setValue("nama", category.name);
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
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          {editId ? "Edit Category" : "Create Category"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            label="Nama"
            name="nama"
            register={register}
            error={errors.nama?.message}
            type="text"
            placeholder="Nama kategori"
          />

          <Button
            label={editId ? "Update" : "Simpan"}
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          />
        </form>
      </div>

      {/* TABLE */}
      <div className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Nama</th>

              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-4">{category.id}</td>

                <td className="p-4">{category.name}</td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
