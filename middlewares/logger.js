const logger = (req, res, next) => {
    const {url, ip, method} = req

    console.log(`[${new Date().toISOString()}] ${method} request to ${url} from ip ${ip}.`)

    next()
}

module.exports = logger