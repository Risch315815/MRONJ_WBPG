#!/usr/bin/env node

/**
 * Example: Update Print Buttons Across Multiple Pages
 * 
 * This is a practical example showing how to update print button implementation
 * across multiple HTML files in your MRONJ project.
 * 
 * Usage:
 *   node scripts/example-update-print-buttons.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DRY_RUN = true; // Set to false to actually apply changes
const CREATE_BACKUP = true;

// Files to modify
const filesToModify = [
  'risk-assessment.html',
  'oral-hygiene-instruction.html',
  'medication-summary.html'
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createBackup(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(process.cwd(), 'backups', timestamp);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const fileName = path.basename(filePath);
  const backupPath = path.join(backupDir, fileName);
  
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, backupPath);
    log(`💾 Backed up: ${fileName} → ${backupPath}`, 'blue');
  }
}

function updatePrintButton(filePath) {
  log(`\n📄 Processing: ${filePath}`, 'blue');
  
  if (!fs.existsSync(filePath)) {
    log(`   ⏭️  File not found, skipping`, 'yellow');
    return false;
  }
  
  try {
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Change 1: Fix duplicate print button IDs
    const oldButtons = '<button id="print-btn" class="btn btn-primary zh-text">列印評估報告</button>\n        <button id="print-btn" class="btn btn-primary en-text"';
    const newButtons = '<button id="print-btn" class="btn btn-primary zh-text">列印評估報告</button>\n        <button id="print-btn-en" class="btn btn-primary en-text"';
    
    if (content.includes(oldButtons)) {
      content = content.replace(oldButtons, newButtons);
      log(`   ✓ Fixed duplicate button IDs`, 'green');
      modified = true;
    }
    
    // Change 2: Update event listener to handle both buttons
    const oldListener = `      document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
      });`;
    
    const newListener = `      const printBtnZh = document.getElementById('print-btn');
      const printBtnEn = document.getElementById('print-btn-en');
      if (printBtnZh) {
        printBtnZh.addEventListener('click', function() {
          window.print();
        });
      }
      if (printBtnEn) {
        printBtnEn.addEventListener('click', function() {
          window.print();
        });
      }`;
    
    if (content.includes(oldListener)) {
      content = content.replace(oldListener, newListener);
      log(`   ✓ Updated event listeners`, 'green');
      modified = true;
    }
    
    // Change 3: Add dynamic title update for print filename
    const titleUpdateCode = `      // Update document title with patient name (for print filename)
      const patientName = patientData.name || 'Patient';
      if (savedLang === 'en') {
        document.title = \`MRONJ Risk Assessment Result - \${patientName}\`;
      } else {
        document.title = \`MRONJ風險評估結果 - \${patientName}\`;
      }`;
    
    // Check if this code already exists
    if (!content.includes('Update document title with patient name')) {
      // Find the place to insert (after checking patient data exists)
      const insertAfter = 'return;\n      }';
      if (content.includes(insertAfter)) {
        content = content.replace(insertAfter, `${insertAfter}\n      \n${titleUpdateCode}`);
        log(`   ✓ Added dynamic title update`, 'green');
        modified = true;
      }
    }
    
    // Apply changes
    if (modified) {
      if (DRY_RUN) {
        log(`   🔍 [DRY RUN] Would save changes to ${filePath}`, 'yellow');
      } else {
        fs.writeFileSync(filePath, content, 'utf8');
        log(`   ✅ Saved changes to ${filePath}`, 'green');
      }
      return true;
    } else {
      log(`   ⏭️  No changes needed`, 'blue');
      return false;
    }
    
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    return false;
  }
}

// Main execution
function main() {
  log('\n🚀 Update Print Buttons Script\n', 'blue');
  
  if (DRY_RUN) {
    log('⚠️  DRY RUN MODE - No files will be modified\n', 'yellow');
  }
  
  let modifiedCount = 0;
  
  for (const file of filesToModify) {
    if (CREATE_BACKUP && !DRY_RUN) {
      createBackup(file);
    }
    
    if (updatePrintButton(file)) {
      modifiedCount++;
    }
  }
  
  // Summary
  log('\n' + '='.repeat(80), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(80), 'blue');
  log(`Files processed: ${filesToModify.length}`);
  log(`Files modified: ${modifiedCount}`);
  
  if (DRY_RUN) {
    log('\n💡 To apply changes for real:', 'yellow');
    log('   1. Edit this script and set DRY_RUN = false', 'yellow');
    log('   2. Run the script again: node scripts/example-update-print-buttons.js\n', 'yellow');
  } else {
    log('\n✅ All changes have been applied!\n', 'green');
  }
}

// Run the script
main();


