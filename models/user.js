import database from "infra/database.js";
import password from "models/password.js";
import { NotFoundError, ValidationError } from "infra/errors.js";

async function findByUsername(username) {
  const userFound = await runSelectQuery(username);
  return userFound;

  async function runSelectQuery(username) {
    const result = await database.query({
      text: `
      SELECT
        *
      FROM
        users
      WHERE
        LOWER(username) = LOWER($1)
      LIMIT
        1
    ;`,
      values: [username],
    });

    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: "O username não foi encontrado.",
        action: "Verifique se o username está correto.",
      });
    }
    return result.rows[0];
  }
}

async function create(userInputValues) {
  await validationUniqueUsername(userInputValues.username);
  await validationUniqueEmail(userInputValues.email);
  await hashPasswordInObject(userInputValues);

  const newUser = await runInsertQuery(userInputValues);
  return newUser;

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `
      INSERT INTO users 
        (username, email, password)
      VALUES 
        ($1, $2, $3)
      RETURNING
        *
      ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return results.rows[0];
  }
}

async function update(username, userInputValues) {
  const currentUser = await findByUsername(username);

  if ("username" in userInputValues) {
    await validationUniqueUsername(userInputValues.username);
  }

  if ("email" in userInputValues) {
    await validationUniqueEmail(userInputValues.email);
  }

  if ("password" in userInputValues) {
    await hashPasswordInObject(userInputValues);
  }

  const newUserValues = { ...currentUser, ...userInputValues };

  const updatedUser = await runUpdateQuery(newUserValues);
  return updatedUser;

  async function runUpdateQuery(newUserValues) {
    const result = await database.query({
      text: `
      UPDATE
        users
      SET
        username = $2,
        email = $3,
        password = $4,
        updated_at = timezone('utc', now())
      WHERE
        id = $1
      RETURNING
        *
      `,
      values: [
        newUserValues.id,
        newUserValues.username,
        newUserValues.email,
        newUserValues.password,
      ],
    });
    return result.rows[0];
  }
}

async function validationUniqueUsername(username) {
  const result = await database.query({
    text: `
        SELECT
          username
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
      ;`,
    values: [username],
  });
  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "Username informado ja esta sendo utilizado.",
      action: "Escolha outro username e tente novamente.",
    });
  }
}

async function validationUniqueEmail(email) {
  const results = await database.query({
    text: `
      SELECT 
        email
      FROM
        users
      WHERE
        LOWER(email) = LOWER($1)
      ;`,
    values: [email],
  });
  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O email informado ja esta sendo utilizado.",
      action: "Utilize outro email e tente novamente.",
    });
  }
}

async function hashPasswordInObject(userInputValues) {
  const hashedPassword = await password.hash(userInputValues.password);
  userInputValues.password = hashedPassword;
}

const user = {
  findByUsername,
  create,
  update,
};

export default user;
