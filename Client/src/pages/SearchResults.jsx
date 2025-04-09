import { useEffect, useState } from "react";
import { Select, Button, Avatar, Title, Text, Autocomplete, Loader, Paper, Menu, Chip } from "@mantine/core";
import { ArticleCard } from "../components/ArticleCard";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // TEMP: Hardcoded user data for UI testing without login — REMOVE LATER
    const tempUser = {
      id: 1,
      firstName: "Anzara",
      lastName: "Ausaf",
      email: "anzara@example.com",
    };
    setUserData(tempUser);

    // Retrieve the search term and selected category from localStorage
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
      const res = await fetch(`/api/user/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
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
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#d9d9d9", padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <img src="/logo.png" alt="Logo" style={{ width: "120px", marginBottom: "20px" }} />
        {["Dashboard", "My Tools", "Bookmarks"].map((text) => (
          <Button key={text} variant="filled" color="gray" style={{ color: "black", background: "#e0e0e0" }} fullWidth>
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

        {/* Filter Section */}
        <Paper p="md" shadow="xs" mb="xl" style={{ backgroundColor: "#e0e0e0" }}>
          <Text weight={600} mb="sm">Filter Tools</Text>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Select placeholder="Category" data={[]} disabled />
            <Select placeholder="Access" data={[]} disabled />
            <Select placeholder="Time" data={[]} disabled />
            <Select placeholder="Ratings" data={[]} disabled />
          </div>

          <Text size="sm" mt="sm" mb="xs">Active Filters:</Text>
          <div style={{ display: "flex", gap: "10px" }}>
            <Chip checked readOnly variant="filled" color="gray">FREE</Chip>
            <Chip checked readOnly variant="filled" color="gray">WRITING TOOLS</Chip>
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
