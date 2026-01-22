import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const SidebarNav = styled.nav`
  width: ${(p) => (p.$collapsed ? "64px" : "200px")};
  height: 100vh;
  background: #0b1220;
  color: #e5e7eb;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  transition: width 180ms ease;
  overflow: auto;
`;

const SidebarHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? "center" : "space-between")};

  padding: 10px 10px;
  background: #0b1220;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Brand = styled.div`
  display: ${(p) => (p.$collapsed ? "none" : "block")};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #e5e7eb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CollapseButton = styled.button`
  all: unset;
  cursor: pointer;

  width: 38px;
  height: 38px;
  border-radius: 10px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.06);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: 2px solid rgba(99, 102, 241, 0.95);
    outline-offset: 2px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  
  a{
  text-decoration: none;
  }
`;

function normalizeKeys(value) {
  return Array.isArray(value) ? value : [];
}

export default function Sidebar({
  menuItems = [],

  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,

  openKeys,
  defaultOpenKeys = [],
  onOpenKeysChange,

  activeKey,

  LinkComponent,

  /** NOVO (opcional): texto/logo no topo */
  headerTitle = "",
  /** NOVO (opcional): esconder header inteiro */
  showHeader = true,
}) {
  const isCollapsedControlled = typeof collapsed === "boolean";
  const isOpenKeysControlled = Array.isArray(openKeys);

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [internalOpenKeys, setInternalOpenKeys] = useState(
    normalizeKeys(defaultOpenKeys)
  );

  const resolvedCollapsed = isCollapsedControlled ? collapsed : internalCollapsed;

  const resolvedOpenKeys = useMemo(
    () => (isOpenKeysControlled ? openKeys : internalOpenKeys),
    [isOpenKeysControlled, openKeys, internalOpenKeys]
  );

  useEffect(() => {
    if (isCollapsedControlled) setInternalCollapsed(collapsed);
  }, [isCollapsedControlled, collapsed]);

  useEffect(() => {
    if (isOpenKeysControlled) setInternalOpenKeys(openKeys);
  }, [isOpenKeysControlled, openKeys]);

  const setCollapsedState = (next) => {
    if (onCollapsedChange) onCollapsedChange(next);
    if (!isCollapsedControlled) setInternalCollapsed(next);
  };

  const setOpenKeysState = (next) => {
    if (onOpenKeysChange) onOpenKeysChange(next);
    if (!isOpenKeysControlled) setInternalOpenKeys(next);
  };

  const toggleOpen = (key) => {
    const next = resolvedOpenKeys.includes(key)
      ? resolvedOpenKeys.filter((k) => k !== key)
      : [...resolvedOpenKeys, key];

    setOpenKeysState(next);
  };

  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];

  const handleToggleCollapsed = () => {
    setCollapsedState(!resolvedCollapsed);
  };

  return (
    <SidebarNav
      role="navigation"
      aria-label="Menu lateral"
      $collapsed={resolvedCollapsed}
    >
      {showHeader && (
        <SidebarHeader $collapsed={resolvedCollapsed}>
          <Brand $collapsed={resolvedCollapsed} title={headerTitle}>
            {headerTitle}
          </Brand>

          <CollapseButton
            type="button"
            onClick={handleToggleCollapsed}
            aria-label={resolvedCollapsed ? "Expandir menu" : "Recolher menu"}
            title={resolvedCollapsed ? "Expandir" : "Recolher"}
          >
            {/* Ícone simples (troque por react-icons se quiser) */}
            {resolvedCollapsed ? "»" : "«"}
          </CollapseButton>
        </SidebarHeader>
      )}

      <MenuList role="list">
        {safeMenuItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            collapsed={resolvedCollapsed}
            openKeys={resolvedOpenKeys}
            onToggleOpen={toggleOpen}
            activeKey={activeKey}
            level={0}
            LinkComponent={LinkComponent}
          />
        ))}
      </MenuList>
    </SidebarNav>
  );
}

Sidebar.propTypes = {
  menuItems: PropTypes.array.isRequired,

  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,

  openKeys: PropTypes.arrayOf(PropTypes.string),
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  onOpenKeysChange: PropTypes.func,

  activeKey: PropTypes.string,
  LinkComponent: PropTypes.elementType,

  headerTitle: PropTypes.string,
  showHeader: PropTypes.bool,
};

Sidebar.defaultProps = {
  LinkComponent: "a",
  headerTitle: "Menu",
  showHeader: true,
};