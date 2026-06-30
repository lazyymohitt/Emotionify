const {Router} = require("express")
const upload = require("../middlewares/song.midlleware")


const SongRouter  = Router()

SongRouter.post("/", upload.single("song",))

module.exports = SongRouter