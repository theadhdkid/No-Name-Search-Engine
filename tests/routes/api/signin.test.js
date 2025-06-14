import { test } from "node:test";
import * as assert from "node:assert";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { build } from "../../helper.js";

test("/api/signin", async (t) => {
  const app = await build(t);

  await t.test("GET /api/signin", async (t) => {
    await t.test(
      "returns bad request if required fields are missing",
      async (t) => {
        const response = await app
          .inject()
          .post("/api/user/signin")
          .payload({});

        assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
      },
    );

    await t.test(
      "returns bad request if password doesnt match account",
      async (t) => {
        const response = await app.inject().post("/api/user/signin").payload({
          email: "user@example.com",
          password: "wrongpassword123",
        });

        assert.deepStrictEqual(response.statusCode, StatusCodes.UNAUTHORIZED);
      },
    );

    await t.test("retuns ok with user data on success", async (t) => {
      const response = await app.inject().post("/api/user/signin").payload({
        email: "user@example.com",
        password: "password123",
      });

      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();
      assert.deepStrictEqual(data, {
        id: "3e152b8c-9a6e-45af-b12f-1537e7283c7b",
        firstName: "Test",
        lastName: "User",
        email: "user@example.com",
      });
    });
  });
});
