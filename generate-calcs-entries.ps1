# Script para generar las entradas de calcs.ts para todos los grupos

$grupos = @{
  "Ciencias" = @(
    @{slug="segunda-ley-newton"; name="Segunda Ley de Newton"; domain="fisica"; icon="Zap"},
    @{slug="energia-cinetica"; name="Energía Cinética"; domain="fisica"; icon="Zap"},
    @{slug="energia-potencial"; name="Energía Potencial"; domain="fisica"; icon="Zap"},
    @{slug="ley-ohm"; name="Ley de Ohm"; domain="fisica"; icon="Zap"},
    @{slug="potencia-electrica"; name="Potencia Eléctrica"; domain="fisica"; icon="Zap"},
    @{slug="caida-libre"; name="Caída Libre"; domain="fisica"; icon="Zap"},
    @{slug="presion-hidrostatica"; name="Presión Hidrostática"; domain="fisica"; icon="Zap"},
    @{slug="frecuencia-onda"; name="Frecuencia de Onda"; domain="fisica"; icon="Zap"},
    @{slug="calor-especifico"; name="Calor Específico"; domain="fisica"; icon="Zap"},
    @{slug="calculadora-ph"; name="Calculadora de pH"; domain="quimica"; icon="FlaskConical"},
    @{slug="mol-masa-molar"; name="Mol y Masa Molar"; domain="quimica"; icon="FlaskConical"},
    @{slug="gas-ideal"; name="Gas Ideal"; domain="quimica"; icon="FlaskConical"},
    @{slug="formula-molecular"; name="Fórmula Molecular"; domain="quimica"; icon="FlaskConical"},
    @{slug="diluciones-quimica"; name="Diluciones Química"; domain="quimica"; icon="FlaskConical"},
    @{slug="estequiometria"; name="Estequiometría"; domain="quimica"; icon="FlaskConical"},
    @{slug="solucion-concentracion"; name="Solución y Concentración"; domain="quimica"; icon="FlaskConical"},
    @{slug="equilibrio-quimico"; name="Equilibrio Químico"; domain="quimica"; icon="FlaskConical"},
    @{slug="numero-oxidacion"; name="Número de Oxidación"; domain="quimica"; icon="FlaskConical"}
  )
}

foreach ($grupo in $grupos.GetEnumerator()) {
  Write-Host ""
  Write-Host "// -- $($grupo.Name) --"
  foreach ($calc in $grupo.Value) {
    $desc = $calc.name + " - calculadora online"
    $relatedStr = "['calculadora-porcentaje', 'media-mediana-moda']"
    Write-Host "  `{"
    Write-Host "    slug: '$($calc.slug)',"
    Write-Host "    name: '$($calc.name)',"
    Write-Host "    description: 'Calcula $($calc.name.ToLower()) al instante. Gratis, sin registro.',"
    Write-Host "    longDescription: 'Herramienta gratuita para calcular $($calc.name.ToLower()) online. Resultados inmediatos.',"
    Write-Host "    category: '$($calc.name)',"
    Write-Host "    domain: '$($calc.domain)',"
    Write-Host "    icon: '$($calc.icon)',"
    Write-Host "    related: $relatedStr,"
    Write-Host "  `},"
  }
}
