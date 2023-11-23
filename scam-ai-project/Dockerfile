FROM python:3.8

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install flask

COPY . /app

COPY count_vectorizer_vocab.pkl /app/
COPY spam_classifier_model.pth /app/
COPY count_vectorizer.pkl /app/

CMD ["python", "api.py"]