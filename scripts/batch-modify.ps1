# Batch File Modification Script (PowerShell)
# For Windows users
#
# Usage: .\scripts\batch-modify.ps1
#
# If you get execution policy error, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

param(
    [switch]$DryRun = $false
)

Write-Host "🚀 Batch File Modification Script (PowerShell)`n" -ForegroundColor Cyan

# Configuration
$ProjectRoot = $PSScriptRoot + "\.."
$BackupDir = "$ProjectRoot\backups"

# Counters
$Global:FilesModified = 0
$Global:TotalChanges = 0

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "📝 $Message" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Create-Backup {
    param(
        [string[]]$Files
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $backupPath = "$BackupDir\$timestamp"
    
    if (-not (Test-Path $backupPath)) {
        New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
    }
    
    foreach ($file in $Files) {
        if (Test-Path $file) {
            $fileName = Split-Path $file -Leaf
            Copy-Item $file "$backupPath\$fileName"
            Write-Host "💾 Backed up: $fileName" -ForegroundColor Gray
        }
    }
    
    Write-Success "Backup created at: $backupPath"
    return $backupPath
}

function Replace-InFiles {
    param(
        [string[]]$Files,
        [string]$SearchPattern,
        [string]$ReplaceWith,
        [switch]$UseRegex = $false
    )
    
    $changesCount = 0
    
    foreach ($file in $Files) {
        if (-not (Test-Path $file)) {
            Write-Warning "File not found: $file"
            continue
        }
        
        try {
            $content = Get-Content $file -Raw
            $newContent = $content
            
            if ($UseRegex) {
                $newContent = $content -replace $SearchPattern, $ReplaceWith
            } else {
                $newContent = $content.Replace($SearchPattern, $ReplaceWith)
            }
            
            if ($newContent -ne $content) {
                $changesCount++
                $Global:FilesModified++
                
                if ($DryRun) {
                    Write-Host "🔍 [DRY RUN] Would modify: $file" -ForegroundColor Yellow
                } else {
                    Set-Content -Path $file -Value $newContent -NoNewline
                    Write-Success "Modified: $file"
                }
            } else {
                Write-Host "⏭️  Skipped (no changes): $file" -ForegroundColor Gray
            }
        }
        catch {
            Write-Error "Error processing $file : $_"
        }
    }
    
    return $changesCount
}

function Add-TextToFiles {
    param(
        [string[]]$Files,
        [string]$SearchPattern,
        [string]$TextToAdd,
        [string]$Position = "after"  # "before" or "after"
    )
    
    $changesCount = 0
    
    foreach ($file in $Files) {
        if (-not (Test-Path $file)) {
            Write-Warning "File not found: $file"
            continue
        }
        
        try {
            $content = Get-Content $file -Raw
            
            if ($Position -eq "before") {
                $newContent = $content -replace $SearchPattern, "$TextToAdd`$&"
            } else {
                $newContent = $content -replace $SearchPattern, "`$&$TextToAdd"
            }
            
            if ($newContent -ne $content) {
                $changesCount++
                $Global:FilesModified++
                
                if ($DryRun) {
                    Write-Host "🔍 [DRY RUN] Would modify: $file" -ForegroundColor Yellow
                } else {
                    Set-Content -Path $file -Value $newContent -NoNewline
                    Write-Success "Modified: $file"
                }
            }
        }
        catch {
            Write-Error "Error processing $file : $_"
        }
    }
    
    return $changesCount
}

function Remove-LinesFromFiles {
    param(
        [string[]]$Files,
        [string]$Pattern,
        [switch]$UseRegex = $true
    )
    
    $changesCount = 0
    
    foreach ($file in $Files) {
        if (-not (Test-Path $file)) {
            Write-Warning "File not found: $file"
            continue
        }
        
        try {
            $lines = Get-Content $file
            $originalCount = $lines.Count
            
            if ($UseRegex) {
                $newLines = $lines | Where-Object { $_ -notmatch $Pattern }
            } else {
                $newLines = $lines | Where-Object { $_ -notlike "*$Pattern*" }
            }
            
            $removedCount = $originalCount - $newLines.Count
            
            if ($removedCount -gt 0) {
                $changesCount++
                $Global:FilesModified++
                
                if ($DryRun) {
                    Write-Host "🔍 [DRY RUN] Would modify: $file ($removedCount lines would be removed)" -ForegroundColor Yellow
                } else {
                    Set-Content -Path $file -Value $newLines
                    Write-Success "Modified: $file ($removedCount lines removed)"
                }
            } else {
                Write-Host "⏭️  Skipped (no matching lines): $file" -ForegroundColor Gray
            }
        }
        catch {
            Write-Error "Error processing $file : $_"
        }
    }
    
    return $changesCount
}

function Find-Files {
    param(
        [string]$Path = ".",
        [string]$Filter = "*",
        [string[]]$Exclude = @("node_modules", ".git", "dist", "backups")
    )
    
    $files = Get-ChildItem -Path $Path -Filter $Filter -Recurse -File | 
        Where-Object { 
            $filePath = $_.FullName
            $shouldInclude = $true
            foreach ($pattern in $Exclude) {
                if ($filePath -like "*$pattern*") {
                    $shouldInclude = $false
                    break
                }
            }
            $shouldInclude
        } | 
        Select-Object -ExpandProperty FullName
    
    return $files
}

# ============================================================================
# EXAMPLE MODIFICATIONS
# ============================================================================

function Show-Examples {
    Write-Info "`n=== AVAILABLE EXAMPLES ===`n"
    Write-Host "Uncomment the example you want to run in the script file:`n"
    Write-Host "1. Replace URL across all HTML files"
    Write-Host "2. Update version numbers"
    Write-Host "3. Add copyright notice to JavaScript files"
    Write-Host "4. Remove debug console.log statements"
    Write-Host "5. Update language preference key"
    Write-Host "`n"
}

# ============================================================================
# MAIN SCRIPT
# ============================================================================

if ($DryRun) {
    Write-Warning "🔍 DRY RUN MODE - No files will be modified"
}

Write-Host ""

# -------------------------------------------------------------------------
# Example 1: Replace URL in all HTML files
# -------------------------------------------------------------------------
<#
Write-Info "Example 1: Replacing old URL with new URL in all HTML files`n"

$htmlFiles = Find-Files -Path $ProjectRoot -Filter "*.html"
Write-Host "Found $($htmlFiles.Count) HTML files`n"

# Uncomment to run:
# Create-Backup -Files $htmlFiles
# $changes = Replace-InFiles -Files $htmlFiles -SearchPattern "http://oldurl.com" -ReplaceWith "http://newurl.com"
# Write-Success "Modified $changes files"
#>

# -------------------------------------------------------------------------
# Example 2: Update version numbers
# -------------------------------------------------------------------------
<#
Write-Info "`nExample 2: Updating version numbers`n"

$files = Find-Files -Path $ProjectRoot -Filter "*.html"
$files += Find-Files -Path $ProjectRoot -Filter "*.js"

# Uncomment to run:
# Create-Backup -Files $files
# $changes = Replace-InFiles -Files $files -SearchPattern "Version 1.0.0" -ReplaceWith "Version 1.1.0" -UseRegex
# Write-Success "Modified $changes files"
#>

# -------------------------------------------------------------------------
# Example 3: Add copyright notice to JavaScript files
# -------------------------------------------------------------------------
<#
Write-Info "`nExample 3: Adding copyright notice to JS files`n"

$jsFiles = Find-Files -Path "$ProjectRoot\assets\js" -Filter "*.js"
$copyright = "// Copyright 2025 - MRONJ Risk Assessment Tool`n`n"

# Uncomment to run:
# Create-Backup -Files $jsFiles
# $changes = Add-TextToFiles -Files $jsFiles -SearchPattern "^" -TextToAdd $copyright -Position "before"
# Write-Success "Modified $changes files"
#>

# -------------------------------------------------------------------------
# Example 4: Remove debug console.log statements
# -------------------------------------------------------------------------
<#
Write-Info "`nExample 4: Removing debug console.log statements`n"

$jsFiles = Find-Files -Path "$ProjectRoot\assets\js" -Filter "*.js"

# Uncomment to run:
# Create-Backup -Files $jsFiles
# $changes = Remove-LinesFromFiles -Files $jsFiles -Pattern "console\.log\("
# Write-Success "Modified $changes files"
#>

# -------------------------------------------------------------------------
# Example 5: Update language preference storage key
# -------------------------------------------------------------------------
<#
Write-Info "`nExample 5: Updating localStorage key for language`n"

$files = @(
    "$ProjectRoot\index.html",
    "$ProjectRoot\risk-assessment.html",
    "$ProjectRoot\medication-history.html",
    "$ProjectRoot\patient-info.html"
)

# Uncomment to run:
# Create-Backup -Files $files
# $changes = Replace-InFiles -Files $files -SearchPattern "localStorage.getItem('language')" -ReplaceWith "localStorage.getItem('preferredLanguage')"
# Write-Success "Modified $changes files"
#>

# -------------------------------------------------------------------------
# Show available examples
# -------------------------------------------------------------------------
Show-Examples

# -------------------------------------------------------------------------
# Summary
# -------------------------------------------------------------------------
Write-Host "`n" + ("=" * 80)
Write-Host "📊 SUMMARY"
Write-Host ("=" * 80)

if ($DryRun) {
    Write-Warning "DRY RUN: No files were actually modified"
} else {
    Write-Info "Files modified: $Global:FilesModified"
}

Write-Host "`n✨ Done! To run the examples, uncomment the code blocks above.`n"

# Instructions
Write-Host "To actually modify files:" -ForegroundColor Yellow
Write-Host "  1. Open this script in a text editor"
Write-Host "  2. Uncomment the example you want to run"
Write-Host "  3. Save and run the script again"
Write-Host "  4. Or disable dry run: .\batch-modify.ps1 -DryRun:`$false`n"


