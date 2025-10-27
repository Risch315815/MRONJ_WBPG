#!/usr/bin/env node

/**
 * Batch File Modification Script
 * 
 * This script helps you modify multiple files at once.
 * 
 * Usage:
 *   node scripts/batch-modify.js
 * 
 * Or make it executable:
 *   chmod +x scripts/batch-modify.js
 *   ./scripts/batch-modify.js
 */

const fs = require('fs');
const path = require('path');

class BatchModifier {
  constructor() {
    this.changes = [];
    this.dryRun = false; // Set to true to preview changes without applying them
  }

  /**
   * Find all files matching a pattern
   * @param {string} directory - Directory to search
   * @param {RegExp} pattern - File pattern to match (e.g., /\.html$/)
   * @param {Array} excludePatterns - Patterns to exclude (e.g., ['node_modules', '.git'])
   */
  findFiles(directory, pattern, excludePatterns = ['node_modules', '.git', 'dist']) {
    const files = [];
    
    function searchDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        // Skip excluded patterns
        if (excludePatterns.some(excluded => fullPath.includes(excluded))) {
          continue;
        }
        
        if (stat.isDirectory()) {
          searchDirectory(fullPath);
        } else if (pattern.test(item)) {
          files.push(fullPath);
        }
      }
    }
    
    searchDirectory(directory);
    return files;
  }

  /**
   * Replace text in files
   * @param {string|Array} files - File path(s) to modify
   * @param {string|RegExp} searchText - Text to search for
   * @param {string|Function} replaceWith - Replacement text or function
   * @param {object} options - Additional options
   */
  replace(files, searchText, replaceWith, options = {}) {
    const fileList = Array.isArray(files) ? files : [files];
    let totalChanges = 0;
    
    fileList.forEach(filePath => {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent;
        
        if (typeof searchText === 'string') {
          if (options.replaceAll) {
            newContent = content.split(searchText).join(replaceWith);
          } else {
            newContent = content.replace(searchText, replaceWith);
          }
        } else if (searchText instanceof RegExp) {
          newContent = content.replace(searchText, replaceWith);
        }
        
        if (newContent !== content) {
          const change = {
            file: filePath,
            before: content,
            after: newContent,
            linesChanged: this._countChangedLines(content, newContent)
          };
          
          this.changes.push(change);
          totalChanges++;
          
          if (!this.dryRun) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Modified: ${filePath} (${change.linesChanged} lines changed)`);
          } else {
            console.log(`🔍 [DRY RUN] Would modify: ${filePath} (${change.linesChanged} lines changed)`);
          }
        } else {
          console.log(`⏭️  Skipped (no changes): ${filePath}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    });
    
    return totalChanges;
  }

  /**
   * Add text before/after a pattern
   * @param {string|Array} files - File path(s) to modify
   * @param {string|RegExp} pattern - Pattern to match
   * @param {string} text - Text to add
   * @param {string} position - 'before' or 'after'
   */
  addText(files, pattern, text, position = 'after') {
    const fileList = Array.isArray(files) ? files : [files];
    let totalChanges = 0;
    
    fileList.forEach(filePath => {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent;
        
        if (position === 'before') {
          newContent = content.replace(pattern, `${text}$&`);
        } else {
          newContent = content.replace(pattern, `$&${text}`);
        }
        
        if (newContent !== content) {
          this.changes.push({
            file: filePath,
            before: content,
            after: newContent
          });
          totalChanges++;
          
          if (!this.dryRun) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Modified: ${filePath}`);
          } else {
            console.log(`🔍 [DRY RUN] Would modify: ${filePath}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    });
    
    return totalChanges;
  }

  /**
   * Remove lines matching a pattern
   * @param {string|Array} files - File path(s) to modify
   * @param {string|RegExp} pattern - Pattern to match for removal
   */
  removeLines(files, pattern) {
    const fileList = Array.isArray(files) ? files : [files];
    let totalChanges = 0;
    
    fileList.forEach(filePath => {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let lines = content.split('\n');
        let newLines = lines.filter(line => {
          if (typeof pattern === 'string') {
            return !line.includes(pattern);
          } else {
            return !pattern.test(line);
          }
        });
        
        let newContent = newLines.join('\n');
        
        if (newContent !== content) {
          this.changes.push({
            file: filePath,
            before: content,
            after: newContent
          });
          totalChanges++;
          
          if (!this.dryRun) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Modified: ${filePath} (${lines.length - newLines.length} lines removed)`);
          } else {
            console.log(`🔍 [DRY RUN] Would modify: ${filePath} (${lines.length - newLines.length} lines would be removed)`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    });
    
    return totalChanges;
  }

  /**
   * Create a backup of files before modification
   * @param {string|Array} files - File path(s) to backup
   */
  createBackup(files) {
    const fileList = Array.isArray(files) ? files : [files];
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupDir = path.join(process.cwd(), 'backups', timestamp);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fileList.forEach(filePath => {
      const fileName = path.basename(filePath);
      const backupPath = path.join(backupDir, fileName);
      fs.copyFileSync(filePath, backupPath);
      console.log(`💾 Backed up: ${fileName} → ${backupPath}`);
    });
    
    return backupDir;
  }

  /**
   * Generate a diff report
   */
  generateReport() {
    if (this.changes.length === 0) {
      console.log('\n📊 No changes were made.');
      return;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log(`📊 MODIFICATION REPORT - ${this.changes.length} file(s) modified`);
    console.log('='.repeat(80));
    
    this.changes.forEach((change, index) => {
      console.log(`\n${index + 1}. ${change.file}`);
      if (change.linesChanged) {
        console.log(`   Lines changed: ${change.linesChanged}`);
      }
    });
    
    console.log('\n' + '='.repeat(80));
  }

  /**
   * Count changed lines between two strings
   */
  _countChangedLines(before, after) {
    const beforeLines = before.split('\n');
    const afterLines = after.split('\n');
    let changes = 0;
    
    for (let i = 0; i < Math.max(beforeLines.length, afterLines.length); i++) {
      if (beforeLines[i] !== afterLines[i]) {
        changes++;
      }
    }
    
    return changes;
  }
}

// ============================================================================
// EXAMPLE USAGE - Modify these examples for your needs
// ============================================================================

function main() {
  console.log('🚀 Batch File Modification Script\n');
  
  const modifier = new BatchModifier();
  
  // Enable dry run to preview changes without applying them
  modifier.dryRun = false; // Set to true to preview only
  
  // -------------------------------------------------------------------------
  // Example 1: Replace text in all HTML files
  // -------------------------------------------------------------------------
  console.log('📝 Example 1: Replacing old URL with new URL in all HTML files\n');
  
  const htmlFiles = modifier.findFiles('.', /\.html$/);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  
  // Uncomment to run this example:
  // modifier.createBackup(htmlFiles); // Create backup first
  // modifier.replace(
  //   htmlFiles,
  //   'http://oldurl.com',
  //   'http://newurl.com',
  //   { replaceAll: true }
  // );
  
  // -------------------------------------------------------------------------
  // Example 2: Add copyright notice to all JavaScript files
  // -------------------------------------------------------------------------
  console.log('\n📝 Example 2: Adding copyright notice to JS files\n');
  
  // Uncomment to run this example:
  // const jsFiles = modifier.findFiles('./assets/js', /\.js$/);
  // const copyright = '// Copyright 2025 MRONJ Risk Assessment Tool\n';
  // modifier.addText(jsFiles, /^/, copyright, 'before');
  
  // -------------------------------------------------------------------------
  // Example 3: Update version number across all files
  // -------------------------------------------------------------------------
  console.log('\n📝 Example 3: Updating version numbers\n');
  
  // Uncomment to run this example:
  // const allFiles = modifier.findFiles('.', /\.(html|js|json)$/);
  // modifier.replace(
  //   allFiles,
  //   /Version 1\.0\.0/g,
  //   'Version 1.1.0',
  //   { replaceAll: true }
  // );
  
  // -------------------------------------------------------------------------
  // Example 4: Remove debugging console.log statements
  // -------------------------------------------------------------------------
  console.log('\n📝 Example 4: Removing debug console.log statements\n');
  
  // Uncomment to run this example:
  // const jsFiles = modifier.findFiles('./assets/js', /\.js$/);
  // modifier.removeLines(jsFiles, /console\.log\(/);
  
  // -------------------------------------------------------------------------
  // Example 5: Update language toggle functionality
  // -------------------------------------------------------------------------
  console.log('\n📝 Example 5: Custom modification example\n');
  
  // Uncomment to run this example:
  // const files = ['index.html', 'risk-assessment.html', 'medication-history.html'];
  // modifier.createBackup(files);
  // modifier.replace(
  //   files,
  //   /localStorage\.getItem\('language'\)/g,
  //   "localStorage.getItem('preferredLanguage')",
  //   { replaceAll: true }
  // );
  
  // -------------------------------------------------------------------------
  // Generate Report
  // -------------------------------------------------------------------------
  modifier.generateReport();
  
  console.log('\n✨ Done! To run the examples, uncomment the code blocks above.');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = BatchModifier;


