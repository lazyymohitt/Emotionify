const songModel = require("../models/song.model");
const storageService = require("../services/storage.services");
const id3 = require("node-id3");
const songService = require("../services/song.service")

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "song created successfully",
    song,
  });
}

async function getSongs(req, res) {
  try {
    const { mood } = req.query;

    const songs = await songService.getSongsByMood(mood);

    return res.status(200).json({
      success: true,

      count: songs.length,

      songs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
}
async function searchSongs(req, res) {
  try {
    const { query } = req.query;

    const songs = await songService.searchSongs(query);

    return res.status(200).json({
      success: true,
      count: songs.length,
      songs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
    getSongs,
  uploadSong,
  searchSongs
};
