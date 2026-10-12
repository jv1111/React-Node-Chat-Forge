const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-only-secret-for-auth-tests";

const app = require("../src/app");

test("protected projects route rejects a missing token", async () => {
  const response = await request(app).get("/api/projects");

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, {
    success: false,
    message: "Authentication required.",
  });
});

test("protected projects route rejects an invalid token", async () => {
  const response = await request(app)
    .get("/api/projects")
    .set("Authorization", "Bearer invalid-token");

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, {
    success: false,
    message: "Invalid or expired token.",
  });
});

test("protected projects route rejects an expired token", async () => {
  const token = jwt.sign(
    { _id: "test-user-id" },
    process.env.JWT_SECRET,
    { expiresIn: "-1s" },
  );

  const response = await request(app)
    .get("/api/projects")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, {
    success: false,
    message: "Invalid or expired token.",
  });
});

test("current-user route rejects a missing token", async () => {
  const response = await request(app).get("/api/auth/me");

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, {
    success: false,
    message: "Authentication required.",
  });
});
