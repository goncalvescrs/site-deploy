const calculadora = require("../../models/calculadora");
// import calculadora2 from "../../models/calculadora";

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Se um dos campos estiver vaizo deveria retornar: 'Os dois campos tem que estar preenchidos'", () => {
  const resultado = calculadora.somar(100, "");
  expect(resultado).toBe("Os dois campos tem que estar preenchidos!");
});

test("somar 100 + 'banana' deveria retornar o 'Somente numeros são aceitos!'", () => {
  const resultado = calculadora.somar(100, "banana");
  expect(resultado).toBe("Somente numeros são aceitos!");
});

// MULTIPLICAR ----------------------

test("multiplicar 10 + 10 deveria retornar 100", () => {
  const resultado = calculadora.multiplicar(10, 10);
  expect(resultado).toBe(100);
});

test("multiplicar 10 + 10 deveria retornar 100", () => {
  const resultado = calculadora.multiplicar(10, 10);
  expect(resultado).toBe(100);
});

// DIVIDIR ------------------------

test("dividir 10 + 10 deveria retornar 1", () => {
  const resultado = calculadora.dividir(10, 10);
  expect(resultado).toBe(1);
});

test("dividir algum numero por 0 deveria retornar 'Não é possivel dividir por 0'", () => {
  const resultado = calculadora.dividir(10, 0);
  expect(resultado).toBe("Não é possivel dividir por 0");
});
