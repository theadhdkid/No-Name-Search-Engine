import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // creating test users with hashed passwords
  const hashedPassword1 = await bcrypt.hash("password123", 10);
  const hashedPassword2 = await bcrypt.hash("testpassword", 10);

  await prisma.User.createMany({
    data: [
      {
        email: "user@example.com",
        firstName: "Test",
        lastName: "User",
        hashedPassword: hashedPassword1,
      },
      {
        email: "jane.smith@test.com",
        firstName: "Jane",
        lastName: "Smith",
        hashedPassword: hashedPassword2,
      },
    ],
  });

  // AI generated seed AI tools
  await prisma.AITool.createMany({
    data: [
      {
        id: "0f722017-dd2e-47bb-a23b-ffc772d919d4",
        name: "TensorFlow",
        category: "Writing",
        brand: "Google",
        imageUrl: "https://example.com/tensorflow.png",
      },
      {
        id: "8562ed95-daa1-4314-a625-eb80eb48fc75",
        name: "PyTorch",
        category: "Machine Learning & Data Science",
        brand: "Meta",
        imageUrl: "https://example.com/pytorch.png",
      },
      {
        id: "ab61e8ab-fc7c-4e3a-a92d-e14bd8efea51",
        name: "Scikit-learn",
        category: "Machine Learning & Data Science",
        brand: "Open Source",
        imageUrl: "https://example.com/scikit-learn.png",
      },
      {
        id: "d205cc31-c0f7-43e6-8507-08f06f8d730e",
        name: "ChatGPT",
        category: "Natural Language Processing (NLP)",
        brand: "OpenAI",
        imageUrl: "https://example.com/chatgpt.png",
      },
      {
        id: "5f7749d1-338e-4862-910d-ce7eebdedc57",
        name: "Google BERT",
        category: "Natural Language Processing (NLP)",
        brand: "Google",
        imageUrl: "https://example.com/bert.png",
      },
      {
        id: "1a22b5d9-2f64-4b2e-b8a4-79fa3de3cb7d",
        name: "IBM Watson NLP",
        category: "Natural Language Processing (NLP)",
        brand: "IBM",
        imageUrl: "https://example.com/watson-nlp.png",
      },
      {
        id: "0b7a74ea-bc7c-4a29-bbc7-446f2a13a5d1",
        name: "OpenCV",
        category: "Computer Vision",
        brand: "Open Source",
        imageUrl: "https://example.com/opencv.png",
      },
      {
        id: "8e5c47ab-1f7f-4cc7-8d58-bb439d14c0f7",
        name: "YOLO",
        category: "Computer Vision",
        brand: "Open Source",
        imageUrl: "https://example.com/yolo.png",
      },
      {
        id: "69f1a347-3c62-489b-902e-6fa2f04d4a76",
        name: "Google Speech-to-Text",
        category: "Speech Recognition & Synthesis",
        brand: "Google",
        imageUrl: "https://example.com/google-speech.png",
      },
      {
        id: "2f8f6d5b-4a1e-4c07-8aa5-55f1fa514df3",
        name: "Amazon Transcribe",
        category: "Speech Recognition & Synthesis",
        brand: "Amazon",
        imageUrl: "https://example.com/amazon-transcribe.png",
      },
      {
        id: "3f9ad4df-6d7b-4609-b7b2-78136cd4d23a",
        name: "DALL·E",
        category: "Generative AI",
        brand: "OpenAI",
        imageUrl: "https://example.com/dalle.png",
      },
      {
        id: "b2db4a77-6c5c-4b7d-b927-934c1b963dfc",
        name: "MidJourney",
        category: "Generative AI",
        brand: "MidJourney",
        imageUrl: "https://example.com/midjourney.png",
      },
      {
        id: "e93c4975-d5f5-4c8f-878d-9d6854a59289",
        name: "GitHub Copilot",
        category: "AI Code Generation",
        brand: "GitHub",
        imageUrl: "https://example.com/copilot.png",
      },
      {
        id: "d22f52c7-3d4b-4c90-9f89-243c7aa3b719",
        name: "Tabnine",
        category: "AI Code Generation",
        brand: "Tabnine",
        imageUrl: "https://example.com/tabnine.png",
      },
      {
        id: "40a64b18-64d1-407d-a437-9fb3b4c12986",
        name: "Grammarly",
        category: "AI-Powered Productivity",
        brand: "Grammarly",
        imageUrl: "https://example.com/grammarly.png",
      },
      {
        id: "54cd35d9-3f0e-4a0c-a920-c26cb1eeb8d6",
        name: "Jasper",
        category: "AI-Powered Productivity",
        brand: "Jasper AI",
        imageUrl: "https://example.com/jasper.png",
      },
      {
        id: "7c11616e-3154-4c9b-9947-207490d8f78a",
        name: "Darktrace",
        category: "AI for Cybersecurity",
        brand: "Darktrace",
        imageUrl: "https://example.com/darktrace.png",
      },
      {
        id: "80e41768-94a6-4c74-b2a0-b5f4975d6b27",
        name: "IBM Security QRadar",
        category: "AI for Cybersecurity",
        brand: "IBM",
        imageUrl: "https://example.com/qradar.png",
      },
      {
        id: "a8c71bff-4cf3-49e1-8580-6798db2ad00c",
        name: "IBM Watson Health",
        category: "AI for Healthcare",
        brand: "IBM",
        imageUrl: "https://example.com/watson-health.png",
      },
      {
        id: "c4d2b7b4-8df9-4699-9e6c-b2fc9a35e2d5",
        name: "DeepMind AlphaFold",
        category: "AI for Healthcare",
        brand: "DeepMind",
        imageUrl: "https://example.com/alphafold.png",
      },
      {
        id: "3e984b5a-948c-4d41-8d51-709b8b6d1183",
        name: "Kavout",
        category: "AI for Finance",
        brand: "Kavout",
        imageUrl: "https://example.com/kavout.png",
      },
      {
        id: "b35e12f3-9336-4aeb-a654-8d2e55be66d9",
        name: "AlphaSense",
        category: "AI for Finance",
        brand: "AlphaSense",
        imageUrl: "https://example.com/alphasense.png",
      },
      {
        id: "fbc474aa-1e2f-4bc1-86c1-3d0dc2a9b839",
        name: "Unity ML-Agents",
        category: "AI for Gaming",
        brand: "Unity",
        imageUrl: "https://example.com/ml-agents.png",
      },
      {
        id: "1d4d1e6f-5d2e-4ad1-b0e5-ff4327c5e6db",
        name: "OpenAI Gym",
        category: "AI for Gaming",
        brand: "OpenAI",
        imageUrl: "https://example.com/openai-gym.png",
      },
      {
        id: "baf35101-4454-421e-910f-0de31f47c38e",
        name: "Sudowrite",
        category: "Writing",
        brand: "Sudowrite",
        imageUrl: "https://example.com/sudowrite.png",
      },
      {
        id: "cbb0c7aa-6dd9-4ed8-b85c-9b4c5dc32a2d",
        name: "Notion AI",
        category: "Writing",
        brand: "Notion",
        imageUrl: "https://example.com/notion-ai.png",
      },
      {
        id: "198f7059-8722-4294-a7ad-158c7ff84714",
        name: "Quillbot",
        category: "Writing",
        brand: "Quillbot",
        imageUrl: "https://example.com/quillbot.png",
      },
      {
        id: "a6b138be-7482-4d21-9359-bf06312ddf35",
        name: "HyperWrite",
        category: "Writing",
        brand: "HyperWrite",
        imageUrl: "https://example.com/hyperwrite.png",
      },

      // Career
      {
        id: "38d4e1fc-3508-4a08-89ea-002a25a174e9",
        name: "Kickresume AI",
        category: "Career",
        brand: "Kickresume",
        imageUrl: "https://example.com/kickresume.png",
      },
      {
        id: "dc8b1c03-4434-4a9d-82a1-416168e76f37",
        name: "Jobscan",
        category: "Career",
        brand: "Jobscan",
        imageUrl: "https://example.com/jobscan.png",
      },
      {
        id: "f5ef5b6e-8814-4975-bc3d-4e10cd0f77db",
        name: "LoopCV",
        category: "Career",
        brand: "LoopCV",
        imageUrl: "https://example.com/loopcv.png",
      },
      {
        id: "f3e7c5b5-b121-4dc7-a134-5c2f2e858889",
        name: "Rezi",
        category: "Career",
        brand: "Rezi",
        imageUrl: "https://example.com/rezi.png",
      },

      // Academics
      {
        id: "62055b31-d8df-4e5e-85dc-26e5fae3f443",
        name: "Elicit",
        category: "Academics",
        brand: "Ought",
        imageUrl: "https://example.com/elicit.png",
      },
      {
        id: "3ad5f0d3-5a36-40ef-90a7-0b74087eac42",
        name: "TutorAI",
        category: "Academics",
        brand: "TutorAI",
        imageUrl: "https://example.com/tutorai.png",
      },
      {
        id: "b15e9c26-d254-4d03-99d4-25ccfa7fbb3e",
        name: "Socratic by Google",
        category: "Academics",
        brand: "Google",
        imageUrl: "https://example.com/socratic.png",
      },
      {
        id: "32cd4193-48b1-4dc5-b1c7-0df31494b53b",
        name: "Knowji",
        category: "Academics",
        brand: "Knowji",
        imageUrl: "https://example.com/knowji.png",
      },

      // Research
      {
        id: "28967c0c-ef0c-4095-a9b3-f91e3181cf87",
        name: "Consensus",
        category: "Research",
        brand: "Consensus",
        imageUrl: "https://example.com/consensus.png",
      },
      {
        id: "62a64a7a-b6b4-493b-b28e-6dc86cfb0b41",
        name: "Scite",
        category: "Research",
        brand: "Scite",
        imageUrl: "https://example.com/scite.png",
      },
      {
        id: "e6e22f69-7e7f-4a89-bbd4-b0ac4a4ec5cd",
        name: "Research Rabbit",
        category: "Research",
        brand: "ResearchRabbit",
        imageUrl: "https://example.com/researchrabbit.png",
      },
      {
        id: "3db6d4de-8496-4097-a598-8ef344d83e84",
        name: "Inciteful",
        category: "Research",
        brand: "Inciteful",
        imageUrl: "https://example.com/inciteful.png",
      },

      // Mental Health
      {
        id: "68cf4cd2-87e7-4c35-b7ec-0fcdd4e3b539",
        name: "Wysa",
        category: "Mental Health",
        brand: "Wysa",
        imageUrl: "https://example.com/wysa.png",
      },
      {
        id: "fe7c2f66-31a5-49dc-b166-4e0ae8910636",
        name: "Replika",
        category: "Mental Health",
        brand: "Replika",
        imageUrl: "https://example.com/replika.png",
      },
      {
        id: "98b0f53b-b8b2-4eb9-8f2f-763cedc61d62",
        name: "Youper",
        category: "Mental Health",
        brand: "Youper",
        imageUrl: "https://example.com/youper.png",
      },
      {
        id: "244a362f-4c85-4534-a95f-c74dc1a8d50f",
        name: "Woebot",
        category: "Mental Health",
        brand: "Woebot Health",
        imageUrl: "https://example.com/woebot.png",
      },

      // Creativity
      {
        id: "e8ed10f2-d97f-4b7d-9800-1f2c284a1b33",
        name: "Runway ML",
        category: "Creativity",
        brand: "Runway",
        imageUrl: "https://example.com/runwayml.png",
      },
      {
        id: "7580a6d6-d1c4-4f39-8610-6f378a8beffa",
        name: "Soundraw",
        category: "Creativity",
        brand: "Soundraw",
        imageUrl: "https://example.com/soundraw.png",
      },
      {
        id: "da92e8b4-3284-4de6-88ad-ff17f3b97837",
        name: "Kaiber",
        category: "Creativity",
        brand: "Kaiber",
        imageUrl: "https://example.com/kaiber.png",
      },
      {
        id: "a3a69e04-0164-4f6f-bb8f-78ecf18b3108",
        name: "Boomy",
        category: "Creativity",
        brand: "Boomy",
        imageUrl: "https://example.com/boomy.png",
      },
    ],
  });

  console.log("✅ Database seeded with test users!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
