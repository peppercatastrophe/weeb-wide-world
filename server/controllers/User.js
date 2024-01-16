const { createToken, verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
const bcrypt = require('bcrypt')

class UserController {
  static async register(req, res, next) {
    try {
      let { fullName, email, password } = req.body
      let insertResult = await User.create({
        fullName,
        email,
        password
      })

      if (insertResult) {
        res.status(201).json({
          fullName:insertResult.fullName,
          email: insertResult.email,
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {

      let { email, password } = req.body
      let checkLogin = await User.findOne({
        where: {
          email
        }
      })

      if (!checkLogin) { 
        throw { code: 401, message: 'invalid email / password' }
      }

      const checkPass = await bcrypt.compare(password, checkLogin.password)
      if (!checkPass) {
        throw { code: 401, message: 'invalid email / password' }
      }

      // TODO: JWT
      const token = await createToken(checkLogin.id)
      res.status(200).json({
        access_token: token,
        id: checkLogin.id,
        fullName: checkLogin.fullName,
        email: checkLogin.email,
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params
      const findUser = await User.findByPk(id)

      if (!findUser) {
        throw { code: 404 }
      }

      res.status(200).json({
        id,
        fullName: findUser.fullName,
        email: findUser.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async getUserByToken(req, res, next) {
    try {
      const { authorization } = req.headers
      const access_token = authorization.split(" ")[1]
      const verifyResult = await verifyToken(access_token)
      if (!verifyResult) throw { code: 401, message: 'Cannot verify token' }
      const findOneUser = await User.findByPk(verifyResult)
      if (!findOneUser) throw {code: 401, message: 'User not found'}
      res.status(200).json({
        id: findOneUser.id,
        email: findOneUser.email,
        fullName: findOneUser.fullName
      })
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const {OAuth2Client} = require('google-auth-library');
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
          idToken: req.body.token, // TODO: check here
          audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // const userid = payload.sub;
      console.log(` ==================================== PAYLOAD ====================================`)
      console.log(payload);

      const fullName = (
        payload.given_name[0].toUpperCase + 
        payload.given_name.substring(1) +
        ' ' +
        payload.family_name[0].toUpperCase + 
        payload.family_name.substring(1)
      )
      
      const { email } = payload

      // check if email is already registered
      const findUser = await User.findOne({
        where: {
          email: email
        }
      })

      if (findUser) {
        // give access token
        const token = await createToken(findUser.id)
        res.status(200).json({
          access_token: token,
          id: findUser.id,
          fullName: findUser.fullName,
          email: findUser.email
        })
      } else {
        // User.create using that email and non-hashed dummy password
        await User.create({
          fullName,
          email,
          // TODO: this requires "forgot password" feature
          password: 'jfkdjfkdfjdkfjkdjfdkj'
        })
      }
      

    } catch (error) {
      console.log('Google Login Error')
      console.log(error)
      next(error)
    }
    

  }

  static async updateUser(req, res, next) {
    try {
      const { fullName, id } = req.body
      const updateRes = await User.update({fullName}, {
        where: { id }
      })
      if (!updateRes) throw { code: 400 }
      res.status(201).json(updateRes)

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController