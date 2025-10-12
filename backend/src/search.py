import re
import numpy as np
import pandas as pd
from sentence_transformers import util
from sklearn.feature_extraction.text import TfidfVectorizer

def search(df,query , model , embeddings ,top_k = 20):
    query = query.strip().lower()
    if not query : 
        print("please provide query")

    query_embedding = model.encode([query], convert_to_tensor = True)
    semantic_score = util.cos_sim(query_embedding , embeddings)[0].cpu().numpy()

    vectorize = TfidfVectorizer(stop_words='english')
    tfidx_matrix = vectorize.fit_transform(df['combined_text'])
    query_vec = vectorize.transform([query])
    tfidf_score = np.dot(query_vec,tfidx_matrix.T).toarray().flatten()

    semantic_score = (semantic_score - semantic_score.min())/ (semantic_score.max() - semantic_score.min() + 1e-8)
    tfidf_score = (tfidf_score - tfidf_score.min()) / (tfidf_score.max() - tfidf_score.min() + 1e-8)

    keyword_boost = []
    for _,  row in df.iterrows():
        boost = 0
        for word in query.split():
            if re.search(rf"\b{word}\b", str(row["state_ extracted"]).lower()):
                boost += 0.2
            if re.search(rf"\b{word}\b", str(row["schemeCategory"]).lower()):
                boost += 0.15
            if re.search(rf"\b{word}\b", str(row["tags"]).lower()):
                boost += 0.15
        
        keyword_boost.append(boost)
    keyword_boost = np.array(keyword_boost)

    final_scores = 0.6 * semantic_score + 0.3 * tfidf_score + 0.1 * keyword_boost

    # Step 5: Sort by relevance
    top_indices = np.argsort(-final_scores)[:top_k]
    results = df.iloc[top_indices][[
        "scheme_name", "schemeCategory",'state_ extracted', "benefits", "eligibility", "tags"
    ]].copy()

    results["semantic_score"] = semantic_score[top_indices]
    results["tfidf_score"] = tfidf_score[top_indices]
    results["keyword_boost"] = keyword_boost[top_indices]
    results["final_score"] = final_scores[top_indices]

    return results.sort_values("final_score", ascending=False).reset_index(drop=True)