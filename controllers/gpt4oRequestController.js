const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { FulldateTimeDate } = require("./../services/getdate");
const { assistantGPTResponse } = require("./../services/chatgpt-assistant");
const { chatGPTCompletion } = require('./../services/chatgpt');
const { voiceToText } = require('./../services/whisper');
const { convertWavToMp3 } = require('./../services/convert_wav_mp3');
const { textToSpeech } = require('./../services/text_to_speech');
const { fillSysPrompt, fillMessageHeader } = require("./../services/msg_filler.js");
const { getMessages, saveMessage, getLastConversationId } = require("./messageController");

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
        const [dateId, timeId, dayName] = await FulldateTimeDate();
        const currentTime = dateId + " " + timeId + " " + dayName;
        const chatId = "5215535297152";
        const userName = "Alexis";
        const phoneNumber = chatId;
        const msgType = "audio";
        const conversationId = await getLastConversationId(chatId);
        // Definir los paths de entrada y salida para la conversión
        const inputPath = file.path;
        const outputPath = path.join('uploads', `${Date.now()}.mp3`);

        // Convertir el archivo WAV a MP3
        await convertWavToMp3(inputPath, outputPath);

        // Procesar el archivo convertido con Whisper para obtener la transcripción
        const transcript = await voiceToText(outputPath);
        // Si transcript tiene la palabra Luna
        console.log("transcript: ", transcript)
        const full_textInput = await fillMessageHeader(transcript, userName, phoneNumber, msgType, currentTime);

        console.log("full_textInput: ", full_textInput)
        const userMessage = { role: "user", body: full_textInput };
        
        // Usar la transcripción con chatGPTCompletion para obtener una respuesta
        // const response = await chatGPTCompletion(full_textInput, '', []);
        const response = await assistantGPTResponse( full_textInput, '', conversationId );
        const full_textOutput = response.replace(/【[^】]*】/g, '');
        const responsePath = await textToSpeech(full_textOutput);
        
        const assistantMessage = { role: "assistant", body: full_textOutput };
        await saveMessage(chatId, conversationId, userMessage);
        await saveMessage(chatId, conversationId, assistantMessage);

        // Leer el archivo de audio y enviarlo como respuesta
        fs.readFile(responsePath, (err, data) => {
            if (err) {
                console.error('Error reading audio file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename=${path.basename(responsePath)}`);
            
            res.status(200).json({
                transcript,
                full_textOutput,
                audio: data.toString('base64')  // Enviar el archivo de audio como base64
            });
        });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
