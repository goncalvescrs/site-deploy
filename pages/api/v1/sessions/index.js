import { createRouter } from "next-connect";
import * as cookie from "cookie";
import controller from "infra/controller";
import authentication from "models/authentication";
import session from "models/session";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const { email, password } = request.body;
  const authenticatedUser = await authentication.getAuthenticationUser(
    email,
    password,
  );

  const newSession = await session.create(authenticatedUser.id);

  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISSECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("set-Cookie", setCookie);

  return response.status(201).json(newSession);
}
