// src/App.jsx
import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import ToolOfTheDay from "./pages/ToolOfTheDay.jsx";
function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes with shared layout */}

            <Route path="/home" element={<Home />} />
            <Route path="/SearchResults" element={<SearchResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tooloftheday" element={<ToolOfTheDay />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
