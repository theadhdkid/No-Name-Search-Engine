No Name Search Engine: AI Tools Discovery Platform

Overview
AI Tools Discovery Platform is a collaborative full-stack web application designed to help users discover, review, and bookmark AI tools across multiple categories such as academics, research, career, writing, mental health, and creativity. Developed by a team of seven students at San Francisco State University for the CSC-648-848 course (Spring 2025), the platform serves as a centralized hub for finding, evaluating, and interacting with AI tools.

Features
User Authentication
Secure user registration and login with encrypted password storage (bcrypt)

User profile management and session persistence

Protected routes requiring authentication for user-specific actions

AI Tools Discovery
Powerful search functionality with:

Text-based search on tool names, categories, and brands

Multi-faceted filters including categories and user ratings (1-5 stars)

"Tool of the Day" feature highlighting a different AI tool daily

User Interaction
Bookmarking system allowing users to save favorite AI tools

Review and rating system for AI tools, supporting 1-5 star ratings with comments

AI chat assistant integrated via OpenAI API (DeepSeek model) for personalized tool recommendations and user queries

User Experience
Responsive design supporting desktop and mobile devices

Theme customization with light and dark modes

Recent user activity tracking for easy access to bookmarks and reviews

Intuitive sidebar navigation and card-based UI design for tool presentation

Technology Stack
Layer	Technologies
Frontend	React 19, Vite, Mantine UI, React Router
Backend	Fastify (Node.js), Prisma ORM, MySQL
Authentication	Custom implementation with bcrypt
API Integration	OpenAI API via OpenRouter
Validation	Zod schema validation
Testing	API endpoint testing with Jest/Supertest (if applicable)

Architecture & Data Models
User: Stores basic user info, securely hashed passwords, and relationships to favorites and reviews

AI Tool: Contains tool metadata including name, category, brand, and image links

Favorite: Junction table representing many-to-many relations between users and bookmarked tools

Review: Contains user-generated reviews and ratings linked to both users and AI tools

Application Workflow
User registers or logs in

Dashboard displays recent activity, bookmarked tools, and AI chat interface

Users search AI tools with advanced filters and view detailed tool cards

Users bookmark favorite tools and submit reviews with star ratings

The "Tool of the Day" feature encourages discovery and exploration

Installation & Setup
Clone the repository:

bash
Copy
git clone https://github.com/yourusername/ai-tools-discovery-platform.git
cd ai-tools-discovery-platform
Install dependencies and tools:

bash
Copy
npm install
npm install -g foreman
npx prisma generate
Configure your .env file with the necessary database credentials and OpenAI API keys.

Start the application:

bash
Copy
npm run dev
Access the app at http://localhost:3000 (or the port specified).

Security Considerations
Passwords are hashed using bcrypt before storage

Input validation and sanitization with Zod to prevent injection attacks

Protected backend routes to restrict access to authenticated users only

Development Process
Agile development with weekly milestones (M0–M5) documented in the Milestones/ directory

Git version control with feature branches and pull requests

Component-based React frontend with reusable UI components

RESTful API design with Fastify routing and middleware

Comprehensive testing of API endpoints (unit and integration tests)

Team Members
Nicolas Carrillo — ncarrilloordonez@sfsu.edu

Anzara Ausaf — aausaf@mail.sfsu.edu

Michael Ho — mho16@sfsu.edu

Harris Chan — ychan@sfsu.edu

Chance Vodney — cvodnoy@sfsu.edu

Jiqing Liu — jliu42@sfsu.edu

Casey Steven — csteven@sfsu.edu

Future Improvements
Implement social login (Google, GitHub) for streamlined authentication

Add pagination and sorting options to search results

Enhance AI chat assistant with context awareness and multi-turn conversations

Integrate automated testing pipeline with CI/CD tools

Expand categories and incorporate user-generated tool submissions

