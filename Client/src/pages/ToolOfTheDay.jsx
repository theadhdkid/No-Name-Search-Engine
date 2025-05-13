import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';
import { Modal, Rating, Textarea, Button, Paper, Text, Loader, Title, ActionIcon } from '@mantine/core';

// Defined colors
const PAGE_BACKGROUND_COLOR = '#121212'; // Black grey
const TEXT_COLOR = '#F0F0F0'; // Grey white
const RETURN_BUTTON_BG_COLOR = '#003366'; // Dark blue

function ToolOfTheDay() {
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Review Submission Modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [currentReviewToolId, setCurrentReviewToolId] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);

  // View Reviews Modal
  const [viewReviewsModalOpen, setViewReviewsModalOpen] = useState(false);
  const [selectedToolReviews, setSelectedToolReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const fetchToolOfTheDay = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tooloftheday`); // Fetch daily tool
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.id) {
          setTool(data);
        } else {
          setError("No Tool of the Day found.");
          setTool(null);
        }
      } catch (err) {
        console.error("Failed to fetch Tool of the Day:", err);
        setError(err.message || "An error occurred while fetching the tool.");
        setTool(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToolOfTheDay();
  }, []);

  // Handlers
  const openReviewModalHandler = (toolId) => {
    if (!userData) {
        alert("Please log in to leave a review.");
        return;
    }
    setCurrentReviewToolId(toolId);
    setReviewModalOpen(true);
    setReviewText("");
    setReviewRating(0);
  };

  const submitReviewHandler = async () => {
    if (!currentReviewToolId || !userData) {
        alert("Error: Tool ID or User ID missing.");
        return;
    }
    try {
      const res = await fetch(`/api/reviews`, { // Fetch reviews
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.id,
          toolId: currentReviewToolId,
          content: reviewText,
          rating: reviewRating,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to submit review" }));
        throw new Error(errorData.message);
      }
      setReviewModalOpen(false);
      alert("Review submitted!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(`There was a problem submitting your review: ${err.message}`);
    }
  };

  const handleViewReviewsHandler = async (toolId) => {
    setReviewsLoading(true);
    setSelectedToolReviews([]);
    try {
      const res = await fetch(`/api/reviews?toolId=${toolId}`); // Fetch reviews
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Failed to fetch reviews" }));
        throw new Error(errorData.message);
      }
      const data = await res.json();
      setSelectedToolReviews(data);
      setViewReviewsModalOpen(true);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert(`Could not fetch reviews: ${error.message}`);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddBookmarkHandler = async (toolItem) => {
    if (!userData || !toolItem.id) {
        alert("Please log in to bookmark a tool.");
        return;
    }
    try {
      const res = await fetch(`/api/user/bookmark`, { // Fetch bookmark
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.id,
          toolId: toolItem.id,
        }),
      });
      const data = await res.json();
      if (res.status === 201 || res.ok) {
        alert(data.message || "Tool bookmarked!");
      } else {
        alert(data.message || "Something went wrong while bookmarking.");
      }
    } catch (err) {
      console.error("Error bookmarking tool:", err);
      alert("Error bookmarking tool.");
    }
  };

  // Main Page Styling
  const pageStyle = {
    backgroundColor: PAGE_BACKGROUND_COLOR,
    color: TEXT_COLOR,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
  };

  // Return Button Styling
  const returnButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: RETURN_BUTTON_BG_COLOR,
    color: TEXT_COLOR,
    border: 'none',
    fontSize: '20px',
  };


  // Tool of the Day Rendering
  let content;
  if (loading) {
    content = (
      <>
        <Loader color="gray" />
        <p style={{ marginTop: '10px' }}>Loading Tool of the Day...</p>
      </>
    );
  } else if (error) {
    content = <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>;
  } else if (!tool) {
    content = <p style={{ marginTop: '20px' }}>No tool available for today.</p>;
  } else {
    content = (
      <ArticleCard
        key={tool.id || tool.name}
        title={tool.name}
        description={tool.description || "No description available."}
        category={tool.category}
        brand={tool.brand}
        image={tool.imageUrl || "https://via.placeholder.com/300"}
        onClickRating={() => handleViewReviewsHandler(tool.id)}
        onBookmark={() => handleAddBookmarkHandler(tool)}
        onReview={() => openReviewModalHandler(tool.id)}
      />
    );
  }

  return (
    <div style={pageStyle}>
      <ActionIcon
        variant="filled"
        size="lg"
        onClick={() => navigate('/home')}
        style={returnButtonStyle}
        aria-label="Return to home"
      >
        {'\u2190'}
      </ActionIcon>

      <Title order={1} style={{ color: TEXT_COLOR, textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
        Tool of the Day
      </Title>

      {content}

      {/* Review Submissions Modal */}
      <Modal
        opened={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Leave a Review"
        centered
      >
        <Rating
          value={reviewRating}
          onChange={setReviewRating}
          count={5}
          size="lg"
          mb="md"
        />
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.currentTarget.value)}
          placeholder="Write your thoughts about this tool..."
          minRows={4}
          mb="md"
        />
        <Button
          fullWidth
          onClick={submitReviewHandler}
        >
          Submit Review
        </Button>
      </Modal>

      {/* View Reviews Modal */}
      <Modal
        opened={viewReviewsModalOpen}
        onClose={() => setViewReviewsModalOpen(false)}
        title="Tool Reviews"
        centered
        size="md"
        padding="lg"
      >
        {reviewsLoading && <Loader color="gray" />}
        {!reviewsLoading && selectedToolReviews.length === 0 && (
          <Text >No reviews yet for this tool.</Text>
        )}
        {!reviewsLoading && selectedToolReviews.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedToolReviews.map((review, idx) => (
              <Paper key={review.id || idx} shadow="xs" p="md" withBorder>
                <Rating value={review.rating} fractions={2} readOnly size="sm" mb={4}/>
                <Text size="sm" mt={4} mb={4}>
                  By: {review.User?.firstName || 'Anonymous'}
                </Text>
                <Text size="sm" >{review.content}</Text>
                <Text size="xs" color="dimmed" mt={5}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </Paper>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ToolOfTheDay;