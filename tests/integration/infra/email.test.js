import email from "infra/email";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteEmails();

    await email.send({
      from: "MeuApp <contato@meuapp.com>",
      to: "userqualquer@email.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "MeuApp <contato@meuapp.com>",
      to: "ultimouser@email.com",
      subject: "Ultimo email enviado",
      text: "Corpo do ultimo email.",
    });

    const lastEmail = await orchestrator.getLasEmail();
    console.log(lastEmail.recipients);

    expect(lastEmail.sender).toBe("<contato@meuapp.com>");
    expect(lastEmail.recipients[0]).toBe("<ultimouser@email.com>");
    expect(lastEmail.subject).toBe("Ultimo email enviado");
    expect(lastEmail.text).toBe("Corpo do ultimo email.\n");
  });
});
