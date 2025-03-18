import { useState } from 'react';
import { Autocomplete, Loader, Button } from '@mantine/core';
import { ArticleCard } from '../components/ArticleCard';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchSearchResults = async () => {
    const cleanedSearchTerm = searchTerm.trim(); // ✅ Trim spaces safely

    // ✅ If input is empty OR only a space → Fetch all items
    const url = cleanedSearchTerm.length === 0
      ? "http://localhost:5001/api/user/search"
      : `http://localhost:5001/api/user/search?query=${encodeURIComponent(searchTerm)}`;

    setLoading(true);

    try {
      console.log(`Fetching data from: ${url}`);

      const response = await fetch(url);
      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (Array.isArray(result) && result.length > 0) {
        setData(result);
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
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "100px",
        }}
      >
        {data.map((item) => (
          <ArticleCard
            key={item.id || item.name}
            title={item.name}
            description={`Brand: ${item.brand || "Unknown"}`}
            category={item.category}
            image={item.imageUrl || "https://via.placeholder.com/300"}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
