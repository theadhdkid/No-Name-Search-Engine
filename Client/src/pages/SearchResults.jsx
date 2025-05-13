import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Select,
  Button,
  Avatar,
  Title,
  Text,
  Autocomplete,
  Loader,
  Paper,
  Menu,
  Chip,
  Modal,
  Rating,
  Textarea,
} from "@mantine/core";
import { ArticleCard } from "../components/ArticleCard";
import AccountSettings from "../components/AccountSettings.jsx";
import CustomizeSettings from "../components/CustomizeSettings.jsx";

function SearchResults() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(null);

  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Review Modal:
  const [modalOpened, setModalOpened] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [currentToolId, setCurrentToolId] = useState(null);
  const [rating, setRating] = useState(0);

  const openReviewModal = (toolId) => {
    setCurrentToolId(toolId);
    setModalOpened(true);
  };

  // Review List Modal
  const [viewReviewsModalOpen, setViewReviewsModalOpen] = useState(false);
  const [selectedToolReviews, setSelectedToolReviews] = useState([]);

  const handleViewReviews = async (toolId) => {
    try {
      const res = await fetch(`/api/reviews?toolId=${toolId}`);
      const data = await res.json();
      setSelectedToolReviews(data);
      setViewReviewsModalOpen(true);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert("Could not fetch reviews.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Retrieve saved filters from localStorage
    const storedSearchTerm = localStorage.getItem("searchTerm");
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedRating = localStorage.getItem("selectedRating");

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
    if (storedRating) {
      setSelectedRating(storedRating);
    }

    fetchResults(storedSearchTerm, storedCategory, storedRating);
  }, []);

  const fetchResults = async (query, category, rating) => {
    setLoading(true);
    // Save search parameters to localStorage
    localStorage.setItem("searchTerm", query || "");
    localStorage.setItem("selectedCategory", category || "");
    localStorage.setItem("selectedRating", rating || "");

    try {
      const url = `/api/user/search?query=${encodeURIComponent(query || "")}&category=${encodeURIComponent(category || "")}&minRating=${encodeURIComponent(rating || "")}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log("Search API response:", data);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults([
        {
          name: "Error loading results",
          category: "Error",
          brand: "Unknown",
          imageUrl: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const userInitials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "";

    const handleAddBookmark = async (tool) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id; // bookmark should correctly function now
    
      if (!userId || !tool.id) {
        alert("User ID and Tool ID are required.");
        return;
      }
    
      try {
        const res = await fetch("/api/user/bookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            toolId: tool.id,
          }),
        });
    
        const data = await res.json();
        if (res.status === 201) {
          alert("Tool bookmarked!");
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error("Error bookmarking tool:", err);
      }
    };
    

  // List of available categories
  const categories = [
    "Computer Vision",
    "Machine Learning & Data Science",
    "Natural Language Processing",
    "Speech Recognition & Synthesis",
    "AI for Finance",
    "AI for Gaming",
    "AI-Powered Productivity"
  ];

  // Rating filter options
  const ratingOptions = [
    { value: "5", label: "⭐⭐⭐⭐⭐ (5 stars)" },
    { value: "4", label: "⭐⭐⭐⭐ (4+ stars)" },
    { value: "3", label: "⭐⭐⭐ (3+ stars)" },
    { value: "2", label: "⭐⭐ (2+ stars)" },
    { value: "1", label: "⭐ (1+ star)" }
  ];

  return (

    <>
      <CustomizeSettings
        opened={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onThemeChange={(newTheme) => {
          setTheme(newTheme);
          localStorage.setItem("theme", newTheme);
        }}
        customColor="#646cff"
        setCustomColor={() => {
        }}
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
    minHeight: "100vh",   // allowed bigger pages
    width: "100vw",
    overflowY: "auto",    // enabled scrolling
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
          {["Dashboard", "Tool of the Day", "Bookmarks"].map((text) => (
            <Button
              key={text}
              variant="filled"
              color="gray"
              style={{ color: "black", background: "#e0e0e0" }}
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
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="filled"
              color="gray"
              style={{
                color: "black",
                background: selectedCategory === cat ? "#b0b0b0" : "#e0e0e0",
              }}
              fullWidth
              onClick={() => {
                const newCategory = selectedCategory === cat ? "" : cat;
                setSelectedCategory(newCategory);
                fetchResults(searchTerm, newCategory, selectedRating);
              }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "30px 40px",
            position: "relative",
            overflowY: "auto",
          }}
        >
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
                  <Menu.Item onClick={() => setSettingsOpen(true)}>Customize Settings</Menu.Item>
                  <Menu.Item>Help</Menu.Item>
                  <Menu.Item onClick={() => setAccountOpen(true)}>Account Settings</Menu.Item>
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

          {/* Heading */}
          <Title order={2} style={{ marginBottom: "20px" }}>
            Search Results...
          </Title>

          {/* Search bar */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Autocomplete
                placeholder="What tool can I help you find today?"
                value={searchTerm}
                onChange={setSearchTerm}
                rightSection={loading ? <Loader size="sm" /> : null}
                style={{ flex: 1, background: "white", borderRadius: "5px" }}
              />
              <Button
                onClick={() => fetchResults(searchTerm, selectedCategory, selectedRating)}
                disabled={loading}
                style={{ backgroundColor: "black", color: "white" }}
              >
                {loading ? <Loader size="sm" color="white" /> : "Search"}
              </Button>
            </div>
          </div>

          {/* FILTER SECTION */}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <Select
                placeholder="Category"
                data={categories}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                  fetchResults(searchTerm, value, selectedRating);
                }}
                size="xs"
                clearable
              />

              <Select
                placeholder="Rating"
                data={ratingOptions}
                value={selectedRating}
                onChange={(value) => {
                  setSelectedRating(value);
                  fetchResults(searchTerm, selectedCategory, value);
                }}
                size="xs"
                clearable
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "6px",
                marginTop: "6px",
                flexWrap: "wrap",
              }}
            >
              {selectedCategory && (
                <Chip
                  variant="light"
                  color="gray"
                  size="xs"
                  checked
                  onClose={() => {
                    setSelectedCategory("");
                    fetchResults(searchTerm, "", selectedRating);
                  }}
                >
                  {selectedCategory}
                </Chip>
              )}

              {selectedRating && (
                <Chip
                  variant="light"
                  color="yellow"
                  size="xs"
                  checked
                  onClose={() => {
                    setSelectedRating("");
                    fetchResults(searchTerm, selectedCategory, "");
                  }}
                >
                  {ratingOptions.find(option => option.value === selectedRating)?.label || `${selectedRating}+ stars`}
                </Chip>
              )}
            </div>
          </Paper>

          {/* Result Count */}
          <Title order={4} mb="md">
            Showing {results.length} Results
          </Title>

          {/* Search Results */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {results.map((item) => (
              <ArticleCard
                key={item.id || item.name}
                title={item.name}
                description={item.description || "No description available."}
                category={item.category}
                brand={item.brand}
                image={item.imageUrl || "https://via.placeholder.com/300"}
                onClickRating={() => handleViewReviews(item.id)}
                onBookmark={() => handleAddBookmark(item)}
                onReview={() => openReviewModal(item.id)}
                rating={item.averageRating || 0} // Pass the average rating to display in the card
              />
            ))}
          </div>

          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Leave a Review"
          >
            <Rating
              value={rating}
              onChange={setRating}
              count={5}
              size="md"
              color="yellow"
              mb="md"
            />
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.currentTarget.value)}
              placeholder="Write your thoughts about this tool..."
              minRows={4}
            />
            <Button
              fullWidth
              mt="md"
              onClick={async () => {
                try {
                  await fetch("/api/reviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: userData?.id,
                      toolId: currentToolId,
                      content: reviewText,
                      rating: rating,
                    }),
                  });
                  setModalOpened(false);
                  setReviewText("");
                  setRating(0);
                  alert("Review submitted!");
                } catch (err) {
                  console.error("Error submitting review:", err);
                  alert("There was a problem submitting your review.");
                }
              }}
            >
              Submit Review
            </Button>
          </Modal>

          <Modal
            opened={viewReviewsModalOpen}
            onClose={() => setViewReviewsModalOpen(false)}
            title="Tool Reviews"
            centered
            overlayProps={{
              blur: 3,
              backgroundOpacity: 0.55,
            }}
            size="md"
            padding="lg"
            radius="md"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {selectedToolReviews.length === 0 ? (
                <Text>No reviews yet.</Text>
              ) : (
                selectedToolReviews.map((review, idx) => (
                  <Paper key={idx} shadow="xs" p="md" withBorder>
                    <Text size="sm" fw={500} mb={4}>
                      ⭐ {review.rating}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {review.content}
                    </Text>
                  </Paper>
                ))
              )}
            </div>
          </Modal>
        </div>
      </div>

    </>
  );
}

export default SearchResults;