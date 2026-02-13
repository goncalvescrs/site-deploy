export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class serviceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponivel no momemnto.", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível.";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Vérifique se o método HTTP enviado é valido para este endpoint.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  constructor({ couse, message, action }) {
    super(message || "Erro de validação ocorreu.", {
      couse,
    });
    this.name = "ValidationError";
    this.action = action || "Ajuste os dados enviados e tente novamente";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  constructor({ couse, message, action }) {
    super(message || "Recurso buscado não encontrado.", {
      couse,
    });
    this.name = "NotFoundError";
    this.action = action || "Verifique se a consulta está correta.";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
