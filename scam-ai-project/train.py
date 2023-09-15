﻿import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import pickle

from model import TextClassifier

data = pd.read_csv('fraud_email.csv')

data['Text'].fillna('', inplace=True)

# Separate text and labels
texts = data['Text'].tolist()
labels = data['Class'].tolist()

# Data preprocessing
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

with open('count_vectorizer_vocab.pkl', 'wb') as vocab_file:
    pickle.dump(vectorizer.vocabulary_, vocab_file)

with open('count_vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

# Convert data to PyTorch tensors
X = torch.tensor(X.toarray(), dtype=torch.float32)
y = torch.tensor(labels, dtype=torch.int64)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

input_dim = X_train.shape[1]
model = TextClassifier(input_dim)

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 20
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
    print(f'Epoch [{epoch + 1}/{num_epochs}], Loss: {loss.item():.4f}')

torch.save(model.state_dict(), "spam_classifier_model.pth");

# Evaluation
model.eval()
with torch.no_grad():
    y_pred = model(X_test)
    _, predicted = torch.max(y_pred, 1)

accuracy = accuracy_score(y_test.numpy(), predicted.numpy())
print(f'Accuracy: {accuracy * 100:.2f}%')

# Print classification report
print(classification_report(y_test.numpy(), predicted.numpy(), target_names=['Not Spam', 'Spam']))
