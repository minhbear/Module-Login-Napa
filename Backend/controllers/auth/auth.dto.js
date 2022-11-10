const {Joi, celebrate, Segments} = require('celebrate');

const signupValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
});

const loginValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
});

module.exports = {
    signupValidator,
    loginValidator
}
