import numpy as np
from sentence_transformers import util
import pickle
from sklearn.neighbors import NearestNeighbors
import joblib

def recommend_schemes(user_profile, df, embeddings_path, model, knn_path,top_k=20):
    # Load precomputed embeddings
    with open(embeddings_path, "rb") as f:
        data = pickle.load(f)
    embeddings = data["embeddings"]

    # Step 1: Build user query
    query = (
        f"{user_profile['age']} year old "
        f"{user_profile['gender']} from {user_profile['state']} "
        f"working as {user_profile['occupation']} "
        f"with income {user_profile['income']} rupees "
        f"from {user_profile.get('caste', 'general')} caste"
        f"and i have {user_profile['others']} situations."
    )
    query_embedding = model.encode([query])

    # # Step 2: Cosine similarity
    # scores = util.cos_sim(query_embedding, embeddings)[0].cpu().numpy()
    knn = joblib.load(knn_path)

    distances , indices = knn.kneighbors(query_embedding)

    similarities = 1 - distances.flatten()

    # Normalize scores to [0, 1]
    # scores = (scores - scores.min()) / (score//s.max() - scores.min())

    # Step 3: Precision-based reweighting
    precision_weights = []
    for idx in indices.flatten():
        row = df.iloc[idx]
        weight = 1.0

        # Income check
        if 'income_limit' in df.columns:
            if user_profile['income'] <= row.get('income_limit', np.inf):
                weight += 0.2

        # Category / Caste match
        if user_profile.get('caste', '').lower() in str(row.get('eligibility', '')).lower():
            weight += 0.3

        # Occupation keyword match
        if user_profile['occupation'].lower() in str(row.get('eligibility', '')).lower():
            weight += 0.3

        scheme_state = str(row.get('state_extracted','all_states')).lower()
        user_state = user_profile['state'].lower()

        if scheme_state == 'all states' or scheme_state == user_state:
            weight += 0.2

        precision_weights.append(weight)

    precision_weights = np.array(precision_weights)

    # Step 4: Combine cosine similarity with precision weights
    final_scores = similarities * precision_weights

    # Step 5: Select top-k recommendations
    top_indices = indices.flatten()

    recommendations = df.iloc[top_indices][[
        "scheme_name", "benefits", "eligibility", "schemeCategory", "tags"
    ]].copy()
    recommendations["final_score"] = final_scores
    recommendations["similarity_score"] = similarities
    recommendations["precision_weight"] = precision_weights

    return recommendations.sort_values("final_score", ascending=False)
