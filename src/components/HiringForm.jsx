import React, { useMemo, useRef, useState } from 'react';
import './HiringForm.css';
import './HiringLayout.css';
import TacoButton from './TacoButton';

const svg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
    >
        <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
    </svg>
);

const HiringForm = () => {
    const [step, setStep] = useState(1);
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef(null);

    const steps = [
        { label: "Personal", width: 20 },
        { label: "Job Info", width: 20 },
        { label: "Background", width: 20 },
        { label: "Finalize", width: 20 },
        { label: "Submit", width: 20 },
    ];

    const lastFormStep = steps.length - 1;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        homeAddress: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        email: '',
        desiredLocation: '',
        employmentType: 'Full-time',
        position: '',
        startDate: '',
        eligible: 'Yes',
        veteran: 'No',
        backgroundCheck: 'Yes',
        education: '',
        references: '',
        employmentHistory: '',
        resume: null,
        consent: false,
        todaysDate: '',
    });
    const today = useMemo(() => new Date().toISOString().split('T')[0], []);
    const requiredStar = <span className="required-star">*</span>;

    const readFileAsDataUrl = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });

    const buildHiringPayload = async () => {
        const { resume, consent, ...fields } = formData;
        const payload = {
            ...fields,
            consent: consent ? 'true' : 'false',
        };

        if (resume) {
            payload.resume = {
                fileName: resume.name,
                contentType: resume.type,
                size: resume.size,
                data: await readFileAsDataUrl(resume),
            };
        }

        return payload;
    };

    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;
        const value = name === 'phone' ? e.target.value.replace(/\D/g, '') : e.target.value;
        setError('');
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitted) return;
        if (!validateStep(4)) return;

        setError('');
        setSubmitStatus('loading');

        try {
            const payload = await buildHiringPayload();
            const response = await fetch('/hire.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
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
            setError(result?.message || 'Server did not return a successful response. Please try again.');
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('idle');
            setError('An error occurred while sending the application.');
        }
    };

    const requiredByStep = {
        1: ['firstName', 'lastName', 'homeAddress', 'city', 'state', 'postalCode', 'phone', 'email'],
        2: ['desiredLocation', 'employmentType', 'position', 'startDate'],
        3: ['eligible', 'backgroundCheck', 'education', 'references', 'employmentHistory'],
        4: ['todaysDate', 'consent'],
    };

    const totalSteps = steps.length - 1;

    const currentFields = requiredByStep[step] || [];

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

    const validateStep = (targetStep = step) => {
        const invalid = formRef.current?.querySelector(':invalid');
        if (invalid) {
            setError('Please complete all required fields before continuing.');
            invalid.reportValidity();
            invalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }

        const missing = requiredByStep[targetStep].filter((key) => {
            const value = formData[key];
            return value === false || value === null || String(value || '').trim() === '';
        });

        if (missing.length) {
            setError('Please complete all required fields before continuing.');
            return false;
        }

        if (targetStep === 2 && formData.startDate < today) {
            setError('Available start date cannot be in the past.');
            return false;
        }

        if (targetStep === 4 && formData.todaysDate < today) {
            setError("Today's date cannot be in the past.");
            return false;
        }

        return true;
    };

    const moveToStep = (next) => {
        setStep(next);
        window.setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    };

    const nextStep = () => {
        if (submitted) return;
        if (!validateStep(step)) return;
        moveToStep(Math.min(step + 1, steps.length));
    };
    const prevStep = () => {
        if (submitted) return;
        moveToStep(Math.max(step - 1, 1));
    };



    const locations = [
        'Taco Pros HQ Office2200 W Taylor St, Chicago, IL 60612',
        '5959 W Diversey Ave, Chicago, IL 60639',
        '3029 N Pulaski Rd, Chicago, IL 60641',
        '7870 N Milwaukee Ave, Niles, IL 60714',
        '7108 Western Ave, Chicago, IL 60636',
        '2860 Showplace Dr, STE 114, Naperville, IL 60564',
        '3800 S Cicero Ave, Cicero, IL 60804',
        '8160 Mississippi Street, Merrillville, IN 46410',
        '10942 N. Port Washington Rd, Mequon, WI 53092',
        '7959 S Cicero Ave, Chicago, IL 60652',
        '14010 W Rockland Rd, Green Oaks, IL 60044',
        '2 Chicago Ave, Oak Park, IL 60302',
        '833 W Chicago Ave, Chicago, IL 60642',
        '1959 W Chicago Ave, Chicago, IL 60622',
        '6681 Grand Ave, Unit A-1, Gurnee, IL 60031',
        '4126 W Montrose Ave, Chicago, IL 60641',
        '2830 Mannheim Rd, Franklin Park, IL 60131',
        '1078-80 Joliet Street, Dyer, IN 46311',
        '1400 W Wells St, Milwaukee, WI 53233',
        '242 East Capitol Drive, Milwaukee, WI 53212',
        '7730 S Lovers Lane Road, Franklin, WI',
        '15710 US Hwy 36, Marysville, OH 43040',
        '5310 N Broadway, Chicago, IL 60640',
        '772 Army Trail Rd, Carol Stream',
        '2005 US Hwy 30, Suite C, Valparaiso, IN 46383',
        '2068 W Miller Park Way, Suite B',
        '6427 W North Ave, Oak Park, IL 60302',
        '1515 E 87th Street, Chicago, IL 60619',
        '772 W Army Trail Rd, Carol Stream, IL 60188',
        '850 Roosevelt Rd, Glen Ellyn, IL 60137',
    ];

    return (
        <form className="hiring-form" onSubmit={handleSubmit} ref={formRef}>
            <h2 style={{ marginBottom: '40px' }}>Job Application</h2>

           
            <div className="progress position-relative" style={{ height: "6px" }}>
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>

            <div className="d-flex justify-content-between position-relative ProGress" style={{ zIndex: 2 }}>
                {steps.map((s, i) => {
                    let circleClass = "circle";
                    if (i + 1 < step || submitted) circleClass += " completed";
                    else if (i + 1 === step) circleClass += " active";

                    return (
                        <div key={i} className="text-center">
                            <div className={circleClass}>


                                <span className="">
                                    {i + 1 < step || submitted ? svg : i + 1}
                                </span>
                            </div>
                            <small
                                className={
                                    i + 1 <= step ? "fw-bold text-primary mnone step-label" : "text-muted mnone step-label"
                                }
                            >
                                {s.label}
                            </small>
                        </div>
                    );
                })}
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="form-grid mt-4">
                
                {step === 1 && (
                    <>
                        <div className="form-group"><label>First Name {requiredStar}</label><input type='text' name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Last Name {requiredStar}</label><input type='text' name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Home Address {requiredStar}</label><input type='text' name="homeAddress" value={formData.homeAddress} onChange={handleChange} required /></div>
                        <div className="form-group"><label>City {requiredStar}</label><input type='text' name="city" value={formData.city} onChange={handleChange} required /></div>
                        <div className="form-group"><label>State/Province {requiredStar}</label><input type='text' name="state" value={formData.state} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Postal Code {requiredStar}</label><input type='text' name="postalCode" value={formData.postalCode} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Phone {requiredStar}</label><input type='tel' name="phone" value={formData.phone} onChange={handleChange} inputMode="numeric" pattern="[0-9]{10,15}" title="Enter 10 to 15 digits only" required /></div>
                        <div className="form-group"><label>Email {requiredStar}</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                    </>
                )}

                
                {step === 2 && (
                    <>
                        <div className="form-group"><label>Desired Location(s) {requiredStar}</label>
                            <select name="desiredLocation" value={formData.desiredLocation} onChange={handleChange} required>
                                <option value="">-- Select Location --</option>
                                {locations.map((loc, i) => (
                                    <option key={i} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group"><label>Desired Employment Type {requiredStar}</label>
                            <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Position you are applying for {requiredStar}</label><input type='text' name="position" value={formData.position} onChange={handleChange} placeholder="Put 'any' if not sure" required /></div>
                        <div className="form-group"><label>Available Start Date {requiredStar}</label><input type="date" name="startDate" value={formData.startDate} onChange={handleChange} min={today} required /></div>
                    </>
                )}

             
                {step === 3 && (
                    <>
                        <div className="form-group"><label>Are you legally eligible to work in the US? {requiredStar}</label>
                            <div className="radio-group">
                                <label><input type="radio" name="eligible" value="Yes" checked={formData.eligible === 'Yes'} onChange={handleChange} /> Yes</label>
                                <label><input type="radio" name="eligible" value="No" checked={formData.eligible === 'No'} onChange={handleChange} /> No</label>
                            </div>
                        </div>
                        <div className="form-group"><label>Are you a veteran?</label>
                            <div className="radio-group">
                                <label><input type="radio" name="veteran" value="Yes" checked={formData.veteran === 'Yes'} onChange={handleChange} /> Yes</label>
                                <label><input type="radio" name="veteran" value="No" checked={formData.veteran === 'No'} onChange={handleChange} /> No</label>
                            </div>
                        </div>
                        <div className="form-group"><label>Background check consent? {requiredStar}</label>
                            <div className="radio-group">
                                <label><input type="radio" name="backgroundCheck" value="Yes" checked={formData.backgroundCheck === 'Yes'} onChange={handleChange} /> Yes</label>
                                <label><input type="radio" name="backgroundCheck" value="No" checked={formData.backgroundCheck === 'No'} onChange={handleChange} /> No</label>
                            </div>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Education {requiredStar}</label>
                            <textarea name="education" value={formData.education} onChange={handleChange} required></textarea>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>References {requiredStar}</label>
                            <textarea name="references" value={formData.references} onChange={handleChange} required></textarea>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Employment History {requiredStar}</label>
                            <textarea name="employmentHistory" value={formData.employmentHistory} onChange={handleChange} required></textarea>
                        </div>
                    </>
                )}

                
                {step === 4 && (
                    <>
                        <div className="form-group"><label>Resume (JPG, PNG, PDF)</label><input type="file" name="resume" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} /></div>
                        <div className="form-group"><label>Today's Date {requiredStar}</label><input type="date" name="todaysDate" value={formData.todaysDate} onChange={handleChange} min={today} required /></div>

                        {/* Wrap this in form-group for consistent spacing */}
                        <div className="form-group full-width">
                            <label className="d-flex align-items-start gap-2" style={{ textTransform: 'none', fontFamily: 'Arial' }}>
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} style={{ marginTop: '4px' }} required />
                                <span>I certify that my answers are true and complete... {requiredStar}</span>
                            </label>
                        </div>
                    </>
                )}

                {step === 5 && (
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
            </div>

        
            <div className="d-flex justify-content-between mt-4 hiring-form-nav">
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
                        width={step === 1 ? "clamp(180px, 24vw, 260px)" : "clamp(130px, 14vw, 170px)"}
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
    );
};

export default HiringForm;
