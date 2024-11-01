const genericErrorHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Internal server error.'

    res.status(errorStatus)
        .send({
            statusCode: errorStatus,
            message: errorMessage,
            stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined
        })
}

const notFoundErrorHandler = (err, req, res, next) => {
    if(err.status === 404) {
        res.status(404)
            .send({ 
                statusCode: 404, 
                message: err.message
            })
    } else {
        next(err)
    }
}

module.exports = {genericErrorHandler, notFoundErrorHandler}