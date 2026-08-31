/**
 * @file exportService.js
 * @description Export utilities for CareScope Analytics SaaS (CSV, JSON, Simulated PDF).
 */

/**
 * Downloads data as a CSV file in browser
 * @param {string} filename
 * @param {Array<Object>} rows
 */
export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const separator = ",";
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? "" : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
            return cell;
          })
          .join(separator);
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Downloads data as a JSON file
 * @param {string} filename
 * @param {Object|Array} data
 */
export function exportToJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8;",
  });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Triggers simulated print or PDF export
 * @param {string} reportTitle
 */
export function exportToPDF(reportTitle = "CareScope-Report") {
  if (typeof window !== "undefined") {
    // In production or browser, opens print dialog or logs simulation
    window.print();
  }
  return `Report ${reportTitle} successfully queued for export.`;
}
