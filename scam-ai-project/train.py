import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pandas as pd
import pickle
import matplotlib.pyplot as plt
import seaborn as sns

from model import TextClassifier

data = pd.read_csv('fraud_email_.csv')

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
print(input_dim)

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 20
train_losses = []

for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
    train_losses.append(loss.item())
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

plt.figure(figsize=(8, 6))
plt.plot(range(1, num_epochs + 1), train_losses, label='Training Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Loss Over Time')
plt.legend()
plt.grid(True)
plt.show()

# Create a pie chart
spam_count = len(y_test[y_test == 1])
not_spam_count = len(y_test[y_test == 0])
labels = ['Spam', 'Not Spam']
sizes = [spam_count, not_spam_count]
colors = ['#ff9999', '#66b3ff'] 

plt.figure(figsize=(8, 6))
plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
plt.title('Distribution of Spam and Not Spam')
plt.axis('equal')

# Plot confusion matrix as a heatmap
cm = confusion_matrix(y_test.numpy(), predicted.numpy())
labels = ['Not Spam', 'Spam']

plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')

plt.show()