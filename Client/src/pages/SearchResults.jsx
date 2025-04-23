import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Select, Button, Avatar, Title, Text, Autocomplete, Loader, Paper, Menu, Chip } from "@mantine/core";
import { ArticleCard } from "../components/ArticleCard";

function SearchResults() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    ratings: "",
    time: "",
  });
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
      const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

      const storedSearchTerm = localStorage.getItem("searchTerm");
      const storedCategory = localStorage.getItem("selectedCategory");
    
      if (storedSearchTerm) {
        setSearchTerm(storedSearchTerm);
      }
      if (storedCategory) {
        setSelectedCategory(storedCategory);
      }
    
      fetchResults(storedSearchTerm, storedCategory);
    }, []);
    

  const fetchResults = async (query, category) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/user/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults([
        { name: "Error loading results", category: "Error", brand: "Unknown", imageUrl: "" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const userInitials = userData ? `${userData.firstName[0]}${userData.lastName[0]}` : "";

  return (
    <div
  style={{
    backgroundColor:
      theme === "dark"
        ? "#1a1a1a"
        : theme === "light"
        ? "#f4f4f4"
        : theme, // treat it as a custom color hex code
    color: theme === "dark" ? "#ffffff" : "#000000",
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  }}
>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#d9d9d9", padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <img src="/logo.png" alt="Logo" style={{ width: "120px", marginBottom: "20px" }} />
        {["Dashboard", "My Tools", "Bookmarks"].map((text) => (
  <Button
    key={text}
    variant="filled"
    color="gray"
    style={{ color: "black", background: "#e0e0e0" }}
    fullWidth
    onClick={() => {
      if (text === "Dashboard") navigate("/home");
    }}
  >
    {text}
  </Button>
))}



        <Text weight={600} size="sm" mt="md" style={{ color: "black" }}>
          Categories
        </Text>
        {["Academics", "Research", "Career", "Writing Tools", "Mental Health", "Creativity"].map((cat) => (
          <Button key={cat} variant="filled" color="gray" style={{ color: "black", background: "#e0e0e0" }} fullWidth>
            {cat}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px 40px", position: "relative", overflowY: "auto" }}>
        {/* Avatar */}
        {userData && (
          <div style={{ position: "absolute", top: 30, right: 40 }}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" color="gray" style={{ cursor: "pointer" }}>
                  {userInitials}
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Customize Settings</Menu.Item>
                <Menu.Item>Help</Menu.Item>
                <Menu.Item>Account Settings</Menu.Item>
                <Menu.Item color="red">Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        )}

        {/* Heading */}
        <Title order={2} style={{ marginBottom: "20px" }}>
          Search Results...
        </Title>

        {/* Search bar */}
        <div style={{ marginBottom: "20px" }}>
          <Autocomplete value={searchTerm} onChange={setSearchTerm} rightSection={loading ? <Loader size="sm" /> : null} style={{ width: "100%", background: "white", borderRadius: "5px" }} />
        </div>

{/*FILTER TOOLS*/}
<Paper
  p={6}
  radius="sm"
  withBorder
  style={{
    backgroundColor: "#f9f9f9",
    marginBottom: "12px",
    boxShadow: "none",
    border: "1px solid #e0e0e0",
  }}
>
  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
  <Select
  placeholder="Category"
  data={["Writing", "Career", "Academics", "Research", "Mental Health", "Creativity"]}
  value={filters.category}
  onChange={(value) => {
    setFilters({ ...filters, category: value });
    fetchResults(searchTerm, value); // Update this to also use ratings/time if needed
  }}
  size="xs"
/>

<Select
  placeholder="Ratings"
  data={["5 stars", "4+ stars", "3+ stars"]}
  value={filters.ratings}
  onChange={(value) => {
    setFilters({ ...filters, ratings: value });
  }}
  size="xs"
/>
<Select
  placeholder="Time"
  data={["Recently Added", "Most Popular"]}
  value={filters.time}
  onChange={(value) => {
    setFilters({ ...filters, time: value });
  }}
  size="xs"
/>
  </div>


  <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
    {Object.entries(filters).map(([key, value]) =>
      value ? (
        <Chip
          key={key}
          variant="light"
          color="gray"
          size="xs"
          checked
          onClose={() => {
            const updatedFilters = { ...filters, [key]: "" };
            setFilters(updatedFilters);
            if (key === "category") fetchResults(searchTerm, ""); // update only if category cleared
          }}
        >
          {value}
        </Chip>
      ) : null
    )}
  </div>
</Paper>

        {/* Result Count */}
        <Title order={4} mb="md">Showing {results.length} Results</Title>

        {/* Search Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {results.map((item) => (
            <ArticleCard
              key={item.id || item.name}
              title={item.name}
              description={item.description || "No description available."}
              category={item.category}
              brand={item.brand}
              image={item.imageUrl || "https://via.placeholder.com/300"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
