import { test } from "node:test";
import * as assert from "node:assert";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { build } from "../../helper.js";

// declairing the route you are wanting to test
test("/api/signup", async (t) => {
  // creating a fresh Fastify app instance
  const app = await build(t);

  await t.test("POST /api/signup", async (t) => {
    await t.test(
      "returns bad request if required fields are missing",
      async (t) => {
        const response = await app.inject().post("/api/user/signup").payload({
          // making a missing field test

          firstName: "",
          lastName: "User",
          email: "user@example.com",
          password: "password123",
          confirmPassword: "password123",
        });

        // sending 400 status code stating a field is missing
        assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
      },
    );

    await t.test(
      "returns bad request if password doesnt match confirm password",
      async (t) => {
        const response = await app.inject().post("/api/user/signup").payload({
          // making a miss match wrong password on purpose to test password match

          firstName: "Test",
          lastName: "User",
          email: "user@example.com",
          password: "password123",
          confirmPassword: "wrongpassword123",
        });

        // sending 400 error code stating passwords didnt match
        assert.deepStrictEqual(response.statusCode, StatusCodes.BAD_REQUEST);
      },
    );

    // testing to check if the user already exists
    await t.test("returns conflict when user already exists", async (t) => {
      const response = await app.inject().post("/api/user/signup").payload({
        firstName: "Test",
        lastName: "User",
        email: "user@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
      // sending 409 status code stating there is already a user
      assert.deepStrictEqual(response.statusCode, StatusCodes.CONFLICT);

      const data = await response.json();
      assert.deepStrictEqual(data, {
        message: "User already exists.",
      });
    });

    // mock user creation
    await t.test("returns ok with user data on success", async (t) => {
      const response = await app.inject().post("/api/user/signup").payload({
        firstName: "Nick",
        lastName: "Carrilloo",
        email: "nickk@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
      // debugging
      console.log(response.body);

      // sending 200 status code stating there user was created correctly
      assert.deepStrictEqual(response.statusCode, StatusCodes.OK);

      const data = await response.json();

      // what is expected
      assert.deepStrictEqual(data, {
        userId: data.userId,
        firstName: "Nick",
        lastName: "Carrilloo",
        email: "nickk@example.com",
      });
    });
  });
});
