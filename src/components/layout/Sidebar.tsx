import type { ScreenConfig, ScreenId } from '../../types';

type Props = {
  screens: ScreenConfig[];
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
};

export function Sidebar({ screens, active, onNavigate }: Props) {
  return (
    <aside className="side-nav">
      <div className="brand"><span>🌎</span><strong>GeoQuest</strong><small>Junior</small></div>
      {screens.map(({ id, label, icon: Icon }) => (
        <button key={id} className={active === id ? 'active' : ''} onClick={() => onNavigate(id)}>
          <Icon size={19}/><span>{label}</span>
        </button>
      ))}
    </aside>
  );
}
