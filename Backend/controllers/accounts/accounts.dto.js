const {Joi, celebrate, Segments} = require('celebrate');

const viewAccountValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
})

const updateAccountValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.number().required()
    }),
});

const activeAccountValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        status: Joi.number().required()
    }),
})

module.exports = {
    updateAccountValidator,
    viewAccountValidator,
    activeAccountValidator
}