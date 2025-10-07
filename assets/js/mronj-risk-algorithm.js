// Enhanced MRONJ Risk Assessment Algorithm
// Based on statistical analysis of literature data

class MRONJRiskCalculator {
  constructor() {
    // Risk incidence data from statistical analysis
    this.incidenceData = {
      osteoporosis: {
        none: { none: { none: 0.04, YES: 'N/A' } },
        Bisphosphonate: {
          not_specific: { none: 2.60, YES: 8.42 },
          oral: { none: 1.56, YES: 2.11 },
          'IV/SC': { none: 2.28, YES: 15.12 }
        },
        Alendronate: {
          oral: { none: 0.78, YES: 7.97 }
        },
        Risedronate: {
          oral: { none: 4.20, YES: 'N/A' }
        },
        Ibandronate: {
          oral: { none: 3.22, YES: 5 },
          'IV/SC': { none: 4.85, YES: 'N/A' }
        },
        Clodronate: {
          oral: { none: 2.28, YES: 'N/A' }
        },
        Zoledronate: {
          'IV/SC': { none: 1.28, YES: 15.12 }
        },
        Pamidronate: {
          'IV/SC': { none: 0.06, YES: 'N/A' }
        },
        Denosumab: {
          'IV/SC': { none: 0.01, YES: 1.21 }
        },
        Romosuzumab: {
          'IV/SC': { none: 0.49, YES: 'N/A' }
        },
        not_specific: {
          not_specific: { none: 0.20, YES: 1.48 }
        }
      },
      cancer: {
        none: { none: { none: 0.27, YES: 'N/A' } },
        Bisphosphonate: {
          oral: { none: 2.74, YES: 12.17 },
          'IV/SC': { none: 2.74, YES: 12.17 }
        },
        Ibandronate: {
          oral: { none: 1.21, YES: 'N/A' },
          'IV/SC': { none: 1.21, YES: 'N/A' }
        },
        Clodronate: {
          oral: { none: 0.50, YES: 'N/A' }
        },
        Zoledronate: {
          'IV/SC': { none: 2.42, YES: 'N/A' }
        },
        Denosumab: {
          'IV/SC': { none: 3.75, YES: 15.60 }
        },
        Bevacizumab: {
          'IV/SC': { none: 'N/A', YES: 'N/A' }
        },
        Sunitinib: {
          oral: { none: 'N/A', YES: 'N/A' }
        },
        Cabozantinib: {
          oral: { none: 'N/A', YES: 'N/A' }
        },
        not_specific: {
          not_specific: { none: 3.34, YES: 12.78 }
        }
      }
    };

    // Treatment classification system
    this.treatmentClassification = {
      nonInvasive: ['洗牙', '蛀牙填補', '假牙贋復'],
      semiInvasive: ['根管治療', '牙周深層清潔'],
      invasive: ['拔牙', '齒槽骨整形術', '牙冠增長術', '植牙']
    };

    // Semi-invasive treatment special considerations
    this.semiInvasiveConsiderations = {
      '根管治療': '應特別注意勿讓根管封填材料或黏著劑超出根尖孔，或是可選擇生物相容性佳之黏著劑(如生物陶瓷、MTA)',
      '牙周深層清潔': '建議以微創方式移除牙齦下牙結石與發炎組織(如顯微鏡輔助微創術式、雷射牙周治療等等)'
    };

    // Data quality indicators - mark which rates are based on limited sources
    this.limitedDataSources = {
      osteoporosis: {
        Alendronate: {
          oral: { YES: true }  // 4.97** - limited sources
        },
        Ibandronate: {
          oral: { YES: true }  // 5** - limited sources
        },
        Bisphosphonate: {
          'IV/SC': { YES: true }  // 15.12** - limited sources
        },
        Zoledronate: {
          'IV/SC': { YES: true }  // 15.12** - limited sources
        }
      },
      cancer: {
        // Add cancer limited data sources if needed
      }
    };

    // Reference papers are now loaded from external file
    this.referencePapers = typeof MRONJReferences !== 'undefined' ? MRONJReferences : {};
    this.generalReferences = typeof MRONJGeneralReferences !== 'undefined' ? MRONJGeneralReferences : {};
  }

  // Calculate MRONJ risk - integrated function for both single treatment and all categories
  calculateRisk(patientData, dentalTreatment = null) {
    const indication = patientData.hasCancer ? 'cancer' : 'osteoporosis';
    const medication = patientData.hasAntiresorptiveMed ? patientData.drugName : 'none';
    const administrationRoute = this.normalizeAdministrationRoute(patientData);
    
    // If no specific treatment provided, calculate for all categories
    if (!dentalTreatment) {
      return this.calculateRiskForAllCategories(patientData, indication, medication, administrationRoute);
    }
    
    // Single treatment calculation
    const isInvasive = this.treatmentClassification.invasive.includes(dentalTreatment);
    const isSemiInvasive = this.treatmentClassification.semiInvasive.includes(dentalTreatment);
    const treatmentType = isInvasive ? 'invasive' : isSemiInvasive ? 'semiInvasive' : 'nonInvasive';
    
    // For semi-invasive treatments, use non-invasive risk level (same as non-invasive)
    const riskAssessmentInvasiveness = isSemiInvasive ? false : isInvasive;
    
    // Get incidence rate from statistical data
    const incidenceResult = this.getIncidenceRate(indication, medication, administrationRoute, riskAssessmentInvasiveness);
    
    // Handle both single rate and dual rate (specific + general) results
    let incidence, generalIncidence = null;
    if (typeof incidenceResult === 'object' && incidenceResult.specific !== undefined) {
      // Dual rate result for specific bisphosphonates
      incidence = incidenceResult.specific;
      generalIncidence = incidenceResult.general;
    } else {
      // Single rate result
      incidence = incidenceResult;
    }
    
    // Check if data is based on limited sources
    const hasLimitedData = this.hasLimitedDataSources(indication, medication, administrationRoute, riskAssessmentInvasiveness);
    
    // Determine risk category using rule-based approach
    const riskCategory = this.determineRiskCategory(indication, medication, administrationRoute, riskAssessmentInvasiveness, isSemiInvasive);
    
    // Get reference papers
    const references = this.getReferencePapers(indication, medication, administrationRoute, riskAssessmentInvasiveness);
    
    // Get special considerations for semi-invasive treatments
    const specialConsiderations = isSemiInvasive ? this.semiInvasiveConsiderations[dentalTreatment] : null;
    
    return {
      indication,
      medication,
      administrationRoute,
      dentalTreatment,
      treatmentType,
      isInvasive,
      isSemiInvasive,
      incidenceRate: incidence,
      generalIncidenceRate: generalIncidence,
      hasLimitedData,
      riskCategory,
      references,
      riskLevel: this.getRiskLevel(riskCategory),
      recommendation: this.getRecommendation(riskCategory, isInvasive, isSemiInvasive, specialConsiderations)
    };
  }

  // Helper function for calculating risk for all categories
  calculateRiskForAllCategories(patientData, indication, medication, administrationRoute) {
    const treatmentCategories = [
      { 
        name: '非侵入性治療', 
        description: '洗牙、蛀牙填補、假牙贋復等',
        invasiveness: 'nonInvasive',
        showIncidenceRate: true
      },
      { 
        name: '半侵入性治療', 
        description: '根管治療、牙周深層清潔等',
        invasiveness: 'semiInvasive',
        showIncidenceRate: false
      },
      { 
        name: '侵入性治療', 
        description: '拔牙、齒槽骨整形術、牙冠增長術、植牙等',
        invasiveness: 'invasive',
        showIncidenceRate: true
      }
    ];
    
    const assessments = [];
    
    treatmentCategories.forEach(category => {
      // Calculate risk based on invasiveness
      const isInvasive = category.invasiveness === 'invasive';
      const isSemiInvasive = category.invasiveness === 'semiInvasive';
      
      // For semi-invasive treatments, use non-invasive risk level (same as non-invasive)
      const riskAssessmentInvasiveness = isSemiInvasive ? false : isInvasive;
      
      // Get incidence rate from statistical data
      const incidenceResult = this.getIncidenceRate(indication, medication, administrationRoute, riskAssessmentInvasiveness);
      
      // Handle both single rate and dual rate (specific + general) results
      let incidenceRate = null, generalIncidenceRate = null;
      if (category.showIncidenceRate) {
        if (typeof incidenceResult === 'object' && incidenceResult.specific !== undefined) {
          // Dual rate result for specific bisphosphonates
          incidenceRate = incidenceResult.specific;
          generalIncidenceRate = incidenceResult.general;
        } else {
          // Single rate result
          incidenceRate = incidenceResult;
        }
      }
      
      // Check if data is based on limited sources
      const hasLimitedData = this.hasLimitedDataSources(indication, medication, administrationRoute, riskAssessmentInvasiveness);
      
      // Determine risk category using rule-based approach
      const riskCategory = this.determineRiskCategory(indication, medication, administrationRoute, riskAssessmentInvasiveness, isSemiInvasive);
      
      // Get reference papers (skip for semi-invasive treatments)
      const references = isSemiInvasive ? [] : this.getReferencePapers(indication, medication, administrationRoute, riskAssessmentInvasiveness);
      
      // Get special considerations for semi-invasive treatments
      const specialConsiderations = isSemiInvasive ? this.semiInvasiveConsiderations['根管治療'] : null;
      
      assessments.push({
        categoryName: category.name,
        categoryDescription: category.description,
        invasiveness: category.invasiveness,
        isInvasive: isInvasive,
        isSemiInvasive: isSemiInvasive,
        riskLevel: this.getRiskLevel(riskCategory),
        incidenceRate: incidenceRate,
        generalIncidenceRate: generalIncidenceRate,
        showIncidenceRate: category.showIncidenceRate,
        hasLimitedData: hasLimitedData,
        recommendation: this.getRecommendation(riskCategory, isInvasive, isSemiInvasive, specialConsiderations),
        references: references,
        riskCategory: riskCategory
      });
    });
    
    return assessments;
  }


  // Determine risk category using rule-based approach
  // Decision tree: indication → medication → administration route → invasive dental treatment
  determineRiskCategory(indication, medication, administrationRoute, isInvasive, isSemiInvasive = false) {
    
    // Check if medication has insufficient data (N/A rates)
    const treatmentKey = isInvasive ? 'YES' : 'none';
    const incidenceRate = this.incidenceData?.[indication]?.[medication]?.[administrationRoute]?.[treatmentKey];
    
    // If incidence rate is 'N/A', return unknown risk
    if (incidenceRate === 'N/A') {
      return 'unknown';
    }
    
    // 1. INDICATION: Check if patient has cancer or osteoporosis
    if (indication === 'osteoporosis') {
      // 2. MEDICATION: Check medication type for osteoporosis patients
      if (medication === 'none') {
        // 3. ADMINISTRATION ROUTE: No medication (control group)
        // 4. INVASIVE DENTAL TREATMENT: Risk based on treatment invasiveness
          return 'low';
        }
      else {
        // 2. MEDICATION: Has antiresorptive medication
        // 3. ADMINISTRATION ROUTE: Any route (oral, IV/SC, etc.)
        // 4. INVASIVE DENTAL TREATMENT: Risk based on treatment invasiveness
        if (isInvasive) {
          return 'moderate';
        } else if (isSemiInvasive) {
          return 'low-moderate';
        } else {
          return 'low';
        }
      }
    } 
    else if (indication === 'cancer') {
      // 2. MEDICATION: Check medication type for cancer patients
      if (medication === 'none') {
        // 3. ADMINISTRATION ROUTE: No medication (control group)
        // 4. INVASIVE DENTAL TREATMENT: Risk based on treatment invasiveness
          return 'low';
      } 
      else if (medication === 'Romosuzumab') {
        // 2. MEDICATION: Romosuzumab - no research data available
        return 'unknown';
      } else {
        // 2. MEDICATION: Has antiresorptive medication (bisphosphonates, denosumab, etc.)
        // 3. ADMINISTRATION ROUTE: Any route (oral, IV/SC, etc.)
        // 4. INVASIVE DENTAL TREATMENT: Risk based on treatment invasiveness
        if (isInvasive) {
          return 'high';
        } else if (isSemiInvasive) {
          return 'moderate-high';
        } else {
          return 'moderate';
        }
      }
    }
    
    // Unknown indication
    else {
      return 'unknown';
    }
  }


  // Normalize administration route
  normalizeAdministrationRoute(patientData) {
    const route = patientData.administrationRoute ? patientData.administrationRoute.toLowerCase() : '';
    
    if (route.includes('oral') || route.includes('口服')) {
      return 'oral';
    }
    if (route.includes('injection') || route.includes('注射') || 
        route.includes('iv') || route.includes('sc')) {
      return 'IV/SC';
    }
    
    return 'not_specific';
  }

  // Get incidence rate from data
  getIncidenceRate(indication, medication, administrationRoute, invasiveDentalTreatment) {
    const treatmentKey = invasiveDentalTreatment ? 'YES' : 'none';
    
    // List of specific bisphosphonates that have individual data
    const specificBisphosphonates = ['Alendronate', 'Risedronate', 'Ibandronate', 'Clodronate', 'Zoledronate', 'Pamidronate'];
    
    // For specific bisphosphonates, return both general and specific rates
    if (specificBisphosphonates.includes(medication)) {
      const specificRate = this.incidenceData?.[indication]?.[medication]?.[administrationRoute]?.[treatmentKey];
      const generalRate = this.incidenceData?.[indication]?.['Bisphosphonate']?.[administrationRoute]?.[treatmentKey];
      
      // Return object with both rates if specific rate exists and is not 'N/A'
      if (specificRate !== undefined && specificRate !== 'N/A') {
        return {
          specific: specificRate,
          general: generalRate !== undefined ? generalRate : 'N/A'
        };
      }
      
      // If specific rate is 'N/A' or doesn't exist, return general rate
      if (generalRate !== undefined) {
        return generalRate;
      }
    }
    
    // For non-bisphosphonates, direct lookup
    const rate = this.incidenceData?.[indication]?.[medication]?.[administrationRoute]?.[treatmentKey];
    
    if (rate !== undefined) {
      return rate; // This will return 'N/A' if the rate is 'N/A'
    }
    
    // Final fallback: control group (no medication)
    return this.incidenceData?.[indication]?.['none']?.['none']?.[treatmentKey] || 'N/A';
  }

  // Check if data is based on limited sources
  hasLimitedDataSources(indication, medication, administrationRoute, invasiveDentalTreatment) {
    const treatmentKey = invasiveDentalTreatment ? 'YES' : 'none';
    
    // Direct lookup: indication -> medication -> route -> treatment
    const isLimited = this.limitedDataSources?.[indication]?.[medication]?.[administrationRoute]?.[treatmentKey];
    
    if (isLimited !== undefined) {
      return isLimited;
    }
    
    // Fallback: try general bisphosphonate category for specific bisphosphonates
    if (medication.startsWith('bisphosphonate_')) {
      const generalLimited = this.limitedDataSources?.[indication]?.['bisphosphonate']?.[administrationRoute]?.[treatmentKey];
      if (generalLimited !== undefined) {
        return generalLimited;
      }
    }
    
    return false;
  }

  // Get risk level in Chinese
  getRiskLevel(category) {
    const levels = {
      low: '低風險',
      'low-moderate': '中低風險',
      moderate: '中度風險',
      'moderate-high': '中高風險',
      high: '高風險',
      unknown: '資料不足',
      'N/A': '資料不足'
    };
    return levels[category] || '資料不足';
  }

  // Get recommendation based on risk category
  getRecommendation(category, isInvasive, isSemiInvasive, specialConsiderations) {
    let baseRecommendation = '';
    
    // Base recommendations
    const recommendations = {
      low: {
        true: '可進行治療，但需要告知風險並簽署同意書。建議術後追蹤。',
        false: '可進行治療，建議定期追蹤。'
      },
      'low-moderate': {
        true: '可進行治療，但需要特別注意風險並簽署同意書。建議術前諮詢原處方醫師，術後密切追蹤。',
        false: '可進行治療，建議術前諮詢醫師並密切追蹤。'
      },
      moderate: {
        true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。',
        false: '建議定期追蹤，如有牙科治療需求請先諮詢醫師。'
      },
      'moderate-high': {
        true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後密切追蹤。',
        false: '建議密切追蹤，如有牙科治療需求請先諮詢醫師。'
      },
      high: {
        true: '建議轉診至醫學中心進行評估。需要特殊處理及術後密切追蹤。',
        false: '建議密切追蹤，避免侵入性牙科治療。'
      },
      unknown: {
        true: '缺乏足夠資料進行風險評估。建議轉診至醫學中心進行專業評估，並密切追蹤。',
        false: '缺乏足夠資料進行風險評估。建議諮詢專業醫師並定期追蹤。'
      },
      'N/A': {
        true: '缺乏足夠研究資料進行風險評估。建議轉診至醫學中心進行專業評估，並密切追蹤。',
        false: '缺乏足夠研究資料進行風險評估。建議諮詢專業醫師並定期追蹤。'
      }
    };
    
    baseRecommendation = recommendations[category][isInvasive] || '請諮詢專業醫師。';
    
    // Add special considerations for semi-invasive treatments
    if (isSemiInvasive && specialConsiderations) {
      baseRecommendation += `\n\n特別注意事項：${specialConsiderations}`;
    }
    
    return baseRecommendation;
  }

  // Get reference papers for the specific condition
  getReferencePapers(indication, medication, administrationRoute, invasiveDentalTreatment) {
    const treatmentKey = invasiveDentalTreatment ? 'YES' : 'none';
    
    // Direct lookup: indication -> medication -> route -> treatment
    const references = this.referencePapers?.[indication]?.[medication]?.[administrationRoute]?.[treatmentKey];
    
    if (references) {
      return references;
    }
    
    // Fall back to general references
    return this.getGeneralReferences(indication, medication);
  }

  // Get general references when specific ones aren't available
  getGeneralReferences(indication, medication) {
    return this.generalReferences[indication] || this.generalReferences.osteoporosis;
  }

}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MRONJRiskCalculator;
} else {
  window.MRONJRiskCalculator = MRONJRiskCalculator;
}
