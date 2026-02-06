import { createRouter } from "next-connect";
import controller from "infra/controller";
import { runner as migrationRunner } from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dryRun: true,
  dir: join("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function getHandler(request, response) {
  let dbClient;
  dbClient = await database.getNewClient();

  try {
    const pedingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });
    response.status(200).json(pedingMigrations);
  } finally {
    await dbClient?.end();
  }
}

async function postHandler(request, response) {
  let dbClient;
  dbClient = await database.getNewClient();

  try {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient?.end();
  }
}
