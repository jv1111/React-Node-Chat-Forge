const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
  validateRegister,
  validateLogin,
  validateCreateClient,
} = require("../src/middleware/validation.middleware");

const runMiddleware = (middleware, body) => {
  const req = { body: { ...body } };
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  let nextCalled = false;
  middleware(req, res, () => {
    nextCalled = true;
  });

  return { req, res, nextCalled };
};

test("registration rejects missing credentials", () => {
  const { res, nextCalled } = runMiddleware(validateRegister, {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, "Username and password are required.");
  assert.equal(nextCalled, false);
});

test("registration rejects an invalid username", () => {
  const { res, nextCalled } = runMiddleware(validateRegister, {
    username: "bad name",
    password: "StrongPass1!",
  });

  assert.equal(res.statusCode, 400);
  assert.equal(nextCalled, false);
});

test("registration rejects a weak password", () => {
  const { res, nextCalled } = runMiddleware(validateRegister, {
    username: "valid_user",
    password: "weakpass1!",
  });

  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Password must be at least 8 characters/);
  assert.equal(nextCalled, false);
});

test("registration trims and normalizes valid credentials", () => {
  const { req, nextCalled } = runMiddleware(validateRegister, {
    username: "  Chat_User  ",
    password: " StrongPass1! ",
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.body, {
    username: "chat_user",
    password: "StrongPass1!",
  });
});

test("login rejects missing credentials", () => {
  const { res, nextCalled } = runMiddleware(validateLogin, {
    username: "chat_user",
  });

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, "Username and password are required.");
  assert.equal(nextCalled, false);
});

test("login trims and normalizes credentials", () => {
  const { req, nextCalled } = runMiddleware(validateLogin, {
    username: "  Chat_User ",
    password: " password ",
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.body, {
    username: "chat_user",
    password: "password",
  });
});

test("client creation rejects missing required fields", () => {
  const { res, nextCalled } = runMiddleware(validateCreateClient, {});

  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /are required/);
  assert.equal(nextCalled, false);
});

test("client creation normalizes valid input and defaults middle name", () => {
  const { req, nextCalled } = runMiddleware(validateCreateClient, {
    projectCode: " PROJECT-1 ",
    externalUserId: " USER-123 ",
    username: " Client_User ",
    password: " StrongPass1! ",
    firstName: " Alex ",
    lastName: " Santos ",
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.body, {
    projectCode: "PROJECT-1",
    externalUserId: "USER-123",
    username: "client_user",
    password: "StrongPass1!",
    firstName: "Alex",
    middleName: "",
    lastName: "Santos",
  });
});
