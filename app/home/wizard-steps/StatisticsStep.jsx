import styles from "../wizard.module.css";

export default function StatisticsStep({ formData, updateFormData, errors }) {
  return (
    <div className={styles.formStep}>
      <h2>Society Statistics</h2>
      <p className={styles.stepDescription}>
        Help us understand your society's size
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="numTowers">Number of Towers / Blocks</label>
        <input
          type="number"
          id="numTowers"
          value={formData.numTowers}
          onChange={(e) => updateFormData("numTowers", e.target.value)}
          placeholder="e.g., 5"
        />
        <small className={styles.helpText}>
          Total number of towers or blocks in your society
        </small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="numUnits">Number of Units</label>
        <input
          type="number"
          id="numUnits"
          value={formData.numUnits}
          onChange={(e) => updateFormData("numUnits", e.target.value)}
          placeholder="e.g., 200"
        />
        <small className={styles.helpText}>
          Total number of flats or villas
        </small>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="totalResidents">Total Residents (Approx)</label>
        <input
          type="number"
          id="totalResidents"
          value={formData.totalResidents}
          onChange={(e) => updateFormData("totalResidents", e.target.value)}
          placeholder="e.g., 800"
        />
        <small className={styles.helpText}>
          Approximate number of residents (optional)
        </small>
      </div>

      <div className={styles.infoCard}>
        <p>ℹ️ These statistics are optional and can be updated later. They help in understanding your society's scale.</p>
      </div>
    </div>
  );
}
