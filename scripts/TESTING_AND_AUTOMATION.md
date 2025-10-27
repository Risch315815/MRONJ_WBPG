# Testing and Automation Guide

This guide helps you understand how to use the automated testing and batch modification tools for the MRONJ Risk Assessment project.

## 📁 What's Been Created

### 1. Testing Tools

#### `tests/test-mronj-algorithm.html`
- **Purpose**: Automated test suite for the MRONJ risk calculator
- **Features**:
  - 12 comprehensive test cases
  - Visual test results with pass/fail indicators
  - Tests risk calculations, language support, data handling
  - Easy to run in any web browser

**How to use**:
```bash
# Open in browser
1. Double-click tests/test-mronj-algorithm.html
2. Click "Run All Tests" button
3. View results

# Or use with local server
python -m http.server 8000
# Then open: http://localhost:8000/tests/test-mronj-algorithm.html
```

### 2. Batch Modification Tools

#### `scripts/batch-modify.js` (Node.js - Cross-platform)
- **Purpose**: Batch modify multiple files at once
- **Features**:
  - Find files by pattern
  - Replace text with regex support
  - Add/remove lines
  - Create automatic backups
  - Dry-run mode to preview changes

**How to use**:
```bash
# Install Node.js first (if not installed)
# Download from: https://nodejs.org/

# Run the script
node scripts/batch-modify.js

# Edit the script to uncomment examples you want to run
```

#### `scripts/batch-modify.ps1` (PowerShell - Windows)
- **Purpose**: Same as above but for Windows PowerShell
- **Features**: Same functionality, Windows-native

**How to use**:
```powershell
# In PowerShell
.\scripts\batch-modify.ps1

# If you get permission error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### `scripts/example-update-print-buttons.js`
- **Purpose**: Practical example showing how to update print buttons
- **Features**: Real-world example you can adapt

### 3. Documentation

#### `scripts/README.md`
- Comprehensive guide with examples
- Troubleshooting tips
- Common use cases

---

## 🚀 Quick Start

### Running Tests

**Easiest Method** (No installation needed):
1. Open `tests/test-mronj-algorithm.html` in your browser
2. Click "Run All Tests"
3. View results

**Expected Output**:
```
📊 SUMMARY
Total Tests: 12
Passed: 12
Failed: 0
Success Rate: 100%
```

### Making Batch Changes

**Example: Update version number across all files**

**Using Node.js**:
```javascript
// Edit scripts/batch-modify.js and uncomment:
const modifier = new BatchModifier();
const allFiles = modifier.findFiles('.', /\.(html|js)$/);

// Enable dry run first to preview
modifier.dryRun = true;
modifier.replace(allFiles, /Version 1\.0\.0/g, 'Version 1.1.0');

// Then apply for real
modifier.dryRun = false;
modifier.replace(allFiles, /Version 1\.0\.0/g, 'Version 1.1.0');
```

**Using PowerShell**:
```powershell
# Edit scripts/batch-modify.ps1 and uncomment Example 2
.\scripts\batch-modify.ps1
```

---

## 📋 Common Tasks

### Task 1: Add New Test Case

Edit `tests/test-mronj-algorithm.html`:

```javascript
testRunner.addTest('My New Test', (t) => {
  const calculator = new MRONJRiskCalculator();
  const patientData = {
    hasAntiresorptiveMed: true,
    drugName: 'Denosumab',
    administrationRoute: 'IV/SC',
    hasCancer: false
  };
  
  const results = calculator.calculateRisk(patientData);
  const invasive = results.find(r => r.invasiveness === 'invasive');
  
  t.assertEqual(invasive.riskLevel, '中度風險');
  t.assertTrue(invasive.incidenceRate > 0);
});
```

### Task 2: Replace Text in All HTML Files

**Step 1: Preview changes (Dry Run)**
```javascript
const modifier = new BatchModifier();
modifier.dryRun = true; // Preview only

const htmlFiles = modifier.findFiles('.', /\.html$/);
modifier.replace(htmlFiles, 'old text', 'new text');
```

**Step 2: Create backup**
```javascript
modifier.createBackup(htmlFiles);
```

**Step 3: Apply changes**
```javascript
modifier.dryRun = false;
modifier.replace(htmlFiles, 'old text', 'new text');
```

### Task 3: Update All Reference URLs

```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

modifier.createBackup(htmlFiles);
modifier.replace(
  htmlFiles,
  /https:\/\/risch315815\.github\.io\/MRONJ_WBPG/g,
  'https://your-new-domain.com'
);
```

### Task 4: Add Analytics to All Pages

```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

const analyticsCode = `
<script>
  // Your analytics code here
</script>`;

modifier.createBackup(htmlFiles);
modifier.addText(htmlFiles, /<\/head>/, analyticsCode, 'before');
```

---

## 🛡️ Safety Best Practices

### ✅ DO:
1. **Always use dry run first**
   ```javascript
   modifier.dryRun = true; // Preview changes
   ```

2. **Create backups before modifications**
   ```javascript
   modifier.createBackup(files);
   ```

3. **Test on one file first**
   ```javascript
   modifier.replace('test.html', 'old', 'new');
   ```

4. **Use git to track changes**
   ```bash
   git add .
   git commit -m "Before batch modifications"
   # Make changes
   git diff # Review
   git commit -m "After batch modifications"
   # Or revert: git reset --hard HEAD
   ```

### ❌ DON'T:
1. Don't skip dry run mode
2. Don't modify files without backups
3. Don't test on all files at once
4. Don't forget to commit to git first

---

## 📊 Real-World Examples for Your Project

### Example 1: Fix Print Buttons Across Multiple Pages

```bash
# Run the example script
node scripts/example-update-print-buttons.js

# This will:
# 1. Fix duplicate button IDs
# 2. Update event listeners
# 3. Add dynamic title updates
```

### Example 2: Update Language Storage Key

```javascript
const modifier = new BatchModifier();
const files = [
  'index.html',
  'risk-assessment.html',
  'medication-history.html'
];

modifier.createBackup(files);
modifier.replace(
  files,
  /localStorage\.getItem\('language'\)/g,
  "localStorage.getItem('preferredLanguage')"
);
```

### Example 3: Add Meta Tags to All Pages

```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

const metaTags = `
  <meta name="description" content="MRONJ Risk Assessment Tool">
  <meta name="keywords" content="MRONJ, risk assessment, dental">
  <meta name="author" content="Your Name">
`;

modifier.createBackup(htmlFiles);
modifier.addText(htmlFiles, /<head>/, metaTags, 'after');
```

---

## 🔧 Troubleshooting

### Tests Show Errors

**Problem**: Tests fail or don't run  
**Solutions**:
- Make sure you're using a web server (not `file://`)
- Check browser console (F12) for errors
- Verify all JavaScript files are loaded correctly

### PowerShell Won't Run Script

**Problem**: "Execution policy" error  
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Command Not Found

**Problem**: `node` command not recognized  
**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node --version`

### Changes Not Applied

**Problem**: Script runs but files unchanged  
**Solutions**:
- Check if `dryRun` is set to `false`
- Verify file paths are correct
- Check file permissions
- Look for error messages in output

---

## 📚 Learn More

- **Regular Expressions**: https://regexr.com/
- **Node.js**: https://nodejs.org/docs/
- **PowerShell**: https://docs.microsoft.com/powershell/
- **Testing**: https://jestjs.io/docs/getting-started

---

## 💡 Tips

1. **Start Small**: Test on one or two files first
2. **Use Version Control**: Commit before making batch changes
3. **Read Output**: The scripts provide detailed feedback
4. **Ask for Help**: Check the examples in `scripts/README.md`
5. **Customize**: Adapt the examples to your specific needs

---

## 📞 Support

If you encounter issues:
1. Check the `scripts/README.md` for detailed documentation
2. Review error messages carefully
3. Try the examples in dry-run mode first
4. Use git to revert changes if needed: `git reset --hard HEAD`

---

**Created**: 2025-10-27  
**Version**: 1.0.0  
**Project**: MRONJ Risk Assessment Tool


