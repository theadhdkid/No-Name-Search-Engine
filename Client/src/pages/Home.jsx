import { useNavigate } from "react-router-dom";
import {
  Select,
  Autocomplete,
  Loader,
  Button,
  Avatar,
  Title,
  Text,
  Paper,
  Menu,
} from "@mantine/core";
import { useState, useEffect } from "react";
import CustomizeSettings from "../components/CustomizeSettings";



function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // for storing default theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save to localStorage
  };
  
  const [customColor, setCustomColor] = useState("#646cff"); // default custom color


  const navigate = useNavigate();

  //removed hardcoded user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  }
  }, []);
  

  const userInitials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "";

  // Updated fetchSearchResults function to only navigate to the search results page
  const fetchSearchResults = () => {
    const cleanedSearchTerm = searchTerm.trim();

    // Save search term and selected category to localStorage so SearchResults can read them
    localStorage.setItem("searchTerm", cleanedSearchTerm);
    localStorage.setItem("selectedCategory", selectedCategory);

    // Navigate to results page
    navigate("/SearchResults");
  };

  return (
    <>
      <CustomizeSettings
        opened={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  onThemeChange={handleThemeChange}
  customColor={customColor}
  setCustomColor={setCustomColor}
      />
  
  <div
  style={{
    backgroundColor:
      theme === "dark"
        ? "#1a1a1a"
        : theme === "light"
        ? "#f4f4f4"
        : theme, // treat theme as color code if not light/dark
    color: theme === "dark" ? "#ffffff" : "#000000",
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  }}
>

        {/* Sidebar */}
        <div
          style={{
            width: "220px",
            background: "#d9d9d9",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "120px", marginBottom: "20px" }}
          />
          {["Dashboard", "My Tools", "Bookmarks"].map((text) => (
  <Button
    key={text}
    variant="filled"
    color="gray"
    style={{ color: "black", background: "#e0e0e0" }}
    fullWidth
    onClick={() => {
      if (text === "Dashboard") navigate("/home");
      if (text === "Bookmarks") navigate("/bookmarks");
      //later define My Tools
    }}
  >
    {text}
  </Button>
))}

          <Text weight={600} size="sm" mt="md" style={{ color: "black" }}>
            Categories
          </Text>
          {[
            "Academics",
            "Research",
            "Career",
            "Writing Tools",
            "Mental Health",
            "Creativity",
          ].map((cat) => (
            <Button
              key={cat}
              variant="filled"
              color="gray"
              style={{ color: "black", background: "#e0e0e0" }}
              fullWidth
            >
              {cat}
            </Button>
          ))}
        </div> {/* Closing Sidebar */}
  
        {/* Main Content */}
        <div style={{ flex: 1, padding: "30px 40px", position: "relative" }}>
          {/* Avatar Menu */}
          {userData && (
            <div style={{ position: "absolute", top: 30, right: 40 }}>
             <Menu shadow="md" width={200} withArrow position="bottom-end">
  <Menu.Target>
    <Avatar radius="xl" color="gray" style={{ cursor: "pointer" }}>
      {userInitials}
    </Avatar>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Item onClick={() => setSettingsOpen(true)}>Customize Settings</Menu.Item>
    <Menu.Item>Help</Menu.Item>
    <Menu.Item>Account Settings</Menu.Item>
    <Menu.Item
      color="red"
      onClick={() => {
        localStorage.removeItem("user");
        navigate("/");
      }}
    >
      Logout
    </Menu.Item>
  </Menu.Dropdown>
</Menu>

            </div>
          )}
  
          {/* Greeting */}
          <Title order={2} style={{ marginBottom: "10px" }}>
            Hello Again, {userData?.firstName || "User"}!
          </Title>
  
          {/* Search */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "30px",
              alignItems: "center",
            }}
          >
            <Select
              placeholder="All Categories"
              data={[
                "AI Code Generation",
                "AI for Cybersecurity",
                "AI for Finance",
                "AI for Gaming",
                "AI for Healthcare",
                "AI-Powered Productivity",
                "Computer Vision",
                "Generative AI",
                "Machine Learning & Data Science",
                "Natural Language Processing (NLP)",
                "Speech Recognition & Synthesis",
              ]}
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: "220px", background: "white", borderRadius: "5px" }}
            />
            <Autocomplete
              placeholder="What tool can I help you find today?"
              value={searchTerm}
              onChange={setSearchTerm}
              rightSection={loading ? <Loader size="sm" /> : null}
              style={{ flex: 1, background: "white", borderRadius: "5px" }}
            />
            <Button
              onClick={fetchSearchResults}
              disabled={loading}
              style={{ backgroundColor: "black", color: "white" }}
            >
              {loading ? <Loader size="sm" color="white" /> : "Search"}
            </Button>
          </div>
  
          {/* Dashboard Section */}
          <Title order={3} mb="sm" align="left">
            DASHBOARD
          </Title>
  
          <Paper
  p="md"
  shadow="xs"
  mb="lg"
  style={{
    backgroundColor: theme === "dark" ? "#333" : "#d3d3d3", // ✅ updated for dark mode
    borderRadius: "6px",
    color: theme === "dark" ? "#ffffff" : "#000000", // Optional: ensure inner text is also visible
  }}
>
  <Text weight={600} mb="sm" align="center" style={{ marginBottom: "20px" }}>
    Recent Activity
  </Text>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    {["Paraphraser tools help", "Data Analysis tools comparison", "Research assistance"].map(
      (activity, index) => (
        <div
          key={index}
          style={{
            background: theme === "dark" ? "#444" : "white", // ✅ light cards even in dark mode
            padding: "12px 20px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <Text weight={500}>{activity}</Text>
          <Button
            size="xs"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            OPEN
          </Button>
        </div>
      )
    )}
  </div>
</Paper>

        </div> 
      </div> 
    </>
  );
}

export default Home;