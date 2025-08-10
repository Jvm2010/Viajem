
// Main app logic for roteiro: uses Leaflet for map and localStorage for persistence
// Assumes roteiro.html loads Leaflet CSS/JS and this file as module
const storageKey = 'viagem:roteiro:v1';

function haversine(a,b){
  const R=6371; // km
  const toRad = x=>x*Math.PI/180;
  const dLat = toRad(b.lat-a.lat);
  const dLon = toRad(b.lng-a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const hav = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  const c = 2*Math.atan2(Math.sqrt(hav), Math.sqrt(1-hav));
  return R*c;
}

export function loadState(){
  const raw = localStorage.getItem(storageKey);
  if(!raw) return {points:[], generalExpenses:[]};
  try{ return JSON.parse(raw); } catch(e){ return {points:[], generalExpenses:[]}; }
}
export function saveState(s){
  localStorage.setItem(storageKey, JSON.stringify(s));
}

export function formatCurrency(v){
  if(typeof v !== 'number') v = Number(v)||0;
  return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

// UI helpers
export function el(sel, text){ const e=document.createElement(sel); if(text) e.textContent=text; return e; }
