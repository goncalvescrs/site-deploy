function status(request, response) {
  // response.status(200).send("resposta do status");
  response.status(200).json({
    chave: "show de bola bonitão",
    Chave2: {
      subChave: "toma esse codigo",
    },
  });
}

export default status;
