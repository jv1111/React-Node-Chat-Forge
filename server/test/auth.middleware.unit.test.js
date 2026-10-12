const { test } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-only-secret-for-auth-tests";

const { authenticate } = require("../src/middleware/auth.middleware");

const createResponse = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

test("authentication accepts a valid bearer token", () => {
  const token = jwt.sign(
    { _id: "user-123" },
    process.env.JWT_SECRET,
    { expiresIn: "1m" },
  );

  const req = {
    cookies: {},
    headers: { authorization: `Bearer ${token}` },
  };
  const res = createResponse();
  let nextCalled = false;

  authenticate(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.user, { _id: "user-123" });
});

test("authentication accepts a valid access-token cookie", () => {
  const token = jwt.sign(
    { _id: "user-456" },
    process.env.JWT_SECRET,
    { expiresIn: "1m" },
  );

  const req = {
    cookies: { accessToken: token },
    headers: {},
  };
  const res = createResponse();
  let nextCalled = false;

  authenticate(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.user, { _id: "user-456" });
});
