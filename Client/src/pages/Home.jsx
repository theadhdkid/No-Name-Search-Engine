import { useState } from 'react';
import { Autocomplete, Loader, Button } from '@mantine/core';
import { ArticleCard } from '../components/ArticleCard';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // Stores fetched search results

  // Fetch search results when button is clicked
  const fetchSearchResults = async () => {
    if (searchTerm.trim().length < 1) {
      console.log("[]"); // Logs empty array if no search term is entered
      setData([{ name: "Please enter a search term", category: "Error", imageUrl: "" }]);
      return;
    }

    setLoading(true);

    try {
      console.log(`Fetching data for: "${searchTerm}"`); // Log query input

      const response = await fetch(
        `http://localhost:5001/api/user/search?query=${encodeURIComponent(searchTerm)}`
      );
      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (Array.isArray(result) && result.length > 0) {
        setData(result); // Store fetched results
      } else {
        setData([{ name: "No tools found", category: "Not Found", imageUrl: "" }]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setData([{ name: "Error loading results", category: "Error", imageUrl: "" }]);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Search Bar (Fixed at the Top) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          background: "white",
          padding: "10px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Autocomplete
          label="Search AI Tools"
          placeholder="Enter tool name..."
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
            "AlphaSense",
            "Amazon",
            "Darktrace",
            "DeepMind",
            "GitHub",
            "Google",
            "Grammarly",
            "IBM",
            "Jasper AI",
            "Kavout",
            "Meta",
            "MidJourney",
            "Open Source",
            "OpenAI",
            "Tabnine",
            "Unity",
          ]}
          value={searchTerm}
          onChange={setSearchTerm}
          rightSection={loading ? <Loader size="sm" /> : null}
          style={{ flex: 1 }}
        />
        <Button onClick={fetchSearchResults} disabled={loading}>
          {loading ? <Loader size="sm" /> : "Search"}
        </Button>
      </div>

      {/* Dynamically Generated Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", // Allow cards to wrap in multiple rows
          gap: "20px",
          marginTop: "100px",
        }}
      >
        {data.map((item) => (
          <ArticleCard
            key={item.id || item.name} // Ensure unique key for React
            title={item.name}
            description={`Brand: ${item.brand || "Unknown"}`}
            category={item.category}
            image={item.imageUrl || "https://via.placeholder.com/300"} // Fallback image
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
