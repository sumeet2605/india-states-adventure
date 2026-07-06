import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ScreenConfig, ScreenId } from '../../types';

type Props = {
  screens: ScreenConfig[];
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
};

export function Sidebar({ screens, active, onNavigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToScreen = (screen: ScreenId) => {
    onNavigate(screen);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="mobile-nav-bar">
        <div className="brand compact"><span>🧭</span><strong>Explorer</strong><small>Academy</small></div>
        <button className="hamburger-btn" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          <Menu size={24}/>
        </button>
      </header>

      <aside className={`side-nav ${menuOpen ? 'open' : ''}`}>
        <div className="brand"><span>🧭</span><strong>Explorer</strong><small>Academy</small></div>
        <button className="drawer-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={22}/></button>
        {screens.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => goToScreen(id)}>
            <Icon size={19}/><span>{label}</span>
          </button>
        ))}
      </aside>

      <div className={`menu-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  );
}
