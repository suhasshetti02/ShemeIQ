from transformers import pipeline
import re

# Initialize summarizer
summarizer_pipeline = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    truncation=True
)

def clean_text(text: str) -> str:
    """Fix encoding issues and remove extra spaces."""
    text = text.replace("â‚¹", "₹").replace("â", "")
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def chunk_text(text: str, max_words=400):
    """Split text into smaller chunks for safe summarization."""
    words = text.split()
    return [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)]

def summarize_scheme(scheme_data: dict) -> str:
    """Generate a detailed and complete explanation of the scheme."""
    structured_input = f"""
    Scheme Name: {scheme_data.get('name', '')}

    Eligibility:
    {scheme_data.get('eligibilty', '')}

    Description:
    {scheme_data.get('description', '')}

    Benefits:
    {scheme_data.get('benefits', '')}

    Department:
    {scheme_data.get('department', '')}

    Explain this scheme in full detail, including:
    - Who is eligible (conditions and restrictions)
    - Steps or process for application (if applicable)
    - The benefits provided and their purpose
    - Any special conditions or warnings
    Provide the explanation in clear, complete sentences suitable for someone who wants full understanding.
    """

    structured_input = clean_text(structured_input)
    chunks = chunk_text(structured_input, max_words=300)  # safer input chunks

    summaries = []
    for chunk in chunks:
        result = summarizer_pipeline(
            chunk,
            max_length=512,
            min_length=200,
            do_sample=False
        )[0]['summary_text']
        summaries.append(result.strip())

    # Combine summaries into one smooth final explanation
    final_summary = " ".join(summaries)
    final_summary = clean_text(final_summary)

    return final_summary
