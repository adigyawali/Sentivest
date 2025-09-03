from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Get the tokenizer (Splits sentences into tokens)
tokenizer = AutoTokenizer.from_pretrained("yiyanghkust/finbert-tone")

# Actual model that can understand Financial Statements
model = AutoModelForSequenceClassification.from_pretrained("yiyanghkust/finbert-tone")

# Define the Labels
labels = ["Neutral", "Bullish", "Bearish"]


# Function that outputs a sentiment from text
def analyzeSentiment(texts):
    """
    Takes in a list of headlines and returns sentiment results.
    """

    # Tokenizes text, padding is true for batch processing, truncates large sentences, pt ensures it returns in a format pytroch understands
    inputs = tokenizer(texts, padding=True, truncation=True, max_length=512, return_tensors="pt")

    # Run the token throug the models
    outputs = model(**inputs)

    # Apply softmax to the logits so the resutls are a probbability

    probbability = torch.nn.functional.softmax(outputs.logits, dim=-1)


    # Obtain the index of the highest probbability --> Coorelates directly to index of the labels
    predictions = torch.argmax(probbability, dim=1)

    # Convert resunts so its easy to use
    results = []
    for i, text in enumerate(texts):
        probs = probbability[i].detach().numpy()
        label = labels[predictions[i]]
        results.append({
            "headline": text,
            "sentiment": label,
            "confidence": round(float(max(probs)), 3)  # top confidence
        })

    return results



if __name__ == ("__main__"):
    texts = ["Nvidia shares fell sharply after disappointing earnings report."]
    
    results = analyzeSentiment(texts)
    for r in results:
        print(r)