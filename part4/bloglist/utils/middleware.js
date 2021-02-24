const morgan = require('morgan')

const logger = require('./logger')

morgan.token('body', (req) => JSON.stringify(req.body))
const morganLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    { skip: () => process.env.NODE_ENV === 'test' }
)

const errorHandler = (error, request, response, next) => {
    logger.error('[Error handler] ', error.name, ': ', error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({ error: 'token missing or malformed' })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { morganLogger, errorHandler, unknownEndpoint }