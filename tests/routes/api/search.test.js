import { test } from 'node:test';
import * as assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });


import { build } from '../../helper.js';

test('/api/search', async (t) => {
  const app = await build(t);

  await t.test('GET /api/search', async (t) => {
    await t.test('returns ok with no input', async (t) => {
      const response = await app.inject().post('/api/user/search').payload({
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);
    });

    await t.test('returns not found if no results were found', async (t) => {
      const response = await app.inject().post('/api/user/search').payload({
        query: '11111',
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.NOT_FOUND);
    });

    await t.test('query with category filter works', async (t) => {
      const response = await app.inject().post('/api/user/search').payload({
        query: 'OpenCV',
        category: 'Computer Vision'
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, [{
        id: "0b7a74ea-bc7c-4a29-bbc7-446f2a13a5d1",
        name: "OpenCV",
        category: "Computer Vision",
        brand: "Open Source",
        imageUrl: "https://example.com/opencv.png",
        createdAt: "2025-03-18T02:29:50.615Z",
        updatedAt: "2025-03-18T02:29:50.615Z",
      }]);
    });

    await t.test('query with brand filter works', async (t) => {
      const response = await app.inject().post('/api/user/search').payload({
        query: 'OpenCV',
        brand: 'Open Source'
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, [{
        id: "0b7a74ea-bc7c-4a29-bbc7-446f2a13a5d1",
        name: "OpenCV",
        category: "Computer Vision",
        brand: "Open Source",
        imageUrl: "https://example.com/opencv.png",
        createdAt: "2025-03-18T02:29:50.615Z",
        updatedAt: "2025-03-18T02:29:50.615Z",
      }]);
    });

    await t.test('query with price filter works', async (t) => {
      const response = await app.inject().post('/api/user/search').payload({
        query: 'OpenCV',
        price: 10
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, [{
        id: "0b7a74ea-bc7c-4a29-bbc7-446f2a13a5d1",
        name: "OpenCV",
        category: "Computer Vision",
        brand: "Open Source",
        imageUrl: "https://example.com/opencv.png",
        createdAt: "2025-03-18T02:29:50.615Z",
        updatedAt: "2025-03-18T02:29:50.615Z",
      }]);
    });
  });
});
