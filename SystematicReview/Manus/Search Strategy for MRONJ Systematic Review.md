# Search Strategy for MRONJ Systematic Review

## Database Selection
The following electronic databases will be searched:
1. PubMed/MEDLINE
2. Embase
3. Cochrane Library
4. Web of Science
5. Scopus
6. CINAHL

## Search Concepts
The search strategy will be built around four main concepts:

### Concept 1: MRONJ/ONJ
- Medication-related osteonecrosis of the jaw
- Bisphosphonate-related osteonecrosis of the jaw
- MRONJ
- BRONJ
- ONJ
- Osteonecrosis of the jaw
- Jaw osteonecrosis

### Concept 2: Anti-resorptive Medications
#### Bisphosphonates
- Alendronate (Fosamax)
- Risedronate (Actonel)
- Ibandronate (Boniva)
- Zoledronate/Zoledronic acid (Zometa, Reclast)
- Pamidronate (Aredia)
- Etidronate
- Clodronate
- Tiludronate
- Bisphosphonate*

#### RANK Ligand Inhibitors
- Denosumab (Prolia, Xgeva)
- RANKL inhibitor*

#### Monoclonal Antibodies
- Romosozumab
- Sclerostin antibody

### Concept 3: Underlying Conditions
#### Osteoporosis
- Osteoporosis
- Bone loss
- Bone density
- Bone mineral density
- Osteopenia

#### Cancer
- Cancer
- Malignancy
- Neoplasm
- Tumor
- Metastasis
- Multiple myeloma
- Bone metastases

#### Indication Not Specified
- Anti-resorptive therapy
- Antiresorptive medication
- Bone-modifying agents
- Bone resorption inhibitors

### Concept 4: Dental Procedures
- Dental extraction
- Tooth extraction
- Dental implant
- Implant placement
- Periodontal surgery
- Dental surgery
- Oral surgery
- Denture
- Removable prosthesis
- Root canal
- Endodontic treatment
- Invasive dental procedure

## Search Strategy Templates

### PubMed/MEDLINE Search Strategy

```
# Concept 1: MRONJ/ONJ
"Bisphosphonate-Associated Osteonecrosis of the Jaw"[Mesh] OR "osteonecrosis of the jaw"[tiab] OR "jaw osteonecrosis"[tiab] OR MRONJ[tiab] OR BRONJ[tiab] OR ONJ[tiab] OR ((medication*[tiab] OR bisphosphonate*[tiab] OR drug*[tiab]) AND osteonecrosis[tiab] AND jaw[tiab])

AND

# Concept 2: Anti-resorptive Medications
"Diphosphonates"[Mesh] OR "Denosumab"[Mesh] OR "RANK Ligand"[Mesh] OR bisphosphonate*[tiab] OR alendronate[tiab] OR risedronate[tiab] OR ibandronate[tiab] OR zoledronate[tiab] OR "zoledronic acid"[tiab] OR pamidronate[tiab] OR etidronate[tiab] OR clodronate[tiab] OR tiludronate[tiab] OR denosumab[tiab] OR Prolia[tiab] OR Xgeva[tiab] OR "RANKL inhibitor"[tiab] OR romosozumab[tiab] OR "sclerostin antibody"[tiab] OR "anti-resorptive"[tiab] OR antiresorptive[tiab]

AND

# Concept 3: Underlying Conditions
("Osteoporosis"[Mesh] OR osteoporo*[tiab] OR osteopeni*[tiab] OR "bone loss"[tiab] OR "bone density"[tiab] OR "bone mineral density"[tiab])
OR
("Neoplasms"[Mesh] OR cancer*[tiab] OR malignan*[tiab] OR neoplasm*[tiab] OR tumor*[tiab] OR tumour*[tiab] OR metasta*[tiab] OR "multiple myeloma"[tiab])

AND

# Concept 4: Dental Procedures (Optional - can be used for subgroup analysis)
"Tooth Extraction"[Mesh] OR "Dental Implants"[Mesh] OR "Periodontal Diseases/surgery"[Mesh] OR "Oral Surgical Procedures"[Mesh] OR "Dentures"[Mesh] OR "Root Canal Therapy"[Mesh] OR "dental extraction"[tiab] OR "tooth extraction"[tiab] OR "dental implant"[tiab] OR "implant placement"[tiab] OR "periodontal surgery"[tiab] OR "dental surgery"[tiab] OR "oral surgery"[tiab] OR denture*[tiab] OR "removable prosthesis"[tiab] OR "root canal"[tiab] OR "endodontic treatment"[tiab] OR "invasive dental"[tiab]

# Filters
Filters: English[lang] AND ("2003"[Date - Publication] : "3000"[Date - Publication])
```

### Embase Search Strategy

```
# Concept 1: MRONJ/ONJ
'jaw osteonecrosis'/exp OR 'jaw osteonecrosis':ti,ab OR 'osteonecrosis of the jaw':ti,ab OR mronj:ti,ab OR bronj:ti,ab OR onj:ti,ab OR ((medication*:ti,ab OR bisphosphonate*:ti,ab OR drug*:ti,ab) AND osteonecrosis:ti,ab AND jaw:ti,ab)

AND

# Concept 2: Anti-resorptive Medications
'bisphosphonic acid derivative'/exp OR 'denosumab'/exp OR 'receptor activator of nuclear factor kappa B ligand'/exp OR bisphosphonate*:ti,ab OR alendronate:ti,ab OR risedronate:ti,ab OR ibandronate:ti,ab OR zoledronate:ti,ab OR 'zoledronic acid':ti,ab OR pamidronate:ti,ab OR etidronate:ti,ab OR clodronate:ti,ab OR tiludronate:ti,ab OR denosumab:ti,ab OR prolia:ti,ab OR xgeva:ti,ab OR 'rankl inhibitor':ti,ab OR romosozumab:ti,ab OR 'sclerostin antibody':ti,ab OR 'anti-resorptive':ti,ab OR antiresorptive:ti,ab

AND

# Concept 3: Underlying Conditions
('osteoporosis'/exp OR osteoporo*:ti,ab OR osteopeni*:ti,ab OR 'bone loss':ti,ab OR 'bone density':ti,ab OR 'bone mineral density':ti,ab)
OR
('neoplasm'/exp OR cancer*:ti,ab OR malignan*:ti,ab OR neoplasm*:ti,ab OR tumor*:ti,ab OR tumour*:ti,ab OR metasta*:ti,ab OR 'multiple myeloma':ti,ab)

AND

# Concept 4: Dental Procedures (Optional - can be used for subgroup analysis)
'tooth extraction'/exp OR 'dental implant'/exp OR 'periodontal surgery'/exp OR 'oral surgery'/exp OR 'denture'/exp OR 'root canal therapy'/exp OR 'dental extraction':ti,ab OR 'tooth extraction':ti,ab OR 'dental implant':ti,ab OR 'implant placement':ti,ab OR 'periodontal surgery':ti,ab OR 'dental surgery':ti,ab OR 'oral surgery':ti,ab OR denture*:ti,ab OR 'removable prosthesis':ti,ab OR 'root canal':ti,ab OR 'endodontic treatment':ti,ab OR 'invasive dental':ti,ab

# Filters
AND [english]/lim AND [2003-3000]/py
```

## Search Documentation
For each database search, the following information will be documented:
1. Database name and interface
2. Date of search
3. Complete search strategy as executed
4. Number of records retrieved
5. Any filters or limitations applied

## Search Results Management
1. All search results will be exported to citation management software (e.g., EndNote, Zotero)
2. Duplicates will be identified and removed
3. The final number of unique records will be documented
4. Search results will be saved in a standardized format for screening

## Search Updates
The literature search will be updated prior to final analysis if the initial search was conducted more than six months before the completion of the review.

## Additional Search Methods
1. Reference lists of included studies will be manually checked for additional relevant studies
2. Reference lists of relevant systematic reviews will be screened
3. Clinical trial registries (ClinicalTrials.gov, WHO ICTRP) will be searched for ongoing or unpublished studies
4. Grey literature sources (OpenGrey, ProQuest Dissertations & Theses) will be searched for unpublished studies
