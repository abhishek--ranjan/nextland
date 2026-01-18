import styles from "../wizard.module.css";

export default function IdentityStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Society Identity</h2>
      <p className={styles.stepDescription}>
        Enter your society's basic information
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="societyName">
          Society Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="societyName"
          value={formData.societyName}
          onChange={(e) => updateFormData("societyName", e.target.value)}
          placeholder="e.g., Green Valley Apartments"
          className={errors.societyName ? styles.inputError : ""}
        />
        {errors.societyName && (
          <span className={styles.errorText}>{errors.societyName}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="shortName">Society Short Name / Code</label>
        <input
          type="text"
          id="shortName"
          value={formData.shortName}
          onChange={(e) => updateFormData("shortName", e.target.value)}
          placeholder="Auto-generated, editable"
        />
        <small className={styles.helpText}>
          Auto-generated from society name, you can edit it
        </small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rwaNumber">RWA Registration Number</label>
        <input
          type="text"
          id="rwaNumber"
          value={formData.rwaNumber}
          onChange={(e) => updateFormData("rwaNumber", e.target.value)}
          placeholder="e.g., RWA/2024/001"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="yearEstablished">Year of Establishment</label>
        <input
          type="number"
          id="yearEstablished"
          value={formData.yearEstablished}
          onChange={(e) => updateFormData("yearEstablished", e.target.value)}
          placeholder="YYYY"
          min="1900"
          max="2100"
        />
      </div>
    </div>
  );
}
