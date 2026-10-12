const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
  getPagination,
  getPaginationMetadata,
} = require("../src/utils/pagination");

const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require("../src/utils/validator");

test("pagination uses defaults", () => {
  assert.deepEqual(getPagination(), {
    page: 1,
    limit: 20,
    skip: 0,
  });
});

test("pagination converts numeric strings", () => {
  assert.deepEqual(getPagination("3", "10"), {
    page: 3,
    limit: 10,
    skip: 20,
  });
});

test("pagination clamps invalid page and limit values", () => {
  assert.deepEqual(getPagination(0, 0), {
    page: 1,
    limit: 1,
    skip: 0,
  });
});

test("pagination caps the maximum limit", () => {
  assert.deepEqual(getPagination(2, 500), {
    page: 2,
    limit: 100,
    skip: 100,
  });
});

test("pagination metadata calculates page boundaries", () => {
  assert.deepEqual(getPaginationMetadata(2, 10, 25), {
    page: 2,
    limit: 10,
    total: 25,
    totalPages: 3,
    hasNextPage: true,
    hasPreviousPage: true,
  });
});

test("pagination metadata handles a single page", () => {
  assert.deepEqual(getPaginationMetadata(1, 10, 10), {
    page: 1,
    limit: 10,
    total: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
});

test("email validation accepts valid email addresses", () => {
  assert.equal(validateEmail("user@example.com"), true);
});

test("email validation rejects invalid email addresses", () => {
  assert.equal(validateEmail("not-an-email"), false);
});

test("username validation enforces length and allowed characters", () => {
  assert.equal(validateUsername("chat_user1"), true);
  assert.equal(validateUsername("ab"), false);
  assert.equal(validateUsername("user name"), false);
});

test("password validation requires a strong password", () => {
  assert.equal(validatePassword("StrongPass1!"), true);
  assert.equal(validatePassword("weakpass1!"), false);
  assert.equal(validatePassword("short"), false);
});
