const songModel = require("../models/song.model");
const storageService = require("../services/storage.services")

const id3 = require("node-id3")

async function uploadSong(req,res) {

    const tags  = id3.read(req.file.buffer)
    console.log(tags)



    const songFile = await storageService.uploadFile({
        buffer:songBuffer,
        filename:tags.title,
        folder:"/moodify/songs"
    })

    const posterFile =  await  storageService.uploadFile({
        buffer:tags.image.imageBuffer
    })




    
}

module.exports   = {
    uploadSong
}