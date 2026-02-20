import { NotFoundError, UnauthorizedError } from "infra/errors";
import user from "./user";
import password from "models/password";

async function getAuthenticationUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await comparePassword(providedPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados do autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    throw error;
  }

  async function findUserByEmail(email) {
    try {
      return await user.findByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email incorreto.",
          action: "Verifique e tente novamente.",
        });
      }

      throw error;
    }
  }

  async function comparePassword(providedPassword, storagePassword) {
    const correctPasswordMatch = await password.compare(
      providedPassword,
      storagePassword,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Senha incorreta.",
        action: "Verifique e tente novamente.",
      });
    }
  }
}

const authentication = {
  getAuthenticationUser,
};

export default authentication;
