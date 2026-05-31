# Script para corregir caracteres distorsionados en TODAS las páginas .astro
# Convierte Â¿ a ¿, Ã© a é, Ã¡ a á, etc.

$pagesDir = 'c:\Users\Jose\calzix\src\pages'
$astroFiles = Get-ChildItem $pagesDir -Filter '*.astro' | Where-Object {
    $_.Name -notmatch '^(index|privacidad|terminos|cookies|aviso|contacto)'
}

Write-Host "Procesando $($astroFiles.Count) archivos para corregir UTF-8..."

$replacements = @{
    'Â¿' = '¿'
    'Ã¡' = 'á'
    'Ã©' = 'é'
    'Ã­' = 'í'
    'Ã³' = 'ó'
    'Ãº' = 'ú'
    'Ã±' = 'ñ'
    'ÃA' = 'Á'
    'ÃC' = 'É'
    'ÃD' = 'Í'
    'Ã' = 'Ó'
    'Ã"' = 'Ú'
    'Ã ' = 'À'
    'â‚¬' = '€'
    'â€' = '–'
    'Â' = ''
}

$corrected = 0

foreach ($file in $astroFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    foreach ($broken in $replacements.Keys) {
        if ($content -like "*$broken*") {
            $content = $content -replace [regex]::Escape($broken), $replacements[$broken]
        }
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $corrected++
        Write-Host "[OK] $($file.BaseName) - caracteres corregidos"
    }
}

Write-Host "`nResumen:"
Write-Host "  Total procesados: $($astroFiles.Count)"
Write-Host "  Corregidos: $corrected"
Write-Host "`nCompilando..."
cd 'c:\Users\Jose\calzix'
npm run build 2>&1 | Select-Object -Last 5
