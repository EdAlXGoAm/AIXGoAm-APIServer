const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const convertWavToMp3 = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioQuality(96)
      .toFormat('mp3')
      .save(outputPath)
      .on('progress', (p) => null)
      .on('end', () => {
        resolve(true);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

module.exports = { convertWavToMp3 };