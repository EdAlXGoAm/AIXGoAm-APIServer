const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FulldateTimeDate } = require("../services/getdate");
const { voiceToText } = require('../services/whisper');
const { convertWavToMp3 } = require('../services/convert_wav_mp3');

// Configuración de Multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Controlador para manejar la solicitud de procesamiento de audio
exports.request = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }

    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Definir los paths de entrada y salida para la conversión
        const inputPath = file.path;
        const outputPath = path.join('uploads', `${Date.now()}.mp3`);

        // Convertir el archivo WAV a MP3
        await convertWavToMp3(inputPath, outputPath);

        // Procesar el archivo convertido con Whisper para obtener la transcripción
        const transcript = await voiceToText(outputPath);

        console.log("transcript: ", transcript);

        // Evaluar si la transcripción contiene la palabra "luna" (sin importar mayúsculas o minúsculas)
        const normalizedTranscript = transcript.toLowerCase();
        const responseMessage = normalizedTranscript.includes('luna') ? 'activation' : 'ignore';

        // Enviar la respuesta
        res.status(200).json({
            transcript,
            response: responseMessage
        });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
