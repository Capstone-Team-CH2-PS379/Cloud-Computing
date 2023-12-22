from flask import Flask, request, jsonify
from pydub import AudioSegment
import keras
import librosa
import os
from keras.models import load_model
from keras.utils import custom_object_scope
import keras.backend as K
import tensorflow as tf
import numpy as np
import requests
from jiwer import wer
from google.cloud import speech_v1p1beta1 as speech
import io
import wave


app = Flask(__name__)


# coba ambil data
# Variabel global untuk menyimpan text_audio
targets = None

client = speech.SpeechClient()

# Fungsi untuk mengambil teks dari audio menggunakan Google Speech Recognition
def get_text_from_audio(audio_file_path):
    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=24000,  # Sesuaikan dengan sampel rate audio Anda
        language_code="en-US",  # Sesuaikan dengan bahasa audio Anda
    )

    response = client.recognize(config=config, audio=audio)

    # Ambil teks hasil pengenalan
    transcribed_text = ""
    for result in response.results:
        transcribed_text += result.alternatives[0].transcript

    return transcribed_text


# variabel
# An integer scalar Tensor. The window length in samples.
frame_length = 256
# An integer scalar Tensor. The number of samples to step.
frame_step = 160
# An integer scalar Tensor. The size of the FFT to apply.
# If not provided, uses the smallest power of 2 enclosing frame_length.
fft_length = 384

# Definisikan vocabulary
characters = [x for x in "abcdefghijklmnopqrstuvwxyz'?! "]
char_to_num = keras.layers.StringLookup(vocabulary=characters, oov_token="")
num_to_char = keras.layers.StringLookup(
    vocabulary=char_to_num.get_vocabulary(), oov_token="", invert=True
)


# Definisikan fungsi CTCLoss
def CTCLoss(y_true, y_pred):
    batch_len = tf.cast(tf.shape(y_true)[0], dtype="int64")
    input_length = tf.cast(tf.shape(y_pred)[1], dtype="int64")
    label_length = tf.cast(tf.shape(y_true)[1], dtype="int64")

    input_length = input_length * tf.ones(shape=(batch_len, 1), dtype="int64")
    label_length = label_length * tf.ones(shape=(batch_len, 1), dtype="int64")

    loss = K.ctc_batch_cost(y_true, y_pred, input_length, label_length)
    return loss

# Muat model dan cek apakah berhasil
try:
    with custom_object_scope({'CTCLoss': CTCLoss}):
        model = load_model('ctc_model_v1.h5')
    print("Model berhasil dimuat")
except Exception as e:
    print("Gagal memuat model:", e)

def convert_mp3_to_wav(mp3_file_path, wav_file_path):
    # Konversi dari MP3 ke WAV
    audio = AudioSegment.from_mp3(mp3_file_path)
    audio.export(wav_file_path, format="wav")
    print("Konversi ke WAV berhasil")


def preprocess_audio(wav_path):
    # Muat file audio
    audio, samplerate = librosa.load(wav_path, sr=None)

    # Konversi ke spektrogram menggunakan TensorFlow
    spectrogram = tf.signal.stft(
        audio, frame_length=frame_length, frame_step=frame_step, fft_length=fft_length
    )
    spectrogram = tf.abs(spectrogram)
    spectrogram = tf.math.pow(spectrogram, 0.5)

    # Normalisasi
    means = tf.math.reduce_mean(spectrogram, 1, keepdims=True)
    stddevs = tf.math.reduce_std(spectrogram, 1, keepdims=True)
    spectrogram = (spectrogram - means) / (stddevs + 1e-10)

    # Reshape
    return tf.expand_dims(spectrogram, axis=0)

def decode_batch_predictions(pred):
    input_len = np.ones(pred.shape[0]) * pred.shape[1]
    results = keras.backend.ctc_decode(pred, input_length=input_len, greedy=True)[0][0]
    output_text = []
    for result in results:
        result = tf.strings.reduce_join(num_to_char(result)).numpy().decode("utf-8")
        output_text.append(result)
    return output_text

def get_sample_rate(audio_file_path):
    # Gunakan library wave untuk mendapatkan sampel rate dari file audio
    with wave.open(audio_file_path, 'rb') as audio_file:
        sample_rate = audio_file.getframerate()
    return sample_rate

@app.route('/predict', methods=['POST'])
def predict():
    # Menerima file audio dan konversi
    audio_file = request.files['audio']
    mp3_path = "./temp.mp3"
    wav_path = "./temp.wav"
    audio_file.save(mp3_path)
    convert_mp3_to_wav(mp3_path, wav_path)

    if os.path.exists(wav_path):
        # Proses preprocessing
        spectrogram = preprocess_audio(wav_path)
        sample_rate = get_sample_rate(wav_path)
        print("Sample Rate:", sample_rate)


        # google speech
        targets = get_text_from_audio(wav_path)

        # Lakukan prediksi
        prediction = model.predict(spectrogram)
        decoded_prediction = decode_batch_predictions(prediction)

        # Menghitung Word Error Rate
        skor = wer(targets, decoded_prediction[0])  # Asumsi hasil decode adalah list
        print(f"Word Error Rate: {skor}")

        return jsonify({'prediction': decoded_prediction, 'target': targets, 'skor': skor,})
    else:
        return jsonify({'message': 'File WAV tidak ditemukan'})



if __name__ == '__main__':
    app.run(debug=True)
