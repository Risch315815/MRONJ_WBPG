// Main JavaScript for MRONJ Risk Assessment Tool

// Store patient data in this object
let patientData = {
  name: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  hasAntiresorptiveMed: false,
  medicationType: '',
  medicationSubType: '',
  drugName: '',
  indication: '',
  startYear: '',
  startMonth: '',
  frequency: '',
  isStopped: false,
  stopYear: '',
  stopMonth: '',
  hasCancer: false,
  hasRadiotherapy: false,
  systemicDiseases: [],
  medications: []
};

// Initialize the application when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if there's stored patient data in localStorage
  if (localStorage.getItem('patientMedicationData')) {
    try {
      const storedData = JSON.parse(localStorage.getItem('patientMedicationData'));
      console.log('Found stored patient medication data:', storedData);
      
      // If medications exist in stored data, use them
      if (storedData.medications && storedData.medications.length > 0) {
        patientData.medications = storedData.medications;
        console.log('Loaded medications from localStorage');
      }
    } catch (e) {
      console.error('Error loading stored patient data:', e);
    }
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

// Calculate MRONJ risk
function assessRisk() {
  // Define dental procedures to assess
  const procedures = [
    '非侵入性治療', // Non-invasive (cleaning, filling)
    '根管治療',     // Root canal treatment
    '拔牙',         // Extraction
    '牙周手術',     // Periodontal surgery
    '植牙'          // Implant
  ];
  
  const assessments = [];
  
  // Calculate medication duration in months
  const medicationDuration = calculateMedicationDuration();
  
  // Check for high risk factors
  const hasHighRiskFactors = 
    patientData.hasRadiotherapy ||
    patientData.hasCancer ||
    patientData.systemicDiseases.includes('糖尿病') ||
    patientData.systemicDiseases.includes('洗腎');
  
  procedures.forEach(procedure => {
    let riskLevel = '低風險'; // Default is low risk
    let recommendation = '';
    
    // Base risk assessment on medication type, duration, and risk factors
    if (patientData.hasAntiresorptiveMed) {
      if (procedure === '非侵入性治療') {
        riskLevel = '低風險';
        recommendation = '可進行治療，建議定期追蹤。';
      } else {
        // For invasive procedures
        if (medicationDuration > 36 || hasHighRiskFactors) {
          riskLevel = '高風險';
          recommendation = '建議轉診至醫學中心進行評估。需要特殊處理及術後密切追蹤。';
        } else if (medicationDuration > 12) {
          riskLevel = '中度風險';
          recommendation = '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。';
        } else {
          riskLevel = '低風險';
          recommendation = '可進行治療，但需要告知風險並簽署同意書。建議術後追蹤。';
        }
      }
    } else {
      recommendation = '可進行一般治療。';
    }
    
    assessments.push({
      procedure,
      riskLevel,
      recommendation
    });
  });
  
  return assessments;
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