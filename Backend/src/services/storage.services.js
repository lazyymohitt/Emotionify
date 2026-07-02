const songModel = require("../models/song.model")

const ImageKit  = require("@imagekit/nodejs")


const client  = new ImageKit ({
    privateKey: process.env.IMAGEKIT_PVT_KEY
})


async function uploadFile({buffer , filename , folder = ""}) {

     file:await ImageKit.toFile(Buffer.from(buffer))


     filename:filename


     folder
}

module.exports = {uploadFile}