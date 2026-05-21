import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Beranda from "./pages/Beranda";

import EventPage from "./pages/dashboard/Event/CreateEvent";
import CategoryPage from "./pages/dashboard/categories/CreateCategory";
import SpeakerPage from "./pages/dashboard/Speakers/CreateSpeakers";

import Biodata from "./pages/Biodata";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Beranda />
    </ProtectedRoute>
  }
/>

<Route
  path="/events"
  element={
    <ProtectedRoute>
      <EventPage/>
    </ProtectedRoute>
  }
/>

<Route
  path="/categories"
  element={
    <ProtectedRoute>
      <CategoryPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/speakers"
  element={
    <ProtectedRoute>
      <SpeakerPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/biodata"
  element={
    <ProtectedRoute>
      <Biodata />
    </ProtectedRoute>
  }
 /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;