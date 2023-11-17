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
        text_to_predict = "THIS IS AN OFFICIAL NOTIFICATION OF FUNDS DEPOSITED IN YOUR NAME AND IT IS N=OTA SALES SOLICITATION.I am professor Charles.c. Soludo governor, central bank of Nigeria ( =20CBN ). Thementioned bank is known for  the safekeeping of special and valuable package=sand baggage in trust for reputable clients that are honest and trustworthy.We work in collaboration with top firms and Governments of various =20countries aswe have earned a name as a service whose hallmarks in reliability andconfidentiality are revered. International missions and Embassies of the wor=ldhave used our services to satisfaction.A benefactor whose identity can not be disclosed because of the NonCircumvention and Non Disclosure Agreement that was signed with the saidbenefactor when the funds were being deposited in the Central Bank of Nigeri=a,made you the beneficiary of a package containing some amount of money andstated clearly that you should only be contacted when the time signed =20for it tobe in our care elapses and the time has already elapsed that is why you arebeing contacted.The Non Circumvention and Non Disclosure Agreement signed with the benefacto=rmandates us to fully divulge and disclose the benefactor's identity 18 month=safter you, the beneficiary has received the funds.The funds totals $5.000,000 (Five Million Dollars) i shall reconfirm to youare fully free of any liens, or encumbrances and are clean, clear and non-criminal origin and are available in the form of CASH.You are hereby advised to reconfirm your Full Contact Information forverification with information contained in our computer database as well asother relevant information in the format stated below so that the funds woul=dbe arranged by the deplomats who will be moving the funds from the =20Central Bankof Nigeria to be brought to you.I would also inform you clearly here that you must procure an affidavit ofclaim of ownership before the  comensment of the diplomat bringing the =20funds toyou, this you will be informed as soon as your information is received.The  Diplomats shall accompany you to your bank (if you want them to) todeposit the funds in your name and submit all documentations of proof of theorigin of the funds in other to exonerate you from any form of investigation=sor interrogation and to authenticate the fact that the funds are clean and h=asno links whatsoever with either drugs or terrorism.The Requested Information is to ensure that no mistake or error is made and =itshould be forwardedin the manner stated below:"
        result = prediction.predict_spam_probability(text_to_predict, model, vectorizer, vocab)
        #print(f'The probability of the text being spam is: {result.probability:.4f}')
        #print("Text classification: " + result.classification)

Init.predict()