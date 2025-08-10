// Cálculo de distância usando fórmula haversine
export function haversine(a, b) {
  const R = 6371; // Raio da Terra em km
  const toRad = x => x * Math.PI / 180;
  
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const a1 = Math.sin(dLat/2) * Math.sin(dLat/2);
  const a2 = Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const a = a1 + a2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c;
}

// Calcular estatísticas da rota
export function calculateRoute(places, transportMode, fuelEfficiency, avgSpeed) {
  if (places.length < 2) {
    return {
      totalDistance: 0,
      totalTime: '0 horas',
      fuelRequired: 0,
      routeCoords: []
    };
  }
  
  let totalDistance = 0;
  const routeCoords = [];
  
  // Calcular distância total e coletar coordenadas
  for (let i = 1; i < places.length; i++) {
    const from = places[i-1];
    const to = places[i];
    const dist = haversine(from, to);
    totalDistance += dist;
    
    routeCoords.push([from.lat, from.lng]);
    routeCoords.push([to.lat, to.lng]);
  }
  
  // Calcular tempo estimado
  let totalHours = totalDistance / avgSpeed;
  let timeText;
  
  if (totalHours < 1) {
    const minutes = Math.round(totalHours * 60);
    timeText = `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    timeText = `${hours} hora${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) timeText += ` e ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }
  
  // Calcular combustível necessário (apenas para carro)
  const fuelRequired = transportMode === 'car' ? 
    totalDistance / fuelEfficiency : 0;
  
  return {
    totalDistance,
    totalTime: timeText,
    fuelRequired,
    routeCoords
  };
}

// Formatar moeda
export function formatCurrency(value) {
  if (typeof value !== 'number') value = Number(value) || 0;
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
}

// Carregar estado do localStorage
export function loadState() {
  try {
    const raw = localStorage.getItem('viagem:state');
    return raw ? JSON.parse(raw) : { places: [], expenses: [] };
  } catch (e) {
    return { places: [], expenses: [] };
  }
}

// Salvar estado no localStorage
export function saveState(state) {
  localStorage.setItem('viagem:state', JSON.stringify(state));
}