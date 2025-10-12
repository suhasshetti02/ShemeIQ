import pandas as pd
import re ,os


INDIAN_STATES = [
    "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh",
    "goa", "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka",
    "kerala", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram",
    "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana",
    "tripura", "uttar pradesh", "uttarakhand", "west bengal", "andaman and nicobar islands",
    "chandigarh", "dadra and nagar haveli and daman and diu", "delhi", "jammu and kashmir",
    "ladakh", "lakshadweep", "puducherry"
]

# raw_csv = '../data/updated_schemes.csv'
# preprocessed_csv = '../data/processed_schemes.csv'

def clean_text(text):
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r'[^\w\s₹.,%-]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.replace("â‚¹", "₹").replace("â", "")
    return text.strip() 

def extract_states(text):
    text = text.lower()
    for state in INDIAN_STATES:
        if re.search(rf"\b{state}\b",text):
            return state
        
    return "all states"

def prepare_data(csv_path, preprocessed_csv):
    if os.path.exists(preprocessed_csv):
        return pd.read_csv(preprocessed_csv)
    
    df = pd.read_csv(csv_path)
    # combine all relevant textual information
    df['state_ extracted'] = df['eligibility'].apply(extract_states)
    df["combined_text"] = (
        df["scheme_name"].fillna("") + " " +
        df["details"].fillna("") + " " +
        df["benefits"].fillna("") + " " +
        df["eligibility"].fillna("") + " " +
        df["schemeCategory"].fillna("") + " " +
        df["tags"].fillna("")
    ).apply(clean_text)
    df.to_csv(preprocessed_csv,index=False)
    return df
