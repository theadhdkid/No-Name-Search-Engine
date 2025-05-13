import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Loader,
  Button,
  Text,
  Select,
  Autocomplete,
  Avatar,
  Paper,
  Menu,
  Grid
} from "@mantine/core";
import { ArticleCard } from "../components/ArticleCard";
import CustomizeSettings from "../components/CustomizeSettings";
import AccountSettings from "../components/AccountSettings";
import AIchat from "../components/AIchat";

function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [customColor, setCustomColor] = useState("#646cff");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/");

    const parsedUser = JSON.parse(storedUser);
    setUserData(parsedUser);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);

    fetchBookmarks(parsedUser.id);
  }, []);

  const userInitials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "";

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const fetchBookmarks = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/bookmark?userId=${userId}`);
      const data = await res.json();
      setBookmarks(data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (toolId) => {
    if (!userData) return;

    try {
      await fetch(`/api/user/bookmark?userId=${userData.id}&toolId=${toolId}`, {
        method: "DELETE",
      });
      // Refresh bookmark list
      fetchBookmarks(userData.id);
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  const fetchSearchResults = () => {
    const cleanedSearchTerm = searchTerm.trim();

    // Save to localStorage for search results
    localStorage.setItem("searchTerm", cleanedSearchTerm);
    localStorage.setItem("selectedCategory", selectedCategory);

    // Save to recent searches
    const key = "recentSearches";
    const maxItems = 5;
    let searches = JSON.parse(localStorage.getItem(key)) || [];

    // Avoid duplicates
    searches = searches.filter((item) => item !== cleanedSearchTerm);
    searches.unshift(cleanedSearchTerm);
    if (searches.length > maxItems) {
      searches = searches.slice(0, maxItems);
    }

    localStorage.setItem(key, JSON.stringify(searches));
    setRecentSearches(searches); // update UI

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

      <AccountSettings
        opened={accountOpen}
        onClose={() => setAccountOpen(false)}
        userData={userData}
      />

      <div
        style={{
          backgroundColor:
            theme === "dark"
              ? "#1a1a1a"
              : theme === "light"
                ? "#f4f4f4"
                : theme,
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
          {["Dashboard", "Tool of the Day"].map((text) => (
            <Button
              key={text}
              variant="filled"
              color="gray"
              style={{
                color: "black",
                background: text === "Bookmarks" ? "#c0c0c0" : "#e0e0e0",
                fontWeight: text === "Bookmarks" ? "bold" : "normal"
              }}
              fullWidth
              onClick={() => {
                if (text === "Dashboard") navigate("/home");
                if (text === "Bookmarks") navigate("/bookmarks");
                if (text === "Tool of the Day") navigate("/tooloftheday");
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
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "30px 40px", position: "relative", overflowY: "auto" }}>
          {/* Avatar Menu */}
          {userData && (
            <div style={{ position: "absolute", top: 30, right: 40 }}>
              <Menu shadow="md" width={200} withArrow position="bottom-end">
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    color="gray"
                    style={{ cursor: "pointer" }}
                  >
                    {userInitials}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setSettingsOpen(true)}>
                    Customize Settings
                  </Menu.Item>
                  <Menu.Item>Help</Menu.Item>
                  <Menu.Item onClick={() => setAccountOpen(true)}>
                    Account Settings
                  </Menu.Item>
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

          {/* greeting */}
          <Title
            order={2}
            style={{
              marginBottom: "10px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            Hello Again,{" "}
            <span style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
              {userData?.firstName || "User"}!
            </span>
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
                "Academic" ,
                "Research",
                "Career",
                "Writting Tools",
                "Mental Health",
                "Creativity"
              ]}
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{
                width: "220px",
                background: "white",
                borderRadius: "5px",
              }}
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
              backgroundColor: theme === "dark" ? "#333" : "#d3d3d3",
              borderRadius: "6px",
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <Text
              weight={600}
              mb="sm"
              align="center"
              style={{ marginBottom: "20px" }}
            >
              Recent Activity
            </Text>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {recentSearches.length > 0 ? (
                recentSearches.map((query, index) => (
                  <div
                    key={index}
                    style={{
                      background: theme === "dark" ? "#444" : "white",
                      padding: "12px 20px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: theme === "dark" ? "#fff" : "#000",
                    }}
                  >
                    <Text weight={500}>{query}</Text>
                    <Button
                      size="xs"
                      onClick={() => {
                        setSearchTerm(query);
                        fetchSearchResults();
                      }}
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
                ))
              ) : (
                <Text align="center" size="sm" style={{ opacity: 0.6 }}>
                  No recent searches yet.
                </Text>
              )}
            </div>
          </Paper>

          {/* bookmarking section */}
          <Title order={3} mb="md" style={{ marginTop: "30px" }}>
            YOUR BOOKMARKED TOOLS
          </Title>

          {loading ? (
            <Loader />
          ) : (
            <div>
              {bookmarks.length === 0 ? (
                <Text>No bookmarks found.</Text>
              ) : (
                <Grid>
                  {bookmarks.map((fav) => (
                    <Grid.Col key={fav.tool.id} span={4}>
                      <ArticleCard
                        title={fav.tool.name}
                        description={
                          fav.tool.description || "No description available."
                        }
                        category={fav.tool.category}
                        brand={fav.tool.brand}
                        image={fav.tool.imageUrl || "https://via.placeholder.com/300"}
                        extra={
                          <Button color="red" onClick={() => handleRemove(fav.tool.id)}>
                            Remove Bookmark
                          </Button>
                        }
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </div>
          )}

          {/* AI Chat Section */}
          <div style={{ marginTop: "2rem" }}>
            <AIchat theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;