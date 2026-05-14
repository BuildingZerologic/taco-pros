import React, { useRef, useState } from "react";
import "./FranchiseForm.css";
import TacoButton from "../components/TacoButton";

function FranchiseForm() {
  const [step, setStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const requiredStar = <span className="required-star">*</span>;

  const steps = [
    "Personal",
    "Education",
    "Occupation",
    "Financials",
    "General",
    "Submit",
  ];

  const lastFormStep = steps.length - 1;


  const trackedFields = {
    1: [
      "Full Name",
      "Date",
      "Home Address",
      "City",
      "Province",
      "Postal Code",
      "Phone",
      "Email",
      "Country of Citizen?",
      "Country of Legal Residents?",
      "Why are you interested in the Tacopros Franchise?",
    ],
    2: ["High School", "Did you graduate?", "Diploma"],
    3: ["Occupation", "Position", "Name of Employer", "Employer Phone", "Employer Address"],
    4: [
      "Total Liquid Assets",
      "Total Tangible Assets",
      "Total Liabilities",
      "Total Net Worth",
      "Total capital available",
      "Will you need financing?",
    ],
    5: [
      "Do you have experience in restaurant management?",
      'If "Yes", please describe',
      "Who will manage operations?",
      "Preferred City/Area",
      "Interested In",
      "Do you already have a site selected?",
      'If "Yes", what is the address?',
    ]
  }

  const totalSteps = steps.length - 1;

  const currentFields = trackedFields[step] || [];

  const filledCurrent = currentFields.filter((key) => {
    const value = formData[key];
    if (Array.isArray(value)) return value.length > 0;
    return value && String(value).trim() !== "";
  }).length;

  const currentStepRatio =
    currentFields.length > 0 ? filledCurrent / currentFields.length : 0;

  const progressPercent = Math.round(
    ((step - 1 + currentStepRatio) / totalSteps) * 100
  );
  const nextStep = () => {
    if (submitted) return;

    const invalid = formRef.current?.querySelector(":invalid");
    if (invalid) {
      invalid.reportValidity();
      invalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!submitted && step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFormChange = (event) => {
    const field = event.target;
    if (!["INPUT", "TEXTAREA", "SELECT"].includes(field.tagName)) return;

    const key = field.name;
    if (!key) return;

    if (field.type === "checkbox") {
      setFormData((prev) => {
        const current = Array.isArray(prev[key]) ? prev[key] : [];
        return {
          ...prev,
          [key]: field.checked
            ? [...new Set([...current, field.value])]
            : current.filter((item) => item !== field.value),
        };
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [key]: field.value,
    }));
  };

  const handleDigitsOnlyInput = (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
  };

  const buildFranchisePayload = () => ({
    fullName: formData["Full Name"] || "",
    email: formData["Email"] || "",
    phone: formData["Phone"] || "",
    homeAddress: formData["Home Address"] || "",
    city: formData["City"] || "",
    province: formData["Province"] || "",
    postalCode: formData["Postal Code"] || "",
    citizenship: formData["Country of Citizen?"] || "",
    interestReason: formData["Why are you interested in the Tacopros Franchise?"] || "",

    highSchool: formData["High School"] || "",
    graduated: formData["Did you graduate?"] || "",
    diploma: formData["Diploma"] || "",

    occupation: formData["Occupation"] || "",
    position: formData["Position"] || "",
    employerName: formData["Name of Employer"] || "",
    workPhone: formData["Employer Phone"] || "",

    liquidAssets: formData["Total Liquid Assets"] || "",
    tangibleAssets: formData["Total Tangible Assets"] || "",
    liabilities: formData["Total Liabilities"] || "",
    netWorth: formData["Total Net Worth"] || "",
    capitalAvailable: formData["Total capital available"] || "",
    financing: formData["Will you need financing?"] || "",

    experience: formData["Do you have experience in restaurant management?"] || "",
    experienceDesc: formData['If "Yes", please describe'] || "",
    whoWillManage: formData["Who will manage operations?"] || "",
    preferredArea: formData["Preferred City/Area"] || "",
    interestType: Array.isArray(formData["Interested In"])
      ? formData["Interested In"].join(", ")
      : formData["Interested In"] || "",
    siteSelected: formData["Do you already have a site selected?"] || "",
    siteAddress: formData['If "Yes", what is the address?'] || "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && step !== steps.length) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitted) return;
    setError("");
    setSubmitStatus('loading');

    const invalid = formRef.current?.querySelector(":invalid");
    if (invalid) {
      setSubmitStatus('idle');
      setError("Please complete all required fields before submitting.");
      invalid.reportValidity();
      invalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      const response = await fetch("/franchise_api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildFranchisePayload()),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || `Server returned ${response.status}`);
      }

      if (result?.success) {
        setSubmitted(true);
        setSubmitStatus('success');
        setStep(steps.length);
        return;
      }

      setSubmitStatus('idle');
      setError(result?.message || "Server did not return a successful response.");
    } catch (err) {
      console.error("Submission Error:", err);
      setSubmitStatus('idle');
      setError("An error occurred while sending the application.");
    }
  };

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="#ffffff"
      aria-hidden="true"
    >
      <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
    </svg>
  );

  return (
    <>
      <section className="contact-banner-section franchise-banner-section">
        <div className="contact-banner-container franchise-banner-container">
          <img
            src="/tp pg banners 1920x600 franchise.jpg"
            alt="Contact Taco Pros"
            className="contact-banner-img franchise-banner-img"
          />
        </div>
      </section>

      <div className="Heading-main">
        <h1>Franchise</h1>
      </div>

      <div className="container bhjk my-5">
       
        <div className="progress franchise-progress position-relative" style={{ height: "6px" }}>
          <div
            className="progress-bar franchise-progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        
        <div className="d-flex justify-content-between position-relative ProGress franchise-progress-steps" style={{ zIndex: 2 }}>
          {steps.map((label, i) => {
            let circleClass = "circle franchise-step-circle";
            if (i + 1 < step || submitted) circleClass += " completed";
            else if (i + 1 === step) circleClass += " active";

            return (
              <div key={i} className="text-center step-item franchise-step-item">
                <div className={circleClass}>
                  <span>{i + 1 < step || submitted ? svg : i + 1}</span>
                </div>

                <small
                  className={
                    i + 1 <= step
                      ? "fw-bold text-primary step-label franchise-step-label"
                      : "text-muted step-label franchise-step-label"
                  }
                >
                  {label}
                </small>
              </div>
            );
          })}
        </div>

        
        <form
          style={{ marginTop: "20px" }}
          ref={formRef}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >

          {error && <p className="form-error" role="alert">{error}</p>}
        
          {step === 1 && (
            <>
              <h4 className="mb-3">Personal Information</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fullName">Full Name {requiredStar}</label>
                  <input
                    id="fullName"
                    type="text"
                    name="Full Name"
                    defaultValue={formData["Full Name"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="date">Date {requiredStar}</label>
                  <input
                    id="date"
                    type="date"
                    name="Date"
                    defaultValue={formData["Date"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="homeAddress">Home Address {requiredStar}</label>
                  <input
                    id="homeAddress"
                    type="text"
                    name="Home Address"
                    defaultValue={formData["Home Address"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="city">City {requiredStar}</label>
                  <input
                    id="city"
                    type="text"
                    name="City"
                    defaultValue={formData["City"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="province">Province {requiredStar}</label>
                  <input
                    id="province"
                    type="text"
                    name="Province"
                    defaultValue={formData["Province"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="postalCode">Postal Code {requiredStar}</label>
                  <input
                    id="postalCode"
                    type="text"
                    name="Postal Code"
                    defaultValue={formData["Postal Code"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="phone">Phone {requiredStar}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="Phone"
                    defaultValue={formData["Phone"] || ""}
                    className="form-control"
                    inputMode="numeric"
                    pattern="[0-9]{10,15}"
                    title="Enter 10 to 15 digits only"
                    onInput={handleDigitsOnlyInput}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email">Email {requiredStar}</label>
                  <input
                    id="email"
                    type="email"
                    name="Email"
                    defaultValue={formData["Email"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="citizenCountry">Country of Citizen? {requiredStar}</label>
                  <input
                    id="citizenCountry"
                    type="text"
                    name="Country of Citizen?"
                    defaultValue={formData["Country of Citizen?"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="legalResidentsCountry">
                    Country of Legal Residents? {requiredStar}
                  </label>
                  <input
                    id="legalResidentsCountry"
                    type="text"
                    name="Country of Legal Residents?"
                    defaultValue={formData["Country of Legal Residents?"] || ""}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12 mb-4">
                  <label htmlFor="franchiseInterest">
                    Why are you interested in the Tacopros Franchise? {requiredStar}
                  </label>
                  <textarea
                    id="franchiseInterest"
                    name="Why are you interested in the Tacopros Franchise?"
                    defaultValue={
                      formData["Why are you interested in the Tacopros Franchise?"] || ""
                    }
                    className="form-control"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
            </>
          )}

         
          {step === 2 && (
            <>
              <h4 className="mb-3">Education</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="highSchool">High School</label>
                  <input
                    id="highSchool"
                    type="text"
                    name="High School"
                    defaultValue={formData["High School"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Did you graduate?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="graduateYes"
                        name="Did you graduate?"
                        value="Yes"
                        defaultChecked={formData["Did you graduate?"] === "Yes"}
                        className="form-check-input"
                      />
                      <label htmlFor="graduateYes" className="form-check-label">
                        Yes
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="graduateNo"
                        name="Did you graduate?"
                        value="No"
                        defaultChecked={formData["Did you graduate?"] === "No"}
                        className="form-check-input"
                      />
                      <label htmlFor="graduateNo" className="form-check-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="diploma">Diploma</label>
                  <input
                    id="diploma"
                    type="text"
                    name="Diploma"
                    defaultValue={formData["Diploma"] || ""}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h4 className="mb-3">Occupation</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    id="occupation"
                    type="text"
                    name="Occupation"
                    defaultValue={formData["Occupation"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="position">Position</label>
                  <input
                    id="position"
                    type="text"
                    name="Position"
                    defaultValue={formData["Position"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="employerName">Name of Employer</label>
                  <input
                    id="employerName"
                    type="text"
                    name="Name of Employer"
                    defaultValue={formData["Name of Employer"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="employerPhone">Phone</label>
                  <input
                    id="employerPhone"
                    type="tel"
                    name="Employer Phone"
                    defaultValue={formData["Employer Phone"] || ""}
                    className="form-control"
                    inputMode="numeric"
                    pattern="[0-9]{10,15}"
                    title="Enter 10 to 15 digits only"
                    onInput={handleDigitsOnlyInput}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="employerAddress">Address</label>
                  <input
                    id="employerAddress"
                    type="text"
                    name="Employer Address"
                    defaultValue={formData["Employer Address"] || ""}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}

          
          {step === 4 && (
            <>
              <h4 className="mb-3">Financial Information</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="liquidAssets">Total Liquid Assets</label>
                  <input
                    id="liquidAssets"
                    type="text"
                    name="Total Liquid Assets"
                    defaultValue={formData["Total Liquid Assets"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="tangibleAssets">Total Tangible Assets</label>
                  <input
                    id="tangibleAssets"
                    type="text"
                    name="Total Tangible Assets"
                    defaultValue={formData["Total Tangible Assets"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="liabilities">Total Liabilities</label>
                  <input
                    id="liabilities"
                    type="text"
                    name="Total Liabilities"
                    defaultValue={formData["Total Liabilities"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="netWorth">Total Net Worth</label>
                  <input
                    id="netWorth"
                    type="text"
                    name="Total Net Worth"
                    defaultValue={formData["Total Net Worth"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="capitalAvailable">Total capital available</label>
                  <input
                    id="capitalAvailable"
                    type="text"
                    name="Total capital available"
                    defaultValue={formData["Total capital available"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Will you need financing?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="financingYes"
                        name="Will you need financing?"
                        value="Yes"
                        defaultChecked={formData["Will you need financing?"] === "Yes"}
                        className="form-check-input"
                      />
                      <label htmlFor="financingYes" className="form-check-label">
                        Yes
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="financingNo"
                        name="Will you need financing?"
                        value="No"
                        defaultChecked={formData["Will you need financing?"] === "No"}
                        className="form-check-input"
                      />
                      <label htmlFor="financingNo" className="form-check-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

         
          {step === 5 && (
            <>
              <h4 className="mb-3">General Information</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Do you have experience in restaurant management?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="experienceYes"
                        name="Do you have experience in restaurant management?"
                        value="Yes"
                        defaultChecked={
                          formData["Do you have experience in restaurant management?"] ===
                          "Yes"
                        }
                        className="form-check-input"
                      />
                      <label htmlFor="experienceYes" className="form-check-label">
                        Yes
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="experienceNo"
                        name="Do you have experience in restaurant management?"
                        value="No"
                        defaultChecked={
                          formData["Do you have experience in restaurant management?"] ===
                          "No"
                        }
                        className="form-check-input"
                      />
                      <label htmlFor="experienceNo" className="form-check-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="experienceDescription">If "Yes", please describe</label>
                  <input
                    id="experienceDescription"
                    type="text"
                    name='If "Yes", please describe'
                    defaultValue={formData['If "Yes", please describe'] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="operationsManager">Who will manage operations?</label>
                  <input
                    id="operationsManager"
                    type="text"
                    name="Who will manage operations?"
                    defaultValue={formData["Who will manage operations?"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="preferredArea">Preferred City/Area</label>
                  <input
                    id="preferredArea"
                    type="text"
                    name="Preferred City/Area"
                    defaultValue={formData["Preferred City/Area"] || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Which of the following are you interested in?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="singleLocation"
                        name="Interested In"
                        value="Single Location"
                        defaultChecked={formData["Interested In"]?.includes("Single Location")}
                        className="form-check-input"
                      />
                      <label htmlFor="singleLocation" className="form-check-label">
                        Single Location
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="multipleLocation"
                        name="Interested In"
                        value="Multiple Location"
                        defaultChecked={formData["Interested In"]?.includes("Multiple Location")}
                        className="form-check-input"
                      />
                      <label htmlFor="multipleLocation" className="form-check-label">
                        Multiple Location
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="areaDevelopment"
                        name="Interested In"
                        value="Area Development"
                        defaultChecked={formData["Interested In"]?.includes("Area Development")}
                        className="form-check-input"
                      />
                      <label htmlFor="areaDevelopment" className="form-check-label">
                        Area Development
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Do you already have a site selected?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="siteYes"
                        name="Do you already have a site selected?"
                        value="Yes"
                        defaultChecked={formData["Do you already have a site selected?"] === "Yes"}
                        className="form-check-input"
                      />
                      <label htmlFor="siteYes" className="form-check-label">
                        Yes
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="siteNo"
                        name="Do you already have a site selected?"
                        value="No"
                        defaultChecked={formData["Do you already have a site selected?"] === "No"}
                        className="form-check-input"
                      />
                      <label htmlFor="siteNo" className="form-check-label">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="siteAddress">If "Yes", what's the address?</label>
                  <input
                    id="siteAddress"
                    type="text"
                    name='If "Yes", what is the address?'
                    defaultValue={formData['If "Yes", what is the address?'] || ""}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <div className="full-width success-card">
              <div className="success-icon">✔</div>
              <h3>Application Submitted</h3>
              <p>
                Thank you for applying. Our team will review your application and get back to you soon.
              </p>

              <TacoButton
                text="Submit Another Response"
                width="clamp(230px, 28vw, 330px)"
                height="clamp(51px, 5vw, 57px)"
                fontSize="clamp(14px, 1.6vw, 18px)"
                styleType="2"
                styleClass="taco-btn-form-green"
                onClick={() => window.location.reload()}
              />
            </div>
          )}

         
          <div className="d-flex justify-content-between mt-4 form-nav">
            {step > 1 && step <= lastFormStep && !submitted ? (
              <TacoButton
                text="Previous"
                width="clamp(130px, 14vw, 170px)"
                height="clamp(51px, 5vw, 57px)"
                fontSize="clamp(15px, 1.8vw, 20px)"
                styleType="2"
                styleClass="taco-btn-form-green"
                onClick={prevStep}
              />
            ) : (
              <div></div>
            )}

            {step < lastFormStep && !submitted ? (
              <TacoButton
                text="Next"
                width="clamp(130px, 14vw, 170px)"
                height="clamp(51px, 5vw, 57px)"
                fontSize="clamp(15px, 1.8vw, 20px)"
                styleType="2"
                styleClass="taco-btn-form-green"
                onClick={nextStep}
              />
            ) : null}
            {step === lastFormStep && !submitted && (
              <TacoButton
                type="submit"
                text={submitStatus === 'loading' ? 'Submitting...' : 'Submit Application'}
                width="clamp(220px, 26vw, 310px)"
                height="clamp(51px, 5vw, 57px)"
                fontSize="clamp(14px, 1.6vw, 18px)"
                styleType="2"
                styleClass="taco-btn-form-green"
                disabled={submitStatus === 'loading'}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default FranchiseForm;
