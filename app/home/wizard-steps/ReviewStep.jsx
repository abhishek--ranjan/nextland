import styles from "../wizard.module.css";

export default function ReviewStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Review & Create</h2>
      <p className={styles.stepDescription}>
        Please review your information before creating the society
      </p>

      <div className={styles.reviewSection}>
        <h3>🏢 Society Identity</h3>
        <dl className={styles.reviewList}>
          <dt>Society Name:</dt>
          <dd>{formData.societyName || "—"}</dd>
          
          <dt>Short Name:</dt>
          <dd>{formData.shortName || "—"}</dd>
          
          {formData.rwaNumber && (
            <>
              <dt>RWA Number:</dt>
              <dd>{formData.rwaNumber}</dd>
            </>
          )}
          
          {formData.yearEstablished && (
            <>
              <dt>Year Established:</dt>
              <dd>{formData.yearEstablished}</dd>
            </>
          )}
        </dl>
      </div>

      <div className={styles.reviewSection}>
        <h3>📍 Address & Location</h3>
        <dl className={styles.reviewList}>
          <dt>Address:</dt>
          <dd>{formData.address || "—"}</dd>
          
          <dt>City:</dt>
          <dd>{formData.city || "—"}</dd>
          
          <dt>State:</dt>
          <dd>{formData.state || "—"}</dd>
          
          {formData.pincode && (
            <>
              <dt>Pincode:</dt>
              <dd>{formData.pincode}</dd>
            </>
          )}
        </dl>
      </div>

      <div className={styles.reviewSection}>
        <h3>🎨 Branding</h3>
        <dl className={styles.reviewList}>
          {formData.logoUrl && (
            <>
              <dt>Logo:</dt>
              <dd>
                <img
                  src={formData.logoUrl}
                  alt="Logo"
                  className={styles.reviewLogo}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </dd>
            </>
          )}
          
          <dt>Theme Color:</dt>
          <dd>
            <span
              className={styles.reviewColorSwatch}
              style={{ backgroundColor: formData.themeColor }}
            ></span>
            {formData.themeColor}
          </dd>
        </dl>
      </div>

      {(formData.numTowers || formData.numUnits || formData.totalResidents) && (
        <div className={styles.reviewSection}>
          <h3>📊 Statistics</h3>
          <dl className={styles.reviewList}>
            {formData.numTowers && (
              <>
                <dt>Towers/Blocks:</dt>
                <dd>{formData.numTowers}</dd>
              </>
            )}
            
            {formData.numUnits && (
              <>
                <dt>Units:</dt>
                <dd>{formData.numUnits}</dd>
              </>
            )}
            
            {formData.totalResidents && (
              <>
                <dt>Residents:</dt>
                <dd>{formData.totalResidents}</dd>
              </>
            )}
          </dl>
        </div>
      )}

      <div className={styles.reviewSection}>
        <h3>📞 Contact Information</h3>
        <dl className={styles.reviewList}>
          <dt>Primary Contact:</dt>
          <dd>{formData.primaryContact || "—"}</dd>
          
          {formData.email && (
            <>
              <dt>Email:</dt>
              <dd>{formData.email}</dd>
            </>
          )}
          
          {formData.emergencyContact && (
            <>
              <dt>Emergency Contact:</dt>
              <dd>{formData.emergencyContact}</dd>
            </>
          )}
          
          {formData.officeHours && (
            <>
              <dt>Office Hours:</dt>
              <dd>{formData.officeHours}</dd>
            </>
          )}
        </dl>
      </div>

      <div className={styles.reviewSection}>
        <h3>👤 Admin Account</h3>
        <dl className={styles.reviewList}>
          <dt>Username:</dt>
          <dd>{formData.adminUsername || "—"}</dd>
          
          <dt>Email:</dt>
          <dd>{formData.adminEmail || "—"}</dd>
          
          <dt>Password:</dt>
          <dd>••••••••</dd>
        </dl>
      </div>

      <div className={styles.reviewNote}>
        <p>
          ✅ By clicking "Create Society", you confirm that all information is correct.
          You can edit most of these settings later from the admin panel.
        </p>
      </div>
    </div>
  );
}
