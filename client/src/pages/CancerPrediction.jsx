import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CancerPrediction() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  const handlePredict = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/cancer-predict",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-16">
      <div>
        <Link to="/dashboard" className="text-rose-600 underline">
          Back to Dashboard
        </Link>
      </div>

      <section className="space-y-6">
        <h1 className="text-4xl font-bold">
          Breast Cancer Awareness and Risk Assessment
        </h1>

        <p>
          Breast cancer is one of the most significant health challenges
          affecting women worldwide. It develops when normal breast cells
          undergo genetic mutations that cause uncontrolled growth and loss of
          normal cell regulation.
        </p>

        <p>
          Education, awareness, and early detection significantly reduce breast
          cancer mortality. This page explains breast cancer anatomy, symptoms,
          diagnosis, and the role of artificial intelligence in risk assessment.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">
          Breast Anatomy and Cancer Development
        </h2>

        <p>
          The breast consists of lobules that produce milk, ducts that carry milk
          to the nipple, fatty tissue, connective tissue, blood vessels, and
          lymphatic structures. Most breast cancers originate in ducts or
          lobules.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3 text-center">
            <img
              src="/ANATOMY.png"
              alt="Breast anatomy"
              className="rounded shadow w-full h-80 object-contain"
            />
            <p className="text-sm text-gray-700">
              Normal breast anatomy showing lobules, ducts, fatty tissue, chest
              wall, and supporting muscles.
            </p>
          </div>

          <div className="space-y-3 text-center">
            <img
              src="/CANCEROUS.jpg"
              alt="Cancer development in breast tissue"
              className="rounded shadow w-full h-80 object-contain"
            />
            <p className="text-sm text-gray-700">
              Illustration of breast cancer showing tumor formation within the
              ducts or lobules and invasion into surrounding tissue.
            </p>
          </div>
        </div>

        <p>
          As cancer cells multiply, they may break through normal tissue
          boundaries and spread through lymphatic vessels or blood vessels to
          distant organs such as the lungs, liver, bones, or brain.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">
          Symptoms and Physical Warning Signs
        </h2>

        <p>
          In early stages, breast cancer may not produce noticeable symptoms.
          Many cases are detected only through routine screening. As the disease
          progresses, physical changes may become apparent.
        </p>

        <div className="text-center space-y-3">
          <img
            src="/symptoms.png"
            alt="Breast cancer symptoms"
            className="rounded shadow w-full max-w-md h-80 object-contain mx-auto"
          />
          <p className="text-sm text-gray-700">
            Common visual warning signs of breast cancer including lumps, skin
            changes, nipple abnormalities, and asymmetry.
          </p>
        </div>

        <h4 className="font-semibold">Common Symptoms</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Painless lump or thickened area in the breast</li>
          <li>Swelling or lump in the armpit region</li>
          <li>Change in breast size, shape, or symmetry</li>
          <li>Nipple inversion or abnormal discharge</li>
        </ul>

        <h4 className="font-semibold">Skin and Nipple Changes</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Dimpling or puckering of the skin</li>
          <li>Redness, scaling, or thickening</li>
          <li>Orange-peel texture of the breast</li>
        </ul>

        <h4 className="font-semibold">Advanced Symptoms</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Persistent breast or chest pain</li>
          <li>Enlarged lymph nodes near the collarbone</li>
          <li>Ulceration or open sores</li>
          <li>Unexplained fatigue or weight loss</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">
          Diagnosis and Medical Evaluation
        </h2>

        <p>
          Breast cancer diagnosis involves a structured medical evaluation to
          confirm cancer presence, determine its type, and guide treatment.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Clinical breast examination</li>
          <li>Mammography for early detection</li>
          <li>Ultrasound imaging</li>
          <li>MRI for high-risk patients</li>
          <li>Biopsy and laboratory testing</li>
        </ol>

        <p>
          Laboratory testing identifies hormone receptor and HER2 status, which
          directly influences treatment strategy and prognosis.
        </p>
      </section>

      <section className="space-y-6 bg-rose-50 p-6 rounded">
        <h2 className="text-3xl font-bold">
          Importance of Early Detection
        </h2>

        <p>
          Early detection dramatically improves breast cancer survival and
          reduces treatment intensity.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Five-year survival exceeds 90 percent</li>
          <li>Lower risk of metastasis</li>
          <li>Reduced need for aggressive treatment</li>
          <li>Improved quality of life</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">
          AI-Based Breast Cancer Risk Prediction
        </h2>

        <p>
          This tool uses artificial intelligence to analyze breast images and
          estimate cancer risk by identifying visual patterns associated with
          malignant tissue. 
          Pleasee attach below an image of a mammogram.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handlePredict}
          className="bg-rose-600 text-white px-4 py-2 rounded mt-4"
          disabled={!image}
        >
          Predict
        </button>

        {result && (
  <div className="mt-6 bg-gray-100 p-4 rounded">
    <p>
      <b>Model Assessment:</b> {result.prediction}
    </p>
    <p>
      <b>Estimated Probability of Malignancy:</b>{" "}
      {(result.probability * 100).toFixed(2)}%
    </p>
    <p className="text-xs text-gray-600 mt-2">
      This probability represents the model’s confidence that the image
      contains malignant features, not a medical diagnosis.
    </p>
  </div>
)}

      </section>

      <section className="text-sm text-gray-600">
        <p>
          Note: This application is intended for educational and research purposes
          only and does not replace professional medical advice or diagnosis.
        </p>
      </section>

      <div>
        <Link to="/dashboard" className="text-rose-600 underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
