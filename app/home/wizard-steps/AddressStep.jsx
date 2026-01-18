import styles from "../wizard.module.css";

export default function AddressStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Address & Location</h2>
      <p className={styles.stepDescription}>
        Provide your society's complete address
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="address">
          Address (Full) <span className={styles.required}>*</span>
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          placeholder="Enter complete address"
          rows={3}
          className={errors.address ? styles.inputError : ""}
        />
        {errors.address && (
          <span className={styles.errorText}>{errors.address}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="city">
            City <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            placeholder="e.g., Noida"
            className={errors.city ? styles.inputError : ""}
          />
          {errors.city && (
            <span className={styles.errorText}>{errors.city}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">
            State <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData("state", e.target.value)}
            placeholder="e.g., Uttar Pradesh"
            className={errors.state ? styles.inputError : ""}
          />
          {errors.state && (
            <span className={styles.errorText}>{errors.state}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          id="pincode"
          value={formData.pincode}
          onChange={(e) => updateFormData("pincode", e.target.value)}
          placeholder="e.g., 201301"
          className={errors.pincode ? styles.inputError : ""}
        />
        {errors.pincode && (
          <span className={styles.errorText}>{errors.pincode}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="mapUrl">Google Maps URL</label>
        <input
          type="text"
          id="mapUrl"
          value={formData.mapUrl}
          onChange={(e) => updateFormData("mapUrl", e.target.value)}
          placeholder="https://maps.google.com/..."
          className={errors.mapUrl ? styles.inputError : ""}
        />
        {errors.mapUrl && (
          <span className={styles.errorText}>{errors.mapUrl}</span>
        )}
        <small className={styles.helpText}>
          Optional: Link to Google Maps location
        </small>
      </div>
    </div>
  );
}
