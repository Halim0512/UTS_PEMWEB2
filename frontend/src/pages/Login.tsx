import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { InputText } from "../components/ui/InputText";
import { PasswordInput } from "../components/ui/PasswordInput";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthstore";

const schema = z.object({
  nim: z.string().min(5, "NIM wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const onSubmit = (data: LoginForm) => {
    // LOGIN MANUAL
    if (data.nim === "24090118" && data.password === "123456") {
      alert("Login berhasil!");

      // simpan ke zustand
      login(data.nim);

      // redirect
      navigate("/dashboard");
    } else {
      alert("NIM atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-1">
          Login Dulu
        </h1>

        <p className="text-center text-gray-500 mb-6">Login Menggunakan zustand</p>
        <p className="text-center text-gray-500 mb-6">Untuk Nim 24090118 dan Password 123456</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputText
            label="NIM"
            name="nim"
            register={register}
            error={errors.nim?.message}
          />

          <PasswordInput
            label="Password"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
