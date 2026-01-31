import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib


df = pd.read_csv("crime_data.csv")


df.rename(columns={
    "States/UTs": "state",
    "Protection of Children from Sexual Offences Act 2012/IPC Sections 376, 354 & 509": "total_cases"
}, inplace=True)


df = df[~df["state"].astype(str).str.contains("TOTAL|Total", na=False)]


df["total_cases"] = (
    df["total_cases"]
    .astype(str)
    .str.replace(",", "", regex=False)
    .str.strip()
)

df["total_cases"] = pd.to_numeric(df["total_cases"], errors="coerce")
df = df.dropna(subset=["total_cases"])
df["total_cases"] = df["total_cases"].astype(int)

df["crime_score"] = df["total_cases"] / df["total_cases"].max()


low = df["crime_score"].quantile(0.33)
mid = df["crime_score"].quantile(0.66)

def risk_label(score):
    if score <= low:
        return "Low"
    elif score <= mid:
        return "Medium"
    else:
        return "High"

df["riskLevel"] = df["crime_score"].apply(risk_label)

le = LabelEncoder()
y = le.fit_transform(df["riskLevel"])   # Low=0, Medium=1, High=2

X = df[["crime_score"]]  # IMPORTANT: DataFrame with column name


model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "crime_risk_model.pkl")
joblib.dump(le, "label_encoder.pkl")

print(" Model trained successfully")
print(df["riskLevel"].value_counts())
