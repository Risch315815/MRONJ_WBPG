# Testing and Batch Modification Tools

This directory contains tools for automated testing and batch file modifications.

## 📋 Table of Contents

1. [Automated Testing](#automated-testing)
2. [Batch File Modification](#batch-file-modification)
3. [Usage Examples](#usage-examples)

---

## 🧪 Automated Testing

### Test File Location
- **HTML Test Runner**: `tests/test-mronj-algorithm.html`

### How to Run Tests

#### Method 1: Open in Browser (Recommended)
1. Open `tests/test-mronj-algorithm.html` in your web browser
2. Click the "▶️ Run All Tests" button
3. View test results with pass/fail indicators

#### Method 2: Command Line (with local server)
```bash
# Start a local server in your project root
python -m http.server 8000
# or
npx http-server

# Then open browser to:
http://localhost:8000/tests/test-mronj-algorithm.html
```

### Test Coverage

The test suite includes:
- ✅ Calculator initialization
- ✅ Osteoporosis risk calculations
- ✅ Cancer risk calculations
- ✅ Different medication types (Bisphosphonate, Denosumab, etc.)
- ✅ Administration route normalization
- ✅ Risk category determination
- ✅ Semi-invasive treatment handling
- ✅ English language support
- ✅ N/A data handling
- ✅ Reference paper loading

### Adding New Tests

```javascript
testRunner.addTest('Your Test Name', (t) => {
  // Your test code here
  const calculator = new MRONJRiskCalculator();
  const result = calculator.calculateRisk(patientData);
  
  // Assertions
  t.assertEqual(result.riskLevel, '低風險');
  t.assertTrue(result.incidenceRate > 0);
  t.assertNotNull(result.references);
});
```

### Available Assertion Methods
- `assertEqual(actual, expected, message)` - Check equality
- `assertTrue(condition, message)` - Check if true
- `assertNotNull(value, message)` - Check if not null/undefined

---

## 🔧 Batch File Modification

### Available Scripts

#### 1. Node.js Script (Cross-platform)
**File**: `scripts/batch-modify.js`

**Prerequisites**:
```bash
# Install Node.js if you haven't already
# Download from: https://nodejs.org/
```

**Usage**:
```bash
# Run the script
node scripts/batch-modify.js

# Or make it executable (Linux/Mac)
chmod +x scripts/batch-modify.js
./scripts/batch-modify.js
```

#### 2. PowerShell Script (Windows)
**File**: `scripts/batch-modify.ps1`

**Usage**:
```powershell
# Run in PowerShell
.\scripts\batch-modify.ps1

# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📚 Usage Examples

### Example 1: Replace Text Across Multiple Files

**Node.js**:
```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

// Create backup first
modifier.createBackup(htmlFiles);

// Replace old URL with new URL
modifier.replace(
  htmlFiles,
  'http://oldurl.com',
  'http://newurl.com',
  { replaceAll: true }
);
```

**PowerShell**:
```powershell
$files = Get-ChildItem -Path . -Filter *.html -Recurse
foreach ($file in $files) {
    (Get-Content $file.FullName) -replace 'http://oldurl.com', 'http://newurl.com' | 
    Set-Content $file.FullName
}
```

### Example 2: Update Version Numbers

**Node.js**:
```javascript
const modifier = new BatchModifier();
const files = modifier.findFiles('.', /\.(html|js)$/);

modifier.replace(
  files,
  /Version 1\.0\.0/g,
  'Version 1.1.0'
);
```

**PowerShell**:
```powershell
Get-ChildItem -Include *.html,*.js -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace 'Version 1\.0\.0', 'Version 1.1.0' |
    Set-Content $_.FullName
}
```

### Example 3: Add Header/Footer to Files

**Node.js**:
```javascript
const modifier = new BatchModifier();
const jsFiles = modifier.findFiles('./assets/js', /\.js$/);

const copyright = '// Copyright 2025 - MRONJ Risk Assessment Tool\n';
modifier.addText(jsFiles, /^/, copyright, 'before');
```

**PowerShell**:
```powershell
$copyright = "// Copyright 2025 - MRONJ Risk Assessment Tool`n"
Get-ChildItem -Path .\assets\js -Filter *.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $copyright + $content
    Set-Content $_.FullName -Value $newContent
}
```

### Example 4: Remove Debug Statements

**Node.js**:
```javascript
const modifier = new BatchModifier();
const jsFiles = modifier.findFiles('./assets/js', /\.js$/);

// Remove all console.log lines
modifier.removeLines(jsFiles, /console\.log\(/);
```

**PowerShell**:
```powershell
Get-ChildItem -Path .\assets\js -Filter *.js | ForEach-Object {
    (Get-Content $_.FullName) | Where-Object { $_ -notmatch 'console\.log\(' } |
    Set-Content $_.FullName
}
```

### Example 5: Dry Run (Preview Changes)

**Node.js**:
```javascript
const modifier = new BatchModifier();
modifier.dryRun = true; // Enable dry run

const htmlFiles = modifier.findFiles('.', /\.html$/);
modifier.replace(htmlFiles, 'old text', 'new text');

// This will show what WOULD be changed without actually changing it
```

---

## 🛡️ Best Practices

### 1. Always Create Backups
```javascript
// Before making changes
modifier.createBackup(files);
```

### 2. Use Dry Run First
```javascript
// Preview changes
modifier.dryRun = true;
modifier.replace(files, 'old', 'new');

// Then apply for real
modifier.dryRun = false;
modifier.replace(files, 'old', 'new');
```

### 3. Test on Single File First
```javascript
// Test on one file
modifier.replace('test-file.html', 'old', 'new');

// If successful, apply to all
modifier.replace(allFiles, 'old', 'new');
```

### 4. Use Version Control (Git)
```bash
# Commit current state before batch modifications
git add .
git commit -m "Before batch modifications"

# Run your batch script
node scripts/batch-modify.js

# Review changes
git diff

# If good, commit
git add .
git commit -m "Applied batch modifications"

# If bad, revert
git reset --hard HEAD
```

---

## 🚨 Common Use Cases for Your Project

### Update GitHub Pages URL
```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

modifier.replace(
  htmlFiles,
  /risch315815\.github\.io\/MRONJ_WBPG/g,
  'new-domain.com'
);
```

### Add Google Analytics to All Pages
```javascript
const modifier = new BatchModifier();
const htmlFiles = modifier.findFiles('.', /\.html$/);

const analytics = `
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`;

modifier.addText(htmlFiles, /<\/head>/, analytics, 'before');
```

### Update Language Toggle Implementation
```javascript
const modifier = new BatchModifier();
const files = [
  'index.html',
  'risk-assessment.html',
  'medication-history.html',
  'patient-info.html'
];

modifier.replace(
  files,
  /localStorage\.getItem\('language'\)/g,
  "localStorage.getItem('preferredLanguage')"
);
```

---

## 📊 Troubleshooting

### Tests Not Running
- **Issue**: Tests show errors
- **Solution**: Make sure you're running from a web server (not `file://` protocol)
- **Solution**: Check browser console for detailed error messages

### Batch Script Permission Error (Windows)
```powershell
# Run this in PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Not Found
```bash
# Install Node.js from https://nodejs.org/
# Then verify installation:
node --version
npm --version
```

### Changes Not Applied
- Check file paths are correct
- Ensure you have write permissions
- Verify `dryRun` is set to `false`
- Check if pattern is matching correctly

---

## 📝 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PowerShell Documentation](https://docs.microsoft.com/powershell/)
- [Regular Expressions Guide](https://regexr.com/)
- [Testing Best Practices](https://jestjs.io/docs/getting-started)

---

**Created for**: MRONJ Risk Assessment Tool  
**Version**: 1.0.0  
**Last Updated**: 2025-10-27


