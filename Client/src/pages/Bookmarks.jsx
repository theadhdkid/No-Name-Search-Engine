import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Loader, Button, Text } from "@mantine/core";
import { ArticleCard } from "../components/ArticleCard";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/");

    const user = JSON.parse(storedUser);
    setUserData(user);
    fetchBookmarks(user.userId);
  }, []);

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
      /*await fetch(
        `http://127.0.0.1:5001/api/user/bookmark?userId=${userData.id}&toolId=${toolId}`,
        { method: "DELETE" }
      );*/
      await fetch(`/api/user/bookmark?userId=${userData.id}&toolId=${toolId}`, {
        method: "DELETE",
      });
      // Refresh bookmark list
      fetchBookmarks(userData.id);
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <Title order={2} mb="md">
        Your Bookmarked Tools
      </Title>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {bookmarks.length === 0 ? (
            <Text>No bookmarks found.</Text>
          ) : (
            bookmarks.map((fav) => (
              <ArticleCard
                key={fav.tool.id}
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
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
