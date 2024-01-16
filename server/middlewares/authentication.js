const { verifyToken } = require("../helpers/jwt")

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      console.log(`no 'authorization' value in headers`)
      throw { code: 401 }
    }

    const access_token = authorization.split(" ")[1]
    const verifyResult = verifyToken(access_token)

    if (!verifyResult) throw{ code: 401, message: 'Cannot verify token' }
    
    req.headers.UserId = verifyResult
    console.log(req.headers.UserId);

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication