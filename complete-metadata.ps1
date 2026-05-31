# Script para generar todas las entradas de calcs.ts y seo.ts para Grupos 2-9

# Definir todas las calculadoras con sus metadatos
$calculadoras = @(
  # GRUPO 2: Ciencias (18)
  @{slug="segunda-ley-newton"; name="Segunda Ley de Newton"; desc="Calcula fuerzas, aceleración y masa usando F = m * a."; longDesc="Introduce dos de las tres variables y obtén la tercera."; domain="fisica"; category="Física"; icon="Zap"; related=@("energia-cinetica","velocidad-distancia-tiempo","caida-libre")},
  @{slug="energia-cinetica"; name="Energía Cinética"; desc="Calcula la energía cinética de un objeto en movimiento."; longDesc="Introduce masa y velocidad para obtener Ec = 1/2 * m * v²."; domain="fisica"; category="Física"; icon="Zap"; related=@("energia-potencial","segunda-ley-newton","velocidad-distancia-tiempo")},
  @{slug="energia-potencial"; name="Energía Potencial"; desc="Calcula la energía potencial gravitatoria."; longDesc="Introduce masa, gravedad y altura para Ep = m * g * h."; domain="fisica"; category="Física"; icon="Zap"; related=@("energia-cinetica","segunda-ley-newton","caida-libre")},
  @{slug="ley-ohm"; name="Ley de Ohm"; desc="Calcula voltaje, corriente o resistencia."; longDesc="Introduce dos variables de V = I * R y obtén la tercera."; domain="fisica"; category="Física"; icon="Zap"; related=@("potencia-electrica","consumo-electrico","cable-electrico")},
  @{slug="potencia-electrica"; name="Potencia Eléctrica"; desc="Calcula la potencia eléctrica de un dispositivo."; longDesc="Introduce voltaje e intensidad para obtener vatios."; domain="fisica"; category="Física"; icon="Zap"; related=@("ley-ohm","consumo-electrico","conversor-energia")},
  @{slug="caida-libre"; name="Caída Libre"; desc="Calcula tiempo, velocidad o altura en caída libre."; longDesc="Resuelve variables con gravedad de 9.81 m/s²."; domain="fisica"; category="Física"; icon="Zap"; related=@("energia-potencial","segunda-ley-newton","velocidad-distancia-tiempo")},
  @{slug="presion-hidrostatica"; name="Presión Hidrostática"; desc="Calcula presión en un fluido a cierta profundidad."; longDesc="Introduce densidad, gravedad y profundidad."; domain="fisica"; category="Física"; icon="Wind"; related=@("conversor-presion","ley-ohm","consumo-agua")},
  @{slug="frecuencia-onda"; name="Frecuencia de Onda"; desc="Calcula frecuencia, longitud o velocidad de onda."; longDesc="Usa la relación v = f * λ para resolver."; domain="fisica"; category="Física"; icon="Zap"; related=@("velocidad-distancia-tiempo","conversor-velocidad","potencia-electrica")},
  @{slug="calor-especifico"; name="Calor Específico"; desc="Calcula energía térmica necesaria para calentar."; longDesc="Introduce masa, calor específico y cambio de temperatura."; domain="fisica"; category="Física"; icon="Zap"; related=@("conversor-temperatura","conversor-energia","energia-potencial")},
  @{slug="calculadora-ph"; name="Calculadora de pH"; desc="Calcula el pH a partir de iones H⁺."; longDesc="Introduce concentración molar de hidrógeno."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("concentracion-molar","mol-masa-molar","gas-ideal")},
  @{slug="mol-masa-molar"; name="Mol y Masa Molar"; desc="Calcula moles, masa y masa molar."; longDesc="Convierte entre moles y gramos usando masa molar."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("concentracion-molar","calculadora-ph","gas-ideal")},
  @{slug="gas-ideal"; name="Gas Ideal"; desc="Calcula propiedades usando la ley del gas ideal."; longDesc="Usa PV = nRT para resolver problemas de gases."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("calculadora-ph","mol-masa-molar","diluciones-quimica")},
  @{slug="formula-molecular"; name="Fórmula Molecular"; desc="Determina fórmula a partir de composición."; longDesc="Calcula proporciones atómicas en compuestos."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("mol-masa-molar","estequiometria","numero-oxidacion")},
  @{slug="diluciones-quimica"; name="Diluciones Química"; desc="Calcula concentración tras dilución."; longDesc="Usa M1V1 = M2V2 para disoluciones."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("solucion-concentracion","calculadora-ph","concentracion-molar")},
  @{slug="estequiometria"; name="Estequiometría"; desc="Calcula reactivos y productos en reacciones."; longDesc="Resuelve proporciones molares en reacciones químicas."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("formula-molecular","mol-masa-molar","numero-oxidacion")},
  @{slug="solucion-concentracion"; name="Solución y Concentración"; desc="Calcula concentración de disoluciones."; longDesc="Obtén molariedad, normalidad u otras unidades."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("diluciones-quimica","calculadora-ph","concentracion-molar")},
  @{slug="equilibrio-quimico"; name="Equilibrio Químico"; desc="Calcula constantes y concentraciones en equilibrio."; longDesc="Resuelve problemas de equilibrio químico."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("solucion-concentracion","calculadora-ph","gas-ideal")},
  @{slug="numero-oxidacion"; name="Número de Oxidación"; desc="Determina números de oxidación en compuestos."; longDesc="Asigna estados de oxidación a elementos."; domain="quimica"; category="Química"; icon="FlaskConical"; related=@("formula-molecular","estequiometria","equilibrio-quimico")},

  # GRUPO 3: Conversión (8)
  @{slug="conversor-potencia"; name="Conversor de Potencia"; desc="Convierte W, kW, HP, CV y más."; longDesc="Transforma entre unidades de potencia."; domain="energia"; category="Energía y potencia"; icon="Battery"; related=@("conversor-energia","consumo-electrico","potencia-electrica")},
  @{slug="conversor-fuerza"; name="Conversor de Fuerza"; desc="Convierte N, kN, dina, kgf y más."; longDesc="Transforma entre unidades de fuerza."; domain="presion"; category="Presión"; icon="Wind"; related=@("conversor-presion","segunda-ley-newton","ley-ohm")},
  @{slug="conversor-densidad"; name="Conversor de Densidad"; desc="Convierte kg/m³, g/cm³, lb/ft³."; longDesc="Transforma entre unidades de densidad."; domain="peso"; category="Peso y masa"; icon="Weight"; related=@("conversor-peso","conversor-volumen","presion-hidrostatica")},
  @{slug="conversor-caudal"; name="Conversor de Caudal"; desc="Convierte L/s, m³/h, ft³/s."; longDesc="Transforma entre unidades de flujo volumétrico."; domain="volumen"; category="Volumen y capacidad"; icon="Box"; related=@("conversor-volumen","conversor-velocidad","presion-hidrostatica")},
  @{slug="conversor-par-motor"; name="Conversor de Par Motor"; desc="Convierte N·m, kgf·m, lbf·ft."; longDesc="Transforma entre unidades de torque."; domain="presion"; category="Presión"; icon="Wind"; related=@("conversor-fuerza","segunda-ley-newton","potencia-electrica")},
  @{slug="conversor-eficiencia"; name="Conversor de Eficiencia"; desc="Convierte porcentaje, ratio, dB."; longDesc="Transforma entre escalas de eficiencia."; domain="velocidad"; category="Velocidad"; icon="Gauge"; related=@("conversor-potencia","rentabilidad-roi","margen-beneficio")},
  @{slug="conversor-frecuencia"; name="Conversor de Frecuencia"; desc="Convierte Hz, kHz, MHz, GHz."; longDesc="Transforma entre unidades de frecuencia."; domain="tiempo"; category="Tiempo y duración"; icon="Clock"; related=@("conversor-tiempo","frecuencia-onda","velocidad-distancia-tiempo")},
  @{slug="conversor-iluminacion"; name="Conversor de Iluminación"; desc="Convierte lux, fc, lm/m²."; longDesc="Transforma entre unidades de luminancia."; domain="datos"; category="Datos digitales"; icon="HardDrive"; related=@("conversor-energia","consumo-electrico","ahorro-energetico")},

  # GRUPO 4: Hogar (14)
  @{slug="presupuesto-obra"; name="Presupuesto de Obra"; desc="Estima coste total de un proyecto."; longDesc="Calcula materiales, mano de obra y contingencias."; domain="construccion"; category="Construcción"; icon="Hammer"; related=@("materiales-construccion","cemento-mortero","baldosas-suelo")},
  @{slug="cemento-mortero"; name="Cemento y Mortero"; desc="Calcula cantidades de cemento y mortero."; longDesc="Estima materiales para construcción."; domain="construccion"; category="Construcción"; icon="Hammer"; related=@("presupuesto-obra","materiales-construccion","conversor-densidad")},
  @{slug="baldosas-suelo"; name="Baldosas de Suelo"; desc="Calcula número de baldosas necesarias."; longDesc="Estima cobertura y desperdicio de baldosas."; domain="construccion"; category="Construcción"; icon="Hammer"; related=@("presupuesto-obra","conversor-area","materiales-construccion")},
  @{slug="pintura-techos"; name="Pintura de Techos"; desc="Calcula pintura para techos."; longDesc="Estima litros necesarios con rendimiento."; domain="pintura"; category="Pintura y superficies"; icon="Paintbrush"; related=@("calculadora-pintura","pintura-exterior","materiales-construccion")},
  @{slug="pintura-exterior"; name="Pintura Exterior"; desc="Calcula pintura para fachadas."; longDesc="Estima cobertura exterior con múltiples capas."; domain="pintura"; category="Pintura y superficies"; icon="Paintbrush"; related=@("pintura-techos","calculadora-pintura","conversor-area")},
  @{slug="circuito-electrico"; name="Circuito Eléctrico"; desc="Calcula parámetros de circuitos."; longDesc="Resuelve tensión, intensidad, resistencia."; domain="electricidad"; category="Electricidad del hogar"; icon="Zap"; related=@("ley-ohm","cable-electrico","potencia-electrica")},
  @{slug="cable-electrico"; name="Cable Eléctrico"; desc="Calcula sección de cable necesaria."; longDesc="Determina grosor según potencia y distancia."; domain="electricidad"; category="Electricidad del hogar"; icon="Zap"; related=@("circuito-electrico","potencia-electrica","ley-ohm")},
  @{slug="instalacion-solar-hogar"; name="Instalación Solar Hogar"; desc="Calcula sistema solar para vivienda."; longDesc="Estima potencia y número de paneles."; domain="electricidad"; category="Electricidad del hogar"; icon="Sun"; related=@("ahorro-solar","potencia-electrica","consumo-electrico")},
  @{slug="amortizacion-hipoteca"; name="Amortización Hipoteca"; desc="Calcula cuota y amortización mensual."; longDesc="Desglose de capital e intereses por mes."; domain="hipoteca"; category="Hipoteca y alquiler"; icon="Home"; related=@("calculadora-hipoteca","alquiler-vs-compra","punto-equilibrio")},
  @{slug="alquiler-vs-compra"; name="Alquiler vs Compra"; desc="Compara economía de alquilar vs comprar."; longDesc="Análisis financiero a largo plazo."; domain="hipoteca"; category="Hipoteca y alquiler"; icon="Home"; related=@("amortizacion-hipoteca","calculadora-hipoteca","rentabilidad-roi")},
  @{slug="factura-gas"; name="Factura de Gas"; desc="Calcula coste de consumo de gas."; longDesc="Estima gasto mensual por consumo."; domain="consumo"; category="Consumo energético"; icon="Leaf"; related=@("ahorro-energetico","consumo-electrico","conversor-energia")},
  @{slug="consumo-agua-hogar"; name="Consumo Agua Hogar"; desc="Calcula consumo diario de agua."; longDesc="Estima litros y coste mensual."; domain="consumo"; category="Consumo energético"; icon="Droplets"; related=@("consumo-agua","ahorro-energetico","factura-gas")},
  @{slug="riego-jardin"; name="Riego de Jardín"; desc="Calcula sistema de riego óptimo."; longDesc="Estima tiempo y cantidad de agua."; domain="jardin"; category="Jardín y terreno"; icon="Sprout"; related=@("area-jardin","consumo-agua-hogar","fertilizante-jardin")},
  @{slug="fertilizante-jardin"; name="Fertilizante Jardín"; desc="Calcula dosis de fertilizante."; longDesc="Estima cantidad según área y tipo."; domain="jardin"; category="Jardín y terreno"; icon="Sprout"; related=@("riego-jardin","area-jardin","consumo-agua")},
)

Write-Host "Procesando $($calculadoras.Count) calculadoras..."

# Generar contenido para calcs.ts
$calcsContent = ""
foreach ($calc in $calculadoras) {
  $relatedStr = "'$($calc.related -join "', '")'".Replace("'", """")
  $calcsContent += "  {`n"
  $calcsContent += "    slug: '$($calc.slug)',`n"
  $calcsContent += "    name: '$($calc.name)',`n"
  $calcsContent += "    description: '$($calc.desc.Replace("""", "\"""))',`n"
  $calcsContent += "    longDescription: '$($calc.longDesc.Replace("""", "\"""))',`n"
  $calcsContent += "    category: '$($calc.category)',`n"
  $calcsContent += "    domain: '$($calc.domain)',`n"
  $calcsContent += "    icon: '$($calc.icon)',`n"
  $calcsContent += "    related: [$relatedStr],`n"
  $calcsContent += "  },`n"
}

# Generar contenido para seo.ts
$seoContent = ""
foreach ($calc in $calculadoras) {
  $seoContent += "  '$($calc.slug)': {`n"
  $seoContent += "    title: 'Calculadora de $($calc.name) — Calzix',`n"
  $seoContent += "    description: '$($calc.desc) Gratis, sin registro.',`n"
  $seoContent += "    canonical: 'https://calzix.com/$($calc.slug)',`n"
  $seoContent += "  },`n"
}

# Guardar en archivos temporales
$calcsContent | Out-File "calcs-new-entries.txt" -Encoding UTF8
$seoContent | Out-File "seo-new-entries.txt" -Encoding UTF8

Write-Host "Archivos generados:"
Write-Host "- calcs-new-entries.txt"
Write-Host "- seo-new-entries.txt"
