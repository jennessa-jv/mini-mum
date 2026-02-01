import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import PregnancyForm from "../components/PregnancyForm";
import VitalsForm from "../components/VitalsForm";

export default function MaternalHealth() {
  const [pregnancy, setPregnancy] = useState(null);
  const [vital, setVital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPregnancy, setEditingPregnancy] = useState(false);
  const [editingVitals, setEditingVitals] = useState(false);

  const navigate = useNavigate();

  const fetchAll = async () => {
    const pregRes = await api.get("/pregnancy/current");
    setPregnancy(pregRes.data);

    const vitalsRes = await api.get("/vitals/latest");
    setVital(vitalsRes.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <Link to="/dashboard" className="text-sm text-pink-600 hover:underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-800">
        🌷 Women’s & Maternal Health
      </h1>

      <p className="text-gray-600">
        Women’s health focuses on the physical, emotional, and reproductive
        well-being of women throughout every stage of life. This space supports
        preventative care, self-awareness, and maternal monitoring.
      </p>

      <div className="border rounded-2xl p-6 bg-pink-50 space-y-4">
        <h2 className="text-xl font-semibold">🤰 Pregnancy Details</h2>

        {!pregnancy && !editingPregnancy && (
          <p className="text-sm text-gray-700">
            Pregnancy details are optional. Adding them allows personalized
            maternal insights and pregnancy-specific guidance.
          </p>
        )}

        {(!pregnancy || editingPregnancy) && (
          <PregnancyForm
            initialValues={editingPregnancy ? pregnancy : null}
            onCreated={fetchAll}
          />
        )}

        {pregnancy && !editingPregnancy && (
          <div className="text-sm space-y-1">
            <p>Pregnancy Start Date: <b>{pregnancy.startDate}</b></p>
            <p>Expected Due Date: <b>{pregnancy.dueDate}</b></p>

            <button
              onClick={() => setEditingPregnancy(true)}
              className="mt-3 px-4 py-2 bg-white border rounded-lg"
            >
              Update Pregnancy Details
            </button>
          </div>
        )}
      </div>

      <div className="border rounded-2xl p-6 bg-white space-y-4">
        <h2 className="text-xl font-semibold">Maternal & General Health Monitoring</h2>

        <p className="text-sm text-gray-600">
          Tracking vital signs helps monitor overall health trends and identify
          potential concerns early. Vitals can be recorded at any time, with or
          without pregnancy details.
        </p>

        {(!vital || editingVitals) && (
          <VitalsForm
            initialValues={editingVitals ? vital : null}
            onSaved={fetchAll}
          />
        )}

        {vital && !editingVitals && (
          <div className="text-sm space-y-1">
            <p>Blood Pressure: <b>{vital.systolicBP}/{vital.diastolicBP}</b></p>
            <p>Blood Sugar Level: <b>{vital.bloodSugar}</b></p>
            <p>Heart Rate: <b>{vital.heartRate}</b></p>
            <p>Body Weight: <b>{vital.weight}</b></p>

            <button
              onClick={() => setEditingVitals(true)}
              className="mt-3 px-4 py-2 bg-gray-100 rounded-lg"
            >
              Update Vitals
            </button>
          </div>
        )}
      </div>

      <div className="border rounded-2xl p-6 bg-pink-50 space-y-4">
        <h2 className="text-xl font-semibold"> General Women’s Health</h2>

        <p className="text-sm text-gray-700">
          𓂃˖˳·˖ ִֶָ ⋆🌷͙⋆ ִֶָ˖·˳˖𓂃 ִֶָ<br/>
          <br/>
          Women’s health care includes gynecology, reproductive and sexual
          health, breast care, hormonal balance, and the prevention and
          treatment of both benign and serious medical conditions.
        </p>

        <p className="text-sm text-gray-700">
          Preventative care such as regular screenings, immunizations, and
          lifestyle assessments helps reduce long-term health risks and
          supports overall well-being.
        </p>

        <p className="text-sm text-gray-700">
          Care is delivered by a multidisciplinary team including
          obstetricians, gynecologists, primary care providers, nurse
          practitioners, midwives, and specialists when needed.
        </p>
      </div>
      <div className="border rounded-2xl p-8 bg-white space-y-6">
  <h2 className="text-2xl font-semibold text-gray-900">
    Women’s Health Services & Care
  </h2>

  <p className="text-sm text-gray-700 leading-relaxed">
    Women’s health refers to the branch of medicine that focuses on the
    prevention, diagnosis, and treatment of conditions that affect a woman’s
    physical, emotional, and reproductive well-being. Care is provided across
    all stages of life, from adolescence through menopause and beyond.
  </p>

  <p className="text-sm text-gray-700 leading-relaxed">
    Women’s health includes a wide range of specialties such as gynecology,
    reproductive and sexual health, pregnancy and childbirth, menopause care,
    breast health, osteoporosis management, and the treatment of benign and
    cancerous conditions affecting the female reproductive system. Attention is
    also given to heart disease in women, hormonal health, and overall wellness.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Preventative Care and Screenings
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Preventative care plays a vital role in maintaining long-term health.
    Services include regular gynecological checkups with pelvic and breast
    exams, Pap smear testing, HPV screening, breast cancer screening,
    osteoporosis screening through bone density tests, and discussions about
    colon cancer screening when appropriate. Preventative care may also include
    age-appropriate immunizations, STI screening, hormonal testing for
    menopause, healthy lifestyle risk assessments, and guidance on breast
    self-exams.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Breast Care Services
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Breast care services focus on the diagnosis and treatment of breast cancer
    and noncancerous breast conditions. Diagnostic services may include
    mammography, breast ultrasound, breast MRI scans, and breast biopsy.
    Treatment options can involve hormonal therapy, radiation therapy,
    chemotherapy, mastectomy, and breast reconstruction. Genetic testing and
    counseling may be offered to women with a personal or family history of
    breast cancer.
  </p>

  <p className="text-sm text-gray-700 leading-relaxed">
    In addition to cancer care, breast specialists may diagnose and manage
    benign breast lumps and conditions such as lymphedema, where excess fluid
    collects in tissues and causes swelling.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Sexual Health Services
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Sexual health is an essential component of overall well-being. Women’s
    sexual health services may include counseling and access to birth control
    methods, prevention and treatment of sexually transmitted infections, and
    therapies to address concerns related to sexual function, comfort, or
    intimacy.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Gynecology and Reproductive Health
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Gynecological and reproductive health services address a wide range of
    conditions such as abnormal Pap smears, high-risk HPV, abnormal vaginal
    bleeding, bacterial vaginosis, endometriosis, heavy or irregular menstrual
    cycles, ovarian cysts, pelvic inflammatory disease, pelvic pain, PCOS,
    premenstrual syndrome and PMDD, uterine fibroids, vaginal infections,
    prolapse of reproductive organs, menopause-related symptoms, and urinary
    tract infections.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Pregnancy and Childbirth
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Pregnancy and childbirth services support individuals before, during, and
    after pregnancy. Care may include pregnancy planning, nutritional guidance,
    prenatal vitamins, review of existing medical conditions and medications,
    prenatal care, delivery, postpartum recovery, breastfeeding support, and
    specialized care for high-risk pregnancies through maternal–fetal medicine.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Infertility Services
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Infertility specialists work with individuals and couples to identify
    possible causes of infertility, though a cause may not always be found.
    Services may include blood and imaging tests to monitor ovulation, fertility
    treatments, and emotional counseling for those experiencing infertility or
    pregnancy loss.
  </p>

  <p className="text-sm text-gray-700 leading-relaxed">
    Treatment options may include medications to stimulate ovulation,
    intrauterine insemination, in vitro fertilization, intracytoplasmic sperm
    injection, embryo cryopreservation, egg donation, and sperm banking.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Bladder and Pelvic Health
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Bladder care services address conditions such as urinary incontinence,
    overactive bladder, bladder emptying disorders, interstitial cystitis, and
    bladder prolapse. Pelvic floor strengthening exercises, including Kegel
    exercises, may be recommended as part of treatment.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Additional Women’s Health Services
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Additional services may include cosmetic and reconstructive procedures,
    skin care and skin cancer screening, diet and nutrition counseling,
    psychological support for women experiencing abuse or trauma, sleep
    disorder services, and smoking cessation programs.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Treatments and Procedures
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Common treatments and procedures performed by women’s health specialists
    include vaginal delivery and Cesarean section, endometrial biopsy and
    ablation, dilation and curettage, hysterectomy, hysteroscopy, mastectomy and
    breast reconstruction, pelvic laparoscopy, procedures for precancerous
    cervical changes such as LEEP or cone biopsy, procedures for urinary
    incontinence, tubal ligation and reversal, and uterine artery embolization.
  </p>

  <h3 className="text-lg font-semibold text-gray-900 pt-2">
    Who Takes Care of You
  </h3>

  <p className="text-sm text-gray-700 leading-relaxed">
    Women’s health care is provided by a multidisciplinary team that may
    include obstetrician–gynecologists, breast surgeons, perinatologists,
    radiologists, primary care doctors, nurse practitioners, nurse midwives,
    physician assistants, and other specialized health professionals. This team
    approach ensures comprehensive, coordinated care tailored to individual
    needs.
  </p>
</div>

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-pink-500 text-white py-3 rounded-2xl font-medium hover:bg-pink-600 transition"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
