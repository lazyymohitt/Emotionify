const {Router} = require("express")
const upload = require("../middlewares/song.midlleware")
const songController = require("../controllers/song.controller")


const SongRouter  = Router()

SongRouter.post("/", upload.single("song"),songController.uploadSong)

SongRouter.get("/", songController.getSongs)


SongRouter.get("/search",songController.searchSongs)

module.exports = SongRouter