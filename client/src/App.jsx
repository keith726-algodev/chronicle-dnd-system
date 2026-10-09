import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import BranchScreen from "./screens/BranchScreen.jsx";
import EntryScreen from "./screens/EntryScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import { USE_MOCK_API } from "./api/index.js";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {USE_MOCK_API && (
        <div className="bg-grad-gold px-4 py-2 text-center text-size-1 font-medium text-bg-deep">
          DEMO MODE 
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/categories/:categoryId" element={<BranchScreen />} />
        <Route path="/categories/:categoryId/segments/:segmentId" element={<EntryScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
