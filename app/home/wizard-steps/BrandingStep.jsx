import styles from "../wizard.module.css";

export default function BrandingStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Branding</h2>
      <p className={styles.stepDescription}>
        Customize your society's visual identity
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="logoUrl">Logo URL / Upload</label>
        <input
          type="text"
          id="logoUrl"
          value={formData.logoUrl}
          onChange={(e) => updateFormData("logoUrl", e.target.value)}
          placeholder="https://example.com/logo.png"
          className={errors.logoUrl ? styles.inputError : ""}
        />
        {errors.logoUrl && (
          <span className={styles.errorText}>{errors.logoUrl}</span>
        )}
        <small className={styles.helpText}>
          You can skip this and upload later
        </small>
      </div>

      {formData.logoUrl && (
        <div className={styles.previewCard}>
          <p className={styles.previewLabel}>Logo Preview:</p>
          <img
            src={formData.logoUrl}
            alt="Logo preview"
            className={styles.logoPreview}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="themeColor">Theme Color</label>
        <div className={styles.colorPickerGroup}>
          <input
            type="color"
            id="themeColor"
            value={formData.themeColor}
            onChange={(e) => updateFormData("themeColor", e.target.value)}
            className={styles.colorInput}
          />
          <input
            type="text"
            value={formData.themeColor}
            onChange={(e) => updateFormData("themeColor", e.target.value)}
            placeholder="#1e90ff"
            className={styles.colorText}
          />
        </div>
      </div>

      <div className={styles.previewCard}>
        <p className={styles.previewLabel}>Brand Preview:</p>
        <div className={styles.brandPreview}>
          {formData.logoUrl && (
            <img
              src={formData.logoUrl}
              alt="Logo"
              className={styles.previewLogo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <span className={styles.previewName}>
            {formData.societyName || "Your Society Name"}
          </span>
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: formData.themeColor }}
          >
            Primary Color
          </div>
        </div>
      </div>

      <div className={styles.skipNote}>
        <small>💡 You can skip branding for now and configure it later from settings</small>
      </div>
    </div>
  );
}
