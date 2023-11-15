import torch
import torch.nn as nn
import os
from torchviz import make_dot



class TextClassifier(nn.Module):
    def __init__(self, input_dim):
        super(TextClassifier, self).__init__()
        self.fc1 = nn.Linear(input_dim, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 2)  # 2 output classes (0 and 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Visualization
# os.environ["PATH"] += os.pathsep + "F:\\Graphviz\\bin"
# input_dim = 100
# model = TextClassifier(input_dim)

# dummy_input = torch.randn(1, input_dim)

# dot = make_dot(model(dummy_input), params=dict(model.named_parameters()))

# dot.render("text_classifier_model", format="png", cleanup=True)

# dot.format = 'png'
# dot.render(filename='text_classifier_model', directory='./', cleanup=True)
# dot.view()