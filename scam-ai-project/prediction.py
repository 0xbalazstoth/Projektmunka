import torch
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from model import TextClassifier

class Result:
    def __init__(self, classification, probability):
        self.classification = classification
        self.probability = probability

class Prediction:
    # Load the CountVectorizer vocabulary
    def load_vocab(vocab_path):
        with open(vocab_path, 'rb') as vocab_file:
            vocab = pickle.load(vocab_file)
        return vocab

    def load_vectorizer(vectorizer_path):
        with open(vectorizer_path, 'rb') as vectorizer_file:
            vectorizer = pickle.load(vectorizer_file)
        return vectorizer

    # Load the trained TextClassifier model
    def load_model(model_path, input_dim):
        model = TextClassifier(input_dim)  # Replace with your TextClassifier model class
        model.load_state_dict(torch.load(model_path))
        return model

    # Define a function to predict whether a text is spam or not and return the probability score
    def predict_spam_probability(text, model, vectorizer, vocab):
        # Tokenize and vectorize the input text using the same CountVectorizer and vocabulary
        text_vectorized = vectorizer.transform([text])
        text_tensor = torch.tensor(text_vectorized.toarray(), dtype=torch.float32)

        # Get the model's prediction
        with torch.no_grad():
            output = model(text_tensor)

        predicted_class = torch.argmax(output, dim=1).item()
        text_classification_result = "Spam" if predicted_class == 1 else "Not Spam"

        # Get the probability score for the spam class (class index 1)
        spam_probability = torch.softmax(output, dim=1)[0][1].item()

        result = Result(text_classification_result, spam_probability)

        return result

class Init:
    def predict():
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
        text_to_predict = "1.3426 BTC ($47,507.90) USD: Your Gift from Cloud Mining!"
        result = prediction.predict_spam_probability(text_to_predict, model, vectorizer, vocab)
        print(f'The probability of the text being spam is: {result.probability:.4f}')
        print("Text classification: " + result.classification)

Init.predict()