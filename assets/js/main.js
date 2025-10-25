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

// Function to clear patient data for new session (without reloading)
function clearPatientDataForNewSession() {
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
  
  console.log('Patient data cleared for new session');
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
        patientData.hasAntiresorptiveMed = true; // CRITICAL: Set this flag!
        console.log('Loaded medications from localStorage');
        console.log('Updated patientData:', patientData);
      }
    } catch (e) {
      console.error('Error loading stored medication data:', e);
    }
  }
  
  // Clear data button removed as requested

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
  // Define treatment categories to assess (new 3-category system)
  const treatmentCategories = [
    { 
      name: '非侵入性治療', 
      nameEn: 'Non-Invasive Treatment',
      description: '洗牙、蛀牙填補、假牙贋復',
      descriptionEn: 'Scaling, caries fillings, crown and dentures',
      invasiveness: 'nonInvasive',
      showIncidenceRate: true
    },
    { 
      name: '部分侵入性治療', 
      nameEn: 'Semi-Invasive Treatment',
      description: '根管治療、牙齦下牙結石刮除',
      descriptionEn: 'Root canal treatment, subgingival scaling and root planing',
      invasiveness: 'semiInvasive',
      showIncidenceRate: false
    },
    { 
      name: '侵入性治療', 
      nameEn: 'Invasive Treatment',
      description: '拔牙、齒槽骨整形術、牙冠增長術、植牙',
      descriptionEn: 'Tooth extraction, alveoloplasty, crown lengthening procedure, dental implant',
      invasiveness: 'invasive',
      showIncidenceRate: true
    }
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
    // Ensure hasCancer reflects indication if not already true
    if (!algorithmPatientData.hasCancer) {
      const indication = firstMedication.indication || '';
      const isCancerReason = 
        indication === '多發性骨髓瘤' ||
        indication === '骨轉移' ||
        indication === 'Multiple Myeloma' ||
        indication === 'Bone Metastasis';
      if (isCancerReason) {
        algorithmPatientData.hasCancer = true;
      }
    }
    algorithmPatientData.frequency = firstMedication.frequency;
    algorithmPatientData.startYear = firstMedication.startYear;
    algorithmPatientData.startMonth = firstMedication.startMonth;
    algorithmPatientData.isStopped = firstMedication.isStopped;
    algorithmPatientData.stopYear = firstMedication.stopYear;
    algorithmPatientData.stopMonth = firstMedication.stopMonth;
    algorithmPatientData.hasAntiresorptiveMed = true; // CRITICAL: Set this to true!
    console.log('Algorithm patient data prepared:', algorithmPatientData);
  }
  
  treatmentCategories.forEach(category => {
    let riskLevel = '資料不足'; // Default when no data available
    let recommendation = '';
    let recommendationEn = '';
    let incidenceRate = null; // Will be set based on showIncidenceRate
    let generalIncidenceRate = null;
    let references = [];
    let riskCategory = 'unknown';
    let hasLimitedData = false;
    
    // Use enhanced algorithm if available
    if (riskCalculator && algorithmPatientData.hasAntiresorptiveMed) {
      try {
        // If multiple medications exist, compute per-medication and choose the highest
        if (patientData.medications && patientData.medications.length > 0) {
          const riskLevelPriority = {
            '高風險': 6,
            '中高風險': 5,
            '中度風險': 4,
            '中低風險': 3,
            '低風險': 2,
            '資料不足': 1
          };

          let best = null;
          let highestRiskMedications = []; // Track all medications with highest risk
          let cancerMedications = []; // Track medications with cancer indication
          let nonCancerMedications = []; // Track medications without cancer indication

          // First pass: Separate medications by cancer indication
          patientData.medications.forEach(med => {
            const indication = med.indication || '';
            const isCancerReason = 
              indication === '多發性骨髓瘤' ||
              indication === '骨轉移' ||
              indication === 'Multiple Myeloma' ||
              indication === 'Bone Metastasis';
            
            if (isCancerReason) {
              cancerMedications.push(med);
            } else {
              nonCancerMedications.push(med);
            }
          });

          // Process medications with cancer indication first (priority)
          const medicationsToProcess = [...cancerMedications, ...nonCancerMedications];

          medicationsToProcess.forEach(med => {
            const medPatient = { ...patientData };
            medPatient.drugName = med.drugName;
            medPatient.administrationRoute = med.administrationRoute;
            medPatient.indication = med.indication;
            medPatient.frequency = med.frequency;
            medPatient.startYear = med.startYear;
            medPatient.startMonth = med.startMonth;
            medPatient.isStopped = med.isStopped;
            medPatient.stopYear = med.stopYear;
            medPatient.stopMonth = med.stopMonth;
            
            // Set hasCancer based on indication
            const indication = med.indication || '';
            const isCancerReason = 
              indication === '多發性骨髓瘤' ||
              indication === '骨轉移' ||
              indication === 'Multiple Myeloma' ||
              indication === 'Bone Metastasis';
            medPatient.hasCancer = isCancerReason;

            const language = localStorage.getItem('preferredLanguage') || 'zh';
            const results = riskCalculator.calculateRisk(medPatient, null, language);
            const catRes = results.find(r => r.invasiveness === category.invasiveness);
            if (!catRes) return;

            // Check for bisphosphonate fallback rule
            let finalResult = catRes;
            if (med.drugName !== 'Bisphosphonate' && 
                (med.drugName === 'Alendronate' || med.drugName === 'Risedronate' || 
                 med.drugName === 'Ibandronate' || med.drugName === 'Clodronate' || 
                 med.drugName === 'Zoledronate' || med.drugName === 'Pamidronate')) {
              
              // Check if this specific bisphosphonate has 'N/A' incidence rate
              const specificIncidenceRate = riskCalculator.getIncidenceRate(medPatient.indication, med.drugName, med.administrationRoute, catRes.invasive);
              if (specificIncidenceRate === 'N/A') {
                // Try fallback to general Bisphosphonate
                const fallbackPatient = { ...medPatient };
                fallbackPatient.drugName = 'Bisphosphonate';
                const fallbackResults = riskCalculator.calculateRisk(fallbackPatient, null, language);
                const fallbackCatRes = fallbackResults.find(r => r.invasiveness === category.invasiveness);
                if (fallbackCatRes && fallbackCatRes.incidenceRate !== 'N/A') {
                  finalResult = fallbackCatRes;
                  console.log(`Using Bisphosphonate fallback for ${med.drugName} due to N/A incidence rate`);
                }
              }
            }

            // Compute score with cancer priority
            let priority = (riskLevelPriority[finalResult.riskLevel] || 0) - (finalResult.hasLimitedData ? 0.5 : 0);
            
            // Add cancer priority bonus (only if we haven't found a cancer medication yet)
            if (isCancerReason && (!best || !cancerMedications.some(cmed => cmed.drugName === best.medication))) {
              priority += 10; // High priority bonus for cancer medications
            }

            if (!best || priority > best.priority ||
                (priority === best.priority && (Number(finalResult.incidenceRate || 0) > Number(best.incidenceRate || 0)))) {
              best = { 
                ...finalResult, 
                priority,
                medication: med.drugName,
                administrationRoute: med.administrationRoute
              };
              // Reset highest risk medications when we find a higher priority
              if (!best || priority > best.priority) {
                highestRiskMedications = [];
              }
            }
            
            // If this medication has the same priority as the best, add it to the list
            if (best && priority === best.priority) {
              highestRiskMedications.push({
                drugName: med.drugName,
                administrationRoute: med.administrationRoute
              });
            }
          });

          if (best) {
            riskLevel = best.riskLevel;
            recommendation = best.recommendation;
            recommendationEn = best.recommendationEn || getFallbackRecommendationEn(best.riskLevel, category.invasiveness === 'invasive');
            incidenceRate = best.incidenceRate;
            generalIncidenceRate = best.generalIncidenceRate;
            references = best.references;
            riskCategory = best.riskCategory;
            hasLimitedData = best.hasLimitedData;
            // Store the medications that contributed to this highest risk
            algorithmPatientData.highestRiskMedications = highestRiskMedications;
            // For backward compatibility, still set the primary medication
            algorithmPatientData.drugName = best.medication;
            algorithmPatientData.administrationRoute = best.administrationRoute;
          }
        } else {
          // Single-medication legacy path
          const language = localStorage.getItem('preferredLanguage') || 'zh';
          const allCategoryResults = riskCalculator.calculateRisk(algorithmPatientData, null, language);
          const categoryResult = allCategoryResults.find(result => result.invasiveness === category.invasiveness);
          if (categoryResult) {
            riskLevel = categoryResult.riskLevel;
            recommendation = categoryResult.recommendation;
            recommendationEn = categoryResult.recommendationEn || getFallbackRecommendationEn(categoryResult.riskLevel, category.invasiveness === 'invasive');
            incidenceRate = categoryResult.incidenceRate;
            generalIncidenceRate = categoryResult.generalIncidenceRate;
            references = categoryResult.references;
            riskCategory = categoryResult.riskCategory;
            hasLimitedData = categoryResult.hasLimitedData;
          }
        }
      } catch (error) {
        console.error('Error using enhanced risk calculator:', error);
        // Fall back to original logic
        const isInvasive = category.invasiveness === 'invasive';
        riskLevel = getFallbackRiskLevel({ name: category.name, invasive: isInvasive }, medicationDuration, hasHighRiskFactors);
        recommendation = getFallbackRecommendation(riskLevel, isInvasive);
        recommendationEn = getFallbackRecommendationEn(riskLevel, isInvasive);
      }
    } else if (patientData.hasAntiresorptiveMed) {
      // Fallback to original logic
      const isInvasive = category.invasiveness === 'invasive';
      riskLevel = getFallbackRiskLevel({ name: category.name, invasive: isInvasive }, medicationDuration, hasHighRiskFactors);
      recommendation = getFallbackRecommendation(riskLevel, isInvasive);
      recommendationEn = getFallbackRecommendationEn(riskLevel, isInvasive);
    } else {
      // No medications - should show unknown risk
      riskLevel = '資料不足';
      recommendation = '資料不足，無法提供準確的風險評估。建議諮詢專業醫師進行個別評估。';
      recommendationEn = 'Insufficient data to provide an accurate risk assessment. Please consult a healthcare professional for individualized evaluation.';
    }
    
    assessments.push({
      procedure: category.name,
      procedureEn: category.nameEn,
      categoryDescription: category.description,
      categoryDescriptionEn: category.descriptionEn,
      invasiveness: category.invasiveness,
      riskLevel,
      recommendation,
      recommendationEn,
      incidenceRate: category.showIncidenceRate ? incidenceRate : null,
      generalIncidenceRate: category.showIncidenceRate ? generalIncidenceRate : null,
      showIncidenceRate: category.showIncidenceRate,
      references,
      riskCategory,
      hasLimitedData
    });
  });
  
  return assessments;
}

// Fallback risk level calculation (original logic)
function getFallbackRiskLevel(procedure, medicationDuration, hasHighRiskFactors) {
  // If we're using fallback, it means we don't have reliable data
  // So we should indicate insufficient data rather than guess
  return '資料不足';
}

// Fallback recommendation generation
function getFallbackRecommendation(riskLevel, isInvasive) {
  const recommendations = {
    '低風險': {
      true: '可進行治療，但需要告知風險並簽署同意書。建議術後追蹤。',
      false: '可進行治療，建議定期追蹤。'
    },
    '中低風險': {
      true: '可進行治療，但需要告知風險並簽署同意書。建議術後追蹤。',
      false: '可進行治療，建議定期追蹤。'
    },
    '中度風險': {
      true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。',
      false: '建議定期追蹤，如有牙科治療需求請先諮詢醫師。'
    },
    '中高風險': {
      true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。',
      false: '建議定期追蹤，如有牙科治療需求請先諮詢醫師。'
    },
    '高風險': {
      true: '建議轉診至醫學中心進行評估。需要特殊處理及術後密切追蹤。',
      false: '建議密切追蹤，避免侵入性牙科治療。'
    },
    '資料不足': {
      true: '過去研究資料不足，無法提供準確的風險評估。建議諮詢專業醫師進行個別評估。',
      false: '過去研究資料不足，無法提供準確的風險評估。建議諮詢專業醫師進行個別評估。'
    }
  };
  
  return recommendations[riskLevel][isInvasive] || '請諮詢專業醫師。';
}

// Fallback English recommendation generation
function getFallbackRecommendationEn(riskLevel, isInvasive) {
  const recommendations = {
    '低風險': {
      true: 'Treatment can proceed with informed consent and postoperative follow-up.',
      false: 'Treatment can proceed; regular follow-up is recommended.'
    },
    '中低風險': {
      true: 'Treatment can proceed with informed consent and postoperative follow-up.',
      false: 'Treatment can proceed; regular follow-up is recommended.'
    },
    '中度風險': {
      true: 'Consult the prescribing physician to consider temporary drug interruption. Special precautions and postoperative follow-up are required.',
      false: 'Regular follow-up is recommended. Consult a physician before dental treatment if needed.'
    },
    '中高風險': {
      true: 'Consult the prescribing physician to consider temporary drug interruption. Special precautions and postoperative follow-up are required.',
      false: 'Regular follow-up is recommended. Consult a physician before dental treatment if needed.'
    },
    '高風險': {
      true: 'Referral to a medical center for evaluation is recommended. Special precautions and close postoperative follow-up are required.',
      false: 'Close follow-up is recommended; avoid invasive dental procedures.'
    },
    '資料不足': {
      true: 'Insufficient data to provide an accurate risk assessment. Please consult a healthcare professional for individualized evaluation.',
      false: 'Insufficient data to provide an accurate risk assessment. Please consult a healthcare professional for individualized evaluation.'
    }
  };
  return (recommendations[riskLevel] && recommendations[riskLevel][isInvasive]) || 'Please consult a healthcare professional.';
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
    
    // Set color based on risk level (includes mid-low and mid-high)
    if (assessment.riskLevel === '高風險') {
      riskBadge.classList.add('high-risk');
    } else if (assessment.riskLevel === '中高風險') {
      riskBadge.classList.add('midhigh-risk');
    } else if (assessment.riskLevel === '中度風險') {
      riskBadge.classList.add('medium-risk');
    } else if (assessment.riskLevel === '中低風險') {
      riskBadge.classList.add('midlow-risk');
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