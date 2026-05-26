import React from 'react';

const shapes = {
  'Jammu & Kashmir / Ladakh': 'M245 20 L315 18 L340 58 L310 92 L250 82 L225 50 Z',
  'Punjab': 'M220 95 L265 88 L280 130 L240 150 L205 122 Z',
  'Himachal Pradesh': 'M275 82 L335 78 L360 120 L315 145 L280 130 Z',
  'Uttarakhand': 'M330 140 L390 135 L420 175 L370 205 L325 180 Z',
  'Haryana': 'M235 155 L285 145 L310 185 L270 215 L230 190 Z',
  'Rajasthan': 'M115 150 L230 135 L270 230 L235 330 L120 330 L70 250 Z',
  'Uttar Pradesh': 'M285 205 L425 185 L485 245 L430 300 L300 280 Z',
  'Bihar': 'M475 250 L580 240 L620 285 L555 325 L465 305 Z',
  'Sikkim': 'M590 205 L615 200 L625 230 L600 240 Z',
  'Arunachal Pradesh': 'M735 160 L850 145 L895 190 L845 235 L745 220 Z',
  'Assam': 'M650 255 L835 245 L870 285 L790 330 L645 305 Z',
  'Nagaland': 'M820 305 L880 285 L900 335 L850 365 Z',
  'Manipur': 'M810 370 L865 360 L885 420 L830 440 Z',
  'Mizoram': 'M760 415 L815 415 L835 485 L770 500 Z',
  'Tripura': 'M700 395 L745 390 L760 445 L715 465 Z',
  'Meghalaya': 'M630 330 L725 320 L740 360 L650 375 Z',
  'Madhya Pradesh': 'M245 315 L425 300 L495 385 L400 460 L250 425 Z',
  'Gujarat': 'M85 335 L215 345 L235 430 L175 500 L80 450 Z',
  'Maharashtra': 'M235 445 L410 465 L455 555 L360 625 L230 575 Z',
  'Goa': 'M215 610 L245 610 L250 650 L220 655 Z',
  'Chhattisgarh': 'M445 405 L535 405 L560 520 L500 585 L440 520 Z',
  'Jharkhand': 'M520 335 L605 330 L635 395 L560 430 L505 385 Z',
  'West Bengal': 'M620 335 L700 355 L715 450 L655 515 L610 420 Z',
  'Odisha': 'M540 500 L665 520 L650 615 L555 650 L505 585 Z',
  'Telangana': 'M365 555 L485 575 L500 665 L420 710 L350 650 Z',
  'Andhra Pradesh': 'M445 690 L590 665 L645 735 L560 810 L430 765 Z',
  'Karnataka': 'M255 640 L395 665 L430 790 L335 860 L245 790 Z',
  'Kerala': 'M270 820 L330 875 L350 985 L315 1045 L275 935 Z',
  'Tamil Nadu': 'M365 830 L510 815 L545 935 L470 1040 L375 970 Z'
};

const nameMap = {
  'Punjab': 'Punjab', 'Himachal Pradesh': 'Himachal Pradesh', 'Uttarakhand': 'Uttarakhand', 'Haryana': 'Haryana', 'Rajasthan': 'Rajasthan', 'Uttar Pradesh': 'Uttar Pradesh', 'Bihar': 'Bihar', 'Sikkim': 'Sikkim', 'Arunachal Pradesh': 'Arunachal Pradesh', 'Assam': 'Assam', 'Nagaland': 'Nagaland', 'Manipur': 'Manipur', 'Mizoram': 'Mizoram', 'Tripura': 'Tripura', 'Meghalaya': 'Meghalaya', 'Madhya Pradesh': 'Madhya Pradesh', 'Gujarat': 'Gujarat', 'Maharashtra': 'Maharashtra', 'Goa': 'Goa', 'Chhattisgarh': 'Chhattisgarh', 'Jharkhand': 'Jharkhand', 'West Bengal': 'West Bengal', 'Odisha': 'Odisha', 'Telangana': 'Telangana', 'Andhra Pradesh': 'Andhra Pradesh', 'Karnataka': 'Karnataka', 'Kerala': 'Kerala', 'Tamil Nadu': 'Tamil Nadu'
};

export default function VectorIndiaMap({ states, selected, visited, onPick }) {
  const byName = Object.fromEntries(states.map((s) => [s.name, s]));
  return (
    <div className="vector-map-wrap">
      <svg className="vector-india-map" viewBox="40 0 900 1060" role="img" aria-label="Clickable vector map of India states">
        <defs>
          <filter id="mapShadow"><feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.18" /></filter>
        </defs>
        {Object.entries(shapes).map(([label, points], index) => {
          const state = byName[nameMap[label]];
          const isKnown = Boolean(state);
          const active = state && selected.name === state.name;
          const visitedState = state && visited.has(state.name);
          return (
            <path
              key={label}
              d={points}
              className={`state-shape color-${index % 7} ${active ? 'active' : ''} ${visitedState ? 'visited' : ''} ${isKnown ? '' : 'disabled'}`}
              onClick={() => state && onPick(state)}
              role={isKnown ? 'button' : 'img'}
              tabIndex={isKnown ? 0 : -1}
              onKeyDown={(e) => e.key === 'Enter' && state && onPick(state)}
            >
              <title>{state ? `${state.name}: ${state.capital}` : label}</title>
            </path>
          );
        })}
        {states.map((state) => (
          <text key={state.name} x={`${state.x * 9.2}`} y={`${state.y * 10.4}`} className="state-map-label" onClick={() => onPick(state)}>
            {state.name.split(' ')[0]}
          </text>
        ))}
      </svg>
      <p className="map-caption">Tap a colored state shape. This is a vector learning map, so each state is truly clickable.</p>
    </div>
  );
}
