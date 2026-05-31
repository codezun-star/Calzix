# Script para generar y actualizar SEO completo en TODAS las paginas .astro

param([switch]$Test = $false)

$pagesDir = 'c:\Users\Jose\calzix\src\pages'
$astroFiles = Get-ChildItem $pagesDir -Filter '*.astro' | Where-Object {
    $_.Name -notmatch '^(index|privacidad|terminos|cookies|aviso|contacto)'
}

Write-Host "Encontradas $($astroFiles.Count) paginas de calculadoras"

$descriptions = @{
    'calculadora-porcentaje' = @{
        whatIs = 'Un porcentaje es una manera de expresar un numero como parte de 100. Se utiliza el simbolo por ciento para representarlo. Por ejemplo, el 25 por ciento significa 25 de cada 100 unidades. Nuestro calculador te permite obtener instantaneamente resultados precisos para cualquier calculo de porcentajes sin necesidad de realizar operaciones manuales.'
        whyUse = 'Los porcentajes estan en todas partes: descuentos en compras, intereses bancarios, cambios de precio. Ya sea que necesites calcular un descuento en la tienda, saber que porcentaje representa una cantidad respecto a un total, o encontrar el valor original de un precio con descuento, esta herramienta te ahorra tiempo y evita errores de calculo.'
    }
}

function Generate-Description {
    param([string]$slug, [string]$name, [string]$domain)

    if ($descriptions.ContainsKey($slug)) {
        return $descriptions[$slug]
    }

    $whatIs = "La calculadora de $name es una herramienta que te permite realizar calculos precisos relacionados con $domain. Simplemente ingresa los valores requeridos y obtendras resultados al instante sin necesidad de realizar operaciones manuales complicadas."
    $whyUse = "Necesitas esta calculadora para ahorrar tiempo en calculos de $domain, evitar errores manuales, y obtener respuestas precisas cuando las necesitas. Es especialmente util en situaciones cotidianas donde necesitas resultados rapidos y confiables."

    return @{ whatIs = $whatIs; whyUse = $whyUse }
}

$processed = 0
$skipped = 0

foreach ($file in $astroFiles) {
    $slug = $file.BaseName
    $content = Get-Content $file.FullName -Raw

    if ($content -match 'whatIs=' -and $content -match 'whyUse=') {
        $skipped++
        Write-Host "[SKIP] $slug - ya tiene SEO"
        continue
    }

    $desc = Generate-Description -slug $slug -name $slug -domain 'calculo'

    $whatIsEscaped = $desc.whatIs -replace '"', '\"'
    $whyUseEscaped = $desc.whyUse -replace '"', '\"'

    if ($Test) {
        Write-Host "[TEST] $slug"
        Write-Host "  whatIs: $($desc.whatIs.Substring(0, 80))..."
    } else {
        $newContent = $content -replace '(<CalcLayout\s+slug="[^"]+")(?=\s+faqs=)',
            "`$1`n  whatIs=`"$whatIsEscaped`"`n  whyUse=`"$whyUseEscaped`""

        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "[OK] $slug - actualizado"
    }

    $processed++
}

Write-Host "`nResumen:"
Write-Host "  Procesadas: $processed"
Write-Host "  Ya tienen SEO: $skipped"
