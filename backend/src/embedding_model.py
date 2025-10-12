from sentence_transformers import SentenceTransformer
import pickle, os

def create_embeddings(df, save_path):
    # Fixed cache folder for SentenceTransformer
    cache_dir = os.path.join(os.path.expanduser("~"), ".cache", "sentence_transformers")
    os.makedirs(cache_dir, exist_ok=True)

    # Always load the model (from local cache, no redownload)
    model = SentenceTransformer('all-MiniLM-L6-v2', cache_folder=cache_dir)

    # If embeddings already exist, just load them
    if os.path.exists(save_path):
        print(f"✅ Embeddings file found at {save_path}. Loading from cache...")
        with open(save_path, "rb") as f:
            data = pickle.load(f)
        return data["embeddings"], model  # ✅ model is now always returned

    # Otherwise, create new embeddings
    print("🔄 Creating new embeddings (first run)...")
    embeddings = model.encode(df["combined_text"].tolist(), show_progress_bar=True)

    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    with open(save_path, "wb") as f:
        pickle.dump({"embeddings": embeddings, "ids": df.index.tolist()}, f)

    print(f"✅ Embeddings created and saved to {save_path}")
    return embeddings, model
