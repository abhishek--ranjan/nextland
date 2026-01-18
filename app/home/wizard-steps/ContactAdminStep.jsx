import styles from "../wizard.module.css";

export default function ContactAdminStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Contact & Admin Account</h2>
      <p className={styles.stepDescription}>
        Society contact information and admin credentials
      </p>

      <h3 className={styles.sectionTitle}>Contact Information</h3>

      <div className={styles.formGroup}>
        <label htmlFor="primaryContact">
          Primary Contact Number <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="primaryContact"
          value={formData.primaryContact}
          onChange={(e) => updateFormData("primaryContact", e.target.value)}
          placeholder="e.g., +91 98XXXXXXXX"
          className={errors.primaryContact ? styles.inputError : ""}
        />
        {errors.primaryContact && (
          <span className={styles.errorText}>{errors.primaryContact}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Society Email</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="info@yoursociety.com"
          className={errors.email ? styles.inputError : ""}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="emergencyContact">Emergency Contact</label>
        <input
          type="text"
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => updateFormData("emergencyContact", e.target.value)}
          placeholder="e.g., +91 99XXXXXXXX"
          className={errors.emergencyContact ? styles.inputError : ""}
        />
        {errors.emergencyContact && (
          <span className={styles.errorText}>{errors.emergencyContact}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="officeHours">Office Hours</label>
          <input
            type="text"
            id="officeHours"
            value={formData.officeHours}
            onChange={(e) => updateFormData("officeHours", e.target.value)}
            placeholder="e.g., Mon-Fri, 10am-6pm"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            type="url"
            id="websiteUrl"
            value={formData.websiteUrl}
            onChange={(e) => updateFormData("websiteUrl", e.target.value)}
            placeholder="https://yoursociety.com"
          />
        </div>
      </div>

      <hr className={styles.divider} />

      <h3 className={styles.sectionTitle}>Admin Account (For Login)</h3>

      <div className={styles.formGroup}>
        <label htmlFor="adminUsername">
          Admin Username <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="adminUsername"
          value={formData.adminUsername}
          onChange={(e) => updateFormData("adminUsername", e.target.value)}
          placeholder="admin"
          className={errors.adminUsername ? styles.inputError : ""}
        />
        {errors.adminUsername && (
          <span className={styles.errorText}>{errors.adminUsername}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="adminEmail">
          Admin Email <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="adminEmail"
          value={formData.adminEmail}
          onChange={(e) => updateFormData("adminEmail", e.target.value)}
          placeholder="admin@yoursociety.com"
          className={errors.adminEmail ? styles.inputError : ""}
        />
        {errors.adminEmail && (
          <span className={styles.errorText}>{errors.adminEmail}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="adminPassword">
            Password <span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            id="adminPassword"
            value={formData.adminPassword}
            onChange={(e) => updateFormData("adminPassword", e.target.value)}
            placeholder="Enter password"
            className={errors.adminPassword ? styles.inputError : ""}
          />
          {errors.adminPassword && (
            <span className={styles.errorText}>{errors.adminPassword}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">
            Confirm Password <span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            placeholder="Re-enter password"
            className={errors.confirmPassword ? styles.inputError : ""}
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>{errors.confirmPassword}</span>
          )}
        </div>
      </div>
    </div>
  );
}
