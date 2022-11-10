const {Joi, celebrate, Segments} = require('celebrate');

const forgotPassValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
})

const resetPassValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
        token: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    })
})

module.exports = {
    forgotPassValidator,
    resetPassValidator
}