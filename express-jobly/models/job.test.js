"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db");
const Job = require("./job");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  test("works", async function () {
    const data = {
      title: "Job 1",
      salary: 50000,
      equity: "0.1",
      companyHandle: "c1",
    };

    const job = await Job.create(data);

    expect(job).toEqual({
      id: expect.any(Number),
      title: "Job 1",
      salary: 50000,
      equity: "0.1",
      companyHandle: "c1",
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle
       FROM jobs
       WHERE id = $1`,
      [job.id]
    );

    expect(result.rows[0]).toEqual(job);
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const jobs = await Job.findAll();

    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "Job 1",
        salary: 50000,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "Company 1",
      },
      {
        id: expect.any(Number),
        title: "Job 2",
        salary: 60000,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "Company 1",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const jobId = 1;
    const job = await Job.get(jobId);

    expect(job).toEqual({
      id: jobId,
      title: "Job 1",
      salary: 50000,
      equity: "0.1",
      companyHandle: "c1",
      company: {
        handle: "c1",
        name: "Company 1",
        description: "Description 1",
        numEmployees: 100,
        logoUrl: "http://example.com/logo1.png",
      },
    });
  });

  test("throws NotFoundError if no such job", async function () {
    try {
      await Job.get(100);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "New Title",
    salary: 60000,
    equity: "0.2",
  };

  test("works", async function () {
    const jobId = 1;
    const job = await Job.update(jobId, updateData);

    expect(job).toEqual({
      id: jobId,
      title: "New Title",
      salary: 60000,
      equity: "0.2",
      companyHandle: "c1",
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle
       FROM jobs
       WHERE id = $1`,
      [jobId]
    );

    expect(result.rows[0]).toEqual(job);
  });

  test("throws NotFoundError if no such job", async function () {
    try {
      await Job.update(100, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    const jobId = 1;
    await Job.remove(jobId);

    const res = await db.query(
      "SELECT id FROM jobs WHERE id = $1",
      [jobId]
    );

    expect(res.rows.length).toEqual(0);
  });

  test("throws NotFoundError if no such job", async function () {
    try {
      await Job.remove(100);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
