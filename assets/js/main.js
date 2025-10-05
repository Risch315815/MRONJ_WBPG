// Main JavaScript for MRONJ Risk Assessment Tool

// Store patient data in this object
let patientData = {
  // Personal Information
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  
  // Medical History
  hasCancer: false,
  hasRadiotherapy: false,
  systemicDiseases: [],
  
  // Medication Information
  hasAntiresorptiveMed: false,
  drugName: '',
  administrationRoute: '',
  indication: '',
  startYear: '',
  startMonth: '',
  frequency: '',
  isStopped: false,
  stopYear: '',
  stopMonth: '',
  medications: []
};

// Function to clear all stored patient data
function clearAllPatientData() {
  // Clear localStorage
  localStorage.removeItem('patientData');
  localStorage.removeItem('patientMedicationData');
  
  // Clear sessionStorage
  sessionStorage.removeItem('patientMedicationData');
  
  // Reset patientData object
  patientData = {
    // Personal Information
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    // Medical History
    hasCancer: false,
    hasRadiotherapy: false,
    systemicDiseases: [],
    hasAntiresorptiveMed: false,
    // Medication Information
    drugName: '',
    administrationRoute: '',
    indication: '',
    startYear: '',
    startMonth: '',
    frequency: '',
    isStopped: false,
    stopYear: '',
    stopMonth: '',
    medications: []
  };
  
  console.log('All patient data has been cleared');
  
  // Reload the page to reflect the changes
  window.location.reload();
}

// Initialize the application when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if there's stored patient data in localStorage
  if (localStorage.getItem('patientData')) {
    try {
      const storedPatientInfo = JSON.parse(localStorage.getItem('patientData'));
      console.log('Found stored patient info:', storedPatientInfo);
      
      // Copy all patient info fields
      Object.assign(patientData, storedPatientInfo);
      console.log('Loaded patient info from localStorage');
    } catch (e) {
      console.error('Error loading stored patient info:', e);
    }
  }
  
  // Check if there's stored medication data in localStorage
  if (localStorage.getItem('patientMedicationData')) {
    try {
      const storedMedData = JSON.parse(localStorage.getItem('patientMedicationData'));
      console.log('Found stored patient medication data:', storedMedData);
      
      // If medications exist in stored data, use them
      if (storedMedData.medications && storedMedData.medications.length > 0) {
        patientData.medications = storedMedData.medications;
        console.log('Loaded medications from localStorage');
      }
    } catch (e) {
      console.error('Error loading stored medication data:', e);
    }
  }
  
  // Add clear data button if it doesn't exist and we're not on excluded pages
  if (!document.getElementById('clear-data-btn') && 
      !window.location.pathname.includes('risk-assessment') &&
      !window.location.pathname.includes('oral-hygiene-instruction') &&
      !window.location.pathname.includes('consent') &&
      !window.location.pathname.endsWith('/MRONJ_WBPG/') &&
      !window.location.pathname.endsWith('/MRONJ_WBPG')) {
    const clearButton = document.createElement('button');
    clearButton.id = 'clear-data-btn';
    clearButton.className = 'btn btn-danger';
    clearButton.style.position = 'fixed';
    clearButton.style.bottom = '20px';
    clearButton.style.right = '20px';
    clearButton.style.zIndex = '1000';
    clearButton.onclick = clearAllPatientData;
    
    // Add text in both languages
    const zhText = document.createElement('span');
    zhText.className = 'zh-text';
    zhText.textContent = '清除所有資料';
    
    const enText = document.createElement('span');
    enText.className = 'en-text';
    enText.textContent = 'Clear All Data';
    enText.style.display = 'none';
    
    clearButton.appendChild(zhText);
    clearButton.appendChild(enText);
    
    document.body.appendChild(clearButton);
  }

  // Initialize any components that need setup
  initFormNavigation();
  
  // Any other initialization code
  console.log('MRONJ Risk Assessment Tool initialized');
});

// Form navigation (for multi-step forms)
function initFormNavigation() {
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  
  if (nextButtons) {
    nextButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const nextStep = document.getElementById(this.dataset.next);
        
        if (validateStep(currentStep)) {
          currentStep.classList.remove('active');
          nextStep.classList.add('active');
          window.scrollTo(0, 0);
        }
      });
    });
  }
  
  if (prevButtons) {
    prevButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentStep = this.closest('.form-step');
        const prevStep = document.getElementById(this.dataset.prev);
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        window.scrollTo(0, 0);
      });
    });
  }
}

// Validate form step
function validateStep(step) {
  // Get all required inputs in the current step
  const requiredInputs = step.querySelectorAll('[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('invalid');
      
      // Add error message if not exists
      let errorSpan = input.nextElementSibling;
      if (!errorSpan || !errorSpan.classList.contains('error-message')) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '14px';
        errorSpan.textContent = '此欄位必填';
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
      }
    } else {
      input.classList.remove('invalid');
      
      // Remove error message if exists
      let errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.remove();
      }
    }
  });
  
  return isValid;
}

// Save form data
function saveFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const formData = new FormData(form);
  
  // Update patientData object
  for (const [key, value] of formData.entries()) {
    if (key === 'systemicDiseases') {
      // For checkboxes that can have multiple values
      if (!patientData[key].includes(value)) {
        patientData[key].push(value);
      }
    } else {
      patientData[key] = value;
    }
  }
  
  // Handle radio buttons and checkboxes special cases
  const hasAntiresorptiveMed = form.querySelector('input[name="hasAntiresorptiveMed"]:checked');
  if (hasAntiresorptiveMed) {
    patientData.hasAntiresorptiveMed = hasAntiresorptiveMed.value === 'yes';
  }
  
  const isStopped = form.querySelector('input[name="isStopped"]:checked');
  if (isStopped) {
    patientData.isStopped = isStopped.value === 'yes';
  }
  
  const hasCancer = form.querySelector('input[name="hasCancer"]:checked');
  if (hasCancer) {
    patientData.hasCancer = hasCancer.value === 'yes';
  }
  
  const hasRadiotherapy = form.querySelector('input[name="hasRadiotherapy"]:checked');
  if (hasRadiotherapy) {
    patientData.hasRadiotherapy = hasRadiotherapy.value === 'yes';
  }
  
  console.log('Form data saved:', patientData);
}

// Calculate MRONJ risk using enhanced algorithm
function assessRisk() {
  // Define dental procedures to assess
  const procedures = [
    { name: '非侵入性治療', invasive: false }, // Non-invasive (cleaning, filling)
    { name: '根管治療', invasive: true },     // Root canal treatment
    { name: '拔牙', invasive: true },         // Extraction
    { name: '牙周手術', invasive: true },     // Periodontal surgery
    { name: '植牙', invasive: true }          // Implant
  ];
  
  const assessments = [];
  
  // Initialize risk calculator if available
  let riskCalculator = null;
  if (typeof MRONJRiskCalculator !== 'undefined') {
    riskCalculator = new MRONJRiskCalculator();
  }
  
  // Calculate medication duration in months
  const medicationDuration = calculateMedicationDuration();
  
  // Check for high risk factors
  const hasHighRiskFactors = 
    patientData.hasRadiotherapy ||
    patientData.hasCancer ||
    patientData.systemicDiseases.includes('糖尿病') ||
    patientData.systemicDiseases.includes('洗腎');
  
  // Prepare patient data for algorithm (handle both old and new medication structures)
  let algorithmPatientData = { ...patientData };
  
  // If we have medications array, use the first medication for the algorithm
  if (patientData.medications && patientData.medications.length > 0) {
    const firstMedication = patientData.medications[0];
    algorithmPatientData.drugName = firstMedication.drugName;
    algorithmPatientData.administrationRoute = firstMedication.administrationRoute;
    algorithmPatientData.indication = firstMedication.indication;
    algorithmPatientData.frequency = firstMedication.frequency;
    algorithmPatientData.startYear = firstMedication.startYear;
    algorithmPatientData.startMonth = firstMedication.startMonth;
    algorithmPatientData.isStopped = firstMedication.isStopped;
    algorithmPatientData.stopYear = firstMedication.stopYear;
    algorithmPatientData.stopMonth = firstMedication.stopMonth;
  }
  
  procedures.forEach(procedure => {
    let riskLevel = '低風險'; // Default is low risk
    let recommendation = '';
    let incidenceRate = 0.04; // Default baseline
    let references = [];
    let riskCategory = 'low';
    
    // Use enhanced algorithm if available
    if (riskCalculator && algorithmPatientData.hasAntiresorptiveMed) {
      try {
        // Map procedure names to treatment names for the algorithm
        let treatmentName = null;
        if (procedure.name === '根管治療') treatmentName = '根管治療';
        else if (procedure.name === '拔牙') treatmentName = '拔牙';
        else if (procedure.name === '牙周手術') treatmentName = '牙周深層清潔'; // Map to semi-invasive equivalent
        else if (procedure.name === '植牙') treatmentName = '植牙';
        // For non-invasive treatments, we don't need a specific treatment name
        
        const assessment = riskCalculator.calculateRisk(algorithmPatientData, treatmentName);
        riskLevel = assessment.riskLevel;
        recommendation = assessment.recommendation;
        incidenceRate = assessment.incidenceRate;
        references = assessment.references;
        riskCategory = assessment.riskCategory;
      } catch (error) {
        console.error('Error using enhanced risk calculator:', error);
        // Fall back to original logic
        riskLevel = getFallbackRiskLevel(procedure, medicationDuration, hasHighRiskFactors);
        recommendation = getFallbackRecommendation(riskLevel, procedure.invasive);
      }
    } else if (patientData.hasAntiresorptiveMed) {
      // Fallback to original logic
      riskLevel = getFallbackRiskLevel(procedure, medicationDuration, hasHighRiskFactors);
      recommendation = getFallbackRecommendation(riskLevel, procedure.invasive);
    } else {
      recommendation = '可進行一般治療。';
    }
    
    assessments.push({
      procedure: procedure.name,
      riskLevel,
      recommendation,
      incidenceRate,
      references,
      riskCategory,
      invasive: procedure.invasive
    });
  });
  
  return assessments;
}

// Fallback risk level calculation (original logic)
function getFallbackRiskLevel(procedure, medicationDuration, hasHighRiskFactors) {
  if (procedure.name === '非侵入性治療') {
    return '低風險';
  } else {
    // For invasive procedures
    if (medicationDuration > 36 || hasHighRiskFactors) {
      return '高風險';
    } else if (medicationDuration > 12) {
      return '中度風險';
    } else {
      return '低風險';
    }
  }
}

// Fallback recommendation generation
function getFallbackRecommendation(riskLevel, isInvasive) {
  const recommendations = {
    '低風險': {
      true: '可進行治療，但需要告知風險並簽署同意書。建議術後追蹤。',
      false: '可進行治療，建議定期追蹤。'
    },
    '中度風險': {
      true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。',
      false: '建議定期追蹤，如有牙科治療需求請先諮詢醫師。'
    },
    '高風險': {
      true: '建議轉診至醫學中心進行評估。需要特殊處理及術後密切追蹤。',
      false: '建議密切追蹤，避免侵入性牙科治療。'
    }
  };
  
  return recommendations[riskLevel][isInvasive] || '請諮詢專業醫師。';
}

// Calculate medication duration in months
function calculateMedicationDuration() {
  if (!patientData.hasAntiresorptiveMed) return 0;
  
  // If we have multiple medications, find the one with the longest duration
  if (patientData.medications && patientData.medications.length > 0) {
    const durations = patientData.medications.map(med => {
      const startDate = new Date(
        parseInt(med.startYear),
        parseInt(med.startMonth) - 1
      );
      
      const endDate = med.isStopped
        ? new Date(
            parseInt(med.stopYear),
            parseInt(med.stopMonth) - 1
          )
        : new Date();
      
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // Convert to months
    });
    
    // Return the longest duration
    return Math.max(...durations);
  }
  
  // Fallback to single medication calculation
  const startDate = new Date(
    parseInt(patientData.startYear),
    parseInt(patientData.startMonth) - 1
  );
  
  const endDate = patientData.isStopped
    ? new Date(
        parseInt(patientData.stopYear),
        parseInt(patientData.stopMonth) - 1
      )
    : new Date();
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // Convert to months
}

// Display assessment results
function displayResults(assessments) {
  const resultsContainer = document.getElementById('results-container');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = '';
  
  assessments.forEach(assessment => {
    const card = document.createElement('div');
    card.className = 'assessment-card';
    
    const procedureTitle = document.createElement('h3');
    procedureTitle.className = 'procedure-title';
    procedureTitle.textContent = assessment.procedure;
    
    const riskBadge = document.createElement('span');
    riskBadge.className = 'risk-badge';
    riskBadge.textContent = assessment.riskLevel;
    
    // Set color based on risk level
    if (assessment.riskLevel === '高風險') {
      riskBadge.classList.add('high-risk');
    } else if (assessment.riskLevel === '中度風險') {
      riskBadge.classList.add('medium-risk');
    } else {
      riskBadge.classList.add('low-risk');
    }
    
    const recommendation = document.createElement('p');
    recommendation.className = 'recommendation';
    recommendation.textContent = assessment.recommendation;
    
    card.appendChild(procedureTitle);
    card.appendChild(riskBadge);
    card.appendChild(recommendation);
    
    resultsContainer.appendChild(card);
  });
  
  // Add print button
  const printButton = document.createElement('button');
  printButton.className = 'btn btn-primary';
  printButton.textContent = '列印評估報告';
  printButton.addEventListener('click', printResults);
  
  resultsContainer.appendChild(printButton);
}

// Print assessment results
function printResults() {
  window.print();
} 