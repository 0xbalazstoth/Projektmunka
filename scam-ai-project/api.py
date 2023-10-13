from flask import Flask, request, jsonify
from prediction import Prediction
import torch
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from model import TextClassifier
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/spam-classification", methods=["POST"])
def spamClassification():
    data = request.get_json()

    # Check if "text" key is present in the JSON data
    if "text" not in data:
        error_message = {"error": "Missing 'text' key in request data"}
        return jsonify(error_message), 400  # 400 Bad Request status code for missing data

    text = data["text"]
    
    prediction = Prediction
    # Define the path to the vocabulary and trained model
    vocab_path = 'count_vectorizer_vocab.pkl'
    model_path = 'spam_classifier_model.pth'
    vectorizer_path = 'count_vectorizer.pkl'

    # Load the vocabulary
    vocab = prediction.load_vocab(vocab_path)
    vectorizer = prediction.load_vectorizer(vectorizer_path)

    # Load your custom TextClassifier model
    input_dim = len(vocab)  # Assuming the input dimension matches the vocabulary size
    model = prediction.load_model(model_path, input_dim)

    # Test the predict_spam_probability function
    text_to_predict = text
    result = prediction.predict_spam_probability(text_to_predict, model, vectorizer, vocab)
    print(f'The probability of the text being spam is: {result.probability:.4f}')
    print("Text classification: " + result.classification)

    data_result = {
        "text": text,
        "classification": result.classification,
        "probability": format(result.probability, '.4f'),
        "isSpam": True if result.classification == "Spam" else False
    }

    return jsonify(data_result), 201

if __name__ == "__main__":
    app.run(debug=True)