import { RotateCcw, Settings } from 'lucide-react';

type Props = { soundOn: boolean; onToggleSound: () => void; onReset: () => void };

export function SettingsScreen({ soundOn, onToggleSound, onReset }: Props) {
  return (
    <section className="map-card settings-card">
      <div className="map-title"><Settings/> Game Settings</div>
      <button className="primary-play" onClick={onToggleSound}>{soundOn ? '🔊 Sound On' : '🔇 Sound Off'}</button>
      <button className="primary-play danger" onClick={onReset}><RotateCcw/> Reset Progress</button>
      <p className="section-helper">Progress is kept during this play session. A future version can save progress permanently in the browser.</p>
    </section>
  );
}
