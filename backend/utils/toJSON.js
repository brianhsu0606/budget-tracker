const toJSON = (schema) => {
  schema.set("toJSON", {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    },
  });
};

export default toJSON;
