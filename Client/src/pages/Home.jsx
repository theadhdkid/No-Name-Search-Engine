import { Autocomplete, Loader, Button, Group, Avatar, Title } from "@mantine/core";
import { ArticleCard } from '../components/ArticleCard';
import { useState, useEffect } from 'react';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  // getting user information so we can cusom make it just for user
  const [data, setData] = useState([]);


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUserData({
            id: storedUser.id,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            email: storedUser.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const userInitials = userData ?
    `${userData.firstName[0]}${userData.lastName[0]}` : '';


  const fetchSearchResults = async () => {
    const cleanedSearchTerm = searchTerm.trim(); // ✅ Trim spaces safely

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
    <div
      style={{
        background: '#0F2E81',
        minHeight: '100vh',
        width: '100vw', // Ensures it fills the entire viewport width
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Centering content vertically
        overflowX: 'hidden', // Prevents unwanted horizontal scrolling

      }}
    >
      {/* Header with Search Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          background: "#0F2E81",  // Make sure the header blends with the background
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Title size="h3" style={{ color: "white" }}>NoNameSearchEngines</Title>
      </div>

      {/* Search Bar Section */}
      <div
        style={{
          position: "fixed",
          top: 70,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          padding: "10px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          background: "#0F2E81",
        }}
      >
        <Autocomplete
          placeholder="Search AI tools..."
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
          style={{ flex: 1, background: "white", borderRadius: "5px" }}
        />
        <Button onClick={fetchSearchResults} disabled={loading}>
          {loading ? <Loader size="sm" /> : "Search"}
        </Button>
      </div>

      {/* User Avatar */}
      {userData && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 30,
            zIndex: 1001,
          }}
        >
          <Avatar radius="xl" color="blue">
            {userInitials}
          </Avatar>
        </div>
      )}

      {/* Dynamically Generated Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "150px", // Pushes content below fixed elements
          width: "100%",
          padding: "20px",

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
