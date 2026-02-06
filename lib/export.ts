import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Prompt } from "@/lib/types";

// Export single prompt to Markdown
export function exportToMarkdown(prompt: Prompt, variables: Record<string, string>) {
  const filledTemplate = prompt.template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });

  const markdownContent = `# ${prompt.title}\n\n` +
                          `**Framework:** ${prompt.framework}\n` +
                          `**Tags:** ${prompt.tags.join(", ")}\n` +
                          `**Description:** ${prompt.description}\n\n` +
                          `---\n\n` +
                          `${filledTemplate}`;

  const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
  saveAs(blob, `${prompt.title.replace(/\s+/g, "_")}.md`);
}

export function exportToExcel(prompt: Prompt, variables: Record<string, string>) {
  // 1. Create a Key-Value pair for metadata
  const metadata = [
    ["Prompt Title", prompt.title],
    ["Framework", prompt.framework],
    ["Description", prompt.description],
    ["Tags", prompt.tags.join(", ")],
    ["Exported At", new Date().toLocaleString()],
    ["", ""], // Spacer
    ["VARIABLE", "USER INPUT"], // Header
    ...Object.entries(variables).map(([k, v]) => [k, v]),
    ["", ""], // Spacer
    ["FULL PROMPT", ""] // Header
  ];

  // 2. Create the worksheet
  const ws = XLSX.utils.aoa_to_sheet(metadata);

  // 3. Add the Full Prompt content in a large cell below
  const promptStartRow = metadata.length;
  // Calculate prompt content manually to avoid cell limit issues in simple aoa
  const filledTemplate = prompt.template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
  
  XLSX.utils.sheet_add_aoa(ws, [[filledTemplate]], { origin: `A${promptStartRow + 1}` });

  // 4. Create workbook and download
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "PM_Nexus Export");
  XLSX.writeFile(wb, `${prompt.title.replace(/\s+/g, "_")}.xlsx`);
}

// Export entire prompt library to JSON
export function exportLibraryToJSON(prompts: Prompt[]) {
  const exportData = {
    exportedAt: new Date().toISOString(),
    totalPrompts: prompts.length,
    prompts: prompts.map(p => ({
      id: p.id,
      title: p.title,
      category: p.framework,
      description: p.description,
      template: p.template,
      variables: p.variables,
      frameworks: p.tags,
      estimatedTimeSaved: p.estimatedTimeSaved,
      tier: p.tier,
      tags: p.tags,
    })),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json;charset=utf-8"
  });
  saveAs(blob, `PM_Nexus_Library_${new Date().toISOString().split('T')[0]}.json`);
}

// Export entire prompt library to Excel
export function exportLibraryToExcel(prompts: Prompt[]) {
  // Create main prompts sheet
  const promptsData = prompts.map(p => ({
    "Title": p.title,
    "Framework": p.framework,
    "Tier": p.tier,
    "Description": p.description,
    "Tags": p.tags.join(", "),
    "Time Saved": p.estimatedTimeSaved,
    "Template": p.template,
    "Variables": p.variables.map(v => v.name).join(", "),
  }));

  const ws = XLSX.utils.json_to_sheet(promptsData);

  // Set column widths for better readability
  ws['!cols'] = [
    { wch: 30 },  // Title
    { wch: 15 },  // Framework
    { wch: 10 },  // Tier
    { wch: 50 },  // Description
    { wch: 30 },  // Tags
    { wch: 12 },  // Time Saved
    { wch: 80 },  // Template
    { wch: 30 },  // Variables
  ];

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "All Prompts");

  // Create summary sheet
  const categories = Array.from(new Set(prompts.map(p => p.framework)));
  const summaryData: Array<{ Framework: string; "Total Prompts": number; Free: number; Premium: number }> = categories.map(cat => ({
    "Framework": cat,
    "Total Prompts": prompts.filter(p => p.framework === cat).length,
    "Free": prompts.filter(p => p.framework === cat && p.tier === "free").length,
    "Premium": prompts.filter(p => p.framework === cat && p.tier === "premium").length,
  }));

  // Add totals row
  summaryData.push({
    "Framework": "TOTAL",
    "Total Prompts": prompts.length,
    "Free": prompts.filter(p => p.tier === "free").length,
    "Premium": prompts.filter(p => p.tier === "premium").length,
  });

  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  summaryWs['!cols'] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
  ];
  XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

  XLSX.writeFile(wb, `PM_Nexus_Library_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Helper to convert image to base64
async function imageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

// Export entire prompt library to interactive HTML
export async function exportLibraryToHTML(prompts: Prompt[]) {
  const frameworks = Array.from(new Set(prompts.map(p => p.framework)));
  const promptsJSON = JSON.stringify(prompts);

  // Fetch and convert background image to base64
  const bgImageBase64 = await imageToBase64('/images/construction.png');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PM_Nexus Vault - Prompt Library</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Background with overlay - matching main app exactly */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0f172a;
      background-image: url("${bgImageBase64}");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      color: rgba(255, 255, 255, 0.9);
      min-height: 100vh;
      padding: 2rem;
    }

    /* Dark overlay matching main app (bg-black/75) */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      z-index: -1;
    }

    /* Glassmorphism base */
    .glass {
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1rem;
    }

    .glass-content {
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 24px rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      transition: all 0.3s;
    }

    .glass-content:hover {
      background: rgba(0, 0, 0, 0.60);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .glass-modal {
      background: rgba(0, 0, 0, 0.50);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.5);
      border-radius: 1rem;
    }

    .container { max-width: 1200px; margin: 0 auto; }

    header {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
    }

    h1 {
      font-size: 2.5rem;
      background: linear-gradient(90deg, #22d3ee, #fff, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .subtitle { color: #94a3b8; font-size: 1rem; }
    .stats {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    .stat {
      background: rgba(0,0,0,0.4);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(8px);
    }

    .toolbar {
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .search {
      flex: 1;
      min-width: 200px;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(8px);
      color: #fff;
      font-size: 1rem;
      transition: all 0.2s;
    }
    .search:focus {
      outline: none;
      background: rgba(0,0,0,0.55);
      border-color: rgba(255,255,255,0.25);
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
    }
    .search::placeholder { color: #64748b; }
    .filter-btn {
      padding: 0.75rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.4);
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.2s;
      backdrop-filter: blur(8px);
    }
    .filter-btn:hover, .filter-btn.active {
      background: rgba(0,0,0,0.6);
      border-color: rgba(34,211,238,0.4);
      color: #22d3ee;
    }
    .phase-filters {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      padding: 0.75rem 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-top: 0.5rem;
    }
    .phase-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin-right: 0.25rem;
    }
    .phase-btn {
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.05);
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.75rem;
    }
    .phase-btn:hover, .phase-btn.active {
      background: rgba(168,85,247,0.2);
      border-color: rgba(168,85,247,0.5);
      color: #c084fc;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1rem;
    }
    .card {
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 24px rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    .card:hover {
      background: rgba(0, 0, 0, 0.60);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px) scale(1.01);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }
    .card-title { font-size: 1.125rem; font-weight: 600; color: #fff; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .badge-free { background: rgba(34,197,94,0.2); color: #4ade80; }
    .badge-premium { background: rgba(234,179,8,0.2); color: #facc15; }
    .card-meta {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    .card-framework {
      background: rgba(59,130,246,0.2);
      border: 1px solid rgba(59,130,246,0.3);
      color: #60a5fa;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
    }
    .card-phase {
      background: rgba(34,211,238,0.2);
      border: 1px solid rgba(34,211,238,0.3);
      color: #22d3ee;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
    }
    .card-desc { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; }
    .card-frameworks {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .framework-tag {
      background: rgba(255,255,255,0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      color: #cbd5e1;
    }
    /* Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 100;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .modal-overlay.active { display: flex; }
    .modal {
      background: rgba(0, 0, 0, 0.50);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.5);
      border-radius: 1rem;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .modal-header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .modal-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      background: rgba(0,0,0,0.5);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .modal-badge-framework {
      border: 1px solid rgba(59,130,246,0.4);
      color: #bfdbfe;
    }
    .modal-badge-phase {
      border: 1px solid rgba(34,211,238,0.4);
      color: #67e8f9;
      font-weight: 400;
    }
    .modal-badge-premium {
      border: 1px solid rgba(34,197,94,0.4);
      color: #bbf7d0;
    }
    .modal-time-saved {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.5);
    }
    .close-btn {
      background: none;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 1.75rem;
      cursor: pointer;
      padding: 0.625rem;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    .close-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(to right, #bfdbfe, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.3;
    }
    .modal-desc {
      color: rgba(255,255,255,0.7);
      margin-top: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .modal-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    .modal-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.6);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .modal-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .modal-content {
        flex-direction: row;
        gap: 2rem;
      }
    }
    .modal-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .modal-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 250px;
    }
    @media (min-width: 640px) {
      .modal-right {
        min-height: 400px;
      }
    }
    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .preview-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
    }
    .copy-btn {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.12);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
    }
    .copy-btn:hover { background: rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.2); }
    .copy-btn.copied { background: rgba(34,197,94,0.2); color: #bbf7d0; }
    .preview-box {
      flex: 1;
      padding: 1.5rem;
      border-radius: 0.75rem;
      background: rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.1);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      white-space: pre-wrap;
      color: rgba(255,255,255,0.9);
      overflow-y: auto;
    }
    .variables-section-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      margin-bottom: 1rem;
    }
    .variable-item {
      margin-bottom: 1rem;
    }
    .variable-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
    }
    .variable-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255,255,255,0.8);
      text-transform: capitalize;
    }
    .variable-required {
      font-size: 0.75rem;
      color: #f87171;
    }
    .variable-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(8px);
      color: #fff;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    .variable-input:focus {
      outline: none;
      background: rgba(0,0,0,0.55);
      border-color: rgba(255,255,255,0.25);
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
    }
    .variable-input::placeholder { color: #64748b; }
    .variable-desc {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.4);
      margin-top: 0.25rem;
    }
    .filled-variable {
      color: #93c5fd;
      font-weight: 700;
    }
    .unfilled-variable {
      color: rgba(234,179,8,0.8);
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #64748b;
    }
    @media (max-width: 900px) {
      .customization-layout {
        grid-template-columns: 1fr;
      }
      .variables-scroll, .template-box {
        max-height: 250px;
      }
    }
    @media (max-width: 640px) {
      body { padding: 1rem; }
      h1 { font-size: 1.75rem; }
      .grid { grid-template-columns: 1fr; }
      .controls { flex-direction: column; }
      .modal { padding: 1rem; }
      .btn-row { flex-direction: column; }
      .btn-row button { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="glass">
      <h1>The Project Manager's Nexus</h1>
      <p class="subtitle">The Ultimate Command Center for <span style="color:#22d3ee;font-weight:500;">Enterprise Execution</span></p>
      <div class="stats">
        <span class="stat">📚 <span id="total-count">${prompts.length}</span> Prompts</span>
        <span class="stat">✅ <span id="free-count">${prompts.filter(p => p.tier === 'free').length}</span> Free</span>
        <span class="stat">⭐ <span id="premium-count">${prompts.filter(p => p.tier === 'premium').length}</span> Premium</span>
      </div>
    </header>

    <div class="toolbar glass">
      <div class="controls">
        <input type="text" class="search" id="search" placeholder="Search prompts...">
        <button class="filter-btn active" data-filter="all">All</button>
        ${frameworks.map(fw => `<button class="filter-btn" data-filter="${fw}">${fw === 'safe' ? 'SAFe' : fw.charAt(0).toUpperCase() + fw.slice(1)}</button>`).join('')}
      </div>

      <div class="phase-filters" id="phase-filters" style="display:none;">
        <span class="phase-label">Phases:</span>
        <button class="phase-btn active" data-phase="all">All</button>
      </div>
    </div>

    <div class="grid" id="prompts-grid"></div>
    <div class="empty-state" id="empty-state" style="display:none;">
      <p>No prompts found matching your search.</p>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal-overlay" id="modal">
    <div class="modal">
      <!-- Header: Badges left, Close button right -->
      <div class="modal-header">
        <div class="modal-header-left" id="modal-badges"></div>
        <button class="close-btn" onclick="closeModal()">&times;</button>
      </div>

      <!-- Two-column content -->
      <div class="modal-content">
        <!-- Left: Title, Description, Tags, Variables -->
        <div class="modal-left">
          <div>
            <h2 class="modal-title" id="modal-title"></h2>
            <p class="modal-desc" id="modal-desc"></p>
            <div class="modal-tags" id="modal-tags"></div>
          </div>

          <!-- Variables Section -->
          <div>
            <h3 class="variables-section-title">Customize Variables</h3>
            <div id="modal-variables"></div>
          </div>
        </div>

        <!-- Right: Preview -->
        <div class="modal-right">
          <div class="preview-header">
            <h3 class="preview-title">Preview</h3>
            <button class="copy-btn" id="copy-btn" onclick="copyPrompt()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Prompt
            </button>
          </div>
          <div class="preview-box" id="modal-template"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const prompts = ${promptsJSON};
    let currentFilter = 'all';
    let currentPhase = 'all';
    let searchQuery = '';
    let selectedPrompt = null;
    let variableValues = {};

    function updatePhaseFilters() {
      const phaseFiltersDiv = document.getElementById('phase-filters');

      if (currentFilter === 'all') {
        phaseFiltersDiv.style.display = 'none';
        currentPhase = 'all';
        return;
      }

      // Get unique phases for the selected framework
      const frameworkPrompts = prompts.filter(p => p.framework === currentFilter);
      const phases = [...new Set(frameworkPrompts.map(p => p.phase))];

      if (phases.length === 0) {
        phaseFiltersDiv.style.display = 'none';
        return;
      }

      phaseFiltersDiv.style.display = 'flex';
      phaseFiltersDiv.innerHTML = \`
        <span class="phase-label">Phases:</span>
        <button class="phase-btn \${currentPhase === 'all' ? 'active' : ''}" data-phase="all">All</button>
        \${phases.map(phase => \`<button class="phase-btn \${currentPhase === phase ? 'active' : ''}" data-phase="\${phase}">\${phase}</button>\`).join('')}
      \`;

      // Add event listeners to phase buttons
      phaseFiltersDiv.querySelectorAll('.phase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          phaseFiltersDiv.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentPhase = btn.dataset.phase;
          renderPrompts();
        });
      });
    }

    function renderPrompts() {
      const grid = document.getElementById('prompts-grid');
      const emptyState = document.getElementById('empty-state');

      let filtered = prompts;

      if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.framework === currentFilter);
      }

      if (currentPhase !== 'all') {
        filtered = filtered.filter(p => p.phase === currentPhase);
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(f => f.toLowerCase().includes(q)) ||
          p.framework.toLowerCase().includes(q) ||
          p.phase.toLowerCase().includes(q)
        );
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';
      grid.innerHTML = filtered.map(p => \`
        <div class="card" onclick="openModal('\${p.id}')">
          <div class="card-header">
            <span class="card-title">\${p.title}</span>
            <span class="badge badge-\${p.tier}">\${p.tier}</span>
          </div>
          <div class="card-meta">
            <span class="card-framework">\${p.framework === 'safe' ? 'SAFe' : p.framework}</span>
            <span class="card-phase">\${p.phase}</span>
          </div>
          <p class="card-desc">\${p.description.substring(0, 120)}\${p.description.length > 120 ? '...' : ''}</p>
          <div class="card-frameworks">
            \${p.tags.slice(0, 3).map(f => \`<span class="framework-tag">\${f}</span>\`).join('')}
            \${p.tags.length > 3 ? \`<span class="framework-tag">+\${p.tags.length - 3}</span>\` : ''}
          </div>
        </div>
      \`).join('');
    }

    function openModal(id) {
      selectedPrompt = prompts.find(p => p.id === id);
      if (!selectedPrompt) return;

      // Reset variable values for new prompt
      variableValues = {};
      selectedPrompt.variables.forEach(v => {
        variableValues[v.name] = '';
      });

      // Populate header badges (Framework, Phase, Time Saved, Premium badge)
      let badgesHtml = \`
        <span class="modal-badge modal-badge-framework">\${selectedPrompt.framework === 'safe' ? 'SAFe' : selectedPrompt.framework}</span>
        <span class="modal-badge modal-badge-phase">\${selectedPrompt.phase}</span>
        <span class="modal-time-saved">\${selectedPrompt.estimatedTimeSaved} saved</span>
      \`;
      if (selectedPrompt.tier === 'premium') {
        badgesHtml += '<span class="modal-badge modal-badge-premium">PREMIUM</span>';
      }
      document.getElementById('modal-badges').innerHTML = badgesHtml;

      // Populate title and description
      document.getElementById('modal-title').textContent = selectedPrompt.title;
      document.getElementById('modal-desc').textContent = selectedPrompt.description;

      // Populate tags (limit to 8, show +N more)
      const tagsHtml = selectedPrompt.tags.slice(0, 8)
        .map(tag => \`<span class="modal-tag">\${tag}</span>\`).join('');
      const moreTagsHtml = selectedPrompt.tags.length > 8
        ? \`<span class="modal-tag" style="color: rgba(255,255,255,0.4);">+\${selectedPrompt.tags.length - 8} more</span>\`
        : '';
      document.getElementById('modal-tags').innerHTML = tagsHtml + moreTagsHtml;

      // Render variable input fields
      const variablesContainer = document.getElementById('modal-variables');
      if (selectedPrompt.variables.length === 0) {
        variablesContainer.innerHTML = '<p style="color: rgba(255,255,255,0.4); font-size: 0.875rem;">No customizable variables for this prompt.</p>';
      } else {
        variablesContainer.innerHTML = selectedPrompt.variables
          .map(v => \`
            <div class="variable-item">
              <div class="variable-label">
                <span class="variable-name">\${v.name.replace(/_/g, ' ')}</span>
                \${v.required ? '<span class="variable-required">*Required</span>' : ''}
              </div>
              <input
                type="text"
                class="variable-input"
                data-variable="\${v.name}"
                placeholder="\${v.example}"
                oninput="updateVariable('\${v.name}', this.value)"
              />
              <p class="variable-desc">\${v.description}</p>
            </div>
          \`).join('');
      }

      // Update template preview
      updateTemplatePreview();

      document.getElementById('modal').classList.add('active');

      // Reset copy button state
      const copyBtn = document.getElementById('copy-btn');
      copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy Prompt';
      copyBtn.classList.remove('copied');
    }

    function updateVariable(name, value) {
      variableValues[name] = value;
      updateTemplatePreview();
    }

    function updateTemplatePreview() {
      if (!selectedPrompt) return;

      let template = selectedPrompt.template;

      // Replace variables with values or highlight unfilled ones
      template = template.replace(/\\{\\{(\\w+)\\}\\}/g, (match, varName) => {
        const value = variableValues[varName];
        if (value && value.trim()) {
          return \`<span class="filled-variable">\${value}</span>\`;
        } else {
          return \`<span class="unfilled-variable">\${match}</span>\`;
        }
      });

      document.getElementById('modal-template').innerHTML = template;
    }

    function closeModal() {
      document.getElementById('modal').classList.remove('active');
      selectedPrompt = null;
    }

    function copyPrompt() {
      if (!selectedPrompt) return;

      // Get the filled prompt with variable values substituted
      let filledPrompt = selectedPrompt.template;
      filledPrompt = filledPrompt.replace(/\\{\\{(\\w+)\\}\\}/g, (match, varName) => {
        const value = variableValues[varName];
        return (value && value.trim()) ? value : match;
      });

      navigator.clipboard.writeText(filledPrompt).then(() => {
        const btn = document.getElementById('copy-btn');
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy Prompt';
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    // Event listeners
    document.getElementById('search').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPrompts();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPhase = 'all';
        updatePhaseFilters();
        renderPrompts();
      });
    });

    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal') closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Initial render
    renderPrompts();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  saveAs(blob, `PM_Nexus_Library_${new Date().toISOString().split('T')[0]}.html`);
}
