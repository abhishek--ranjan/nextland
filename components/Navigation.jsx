"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import navigationData from '@/data/navigation.json';

export default function Navigation() {
  const pathname = usePathname();
  const [societyName, setSocietyName] = useState('Prateek Stylome');
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    // Load society name from config
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.societyName) {
          setSocietyName(data.societyName);
        }
      })
      .catch(() => {
        // Use default if fetch fails
      });

    // Load navigation items (filter enabled items only)
    const enabledItems = navigationData.navigation.filter(item => item.enabled);
    setNavItems(enabledItems);
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkStyle = (path) => ({
    padding: '0.5rem 0',
    color: isActive(path) ? 'var(--slate-900)' : 'var(--slate-700)',
    fontWeight: isActive(path) ? '600' : '500',
    borderBottom: isActive(path) ? '2px solid var(--blue-600)' : 'none',
    paddingBottom: isActive(path) ? '0.375rem' : '0.5rem'
  });

  const renderNavItem = (item) => {
    // Skip disabled items
    if (!item.enabled) return null;

    // Link type (no dropdown)
    if (item.type === 'link') {
      const linkStyle = {
        ...navLinkStyle(item.path),
        fontSize: '0.95rem'
      };

      // Apply highlight style for special items (e.g., Login)
      if (item.highlight) {
        linkStyle.color = 'var(--blue-600)';
        linkStyle.fontWeight = '600';
      }

      return (
        <li key={item.id} className="nav-item">
          <a className="nav-link" href={item.path} style={linkStyle}>
            {item.label}
          </a>
        </li>
      );
    }

    // Dropdown type
    if (item.type === 'dropdown') {
      const enabledSubItems = item.items?.filter(subItem => subItem.enabled) || [];
      
      return (
        <li key={item.id} className="nav-item dropdown">
          <a 
            className="nav-link dropdown-toggle" 
            href={item.path} 
            role="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false" 
            style={{...navLinkStyle(item.path), fontSize: '0.95rem'}}
          >
            {item.label}
          </a>
          <ul className="dropdown-menu" style={{fontSize: '0.855rem'}}>
            {enabledSubItems.map(subItem => (
              <li key={subItem.id}>
                <a className="dropdown-item" href={subItem.path}>
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{position: 'sticky', top: '36px', zIndex: 1020, boxShadow: 'none', borderBottom: '1px solid var(--slate-200)', padding: '1rem 0'}}>
      <div className="container" style={{maxWidth: '1140px'}}>
        <a className="navbar-brand fw-bold" href="/" style={{color: 'var(--slate-900)', fontSize: '1.1875rem'}}>
          {societyName}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto" style={{gap: '2rem'}}>
            {navItems.map(item => renderNavItem(item))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
