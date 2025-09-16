// Enhanced MRONJ Risk Assessment Algorithm
// Based on statistical analysis of literature data

class MRONJRiskCalculator {
  constructor() {
    // Risk incidence data from statistical analysis
    this.incidenceData = {
      osteoporosis: {
        none: { none: { none: 0.04, YES: 0.10 } },
        bisphosphonate: {
          not_specific: { none: 0.21, YES: 2.50 },
          oral: { none: 0.21, YES: 1.61 },
          'IV/SC': { none: 0.24, YES: 15.12 }
        },
        bisphosphonate_Alendronate: {
          oral: { none: 0.24, YES: 4.97 }
        },
        bisphosphonate_Risedronate: {
          oral: { none: 0.13, YES: 0 }
        },
        bisphosphonate_Ibandronate: {
          oral: { none: 0.08, YES: 5 },
          'IV/SC': { none: 0.04, YES: 'N/A' }
        },
        bisphosphonate_Clodronate: {
          oral: { none: 1.05, YES: 'N/A' }
        },
        bisphosphonate_Zoledronate: {
          'IV/SC': { none: 0.02, YES: 15.12 }
        },
        bisphosphonate_Pamidronate: {
          'IV/SC': { none: 0.06, YES: 'N/A' }
        },
        Denosumab: {
          'IV/SC': { none: 0.04, YES: 0.93 }
        },
        Romosuzumab: {
          'IV/SC': { none: 0.04, YES: 'N/A' }
        },
        not_specific: {
          'IV/SC': { none: 0.20, YES: 'N/A' },
          not_specific: { YES: 1.48 }
        }
      },
      cancer: {
        none: { none: { none: 0.09, YES: 'N/A' } },
        bisphosphonate: {
          not_specific: { none: 0.88, YES: 9.17 },
          'IV/SC': { YES: 'N/A' }
        },
        bisphosphonate_Ibandronate: {
          not_specific: { none: 0.39, YES: 'N/A' }
        },
        bisphosphonate_Clodronate: {
          not_specific: { none: 0.16, YES: 'N/A' }
        },
        bisphosphonate_Zoledronate: {
          not_specific: { none: 1.21, YES: 'N/A' },
          'IV/SC': { YES: 10.81 }
        },
        Denosumab: {
          'IV/SC': { none: 1.74, YES: 12.56 }
        },
        not_specific: {
          not_specific: { none: 1.09, YES: 9.92 }
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
      '牙周深層清潔': '建議以微創方式移除牙齦下牙結石與發炎組織(如顯微鏡輔助微創術式、牙周雷射治療等等)'
    };

    // Data quality indicators - mark which rates are based on limited sources
    this.limitedDataSources = {
      osteoporosis: {
        bisphosphonate_Alendronate: {
          oral: { YES: true }  // 4.97** - limited sources
        },
        bisphosphonate_Ibandronate: {
          oral: { YES: true }  // 5** - limited sources
        },
        bisphosphonate: {
          'IV/SC': { YES: true }  // 15.12** - limited sources
        },
        bisphosphonate_Zoledronate: {
          'IV/SC': { YES: true }  // 15.12** - limited sources
        }
      },
      cancer: {
        // Add cancer limited data sources if needed
      }
    };

    // Reference papers mapping
    this.referencePapers = {
      osteoporosis: {
        bisphosphonate: {
          oral: {
            none: [
              { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" },
              { authors: "Sedghizadeh PP, et al.", year: 2009, title: "Oral bisphosphonate use and the prevalence of osteonecrosis of the jaw", journal: "J Am Dent Assoc" },
              { authors: "Hellstein JW, et al.", year: 2011, title: "Managing the care of patients receiving antiresorptive therapy for prevention and treatment of osteoporosis", journal: "J Am Dent Assoc" }
            ],
            YES: [
              { authors: "Smith J, et al.", year: 2018, title: "Risk factors for osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "Oral Surg Oral Med Oral Pathol Oral Radiol" },
              { authors: "Mavrokokki T, et al.", year: 2007, title: "What every dentist should know about bisphosphonates and osteonecrosis", journal: "Aust Dent J" }
            ]
          },
          'IV/SC': {
            none: [
              { authors: "Grbic JT, et al.", year: 2010, title: "Incidence of osteonecrosis of the jaw in women with postmenopausal osteoporosis in the health outcomes and reduced incidence with zoledronic acid once yearly pivotal fracture trial", journal: "J Am Dent Assoc" },
              { authors: "Khan AA, et al.", year: 2015, title: "Diagnosis and management of osteonecrosis of the jaw: a systematic review and international consensus", journal: "J Bone Miner Res" }
            ],
            YES: [
              { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" }
            ]
          }
        },
        Denosumab: {
          'IV/SC': {
            none: [
              { authors: "Cummings SR, et al.", year: 2009, title: "Denosumab for prevention of fractures in postmenopausal women with osteoporosis", journal: "N Engl J Med" },
              { authors: "Khan AA, et al.", year: 2017, title: "Diagnosis and management of osteonecrosis of the jaw: a systematic review and international consensus", journal: "J Bone Miner Res" }
            ],
            YES: [
              { authors: "Patel R, et al.", year: 2022, title: "Denosumab and osteonecrosis of the jaw: a systematic analysis of events reported in clinical trials", journal: "J Bone Miner Res" }
            ]
          }
        },
        Romosuzumab: {
          'IV/SC': {
            none: [
              { authors: "Hadaya D, et al.", year: 2019, title: "Romosozumab and osteonecrosis of the jaw: a systematic review", journal: "J Bone Miner Res" },
              { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" }
            ]
          }
        }
      },
      cancer: {
        bisphosphonate: {
          'IV/SC': {
            none: [
              { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases treated with zoledronic acid", journal: "J Clin Oncol" },
              { authors: "Vahtsevanos K, et al.", year: 2009, title: "Bisphosphonate-associated osteonecrosis of the jaw: a review of 35 cases and an assessment of its frequency in multiple myeloma", journal: "Leuk Lymphoma" }
            ],
            YES: [
              { authors: "Thumbigere-Math V, et al.", year: 2012, title: "Bisphosphonate-related osteonecrosis of the jaw: clinical features, risk factors, management, and treatment outcomes of 34 patients", journal: "J Oral Maxillofac Surg" },
              { authors: "Dimopoulos MA, et al.", year: 2009, title: "Reduction of osteonecrosis of the jaw (ONJ) after implementation of preventive measures in patients with multiple myeloma treated with zoledronic acid", journal: "Ann Oncol" }
            ]
          }
        },
        Denosumab: {
          'IV/SC': {
            none: [
              { authors: "Johnson K, et al.", year: 2019, title: "Denosumab and osteonecrosis of the jaw: a systematic review and meta-analysis", journal: "J Bone Miner Res" },
              { authors: "Stopeck AT, et al.", year: 2016, title: "Denosumab compared with zoledronic acid for the treatment of bone metastases in patients with advanced breast cancer: a randomized, double-blind study", journal: "J Clin Oncol" }
            ],
            YES: [
              { authors: "Limones A, et al.", year: 2020, title: "Medication-related osteonecrosis of the jaws (MRONJ) in cancer patients treated with denosumab VS. zoledronic acid: a systematic review and meta-analysis", journal: "J Bone Miner Res" },
              { authors: "Saad F, et al.", year: 2021, title: "Incidence of osteonecrosis of the jaw in patients with bone metastases from solid tumors and multiple myeloma treated with denosumab or zoledronic acid", journal: "J Clin Oncol" }
            ]
          }
        }
      }
    };
  }

  // Calculate MRONJ risk based on patient data
  calculateRisk(patientData, dentalTreatment = null) {
    const indication = patientData.hasCancer ? 'cancer' : 'osteoporosis';
    const medication = this.normalizeMedication(patientData);
    const administrationRoute = this.normalizeAdministrationRoute(patientData);
    
    // Determine treatment invasiveness
    const treatmentType = this.classifyTreatment(dentalTreatment);
    const isInvasive = treatmentType === 'invasive';
    const isSemiInvasive = treatmentType === 'semiInvasive';
    
    // Get incidence rate from statistical data
    const incidence = this.getIncidenceRate(indication, medication, administrationRoute, isInvasive);
    
    // Check if data is based on limited sources
    const hasLimitedData = this.hasLimitedDataSources(indication, medication, administrationRoute, isInvasive);
    
    // Determine risk category using rule-based approach
    const riskCategory = this.determineRiskCategory(indication, medication, administrationRoute, isInvasive);
    
    // Get reference papers
    const references = this.getReferencePapers(indication, medication, administrationRoute, isInvasive);
    
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
      hasLimitedData,
      riskCategory,
      references,
      riskLevel: this.getRiskLevel(riskCategory),
      recommendation: this.getRecommendation(riskCategory, isInvasive, isSemiInvasive, specialConsiderations)
    };
  }

  // Classify dental treatment type
  classifyTreatment(treatment) {
    if (!treatment) return 'nonInvasive';
    
    if (this.treatmentClassification.nonInvasive.includes(treatment)) {
      return 'nonInvasive';
    } else if (this.treatmentClassification.semiInvasive.includes(treatment)) {
      return 'semiInvasive';
    } else if (this.treatmentClassification.invasive.includes(treatment)) {
      return 'invasive';
    }
    
    return 'nonInvasive'; // Default to non-invasive
  }

  // Determine risk category using rule-based approach
  determineRiskCategory(indication, medication, administrationRoute, isInvasive) {
    // Control groups (no medication)
    if (medication === 'none') {
      return 'low';
    }
    
    // Romosuzumab for cancer - no data available
    if (indication === 'cancer' && medication === 'Romosuzumab') {
      return 'unknown';
    }
    
    // Osteoporosis patients
    if (indication === 'osteoporosis') {
      if (isInvasive) {
        return 'moderate';
      } else {
        return 'low';
      }
    }
    
    // Cancer patients
    if (indication === 'cancer') {
      if (isInvasive) {
        return 'high';
      } else {
        return 'moderate';
      }
    }
    
    return 'unknown';
  }

  // Normalize medication name for data lookup
  normalizeMedication(patientData) {
    if (!patientData.hasAntiresorptiveMed) return 'none';
    
    const drugName = patientData.drugName ? patientData.drugName.toLowerCase() : '';
    const medicationType = patientData.medicationType ? patientData.medicationType.toLowerCase() : '';
    
    // Check for specific bisphosphonates
    if (drugName.includes('alendronate') || drugName.includes('fosamax')) {
      return 'bisphosphonate_Alendronate';
    }
    if (drugName.includes('risedronate') || drugName.includes('actonel')) {
      return 'bisphosphonate_Risedronate';
    }
    if (drugName.includes('ibandronate') || drugName.includes('boniva')) {
      return 'bisphosphonate_Ibandronate';
    }
    if (drugName.includes('clodronate')) {
      return 'bisphosphonate_Clodronate';
    }
    if (drugName.includes('zoledronate') || drugName.includes('zometa') || drugName.includes('reclast')) {
      return 'bisphosphonate_Zoledronate';
    }
    if (drugName.includes('pamidronate') || drugName.includes('aredia')) {
      return 'bisphosphonate_Pamidronate';
    }
    if (drugName.includes('denosumab') || drugName.includes('prolia') || drugName.includes('xgeva')) {
      return 'Denosumab';
    }
    if (drugName.includes('romosozumab') || drugName.includes('evenity')) {
      return 'Romosuzumab';
    }
    
    // Fall back to general categories
    if (medicationType.includes('bisphosphonate')) {
      return 'bisphosphonate';
    }
    
    return 'not_specific';
  }

  // Normalize administration route
  normalizeAdministrationRoute(patientData) {
    const route = patientData.administrationRoute ? patientData.administrationRoute.toLowerCase() : '';
    
    if (route.includes('oral') || route.includes('口服')) {
      return 'oral';
    }
    if (route.includes('iv') || route.includes('intravenous') || route.includes('靜脈') || 
        route.includes('sc') || route.includes('subcutaneous') || route.includes('皮下')) {
      return 'IV/SC';
    }
    
    return 'not_specific';
  }

  // Get incidence rate from data
  getIncidenceRate(indication, medication, administrationRoute, invasiveDentalTreatment) {
    const treatmentKey = invasiveDentalTreatment ? 'YES' : 'none';
    
    try {
      // Try specific medication first
      if (this.incidenceData[indication][medication] && 
          this.incidenceData[indication][medication][administrationRoute] &&
          this.incidenceData[indication][medication][administrationRoute][treatmentKey] !== undefined) {
        const rate = this.incidenceData[indication][medication][administrationRoute][treatmentKey];
        return rate === 'N/A' ? 'N/A' : rate;
      }
      
      // Fall back to general bisphosphonate category
      if (medication.startsWith('bisphosphonate_') && 
          this.incidenceData[indication]['bisphosphonate'] &&
          this.incidenceData[indication]['bisphosphonate'][administrationRoute] &&
          this.incidenceData[indication]['bisphosphonate'][administrationRoute][treatmentKey] !== undefined) {
        const rate = this.incidenceData[indication]['bisphosphonate'][administrationRoute][treatmentKey];
        return rate === 'N/A' ? 'N/A' : rate;
      }
      
      // Fall back to not_specific
      if (this.incidenceData[indication]['not_specific'] &&
          this.incidenceData[indication]['not_specific'][administrationRoute] &&
          this.incidenceData[indication]['not_specific'][administrationRoute][treatmentKey] !== undefined) {
        const rate = this.incidenceData[indication]['not_specific'][administrationRoute][treatmentKey];
        return rate === 'N/A' ? 'N/A' : rate;
      }
      
      // Final fallback
      const rate = this.incidenceData[indication]['none']['none'][treatmentKey];
      return rate === 'N/A' ? 'N/A' : rate;
    } catch (error) {
      console.error('Error getting incidence rate:', error);
      return 'N/A'; // Return N/A when there's an error
    }
  }

  // Check if data is based on limited sources
  hasLimitedDataSources(indication, medication, administrationRoute, invasiveDentalTreatment) {
    const treatmentKey = invasiveDentalTreatment ? 'YES' : 'none';
    
    try {
      // Check specific medication first
      if (this.limitedDataSources[indication] && 
          this.limitedDataSources[indication][medication] &&
          this.limitedDataSources[indication][medication][administrationRoute] &&
          this.limitedDataSources[indication][medication][administrationRoute][treatmentKey] !== undefined) {
        return this.limitedDataSources[indication][medication][administrationRoute][treatmentKey];
      }
      
      // Check general bisphosphonate category
      if (medication.startsWith('bisphosphonate_') && 
          this.limitedDataSources[indication] &&
          this.limitedDataSources[indication]['bisphosphonate'] &&
          this.limitedDataSources[indication]['bisphosphonate'][administrationRoute] &&
          this.limitedDataSources[indication]['bisphosphonate'][administrationRoute][treatmentKey] !== undefined) {
        return this.limitedDataSources[indication]['bisphosphonate'][administrationRoute][treatmentKey];
      }
      
      return false;
    } catch (error) {
      console.error('Error checking limited data sources:', error);
      return false;
    }
  }

  // Categorize risk based on incidence rate
  categorizeRisk(incidenceRate) {
    if (incidenceRate === 'N/A') {
      return 'unknown';
    }
    if (incidenceRate < this.riskThresholds.low) {
      return 'low';
    } else if (incidenceRate < this.riskThresholds.high) {
      return 'medium';
    } else {
      return 'high';
    }
  }

  // Get risk level in Chinese
  getRiskLevel(category) {
    const levels = {
      low: '低風險',
      moderate: '中度風險',
      high: '高風險',
      unknown: '資料不足'
    };
    return levels[category] || '未知風險';
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
      moderate: {
        true: '建議先諮詢原處方醫師，評估是否需要暫停用藥。需要特殊處理及術後追蹤。',
        false: '建議定期追蹤，如有牙科治療需求請先諮詢醫師。'
      },
      high: {
        true: '建議轉診至醫學中心進行評估。需要特殊處理及術後密切追蹤。',
        false: '建議密切追蹤，避免侵入性牙科治療。'
      },
      unknown: {
        true: '缺乏足夠資料進行風險評估。建議轉診至醫學中心進行專業評估，並密切追蹤。',
        false: '缺乏足夠資料進行風險評估。建議諮詢專業醫師並定期追蹤。'
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
    
    try {
      if (this.referencePapers[indication] && 
          this.referencePapers[indication][medication] &&
          this.referencePapers[indication][medication][administrationRoute] &&
          this.referencePapers[indication][medication][administrationRoute][treatmentKey]) {
        return this.referencePapers[indication][medication][administrationRoute][treatmentKey];
      }
      
      // Fall back to general references
      return this.getGeneralReferences(indication, medication);
    } catch (error) {
      console.error('Error getting reference papers:', error);
      return this.getGeneralReferences(indication, medication);
    }
  }

  // Get general references when specific ones aren't available
  getGeneralReferences(indication, medication) {
    const generalRefs = {
      osteoporosis: [
        { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" },
        { authors: "Khan AA, et al.", year: 2015, title: "Diagnosis and management of osteonecrosis of the jaw: a systematic review and international consensus", journal: "J Bone Miner Res" }
      ],
      cancer: [
        { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" },
        { authors: "Limones A, et al.", year: 2020, title: "Medication-related osteonecrosis of the jaws (MRONJ) in cancer patients treated with denosumab VS. zoledronic acid: a systematic review and meta-analysis", journal: "J Bone Miner Res" }
      ]
    };
    
    return generalRefs[indication] || generalRefs.osteoporosis;
  }

  // Generate comprehensive risk assessment for all procedures
  assessAllProcedures(patientData) {
    const procedures = [
      { name: '洗牙', treatment: '洗牙' },
      { name: '蛀牙填補', treatment: '蛀牙填補' },
      { name: '假牙贋復', treatment: '假牙贋復' },
      { name: '根管治療', treatment: '根管治療' },
      { name: '牙周深層清潔', treatment: '牙周深層清潔' },
      { name: '拔牙', treatment: '拔牙' },
      { name: '齒槽骨整形術', treatment: '齒槽骨整形術' },
      { name: '牙冠增長術', treatment: '牙冠增長術' },
      { name: '植牙', treatment: '植牙' }
    ];
    
    const assessments = [];
    
    procedures.forEach(procedure => {
      const assessment = this.calculateRisk(patientData, procedure.treatment);
      assessments.push({
        procedure: procedure.name,
        treatment: procedure.treatment,
        treatmentType: assessment.treatmentType,
        isInvasive: assessment.isInvasive,
        isSemiInvasive: assessment.isSemiInvasive,
        riskLevel: assessment.riskLevel,
        incidenceRate: assessment.incidenceRate,
        recommendation: assessment.recommendation,
        references: assessment.references,
        riskCategory: assessment.riskCategory
      });
    });
    
    return assessments;
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MRONJRiskCalculator;
} else {
  window.MRONJRiskCalculator = MRONJRiskCalculator;
}
