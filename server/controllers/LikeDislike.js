const { User, Like, Dislike } = require('../models')

class LikeDislikeController {
  static async GetDislikes(req, res, next) {
    try {
      let { UserId } = req.headers
      let selectRes = await Dislike.findAll({
        where: { UserId }
      })
      if (!selectRes) throw { code: 400 }

      res.status(200).json(selectRes)
    } catch (error) {
      next(error)
    }
  }
  
  static async GetLikes(req, res, next) {
    try {
      let { UserId } = req.headers
      let selectRes = await Like.findAll({
        where: { UserId }
      })
      if (!selectRes) throw { code: 400 }

      res.status(200).json(selectRes)
    } catch (error) {
      next(error)
    }
  }

  static async AddLike(req, res, next) {
    try {
      let { AnimeId, UserId, animeTitle } = req.body
      // check for duplicate
      let findOne = await Like.findOne({
        where: { AnimeId, UserId }
      })
      if (findOne) throw { code: 400 }

      // insert
      let insertRes = await Like.create({AnimeId, UserId, animeTitle})
      if (!insertRes) throw { code: 400 }

      res.status(201).json(insertRes)
    } catch (error) {
      next(error)
    }
  }
  
  static async AddDislike(req, res, next) {
    try {
      let { AnimeId, UserId, animeTitle } = req.body
      // check for duplicate
      let findOne = await Dislike.findOne({
        where: { AnimeId, UserId }
      })
      if (findOne) throw { code: 400 }

      // insert
      let insertRes = await Dislike.create({AnimeId, UserId, animeTitle})
      if (!insertRes) throw { code: 400 }

      res.status(201).json(insertRes)
    } catch (error) {
      next(error)
    }
  }

  static async deleteLike(req, res, next) {
    try {
      const { UserId } = req.headers
      const { AnimeId } = req.params
      const delRes = await Like.destroy({
        where: { UserId, AnimeId }
      })
      if (!delRes) throw { code: 400 }
      res.status(200).json(delRes)
    } catch (error) {
      next(error)
    }
  }
  
  static async deleteDislike(req, res, next) {
    try {
      const { UserId } = req.headers
      const { AnimeId } = req.params
      const delRes = await Dislike.destroy({
        where: { UserId, AnimeId }
      })
      if (!delRes) throw { code: 400 }
      res.status(200).json(delRes)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = LikeDislikeController