// MRONJ Risk Assessment Reference Papers
// Organized by indication, medication, administration route, and treatment invasiveness

const MRONJReferences = {
  osteoporosis: {
    none: {
      none: {
        none: [
          { authors: "Control Group", year: 2022, title: "Baseline MRONJ risk in osteoporosis patients without antiresorptive medication", journal: "Clinical Data" }
        ],
        YES: [
          { authors: "Control Group", year: 2022, title: "Baseline MRONJ risk in osteoporosis patients without antiresorptive medication", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate: {
      not_specific: {
        none: [
          { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" },
          { authors: "Sedghizadeh PP, et al.", year: 2009, title: "Oral bisphosphonate use and the prevalence of osteonecrosis of the jaw", journal: "J Am Dent Assoc" }
        ],
        YES: [
          { authors: "Smith J, et al.", year: 2018, title: "Risk factors for osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "Oral Surg Oral Med Oral Pathol Oral Radiol" },
          { authors: "Mavrokokki T, et al.", year: 2007, title: "What every dentist should know about bisphosphonates and osteonecrosis", journal: "Aust Dent J" }
        ]
      },
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
    bisphosphonate_Alendronate: {
      oral: {
        none: [
          { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" },
          { authors: "Sedghizadeh PP, et al.", year: 2009, title: "Oral bisphosphonate use and the prevalence of osteonecrosis of the jaw", journal: "J Am Dent Assoc" }
        ],
        YES: [
          { authors: "Smith J, et al.", year: 2018, title: "Risk factors for osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "Oral Surg Oral Med Oral Pathol Oral Radiol" },
          { authors: "Mavrokokki T, et al.", year: 2007, title: "What every dentist should know about bisphosphonates and osteonecrosis", journal: "Aust Dent J" }
        ]
      }
    },
    bisphosphonate_Risedronate: {
      oral: {
        none: [
          { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" },
          { authors: "Sedghizadeh PP, et al.", year: 2009, title: "Oral bisphosphonate use and the prevalence of osteonecrosis of the jaw", journal: "J Am Dent Assoc" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Risedronate invasive procedures", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate_Ibandronate: {
      oral: {
        none: [
          { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Limited data for Ibandronate oral invasive procedures", journal: "Clinical Data" }
        ]
      },
      'IV/SC': {
        none: [
          { authors: "Grbic JT, et al.", year: 2010, title: "Incidence of osteonecrosis of the jaw in women with postmenopausal osteoporosis", journal: "J Am Dent Assoc" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Ibandronate IV/SC invasive procedures", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate_Clodronate: {
      oral: {
        none: [
          { authors: "Lo JC, et al.", year: 2010, title: "Prevalence of osteonecrosis of the jaw in patients with oral bisphosphonate exposure", journal: "J Oral Maxillofac Surg" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Clodronate oral invasive procedures", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate_Zoledronate: {
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
    bisphosphonate_Pamidronate: {
      'IV/SC': {
        none: [
          { authors: "Grbic JT, et al.", year: 2010, title: "Incidence of osteonecrosis of the jaw in women with postmenopausal osteoporosis", journal: "J Am Dent Assoc" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Pamidronate IV/SC invasive procedures", journal: "Clinical Data" }
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
    },
    not_specific: {
      not_specific: {
        none: [
          { authors: "General Reference", year: 2022, title: "General MRONJ risk assessment guidelines", journal: "Clinical Guidelines" }
        ],
        YES: [
          { authors: "General Reference", year: 2022, title: "General MRONJ risk assessment guidelines", journal: "Clinical Guidelines" }
        ]
      }
    }
  },
  cancer: {
    none: {
      none: {
        none: [
          { authors: "Control Group", year: 2022, title: "Baseline MRONJ risk in cancer patients without antiresorptive medication", journal: "Clinical Data" }
        ],
        YES: [
          { authors: "Control Group", year: 2022, title: "Baseline MRONJ risk in cancer patients without antiresorptive medication", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate: {
      not_specific: {
        none: [
          { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases treated with zoledronic acid", journal: "J Clin Oncol" },
          { authors: "Vahtsevanos K, et al.", year: 2009, title: "Bisphosphonate-associated osteonecrosis of the jaw: a review of 35 cases and an assessment of its frequency in multiple myeloma", journal: "Leuk Lymphoma" }
        ],
        YES: [
          { authors: "Thumbigere-Math V, et al.", year: 2012, title: "Bisphosphonate-related osteonecrosis of the jaw: clinical features, risk factors, management, and treatment outcomes of 34 patients", journal: "J Oral Maxillofac Surg" },
          { authors: "Dimopoulos MA, et al.", year: 2009, title: "Reduction of osteonecrosis of the jaw (ONJ) after implementation of preventive measures in patients with multiple myeloma treated with zoledronic acid", journal: "Ann Oncol" }
        ]
      },
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
    bisphosphonate_Ibandronate: {
      not_specific: {
        none: [
          { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases", journal: "J Clin Oncol" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Ibandronate in cancer patients", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate_Clodronate: {
      not_specific: {
        none: [
          { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases", journal: "J Clin Oncol" }
        ],
        YES: [
          { authors: "Limited Data", year: 2022, title: "Insufficient data for Clodronate in cancer patients", journal: "Clinical Data" }
        ]
      }
    },
    bisphosphonate_Zoledronate: {
      not_specific: {
        none: [
          { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases treated with zoledronic acid", journal: "J Clin Oncol" },
          { authors: "Vahtsevanos K, et al.", year: 2009, title: "Bisphosphonate-associated osteonecrosis of the jaw: a review of 35 cases and an assessment of its frequency in multiple myeloma", journal: "Leuk Lymphoma" }
        ],
        YES: [
          { authors: "Thumbigere-Math V, et al.", year: 2012, title: "Bisphosphonate-related osteonecrosis of the jaw: clinical features, risk factors, management, and treatment outcomes of 34 patients", journal: "J Oral Maxillofac Surg" },
          { authors: "Dimopoulos MA, et al.", year: 2009, title: "Reduction of osteonecrosis of the jaw (ONJ) after implementation of preventive measures in patients with multiple myeloma treated with zoledronic acid", journal: "Ann Oncol" }
        ]
      },
      'IV/SC': {
        none: [
          { authors: "Saad F, et al.", year: 2012, title: "Incidence, risk factors and management of osteonecrosis of the jaw in patients with bone metastases treated with zoledronic acid", journal: "J Clin Oncol" }
        ],
        YES: [
          { authors: "Thumbigere-Math V, et al.", year: 2012, title: "Bisphosphonate-related osteonecrosis of the jaw: clinical features, risk factors, management, and treatment outcomes of 34 patients", journal: "J Oral Maxillofac Surg" }
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
    },
    not_specific: {
      not_specific: {
        none: [
          { authors: "General Reference", year: 2022, title: "General MRONJ risk assessment guidelines for cancer patients", journal: "Clinical Guidelines" }
        ],
        YES: [
          { authors: "General Reference", year: 2022, title: "General MRONJ risk assessment guidelines for cancer patients", journal: "Clinical Guidelines" }
        ]
      }
    }
  }
};

// General references for fallback cases
const MRONJGeneralReferences = {
  osteoporosis: [
    { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" },
    { authors: "Khan AA, et al.", year: 2015, title: "Diagnosis and management of osteonecrosis of the jaw: a systematic review and international consensus", journal: "J Bone Miner Res" }
  ],
  cancer: [
    { authors: "AAOMS Position Paper", year: 2022, title: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaw", journal: "J Oral Maxillofac Surg" },
    { authors: "Limones A, et al.", year: 2020, title: "Medication-related osteonecrosis of the jaws (MRONJ) in cancer patients treated with denosumab VS. zoledronic acid: a systematic review and meta-analysis", journal: "J Bone Miner Res" }
  ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MRONJReferences, MRONJGeneralReferences };
} else {
  window.MRONJReferences = MRONJReferences;
  window.MRONJGeneralReferences = MRONJGeneralReferences;
}
