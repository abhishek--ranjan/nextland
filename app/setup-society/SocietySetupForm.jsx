"use client";

import { useState } from "react";
import styles from "../home/landing.module.css";

export default function SocietySetupForm({ onComplete }) {
  const [form, setForm] = useState({
    societyName: "",
    address: "",
    contactNumber: "",
    email: "",
    rwaRegistrationNumber: "",
    yearOfEstablishment: "",
    numberOfTowers: "",
    numberOfUnits: "",
    officeHours: "",
    websiteUrl: "",
    logoUrl: "",
    emergencyContact: "",
    mapLocation: "",
  });
  const [step, setStep] = useState(1);
  const [admin, setAdmin] = useState({ username: "", email: "", password: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleAdminChange(e) {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  }
  function handleSocietySubmit(e) {
    e.preventDefault();
    setStep(2);
  }
  async function handleAdminSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);
    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: form, admin }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Failed to save configuration");
      }
      setSuccess("Configuration saved! Redirecting to your society...");
      if (onComplete) onComplete(payload);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (step === 1) {
    return (
      <div className={styles.landing} style={{minHeight: 'unset', paddingTop: 40, paddingBottom: 40}}>
        <div className={styles.header} style={{marginTop: 0, marginBottom: 24}}>
          <h1 style={{fontWeight: 700, fontSize: '2.2rem', color: 'var(--slate-900)'}}>Configure Your Society</h1>
          <p className={styles.tagline} style={{fontSize: '1.1rem', color: '#1e90ff'}}>Enter your society details to get started</p>
        </div>
        <form onSubmit={handleSocietySubmit} style={{
          maxWidth: 820,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px 0 rgba(30,144,255,0.07)',
          padding: 24,
          border: '1px solid #e6e6e6',
        }}>
          <div style={{display: 'flex', gap: 32, flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: 320}}>
              <div style={{background: '#f8fafc', borderRadius: 12, padding: 18, marginBottom: 18, border: '1px solid #e6e6e6', display: 'flex', flexDirection: 'column', gap: 12}}>
                <h3 style={{fontWeight: 600, fontSize: '1.1rem', marginBottom: 10, color: '#1e90ff'}}>Society Details</h3>
                <label>Society Name</label>
                <input name="societyName" placeholder="Society Name" value={form.societyName} onChange={handleChange} required />
                <label>Address</label>
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <label>Map Location (Google Maps URL)</label>
                <input name="mapLocation" placeholder="Map Location (Google Maps URL)" value={form.mapLocation} onChange={handleChange} />
                <label>Logo URL</label>
                <input name="logoUrl" placeholder="Logo URL" value={form.logoUrl} onChange={handleChange} />
              </div>
              <div style={{background: '#f8fafc', borderRadius: 12, padding: 18, marginBottom: 18, border: '1px solid #e6e6e6', display: 'flex', flexDirection: 'column', gap: 12}}>
                <h3 style={{fontWeight: 600, fontSize: '1.1rem', marginBottom: 10, color: '#1e90ff'}}>Society Stats</h3>
                <label>RWA Registration Number</label>
                <input name="rwaRegistrationNumber" placeholder="RWA Registration Number" value={form.rwaRegistrationNumber} onChange={handleChange} required />
                <label>Year of Establishment</label>
                <input name="yearOfEstablishment" placeholder="Year of Establishment" value={form.yearOfEstablishment} onChange={handleChange} />
                <label>Number of Towers</label>
                <input name="numberOfTowers" placeholder="Number of Towers" value={form.numberOfTowers} onChange={handleChange} />
                <label>Number of Units</label>
                <input name="numberOfUnits" placeholder="Number of Units" value={form.numberOfUnits} onChange={handleChange} />
              </div>
            </div>
            <div style={{flex: 1, minWidth: 320}}>
              <div style={{background: '#f8fafc', borderRadius: 12, padding: 18, marginBottom: 18, border: '1px solid #e6e6e6', display: 'flex', flexDirection: 'column', gap: 12}}>
                <h3 style={{fontWeight: 600, fontSize: '1.1rem', marginBottom: 10, color: '#1e90ff'}}>Contact & Office</h3>
                <label>Contact Number</label>
                <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
                <label>Email</label>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <label>Emergency Contact</label>
                <input name="emergencyContact" placeholder="Emergency Contact" value={form.emergencyContact} onChange={handleChange} />
                <label>Office Hours</label>
                <input name="officeHours" placeholder="Office Hours" value={form.officeHours} onChange={handleChange} />
                <label>Website URL</label>
                <input name="websiteUrl" placeholder="Website URL" value={form.websiteUrl} onChange={handleChange} />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.button} style={{marginTop: 24, width: '100%', fontSize: '1.08rem', padding: '12px 0'}}>Next: Create Admin User</button>
        </form>
      </div>
    );
  }
  return (
    <div className={styles.landing} style={{minHeight: 'unset', paddingTop: 40, paddingBottom: 40}}>
      <div className={styles.header} style={{marginTop: 0, marginBottom: 24}}>
        <h1 style={{fontWeight: 700, fontSize: '2.2rem', color: 'var(--slate-900)'}}>Create Admin User</h1>
        <p className={styles.tagline} style={{fontSize: '1.1rem', color: '#1e90ff'}}>Set up your first admin account</p>
      </div>
      <form onSubmit={handleAdminSubmit} style={{
        maxWidth: 400,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 2px 12px 0 rgba(30,144,255,0.07)',
        padding: 22,
        border: '1px solid #e6e6e6',
      }}>
        <label>Admin Username</label>
        <input name="username" placeholder="Admin Username" value={admin.username} onChange={handleAdminChange} required style={{marginBottom: 10}} />
        <label>Admin Email</label>
        <input name="email" placeholder="Admin Email" value={admin.email} onChange={handleAdminChange} required style={{marginBottom: 10}} />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" value={admin.password} onChange={handleAdminChange} required style={{marginBottom: 10}} />
        {error && (
          <p style={{color: '#d14343', fontSize: '0.9rem', marginTop: 8}}>{error}</p>
        )}
        {success && (
          <p style={{color: '#1e90ff', fontSize: '0.9rem', marginTop: 8}}>{success}</p>
        )}
        <button
          type="submit"
          className={styles.button}
          style={{marginTop: 18, width: '100%', fontSize: '1.08rem', padding: '12px 0', opacity: isSaving ? 0.8 : 1}}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Finish Setup"}
        </button>
      </form>
    </div>
  );
}
