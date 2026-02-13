exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    // para referencia, O github limita o username a 30 caracteres.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    email: {
      type: "varchar(250)",
      notNull: true,
      unique: true,
    },

    password: {
      type: "varchar(70)",
      notNull: true,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
