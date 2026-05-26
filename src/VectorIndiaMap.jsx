import React, { useEffect, useMemo, useState } from 'react';

function getStateName(properties = {}) {
  return properties.name || properties.NAME_1 || properties.ST_NM || properties.st_nm || properties.State_Name || properties.state || properties.STATE || properties.NAME || properties.NAME1 || '';
}

function normalizeName(name = '') {
  return String(name).trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function eachPoint(geometry, visit) {
  if (!geometry) return;
  const walk = (value) => {
    if (!Array.isArray(value)) return;
    if (typeof value[0] === 'number' && typeof value[1] === 'number') {
      visit(value);
      return;
    }
    for (const child of value) walk(child);
  };
  walk(geometry.coordinates);
}

function ringsForGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return geometry.coordinates || [];
  if (geometry.type === 'MultiPolygon') return (geometry.coordinates || []).flatMap((polygon) => polygon || []);
  return [];
}

function boundsFor(features) {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const feature of features) {
    eachPoint(feature.geometry, ([lng, lat]) => {
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;
      minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
    });
  }
  if (![minLng, maxLng, minLat, maxLat].every(Number.isFinite)) return null;
  return { minLng, maxLng, minLat, maxLat };
}

function makeProjector(bounds, width = 900, height = 980, pad = 28) {
  const lngSpan = bounds.maxLng - bounds.minLng || 1;
  const latSpan = bounds.maxLat - bounds.minLat || 1;
  const scale = Math.min((width - pad * 2) / lngSpan, (height - pad * 2) / latSpan);
  const drawnWidth = lngSpan * scale;
  const drawnHeight = latSpan * scale;
  const offsetX = (width - drawnWidth) / 2;
  const offsetY = (height - drawnHeight) / 2;
  return ([lng, lat]) => [offsetX + (lng - bounds.minLng) * scale, offsetY + (bounds.maxLat - lat) * scale];
}

function ringToPath(ring, project) {
  if (!Array.isArray(ring) || ring.length < 3) return '';
  return ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ') + ' Z';
}

function geometryToPath(geometry, project) {
  return ringsForGeometry(geometry).map((ring) => ringToPath(ring, project)).filter(Boolean).join(' ');
}

function centroid(feature, project) {
  let count = 0, sumLng = 0, sumLat = 0;
  eachPoint(feature.geometry, ([lng, lat]) => {
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;
    sumLng += lng; sumLat += lat; count += 1;
  });
  if (!count) return [0, 0];
  return project([sumLng / count, sumLat / count]);
}

export default function VectorIndiaMap({ states, selected, visited, onPick }) {
  const [geoJson, setGeoJson] = useState(null);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('/india-states.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load india-states.geojson');
        return response.json();
      })
      .then(setGeoJson)
      .catch((err) => setError(err.message));
  }, []);

  const stateByName = useMemo(() => Object.fromEntries(states.map((state) => [normalizeName(state.name), state])), [states]);
  const features = useMemo(() => Array.isArray(geoJson?.features) ? geoJson.features : [], [geoJson]);
  const mapData = useMemo(() => {
    if (!features.length) return null;
    const bounds = boundsFor(features);
    if (!bounds) return null;
    return { project: makeProjector(bounds) };
  }, [features]);

  const zoomIn = () => setZoom((z) => Math.min(4, Number((z + 0.25).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))));
  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const nudge = (dx, dy) => setPan((p) => ({ x: p.x + dx, y: p.y + dy }));

  if (error) return <div className="vector-map-wrap"><p className="message">Map error: {error}</p></div>;
  if (!geoJson) return <div className="vector-map-wrap loading-map">Loading India map…</div>;
  if (!mapData) return <div className="vector-map-wrap"><p className="message">GeoJSON loaded, but no drawable state coordinates were found.</p></div>;

  return (
    <div className="vector-map-wrap">
      <div className="map-controls" aria-label="Map zoom controls">
        <button onClick={zoomOut} disabled={zoom <= 1}>−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn} disabled={zoom >= 4}>+</button>
        <button onClick={resetZoom}>Reset</button>
        {zoom > 1 && <>
          <button onClick={() => nudge(0, -45)}>↑</button>
          <button onClick={() => nudge(-45, 0)}>←</button>
          <button onClick={() => nudge(45, 0)}>→</button>
          <button onClick={() => nudge(0, 45)}>↓</button>
        </>}
      </div>
      <svg className="vector-india-map" viewBox="0 0 900 980" role="img" aria-label="Clickable GeoJSON map of India states">
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {features.map((feature, index) => {
            const rawName = getStateName(feature.properties);
            const state = stateByName[normalizeName(rawName)];
            const path = geometryToPath(feature.geometry, mapData.project);
            if (!path) return null;
            const active = state && selected.name === state.name;
            const visitedState = state && visited.has(state.name);
            const [labelX, labelY] = centroid(feature, mapData.project);
            return (
              <g key={`${rawName || 'state'}-${index}`}>
                <path
                  d={path}
                  className={`state-shape color-${index % 7} ${active ? 'active' : ''} ${visitedState ? 'visited' : ''} ${state ? '' : 'disabled'}`}
                  onClick={() => state && onPick(state)}
                  role={state ? 'button' : 'img'}
                  tabIndex={state ? 0 : -1}
                  onKeyDown={(e) => e.key === 'Enter' && state && onPick(state)}
                >
                  <title>{state ? `${state.name}: ${state.capital}` : rawName}</title>
                </path>
                {state && <text x={labelX} y={labelY} className="state-map-label" onClick={() => onPick(state)}>{state.name.split(' ')[0]}</text>}
              </g>
            );
          })}
        </g>
      </svg>
      <p className="map-caption">Use + / − to zoom. Tap a state boundary to learn its capital and language.</p>
    </div>
  );
}
