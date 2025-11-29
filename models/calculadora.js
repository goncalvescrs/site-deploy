function checar(num1, num2) {
  if (num1 === "" || num2 === "") {
    return "Os dois campos tem que estar preenchidos!";
  } else if (typeof num1 !== "number" || typeof num2 !== "number") {
    return "Somente numeros são aceitos!";
  }
}

function somar(num1, num2) {
  const erro = checar(num1, num2);
  if (erro) {
    return erro;
  }
  return num1 + num2;
}

function multiplicar(num1, num2) {
  const erro = checar(num1, num2);
  if (erro) {
    return erro;
  }
  return num1 * num2;
}

function dividir(num1, num2) {
  const erro = checar(num1, num2);
  if (erro) {
    return erro;
  }
  if (num1 === 0 || num2 === 0) {
    return "Não é possivel dividir por 0";
  }
  return num1 / num2;
}

// exports.dividir = dividir; // desse jeito exporta cada função separadamente

module.exports = { somar, multiplicar, dividir }; // exportar tudo junto
