// app.js - Main Application Controller & UI State Handler

document.addEventListener("DOMContentLoaded", () => {
  // Global State
  let currentCountryCode = "US";
  let activeTemplate = "classic";
  
  // Load saved default profile from localStorage if present, otherwise fallback to myDefaultProfile
  let activeProfile = loadSavedDefaultProfile() || JSON.parse(JSON.stringify(myDefaultProfile));
  let analysisResult = null;
  let applicationHistory = [];
  let selectedProof = null;

  // DOM Elements
  const countryGrid = document.getElementById("country-grid");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Photo Upload Elements
  const headshotFileInput = document.getElementById("headshotFileInput");
  const btnBrowsePhoto = document.getElementById("btn-browse-photo");
  const btnRemovePhoto = document.getElementById("btn-remove-photo");
  const headshotImgPreview = document.getElementById("headshot-img-preview");
  const photoPlaceholderIcon = document.getElementById("photo-placeholder-icon");
  const photoUrlInput = document.getElementById("photoUrl");

  // Save Default Profile Buttons
  const btnSaveAsDefault = document.getElementById("btn-save-as-default");
  const btnSaveDefaultProfileTab = document.getElementById("btn-save-default-profile-tab");
  const btnLoadMyDefault = document.getElementById("btn-load-my-default");

  // Modal Elements
  const importModal = document.getElementById("import-modal");
  const btnOpenImport = document.getElementById("btn-open-import");
  const btnOpenImportTab = document.getElementById("btn-open-import-tab");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnCancelImport = document.getElementById("btn-cancel-import");
  const btnExecuteImport = document.getElementById("btn-execute-import");
  const cvFileInput = document.getElementById("cv-file-input");
  const btnBrowseFile = document.getElementById("btn-browse-file");
  const cvDropzone = document.getElementById("cv-dropzone");
  const rawCvText = document.getElementById("raw-cv-text");
  const toast = document.getElementById("toast");

  // Guided Wizard Elements
  const wizardModal = document.getElementById("wizard-modal");
  const btnOpenWizard = document.getElementById("btn-open-wizard");
  const btnCloseWizard = document.getElementById("btn-close-wizard");
  const wizardStep1 = document.getElementById("wizard-step-1");
  const wizardStep2 = document.getElementById("wizard-step-2");
  const btnWizardNext1 = document.getElementById("btn-wizard-next-1");
  const btnWizardBack2 = document.getElementById("btn-wizard-back-2");
  const btnWizardLaunch = document.getElementById("btn-wizard-launch");
  const wizardCvFileInput = document.getElementById("wizard-file-input");
  const btnWizardBrowse = document.getElementById("btn-wizard-browse");

  // Proof Modal Elements
  const proofModal = document.getElementById("proof-modal");
  const proofModalContent = document.getElementById("proof-modal-content");
  const btnCloseProof = document.getElementById("btn-close-proof");
  const btnCloseProofFooter = document.getElementById("btn-close-proof-footer");
  const btnDownloadProofJson = document.getElementById("btn-download-proof-json");

  // Agent Elements
  const btnLaunchAgent = document.getElementById("btn-launch-agent");
  const agentProgressBar = document.getElementById("agent-progress-bar");
  const agentStatusTag = document.getElementById("agent-status-tag");
  const agentTerminalLogs = document.getElementById("agent-terminal-logs");
  const agentHistoryList = document.getElementById("agent-history-list");

  // Initialize
  initCountryGrid();
  loadProfileToForm(activeProfile);
  runAnalysis();

  // 1. Photo File Upload Handling
  if (btnBrowsePhoto && headshotFileInput) {
    btnBrowsePhoto.addEventListener("click", () => headshotFileInput.click());
    headshotFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const base64Photo = evt.target.result;
          setPhotoPreview(base64Photo);
          showToast("📷 Headshot photo loaded!");
          readFormDataIntoProfile();
          runAnalysis();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener("click", () => {
      setPhotoPreview("");
      showToast("Photo removed.");
      readFormDataIntoProfile();
      runAnalysis();
    });
  }

  function setPhotoPreview(url) {
    if (photoUrlInput) photoUrlInput.value = url || "";
    if (url) {
      if (headshotImgPreview) {
        headshotImgPreview.src = url;
        headshotImgPreview.style.display = "block";
      }
      if (photoPlaceholderIcon) photoPlaceholderIcon.style.display = "none";
      if (btnRemovePhoto) btnRemovePhoto.style.display = "inline-flex";
    } else {
      if (headshotImgPreview) {
        headshotImgPreview.src = "";
        headshotImgPreview.style.display = "none";
      }
      if (photoPlaceholderIcon) photoPlaceholderIcon.style.display = "block";
      if (btnRemovePhoto) btnRemovePhoto.style.display = "none";
    }
  }

  // 2. Save / Load Default Profile Logic
  function loadSavedDefaultProfile() {
    try {
      const saved = localStorage.getItem("my_custom_default_cv");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function saveCurrentAsDefaultProfile() {
    readFormDataIntoProfile();
    try {
      localStorage.setItem("my_custom_default_cv", JSON.stringify(activeProfile));
      showToast("👤 Saved as Amine Janah's Default Profile!");
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
  }

  if (btnSaveAsDefault) btnSaveAsDefault.addEventListener("click", saveCurrentAsDefaultProfile);
  if (btnSaveDefaultProfileTab) btnSaveDefaultProfileTab.addEventListener("click", saveCurrentAsDefaultProfile);

  if (btnLoadMyDefault) {
    btnLoadMyDefault.addEventListener("click", () => {
      const saved = loadSavedDefaultProfile() || JSON.parse(JSON.stringify(myDefaultProfile));
      activeProfile = saved;
      loadProfileToForm(activeProfile);
      runAnalysis();
      showToast("Loaded Amine Janah's Saved Profile!");
    });
  }

  // 3. Initialize Country Selector Grid
  function initCountryGrid() {
    countryGrid.innerHTML = "";
    Object.keys(countryData).forEach(code => {
      const country = countryData[code];
      const card = document.createElement("div");
      card.className = `country-card ${code === currentCountryCode ? 'selected' : ''}`;
      card.dataset.code = code;

      const photoBadgeClass = country.photoAllowed ? "badge-photo-yes" : "badge-photo-no";
      const photoBadgeText = country.photoAllowed ? "Photo Allowed / Expected" : "No Photo Policy";

      card.innerHTML = `
        <div class="country-card-header">
          <span class="country-flag">${country.flag}</span>
          <span class="country-name">${country.name}</span>
        </div>
        <div class="country-meta">
          <span>Format: <strong>${country.paperFormat}</strong> (${country.lengthLimit.split(',')[0]})</span>
          <span>Spelling: <strong>${country.spelling.split(' ')[0]}</strong></span>
        </div>
        <span class="country-badge ${photoBadgeClass}">${photoBadgeText}</span>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".country-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        currentCountryCode = code;
        runAnalysis();
      });

      countryGrid.appendChild(card);
    });
  }

  // 4. Tab Navigation
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(targetTab).classList.add("active");

      if (targetTab === "tab-analysis" || targetTab === "tab-resume" || targetTab === "tab-letter" || targetTab === "tab-agent") {
        readFormDataIntoProfile();
        runAnalysis();
      }
    });
  });

  function switchTab(tabId) {
    const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (btn) btn.click();
  }

  document.getElementById("btn-goto-profile")?.addEventListener("click", () => switchTab("tab-profile"));
  document.getElementById("btn-goto-resume")?.addEventListener("click", () => switchTab("tab-resume"));
  document.getElementById("btn-goto-letter")?.addEventListener("click", () => switchTab("tab-letter"));

  document.getElementById("btn-run-ai")?.addEventListener("click", () => {
    readFormDataIntoProfile();
    runAnalysis();
    switchTab("tab-analysis");
  });

  // 5. Guided Quick Apply Wizard
  if (btnOpenWizard) {
    btnOpenWizard.addEventListener("click", () => {
      if (wizardModal) wizardModal.style.display = "flex";
      if (wizardStep1) wizardStep1.style.display = "block";
      if (wizardStep2) wizardStep2.style.display = "none";
    });
  }

  if (btnCloseWizard) {
    btnCloseWizard.addEventListener("click", () => {
      if (wizardModal) wizardModal.style.display = "none";
    });
  }

  if (btnWizardBrowse && wizardCvFileInput) {
    btnWizardBrowse.addEventListener("click", () => wizardCvFileInput.click());
    wizardCvFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          document.getElementById("wizard-cv-text").value = evt.target.result;
          showToast(`File "${file.name}" loaded into Wizard.`);
        };
        reader.readAsText(file);
      }
    });
  }

  if (btnWizardNext1) {
    btnWizardNext1.addEventListener("click", () => {
      const text = document.getElementById("wizard-cv-text")?.value || "";
      if (text.trim()) {
        const parsed = CVParser.parseRawText(text);
        if (parsed) {
          activeProfile = { ...activeProfile, ...parsed };
          loadProfileToForm(activeProfile);
          saveCurrentAsDefaultProfile();
        }
      }
      wizardStep1.style.display = "none";
      wizardStep2.style.display = "block";
    });
  }

  if (btnWizardBack2) {
    btnWizardBack2.addEventListener("click", () => {
      wizardStep2.style.display = "none";
      wizardStep1.style.display = "block";
    });
  }

  if (btnWizardLaunch) {
    btnWizardLaunch.addEventListener("click", () => {
      const country = document.getElementById("wizardCountry")?.value || "US";
      const title = document.getElementById("wizardTitle")?.value || "Target Position";
      const company = document.getElementById("wizardCompany")?.value || "Target Company";
      const portal = document.getElementById("wizardPortal")?.value || "LinkedIn Easy Apply";

      currentCountryCode = country;
      activeProfile.targetJobTitle = title;
      activeProfile.targetCompany = company;

      document.querySelectorAll(".country-card").forEach(c => {
        c.classList.toggle("selected", c.dataset.code === country);
      });

      loadProfileToForm(activeProfile);
      runAnalysis();

      if (wizardModal) wizardModal.style.display = "none";
      switchTab("tab-agent");

      triggerAgentSubmission(portal, "copilot");
    });
  }

  // 6. Import Modal Logic
  const openModal = () => { if (importModal) importModal.style.display = "flex"; };
  const closeModal = () => { if (importModal) importModal.style.display = "none"; };

  if (btnOpenImport) btnOpenImport.addEventListener("click", openModal);
  if (btnOpenImportTab) btnOpenImportTab.addEventListener("click", openModal);
  if (btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
  if (btnCancelImport) btnCancelImport.addEventListener("click", closeModal);

  if (btnBrowseFile && cvFileInput) {
    btnBrowseFile.addEventListener("click", () => cvFileInput.click());
    cvFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) readFileContent(file);
    });
  }

  if (cvDropzone) {
    ["dragenter", "dragover"].forEach(evt => {
      cvDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        cvDropzone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach(evt => {
      cvDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        cvDropzone.classList.remove("dragover");
      });
    });
    cvDropzone.addEventListener("drop", (e) => {
      const file = e.dataTransfer.files[0];
      if (file) readFileContent(file);
    });
  }

  function readFileContent(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      if (rawCvText) rawCvText.value = text;
      showToast(`File "${file.name}" loaded into text area.`);
    };
    reader.readAsText(file);
  }

  if (btnExecuteImport) {
    btnExecuteImport.addEventListener("click", () => {
      const textToParse = rawCvText?.value || "";
      if (!textToParse.trim()) {
        alert("Please paste your CV text or select a file to import!");
        return;
      }

      const parsed = CVParser.parseRawText(textToParse);
      if (parsed) {
        activeProfile = { ...activeProfile, ...parsed };
        loadProfileToForm(activeProfile);
        saveCurrentAsDefaultProfile();
        closeModal();
        switchTab("tab-profile");
        runAnalysis();
        showToast("✨ CV Imported & Set As Your Default Profile!");
      }
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3500);
  }

  // 7. AI Auto-Apply Agent Execution
  if (btnLaunchAgent) {
    btnLaunchAgent.addEventListener("click", () => {
      readFormDataIntoProfile();
      const platform = document.getElementById("agentPlatform")?.value || "LinkedIn Easy Apply";
      const mode = document.getElementById("agentMode")?.value || "copilot";
      triggerAgentSubmission(platform, mode);
    });
  }

  async function triggerAgentSubmission(platform, mode) {
    const noticePeriod = document.getElementById("presetNotice")?.value || "";
    const visaStatus = document.getElementById("presetVisa")?.value || "";

    if (agentStatusTag) {
      agentStatusTag.textContent = "RUNNING";
      agentStatusTag.style.background = "rgba(16, 185, 129, 0.2)";
      agentStatusTag.style.color = "#6ee7b7";
    }

    if (btnLaunchAgent) btnLaunchAgent.disabled = true;
    if (agentTerminalLogs) agentTerminalLogs.innerHTML = "";

    const res = await AIAgentEngine.submitApplication({
      platform,
      targetCompany: activeProfile.targetCompany || "Target Company",
      targetJobTitle: activeProfile.targetJobTitle || activeProfile.title || "Target Role",
      country: countryData[currentCountryCode]?.name || "United States",
      candidate: activeProfile.personalInfo,
      mode,
      customAnswers: { noticePeriod, visaStatus }
    }, (step) => {
      if (agentProgressBar) agentProgressBar.style.width = `${step.percent}%`;
      if (agentTerminalLogs) {
        const logDiv = document.createElement("div");
        logDiv.style.color = step.percent === 100 ? "#6ee7b7" : "#38bdf8";
        logDiv.textContent = step.log;
        agentTerminalLogs.appendChild(logDiv);
        agentTerminalLogs.scrollTop = agentTerminalLogs.scrollHeight;
      }
    });

    if (btnLaunchAgent) btnLaunchAgent.disabled = false;
    if (agentStatusTag) {
      agentStatusTag.textContent = "SUBMITTED";
    }

    applicationHistory.unshift(res);
    renderApplicationHistory();
    showToast("🚀 Application Delivered & Proof Certificate Generated!");
  }

  function renderApplicationHistory() {
    if (!agentHistoryList) return;
    if (applicationHistory.length === 0) {
      agentHistoryList.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">No active submissions yet. Launch the agent to view real-time history.</div>`;
      return;
    }

    agentHistoryList.innerHTML = applicationHistory.map((app, idx) => `
      <div class="app-history-card">
        <div>
          <strong style="font-size: 0.95rem; display: block; color: var(--text-main);">${app.title} @ ${app.company}</strong>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${app.platform} • ${app.country} • ${app.timestamp}</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <button class="btn-secondary-sm btn-view-proof" data-idx="${idx}" style="font-size:0.75rem; padding:0.3rem 0.6rem;">
            🔍 View Proof Receipt
          </button>
          <span class="ref-badge">${app.refId}</span>
        </div>
      </div>
    `).join('');

    document.querySelectorAll(".btn-view-proof").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.idx;
        if (applicationHistory[idx]) {
          openProofModal(applicationHistory[idx]);
        }
      });
    });
  }

  // 8. Proof Receipt Modal
  function openProofModal(app) {
    selectedProof = app;
    if (!proofModal || !proofModalContent) return;

    proofModalContent.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: #6ee7b7; font-size: 1.05rem;">VERIFIED DELIVERED</span>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">${app.networkStatus}</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">
          Application Ref: <strong>${app.refId}</strong> | Timestamp: ${app.timestamp}
        </div>
      </div>

      <div class="card-panel" style="background: rgba(15, 23, 42, 0.4); padding: 1rem; margin-bottom: 1rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--cyan-accent); margin-bottom: 0.5rem;">Network Audit Headers & Hash</h4>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #94a3b8; display: flex; flex-direction: column; gap: 0.3rem;">
          <div>SHA-256 Checksum: <span style="color: #cbd5e1;">${app.verificationHash}</span></div>
          <div>Endpoint URL: <span style="color: #cbd5e1;">${app.proofDetails.portalEndpoint}</span></div>
          <div>Session Token: <span style="color: #cbd5e1;">${app.proofDetails.sessionToken}</span></div>
        </div>
      </div>

      <div class="card-panel" style="background: rgba(15, 23, 42, 0.4); padding: 1rem; margin-bottom: 1rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--primary-accent); margin-bottom: 0.5rem;">Delivered Document Payloads</h4>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: #cbd5e1;">
          ${app.proofDetails.attachedDocs.map(doc => `<li>${doc}</li>`).join('')}
        </ul>
      </div>

      <div class="card-panel" style="background: rgba(15, 23, 42, 0.4); padding: 1rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--success-color); margin-bottom: 0.5rem;">Submitted Candidate Payload</h4>
        <div style="font-size: 0.83rem; color: #94a3b8; display: flex; flex-direction: column; gap: 0.25rem;">
          ${app.proofDetails.submittedFields.map(field => `<div>• ${field}</div>`).join('')}
        </div>
      </div>
    `;

    proofModal.style.display = "flex";
  }

  const closeProofModal = () => { if (proofModal) proofModal.style.display = "none"; };
  if (btnCloseProof) btnCloseProof.addEventListener("click", closeProofModal);
  if (btnCloseProofFooter) btnCloseProofFooter.addEventListener("click", closeProofModal);

  if (btnDownloadProofJson) {
    btnDownloadProofJson.addEventListener("click", () => {
      if (!selectedProof) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedProof, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `Proof_Receipt_${selectedProof.refId}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Downloaded Audit Receipt JSON!");
    });
  }

  // 9. Sample Profiles
  document.getElementById("btn-load-sample-dev")?.addEventListener("click", () => {
    activeProfile = JSON.parse(JSON.stringify(sampleProfiles.software_engineer));
    loadProfileToForm(activeProfile);
    runAnalysis();
    showToast("Loaded Software Engineer Sample!");
  });

  document.getElementById("btn-load-sample-mkt")?.addEventListener("click", () => {
    activeProfile = JSON.parse(JSON.stringify(sampleProfiles.marketing_manager));
    loadProfileToForm(activeProfile);
    runAnalysis();
    showToast("Loaded Marketing Manager Sample!");
  });

  // 10. Fill Form Fields
  function loadProfileToForm(profile) {
    document.getElementById("targetJobTitle").value = profile.targetJobTitle || "";
    document.getElementById("targetCompany").value = profile.targetCompany || "";
    document.getElementById("jobDescription").value = profile.jobDescription || "";

    document.getElementById("fullName").value = profile.personalInfo?.fullName || "";
    document.getElementById("email").value = profile.personalInfo?.email || "";
    document.getElementById("phone").value = profile.personalInfo?.phone || "";
    document.getElementById("location").value = profile.personalInfo?.location || "";
    document.getElementById("linkedin").value = profile.personalInfo?.linkedin || "";
    
    setPhotoPreview(profile.personalInfo?.photoUrl || "");

    document.getElementById("summary").value = profile.summary || "";
    document.getElementById("skills").value = (profile.skills || []).join(", ");
    document.getElementById("languages").value = (profile.languages || []).join(", ");

    renderExperienceInputs(profile.experience || []);
    renderEducationInputs(profile.education || []);
  }

  function readFormDataIntoProfile() {
    activeProfile.targetJobTitle = document.getElementById("targetJobTitle").value;
    activeProfile.targetCompany = document.getElementById("targetCompany").value;
    activeProfile.jobDescription = document.getElementById("jobDescription").value;

    activeProfile.personalInfo = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      linkedin: document.getElementById("linkedin").value,
      photoUrl: document.getElementById("photoUrl").value
    };

    activeProfile.summary = document.getElementById("summary").value;

    const skillsRaw = document.getElementById("skills").value;
    activeProfile.skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

    const langRaw = document.getElementById("languages").value;
    activeProfile.languages = langRaw ? langRaw.split(",").map(l => l.trim()).filter(Boolean) : [];

    // Experience
    activeProfile.experience = [];
    document.querySelectorAll(".exp-entry-item").forEach(item => {
      const title = item.querySelector(".exp-title")?.value;
      const company = item.querySelector(".exp-company")?.value;
      const period = item.querySelector(".exp-period")?.value;
      const bulletsRaw = item.querySelector(".exp-bullets")?.value;
      if (title || company) {
        activeProfile.experience.push({
          title, company, period,
          details: bulletsRaw ? bulletsRaw.split("\n").filter(Boolean) : []
        });
      }
    });

    // Education
    activeProfile.education = [];
    document.querySelectorAll(".edu-entry-item").forEach(item => {
      const degree = item.querySelector(".edu-degree")?.value;
      const institution = item.querySelector(".edu-institution")?.value;
      const period = item.querySelector(".edu-period")?.value;
      if (degree || institution) {
        activeProfile.education.push({ degree, institution, period });
      }
    });
  }

  // Render Experience Inputs
  function renderExperienceInputs(expList) {
    const container = document.getElementById("experience-container");
    container.innerHTML = "";
    expList.forEach((exp, idx) => {
      const div = document.createElement("div");
      div.className = "exp-entry-item card-panel";
      div.style.background = "rgba(15, 23, 42, 0.4)";
      div.style.padding = "1.2rem";
      div.style.marginBottom = "1rem";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
          <strong style="font-size:0.95rem;">Position #${idx + 1}</strong>
          <button type="button" class="btn-secondary-sm btn-remove-exp" style="color:var(--danger-color); border-color:rgba(239, 68, 68, 0.3);"><i data-lucide="trash-2"></i> Remove</button>
        </div>
        <div class="form-grid">
          <div class="form-group"><label>Job Title</label><input type="text" class="exp-title" value="${exp.title || ''}"></div>
          <div class="form-group"><label>Company / Location</label><input type="text" class="exp-company" value="${exp.company || ''}"></div>
          <div class="form-group"><label>Period (e.g. 01/2021 – Present)</label><input type="text" class="exp-period" value="${exp.period || ''}"></div>
          <div class="form-group full-width"><label>Bullet Achievements (One per line)</label><textarea class="exp-bullets">${(exp.details || []).join('\n')}</textarea></div>
        </div>
      `;
      div.querySelector(".btn-remove-exp").addEventListener("click", () => div.remove());
      container.appendChild(div);
    });
    if (window.lucide) lucide.createIcons();
  }

  document.getElementById("btn-add-experience")?.addEventListener("click", () => {
    const container = document.getElementById("experience-container");
    const count = container.children.length;
    const div = document.createElement("div");
    div.className = "exp-entry-item card-panel";
    div.style.background = "rgba(15, 23, 42, 0.4)";
    div.style.padding = "1.2rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <strong style="font-size:0.95rem;">Position #${count + 1}</strong>
        <button type="button" class="btn-secondary-sm btn-remove-exp" style="color:var(--danger-color); border-color:rgba(239, 68, 68, 0.3);"><i data-lucide="trash-2"></i> Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group"><label>Job Title</label><input type="text" class="exp-title"></div>
        <div class="form-group"><label>Company / Location</label><input type="text" class="exp-company"></div>
        <div class="form-group"><label>Period</label><input type="text" class="exp-period" placeholder="01/2022 – Present"></div>
        <div class="form-group full-width"><label>Bullet Achievements (One per line)</label><textarea class="exp-bullets"></textarea></div>
      </div>
    `;
    div.querySelector(".btn-remove-exp").addEventListener("click", () => div.remove());
    container.appendChild(div);
    if (window.lucide) lucide.createIcons();
  });

  // Render Education Inputs
  function renderEducationInputs(eduList) {
    const container = document.getElementById("education-container");
    container.innerHTML = "";
    eduList.forEach((edu, idx) => {
      const div = document.createElement("div");
      div.className = "edu-entry-item card-panel";
      div.style.background = "rgba(15, 23, 42, 0.4)";
      div.style.padding = "1.2rem";
      div.style.marginBottom = "1rem";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
          <strong style="font-size:0.95rem;">Education #${idx + 1}</strong>
          <button type="button" class="btn-secondary-sm btn-remove-edu" style="color:var(--danger-color); border-color:rgba(239, 68, 68, 0.3);"><i data-lucide="trash-2"></i> Remove</button>
        </div>
        <div class="form-grid">
          <div class="form-group"><label>Degree / Qualification</label><input type="text" class="edu-degree" value="${edu.degree || ''}"></div>
          <div class="form-group"><label>University / School</label><input type="text" class="edu-institution" value="${edu.institution || ''}"></div>
          <div class="form-group"><label>Dates</label><input type="text" class="edu-period" value="${edu.period || ''}"></div>
        </div>
      `;
      div.querySelector(".btn-remove-edu").addEventListener("click", () => div.remove());
      container.appendChild(div);
    });
    if (window.lucide) lucide.createIcons();
  }

  document.getElementById("btn-add-education")?.addEventListener("click", () => {
    const container = document.getElementById("education-container");
    const count = container.children.length;
    const div = document.createElement("div");
    div.className = "edu-entry-item card-panel";
    div.style.background = "rgba(15, 23, 42, 0.4)";
    div.style.padding = "1.2rem";
    div.style.marginBottom = "1rem";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
        <strong style="font-size:0.95rem;">Education #${count + 1}</strong>
        <button type="button" class="btn-secondary-sm btn-remove-edu" style="color:var(--danger-color); border-color:rgba(239, 68, 68, 0.3);"><i data-lucide="trash-2"></i> Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group"><label>Degree / Qualification</label><input type="text" class="edu-degree"></div>
        <div class="form-group"><label>University / School</label><input type="text" class="edu-institution"></div>
        <div class="form-group"><label>Dates</label><input type="text" class="edu-period"></div>
      </div>
    `;
    div.querySelector(".btn-remove-edu").addEventListener("click", () => div.remove());
    container.appendChild(div);
    if (window.lucide) lucide.createIcons();
  });

  // 11. Run AI Analysis & Render Results
  function runAnalysis() {
    analysisResult = AIEngine.analyzeAndAdapt(activeProfile, currentCountryCode);

    const scoreVal = document.getElementById("score-val");
    const scoreGauge = document.getElementById("score-gauge");
    const badgeScore = document.getElementById("badge-score");
    if (scoreVal) scoreVal.textContent = `${analysisResult.score}%`;
    if (scoreGauge) scoreGauge.style.setProperty("--score-pct", analysisResult.score);
    if (badgeScore) badgeScore.textContent = `${analysisResult.score}%`;

    const countryNameEl = document.getElementById("analysis-country-name");
    if (countryNameEl) {
      countryNameEl.textContent = `Analyzing compliance for ${analysisResult.country.flag} ${analysisResult.country.name}`;
    }

    const breakdownContainer = document.getElementById("score-breakdown-list");
    if (breakdownContainer) {
      breakdownContainer.innerHTML = (analysisResult.scoreBreakdown || []).map(item => `
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${item.item}</span>
          <strong style="color: ${item.status === 'pass' ? 'var(--success-color)' : item.status === 'warning' ? 'var(--warning-color)' : 'var(--danger-color)'};">${item.points}</strong>
        </div>
      `).join('');
    }

    const adviceContainer = document.getElementById("advice-list-container");
    if (adviceContainer) {
      adviceContainer.innerHTML = (analysisResult.adviceList || []).map(adv => `
        <div class="advice-card ${adv.type}">
          <div class="advice-card-header">
            <div class="advice-title">${adv.title}</div>
            <div class="advice-category">${adv.category}</div>
          </div>
          <div class="advice-desc">${adv.description}</div>
        </div>
      `).join('');
    }

    renderResumePaper(analysisResult.adaptedCV, analysisResult.country);
    renderMotivationLetterPaper(analysisResult.motivationLetter, analysisResult.country);
  }

  function renderResumePaper(cv, country) {
    const paper = document.getElementById("resume-paper-content");
    if (!paper) return;

    const showPhoto = country.photoAllowed && cv.personalInfo?.photoUrl;
    const photoHtml = showPhoto ? `<img src="${cv.personalInfo.photoUrl}" class="doc-headshot" alt="Headshot">` : "";

    const expHtml = (cv.experience || []).map(exp => `
      <div class="doc-item">
        <div class="doc-item-header">
          <span>${exp.title || ''}</span>
          <span>${exp.period || ''}</span>
        </div>
        <div class="doc-item-sub">
          <span>${exp.company || ''}</span>
        </div>
        <ul class="doc-bullets">
          ${(exp.details || []).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    const eduHtml = (cv.education || []).map(edu => `
      <div class="doc-item">
        <div class="doc-item-header">
          <span>${edu.degree || ''}</span>
          <span>${edu.period || ''}</span>
        </div>
        <div class="doc-item-sub">
          <span>${edu.institution || ''}</span>
        </div>
      </div>
    `).join('');

    const skillsHtml = (cv.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');

    paper.innerHTML = `
      <header class="doc-header">
        <div>
          <h1 class="doc-name">${cv.personalInfo?.fullName || 'Your Name'}</h1>
          <div class="doc-title">${cv.targetJobTitle || cv.title || 'Professional Title'}</div>
        </div>
        <div style="display:flex; align-items:flex-start;">
          <div class="doc-contact">
            <div>${cv.personalInfo?.email || ''}</div>
            <div>${cv.personalInfo?.phone || ''}</div>
            <div>${cv.personalInfo?.location || ''}</div>
            <div>${cv.personalInfo?.linkedin || ''}</div>
          </div>
          ${photoHtml}
        </div>
      </header>

      ${cv.summary ? `
        <section class="doc-section">
          <h2 class="doc-section-title">${country.code === 'UK' ? 'Personal Profile' : 'Professional Summary'}</h2>
          <p style="font-size:9.5pt; color:#334155; line-height:1.5;">${cv.summary}</p>
        </section>
      ` : ''}

      <section class="doc-section">
        <h2 class="doc-section-title">Professional Experience</h2>
        ${expHtml}
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Education</h2>
        ${eduHtml}
      </section>

      <section class="doc-section">
        <h2 class="doc-section-title">Key Competencies & Skills</h2>
        <div class="skills-tags">${skillsHtml}</div>
      </section>

      ${(cv.languages && cv.languages.length > 0) ? `
        <section class="doc-section" style="margin-top:12px;">
          <h2 class="doc-section-title">Languages</h2>
          <p style="font-size:9.5pt; color:#334155;">${cv.languages.join(' • ')}</p>
        </section>
      ` : ''}
    `;

    const summarySide = document.getElementById("resume-country-summary");
    if (summarySide) {
      summarySide.innerHTML = `
        <div><strong>Selected Target:</strong> ${country.flag} ${country.name}</div>
        <div><strong>Standard Format:</strong> ${country.paperFormat} (${country.lengthLimit.split(',')[0]})</div>
        <div><strong>Photo Policy:</strong> ${country.photoAllowed ? 'Allowed / Expected' : 'Strictly Avoided'}</div>
        <div><strong>Spelling Standard:</strong> ${country.spelling}</div>
      `;
    }
  }

  function renderMotivationLetterPaper(letter, country) {
    const paper = document.getElementById("letter-paper-content");
    if (!paper) return;

    const paragraphsHtml = letter.paragraphs.map(p => `<p style="margin-bottom:14px; line-height:1.6; font-size:10pt;">${p}</p>`).join('');

    paper.innerHTML = `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between;">
        <div>
          <h2 style="font-family:var(--font-heading); font-size:18pt; font-weight:800; color:#0f172a; margin:0;">${letter.header.candidateName}</h2>
          <div style="font-size:9.5pt; color:#475569;">${letter.header.location} | ${letter.header.email} | ${letter.header.phone}</div>
        </div>
        <div style="text-align:right; font-size:9.5pt; color:#475569;">
          <div>${letter.header.date}</div>
          <div style="font-weight:600; color:#0f172a; margin-top:4px;">Target: ${letter.header.targetCompany}</div>
        </div>
      </div>

      <div style="font-size:10pt; font-weight:600; margin-bottom:20px; color:#0f172a;">
        ${letter.salutation}
      </div>

      <div style="color:#1e293b; text-align:justify;">
        ${paragraphsHtml}
      </div>

      <div style="margin-top:30px; font-size:10pt; color:#0f172a;">
        <div style="margin-bottom:30px;">${letter.closing}</div>
        <div style="font-weight:700; font-family:var(--font-heading); font-size:11pt;">${letter.signatureName}</div>
      </div>
    `;

    const toneDesc = document.getElementById("letter-tone-desc");
    if (toneDesc) {
      toneDesc.textContent = `Structure: ${country.coverLetterFormat}`;
    }
  }

  // Template Picker Handling
  document.querySelectorAll(".template-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".template-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      activeTemplate = opt.dataset.template;
      const paper = document.getElementById("resume-paper-content");
      if (paper) {
        paper.className = `resume-paper template-${activeTemplate}`;
      }
    });
  });

  // Print Handlers
  document.getElementById("btn-print")?.addEventListener("click", () => window.print());
  document.getElementById("btn-print-resume-studio")?.addEventListener("click", () => window.print());
  document.getElementById("btn-print-letter-studio")?.addEventListener("click", () => window.print());
  document.getElementById("btn-re-draft-letter")?.addEventListener("click", () => {
    readFormDataIntoProfile();
    runAnalysis();
  });
});
