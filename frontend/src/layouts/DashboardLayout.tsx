import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthstore";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">

        {/* Header */}
        <div>
          <div className="border-b border-blue-300 py-4">
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-2">
            <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/categories" className="block px-4 py-2 rounded hover:bg-gray-700">
              Categories
            </Link>
            <Link to="/products" className="block px-4 py-2 rounded hover:bg-gray-700">
              Products
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div>
          <button
            className="w-full bg-red-900 hover:bg-red-800 text-white font-semibold py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-yellow-500">
        <p>ppppppppppppppppppp</p>
        <Outlet />
      </div>

    </div>
  );
}