const joi = require("joi");

const validator = (req, res, next) => {
  const schema = joi.object({
    nameUser: joi
      .string()
      .max(20)
      .min(3)
      .trim()
      .pattern(new RegExp("[a-zA-Z]"))
      .required()
      .messages({
        "string.min": "First name should have at least 3 characters",
        "string.max": "First name should not have more than 20 characters",
      }),
    lastNameUser: joi
      .string()
      .min(3)
      .max(20)
      .trim()
      .pattern(new RegExp("[a-zA-Z]"))
      .required()
      .messages({
        "string.min": "Last name should have at least 3 characters",
        "string.max": "Last name should not have more than 20 characters",
      }),
    photoUser: joi
      .string()
      .trim()
      .required()
      .messages({ "string.empty": "You must provide a photo url" }),
    country: joi
      .string()
      .trim()
      .required()
      .messages({ "string.empty": "You must specify your country" }),
    mail: joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Incorrect email format",
      "string.empty": "You must specify your email",
    }),
    password: joi
      .string()
      .min(8)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]+$"))
      .required()
      .messages({
        "string.min": "The password should have at least 8 characters",
        "string.max": "The password should not have more than 50 characters",
        "string.pattern.base":
          "You must use only alphanumeric characters in your password",
      }),
    from: joi.string(),
  });
  const validation = schema.validate(req.body, { abortEarly: false });//abortEarly sirve para tirar una sola alerta, cuando esta en false. sino, tira todas las alertas
  console.log(validation);
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details[0].message,
      test: validation,
    });
  }
  next();
};

module.exports = validator;
