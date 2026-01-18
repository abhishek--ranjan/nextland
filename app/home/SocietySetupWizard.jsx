"use client";

import { useState, useEffect } from "react";
import styles from "./wizard.module.css";
import IdentityStep from "./wizard-steps/IdentityStep";
import AddressStep from "./wizard-steps/AddressStep";
import BrandingStep from "./wizard-steps/BrandingStep";
import StatisticsStep from "./wizard-steps/StatisticsStep";
import ContactAdminStep from "./wizard-steps/ContactAdminStep";
import ReviewStep from "./wizard-steps/ReviewStep";

const STEPS = [
  { id: 1, title: "Society Identity", component: IdentityStep },
  { id: 2, title: "Address & Location", component: AddressStep },
  { id: 3, title: "Branding", component: BrandingStep },
  { id: 4, title: "Society Statistics", component: StatisticsStep },
  { id: 5, title: "Contact & Admin", component: ContactAdminStep },
  { id: 6, title: "Review & Create", component: ReviewStep },
];

const DRAFT_KEY = "nextland-setup-draft";

export default function SocietySetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Identity
    societyName: "",
    shortName: "",
    rwaNumber: "",
    yearEstablished: "",
    
    // Step 2: Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    mapUrl: "",
    
    // Step 3: Branding
    logoUrl: "",
    themeColor: "#1e90ff",
    
    // Step 4: Statistics
    numTowers: "",
    numUnits: "",
    totalResidents: "",
    
    // Step 5: Contact & Admin
    primaryContact: "",
    email: "",
    emergencyContact: "",
    officeHours: "",
    websiteUrl: "",
    adminUsername: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
  });

  const [visitedSteps, setVisitedSteps] = useState([1]);
  const [errors, setErrors] = useState({});

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed.formData || formData);
        setCurrentStep(parsed.currentStep || 1);
        setVisitedSteps(parsed.visitedSteps || [1]);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    const draft = {
      formData,
      currentStep,
      visitedSteps,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [formData, currentStep, visitedSteps]);

  // Auto-generate short name from society name
  useEffect(() => {
    if (formData.societyName && !formData.shortName) {
      const generated = formData.societyName
        .split(" ")
        .map((word) => word[0]?.toUpperCase())
        .join("")
        .substring(0, 10);
      setFormData((prev) => ({ ...prev, shortName: generated }));
    }
  }, [formData.societyName]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    // Step 1: Society Identity
    if (step === 1) {
      if (!formData.societyName.trim()) {
        newErrors.societyName = "Society name is required";
      } else if (formData.societyName.trim().length < 3) {
        newErrors.societyName = "Society name must be at least 3 characters long";
      } else if (formData.societyName.trim().length > 100) {
        newErrors.societyName = "Society name cannot exceed 100 characters";
      }
    }

    // Step 2: Address
    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      } else if (formData.address.trim().length < 10) {
        newErrors.address = "Please provide a complete address (at least 10 characters)";
      } else if (formData.address.trim().length > 500) {
        newErrors.address = "Address cannot exceed 500 characters";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      } else if (formData.city.trim().length < 2) {
        newErrors.city = "City name must be at least 2 characters";
      }

      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      } else if (formData.state.trim().length < 2) {
        newErrors.state = "State name must be at least 2 characters";
      }

      if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Pincode must be exactly 6 digits";
      }

      if (formData.mapUrl && !/^https?:\/\/.+/.test(formData.mapUrl)) {
        newErrors.mapUrl = "Please enter a valid URL (must start with http:// or https://)";
      }
    }

    // Step 3: Branding
    if (step === 3) {
      if (formData.logoUrl && !/^https?:\/\/.+/.test(formData.logoUrl)) {
        newErrors.logoUrl = "Please enter a valid URL (must start with http:// or https://)";
      }
    }

    // Step 4: Statistics (optional fields - no validation)

    // Step 5: Contact & Admin
    if (step === 5) {
      if (!formData.primaryContact.trim()) {
        newErrors.primaryContact = "Primary contact number is required";
      } else if (!/^[+]?[0-9\s\-()]{10,20}$/.test(formData.primaryContact)) {
        newErrors.primaryContact = "Please enter a valid phone number (10-20 digits)";
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (formData.emergencyContact && !/^[+]?[0-9\s\-()]{10,20}$/.test(formData.emergencyContact)) {
        newErrors.emergencyContact = "Please enter a valid phone number (10-20 digits)";
      }

      if (!formData.adminUsername.trim()) {
        newErrors.adminUsername = "Admin username is required";
      } else if (formData.adminUsername.trim().length < 3) {
        newErrors.adminUsername = "Username must be at least 3 characters";
      } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.adminUsername)) {
        newErrors.adminUsername = "Username can only contain letters, numbers, underscores, and hyphens";
      }

      if (!formData.adminEmail.trim()) {
        newErrors.adminEmail = "Admin email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
        newErrors.adminEmail = "Please enter a valid email address";
      }

      if (!formData.adminPassword) {
        newErrors.adminPassword = "Password is required";
      } else if (formData.adminPassword.length < 8) {
        newErrors.adminPassword = "Password must be at least 8 characters long";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.adminPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Soft validation: show warnings but allow proceeding
    validateStep(currentStep);
    
    if (currentStep < STEPS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (!visitedSteps.includes(nextStep)) {
        setVisitedSteps((prev) => [...prev, nextStep]);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId) => {
    // Allow navigation to visited steps
    if (visitedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = async () => {
    // Final validation
    const isValid = validateStep(5);
    if (!isValid) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            societyName: formData.societyName,
            shortName: formData.shortName,
            rwaNumber: formData.rwaNumber,
            yearEstablished: formData.yearEstablished,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            mapUrl: formData.mapUrl,
            branding: {
              logo: formData.logoUrl,
              themeColor: formData.themeColor,
            },
            statistics: {
              numTowers: formData.numTowers,
              numUnits: formData.numUnits,
              totalResidents: formData.totalResidents,
            },
            primaryContact: formData.primaryContact,
            email: formData.email,
            emergencyContact: formData.emergencyContact,
            officeHours: formData.officeHours,
            websiteUrl: formData.websiteUrl,
            setupDate: new Date().toISOString().split("T")[0],
          },
          admin: {
            username: formData.adminUsername,
            email: formData.adminEmail,
            password: formData.adminPassword,
          },
        }),
      });

      if (response.ok) {
        // Clear draft
        localStorage.removeItem(DRAFT_KEY);
        // Redirect to home
        window.location.href = "/";
      } else {
        const error = await response.json();
        alert(`Setup failed: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Setup error:", error);
      alert("Failed to complete setup. Please try again.");
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className={styles.wizardContainer}>
      <header className={styles.wizardHeader}>
        <h1>Nextland Setup</h1>
        <p>Society Onboarding</p>
      </header>

      <div className={styles.wizardBody}>
        {/* Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isVisited = visitedSteps.includes(step.id);
            const isComplete = visitedSteps.includes(step.id) && step.id < currentStep;

            return (
              <div
                key={step.id}
                className={`${styles.stepItem} ${isActive ? styles.active : ""} ${
                  isComplete ? styles.complete : ""
                }`}
                onClick={() => handleStepClick(step.id)}
                style={{ cursor: isVisited ? "pointer" : "not-allowed" }}
              >
                <div className={styles.stepNumber}>
                  {isComplete ? "✓" : step.id}
                </div>
                <div className={styles.stepTitle}>{step.title}</div>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className={styles.wizardFooter}>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={styles.btnBack}
        >
          ← Back
        </button>

        {currentStep < STEPS.length ? (
          <button onClick={handleNext} className={styles.btnNext}>
            Next →
          </button>
        ) : (
          <button onClick={handleSubmit} className={styles.btnSubmit}>
            Create Society
          </button>
        )}
      </footer>

      {/* Copyright Footer */}
      <div className={styles.wizardCopyright}>
        &copy; 2026 Nextland Society. All rights reserved.
      </div>
    </div>
  );
}
