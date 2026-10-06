// GeoDEV — Atelier de Arquitectura del Territorio & Geografía
// Consultor: Maycol Sánchez Córdova
// Interactividad y Cálculos Técnicos

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = "51955048173";

  // --- 1. DIBUJO Y DINÁMICA DE TRANSECTOS TOPOGRÁFICOS (SVG PURO) ---
  const transectButtons = document.querySelectorAll('.btn-transect');
  const profilePolyline = document.getElementById('terrain-polyline');
  const profileFill = document.getElementById('terrain-fill');
  const valMaxElev = document.getElementById('val-max-elev');
  const valMinElev = document.getElementById('val-min-elev');
  const valAvgSlope = document.getElementById('val-avg-slope');
  const valLength = document.getElementById('val-length');
  const transectLabel = document.getElementById('transect-name-label');

  const transectData = {
    'AA': {
      name: "TRANSECTO A-A' // VALLE ALUVIAL Y LADERA ESCARPADAS",
      points: "0,210 60,195 130,185 200,165 270,120 340,70 410,50 480,95 550,110 620,135 690,160 760,190 800,205",
      fillPoints: "0,210 60,195 130,185 200,165 270,120 340,70 410,50 480,95 550,110 620,135 690,160 760,190 800,205 800,260 0,260",
      max: "3,480 m.s.n.m.",
      min: "2,150 m.s.n.m.",
      slope: "28.4% (Fuerte)",
      length: "14.8 km"
    },
    'BB': {
      name: "TRANSECTO B-B' // CUENCA ALTA Y QUEBRADA GLACIAR",
      points: "0,240 70,230 140,210 210,140 280,60 350,30 420,45 490,110 560,170 630,180 700,160 770,140 800,130",
      fillPoints: "0,240 70,230 140,210 210,140 280,60 350,30 420,45 490,110 560,170 630,180 700,160 770,140 800,130 800,260 0,260",
      max: "4,620 m.s.n.m.",
      min: "3,110 m.s.n.m.",
      slope: "42.1% (Muy Escarpada)",
      length: "21.5 km"
    },
    'CC': {
      name: "TRANSECTO C-C' // MESETA Y TERRAZAS ESTRUCTURALES",
      points: "0,140 80,138 160,135 240,136 320,142 400,140 480,135 560,148 640,150 720,152 800,155",
      fillPoints: "0,140 80,138 160,135 240,136 320,142 400,140 480,135 560,148 640,150 720,152 800,155 800,260 0,260",
      max: "2,840 m.s.n.m.",
      min: "2,610 m.s.n.m.",
      slope: "4.8% (Suave / Plano)",
      length: "32.0 km"
    }
  };

  transectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      transectButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-transect');
      const data = transectData[key];
      if (!data) return;

      if (profilePolyline) profilePolyline.setAttribute('points', data.points);
      if (profileFill) profileFill.setAttribute('points', data.fillPoints);
      if (valMaxElev) valMaxElev.textContent = data.max;
      if (valMinElev) valMinElev.textContent = data.min;
      if (valAvgSlope) valAvgSlope.textContent = data.slope;
      if (valLength) valLength.textContent = data.length;
      if (transectLabel) transectLabel.textContent = data.name;
    });
  });

  // --- 2. GENERADOR DE MEMORÁNDUM TÉCNICO PARA WHATSAPP ---
  const serviceSelect = document.getElementById('arch-service');
  const scopeInput = document.getElementById('arch-scope');
  const areaInput = document.getElementById('arch-area');
  const timeRadios = document.querySelectorAll('input[name="arch-timeframe"]');
  const notesText = document.getElementById('arch-notes');
  const previewBox = document.getElementById('arch-memo-preview');
  const btnSend = document.getElementById('btn-arch-send');

  const updateMemo = () => {
    const service = serviceSelect?.value || 'Sistemas de Información Geográfica (SIG)';
    const scope = scopeInput?.value?.trim() || 'Por definir';
    const area = areaInput?.value?.trim() || 'Área no especificada';

    let timeframe = 'Cronograma Estándar';
    timeRadios.forEach(r => {
      if (r.checked) timeframe = r.value;
    });

    const notes = notesText?.value?.trim() || '';

    // Formateo estilo minuta técnica formal para el Geógrafo Maycol Sánchez Córdova
    let msg = `*MEMORÁNDUM TÉCNICO // MSC Geocodex — Atelier Territorial*\n`;
    msg += `Atención: Maycol Sánchez Córdova — Geógrafo Titulado (+51 ${WHATSAPP_NUMBER})\n`;
    msg += `------------------------------------\n`;
    msg += `🏛️ *Servicio Requerido:* ${service}\n`;
    msg += `📍 *Ubicación / Proyecto:* ${scope}\n`;
    msg += `📐 *Extensión Estimada:* ${area}\n`;
    msg += `⏱️ *Plazo Operativo:* ${timeframe}\n`;
    if (notes) {
      msg += `📋 *Especificaciones Técnicas:* ${notes}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `Solicito propuesta técnica y presupuesto cartográfico. Saludos cordiales.`;

    if (previewBox) {
      previewBox.innerHTML = `
        <strong>MEMORÁNDUM TÉCNICO // MSC Geocodex — Atelier Territorial</strong><br>
        <span style="color:#79828f">------------------------------------</span><br>
        <strong>Consultor:</strong> Maycol Sánchez Córdova<br>
        🏛️ <strong>Servicio:</strong> ${service}<br>
        📍 <strong>Ubicación:</strong> ${scope}<br>
        📐 <strong>Extensión:</strong> ${area}<br>
        ⏱️ <strong>Plazo:</strong> ${timeframe}<br>
        ${notes ? `📋 <strong>Notas:</strong> ${notes}<br>` : ''}
        <span style="color:#79828f">------------------------------------</span><br>
        <em>Solicito propuesta técnica y presupuesto cartográfico.</em>
      `;
    }

    if (btnSend) {
      btnSend.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  };

  if (serviceSelect) serviceSelect.addEventListener('change', updateMemo);
  if (scopeInput) scopeInput.addEventListener('input', updateMemo);
  if (areaInput) areaInput.addEventListener('input', updateMemo);
  timeRadios.forEach(r => r.addEventListener('change', updateMemo));
  if (notesText) notesText.addEventListener('input', updateMemo);

  updateMemo();

  // Enlaces directos desde las placas de servicios al cotizador
  document.querySelectorAll('[data-select-service]').forEach(link => {
    link.addEventListener('click', () => {
      const targetService = link.getAttribute('data-select-service');
      if (serviceSelect) {
        for (let opt of serviceSelect.options) {
          if (opt.text.toLowerCase().includes(targetService.toLowerCase()) || targetService.toLowerCase().includes(opt.value.toLowerCase())) {
            serviceSelect.value = opt.value;
            break;
          }
        }
        updateMemo();
      }
    });
  });
});
