import React, { useEffect, useMemo, useState } from 'react';

function getStateName(properties = {}) {
  return properties.name || properties.NAME_1 || properties.ST_NM || properties.st_nm || properties.State_Name || properties.state || properties.STATE || properties.NAME || properties.NAME1 || '';
}

function normalizeName(name = '') {
  return String(name).trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function collectCoordinates(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return geometry.coordinates.flat(1);
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat(2);
  return [];
}

function boundsFor(features) {
  const points = features.flatMap((feature) => collectCoordinates(feature.geometry));
  const lngs = points.map((p) => p[0]).filter(Number.isFinite);
  const lats = points.map((p) => p[1]).filter(Number.isFinite);
  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats)
  };
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
  return ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ') + ' Z';
}

function geometryToPath(geometry, project) {
  if (!geometry) return '';
  if (geometry.type === 'Polygon') return geometry.coordinates.map((ring) => ringToPath(ring, project)).join(' ');
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flatMap((polygon) => polygon.map((ring) => ringToPath(ring, project))).join(' ');
  return '';
}

function centroid(feature, project) {
  const points = collectCoordinates(feature.geometry);
  if (!points.length) return [0, 0];
  const avgLng = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const avgLat = points.reduce((sum, p) => sum + p[1], 0) / points.length;
  return project([avgLng, avgLat]);
}

export default function VectorIndiaMap({ states, selected, visited, onPick }) {
  const [geoJson, setGeoJson] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/india-states.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load india-states.geojson');
        return response.json();
      })
      .then(setGeoJson)
      .catch((err) => setError(err.message));
  }, []);

  const stateByName = useMemo(() => {
    const entries = states.map((state) => [normalizeName(state.name), state]);
    return Object.fromEntries(entries);
  }, [states]);

  const features = geoJson?.features || [];
  const mapData = useMemo(() => {
    if (!features.length) return null;
    const bounds = boundsFor(features);
    const project = makeProjector(bounds);
    return { bounds, project };
  }, [features]);

  if (error) return <div className="vector-map-wrap"><p className="message">Map error: {error}</p></div>;
  if (!mapData) return <div className="vector-map-wrap loading-map">Loading India map…</div>;

  return (
    <div className="vector-map-wrap">
      <svg className="vector-india-map" viewBox="0 0 900 980" role="img" aria-label="Clickable GeoJSON map of India states">
        {features.map((feature, index) => {
          const rawName = getStateName(feature.properties);
          const state = stateByName[normalizeName(rawName)];
          const path = geometryToPath(feature.geometry, mapData.project);
          const active = state && selected.name === state.name;
          const visitedState = state && visited.has(state.name);
          const [labelX, labelY] = centroid(feature, mapData.project);
          return (
            <g key={`${rawName}-${index}`}>
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
              {state && (
                <text x={labelX} y={labelY} className="state-map-label" onClick={() => onPick(state)}>
                  {state.name.split(' ')[0]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="map-caption">Tap a real state boundary from india-states.geojson.</p>
    </div>
  );
}
