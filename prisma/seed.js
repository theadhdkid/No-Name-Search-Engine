import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // creating test users with hashed passwords
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('testpassword', 10);

  await prisma.User.createMany({
    data: [
      {
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        hashedPassword: hashedPassword1,
      },
      {
        email: 'jane.smith@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        hashedPassword: hashedPassword2,
      },
    ],
  });

  // AI generated seed AI tools
  await prisma.AITool.createMany({
    data: [
      { id: '0f722017-dd2e-47bb-a23b-ffc772d919d4', name: 'TensorFlow', category: 'Machine Learning & Data Science', brand: 'Google', imageUrl: 'https://example.com/tensorflow.png' },
      { id: '8562ed95-daa1-4314-a625-eb80eb48fc75', name: 'PyTorch', category: 'Machine Learning & Data Science', brand: 'Meta', imageUrl: 'https://example.com/pytorch.png' },
      { id: 'ab61e8ab-fc7c-4e3a-a92d-e14bd8efea51', name: 'Scikit-learn', category: 'Machine Learning & Data Science', brand: 'Open Source', imageUrl: 'https://example.com/scikit-learn.png' },
      { id: 'd205cc31-c0f7-43e6-8507-08f06f8d730e', name: 'ChatGPT', category: 'Natural Language Processing (NLP)', brand: 'OpenAI', imageUrl: 'https://example.com/chatgpt.png' },
      { id: '5f7749d1-338e-4862-910d-ce7eebdedc57', name: 'Google BERT', category: 'Natural Language Processing (NLP)', brand: 'Google', imageUrl: 'https://example.com/bert.png' },
      { id: '1a22b5d9-2f64-4b2e-b8a4-79fa3de3cb7d', name: 'IBM Watson NLP', category: 'Natural Language Processing (NLP)', brand: 'IBM', imageUrl: 'https://example.com/watson-nlp.png' },
      { id: '0b7a74ea-bc7c-4a29-bbc7-446f2a13a5d1', name: 'OpenCV', category: 'Computer Vision', brand: 'Open Source', imageUrl: 'https://example.com/opencv.png' },
      { id: '8e5c47ab-1f7f-4cc7-8d58-bb439d14c0f7', name: 'YOLO', category: 'Computer Vision', brand: 'Open Source', imageUrl: 'https://example.com/yolo.png' },
      { id: '69f1a347-3c62-489b-902e-6fa2f04d4a76', name: 'Google Speech-to-Text', category: 'Speech Recognition & Synthesis', brand: 'Google', imageUrl: 'https://example.com/google-speech.png' },
      { id: '2f8f6d5b-4a1e-4c07-8aa5-55f1fa514df3', name: 'Amazon Transcribe', category: 'Speech Recognition & Synthesis', brand: 'Amazon', imageUrl: 'https://example.com/amazon-transcribe.png' },
      { id: '3f9ad4df-6d7b-4609-b7b2-78136cd4d23a', name: 'DALL·E', category: 'Generative AI', brand: 'OpenAI', imageUrl: 'https://example.com/dalle.png' },
      { id: 'b2db4a77-6c5c-4b7d-b927-934c1b963dfc', name: 'MidJourney', category: 'Generative AI', brand: 'MidJourney', imageUrl: 'https://example.com/midjourney.png' },
      { id: 'e93c4975-d5f5-4c8f-878d-9d6854a59289', name: 'GitHub Copilot', category: 'AI Code Generation', brand: 'GitHub', imageUrl: 'https://example.com/copilot.png' },
      { id: 'd22f52c7-3d4b-4c90-9f89-243c7aa3b719', name: 'Tabnine', category: 'AI Code Generation', brand: 'Tabnine', imageUrl: 'https://example.com/tabnine.png' },
      { id: '40a64b18-64d1-407d-a437-9fb3b4c12986', name: 'Grammarly', category: 'AI-Powered Productivity', brand: 'Grammarly', imageUrl: 'https://example.com/grammarly.png' },
      { id: '54cd35d9-3f0e-4a0c-a920-c26cb1eeb8d6', name: 'Jasper', category: 'AI-Powered Productivity', brand: 'Jasper AI', imageUrl: 'https://example.com/jasper.png' },
      { id: '7c11616e-3154-4c9b-9947-207490d8f78a', name: 'Darktrace', category: 'AI for Cybersecurity', brand: 'Darktrace', imageUrl: 'https://example.com/darktrace.png' },
      { id: '80e41768-94a6-4c74-b2a0-b5f4975d6b27', name: 'IBM Security QRadar', category: 'AI for Cybersecurity', brand: 'IBM', imageUrl: 'https://example.com/qradar.png' },
      { id: 'a8c71bff-4cf3-49e1-8580-6798db2ad00c', name: 'IBM Watson Health', category: 'AI for Healthcare', brand: 'IBM', imageUrl: 'https://example.com/watson-health.png' },
      { id: 'c4d2b7b4-8df9-4699-9e6c-b2fc9a35e2d5', name: 'DeepMind AlphaFold', category: 'AI for Healthcare', brand: 'DeepMind', imageUrl: 'https://example.com/alphafold.png' },
      { id: '3e984b5a-948c-4d41-8d51-709b8b6d1183', name: 'Kavout', category: 'AI for Finance', brand: 'Kavout', imageUrl: 'https://example.com/kavout.png' },
      { id: 'b35e12f3-9336-4aeb-a654-8d2e55be66d9', name: 'AlphaSense', category: 'AI for Finance', brand: 'AlphaSense', imageUrl: 'https://example.com/alphasense.png' },
      { id: 'fbc474aa-1e2f-4bc1-86c1-3d0dc2a9b839', name: 'Unity ML-Agents', category: 'AI for Gaming', brand: 'Unity', imageUrl: 'https://example.com/ml-agents.png' },
      { id: '1d4d1e6f-5d2e-4ad1-b0e5-ff4327c5e6db', name: 'OpenAI Gym', category: 'AI for Gaming', brand: 'OpenAI', imageUrl: 'https://example.com/openai-gym.png' },
    ],
  });

  console.log('✅ Database seeded with test users!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
