const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "wsl docker exec postgres-dev pg_isready --host localhost",
    handleReturn,
  );

  function handleReturn(error, stderr, stdout) {
    // const output = (stderr + stdout).trim();

    if (stderr.search("accepting connections") === -1) {
      process.stderr.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres está aceitando conexões.\n");
    return;
  }
}

process.stderr.write("\n\n🔴 Aguardando postgres aceitar conexão.");
checkPostgres();
