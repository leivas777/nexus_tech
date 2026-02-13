import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled.li`
  list-style: none;
  margin: 4px 0;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: ${p => (p.$active ? "#6366f1" : "#e5e7eb")};
  background: ${p => (p.$active ? "rgba(99, 102, 241, 0.1)" : "transparent")};
  transition: all 0.2s ease;
  gap: 12px;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${p => (p.$collapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

const SubMenu = styled.ul`
  list-style: none;
  padding-left: 32px;
  margin-top: 4px;
  display: ${p => (p.$open ? "block" : "none")};
`;

const SidebarItem = ({
  item,
  collapsed,
  openKeys,
  onToggleOpen,
  activeKey,
  level = 0,
}) => {
  const navigate = useNavigate();
  const isOpen = openKeys.includes(item.key);
  const isActive = activeKey === item.key;

  // ✅ A Lógica Mestra do Clique
  const handleClick = (e) => {
    e.stopPropagation(); // Evita que o clique "suba" para elementos pai

    // 1. Prioridade: Se o item tem uma função onClick (WhatsApp)
    if (item.onClick) {
      console.log(`🚀 Executando ação customizada para: ${item.label}`);
      item.onClick();
      return;
    }

    // 2. Se tem filhos, alterna o abrir/fechar
    if (item.children && item.children.length > 0) {
      onToggleOpen(item.key);
      return;
    }

    // 3. Se tem link, navega
    if (item.link) {
      navigate(item.link);
    }
  };

  return (
    <ItemContainer>
      <ItemContent
        $active={isActive}
        $collapsed={collapsed}
        onClick={handleClick}
        title={collapsed ? item.label : ""}
      >
        <IconWrapper>{item.icon}</IconWrapper>
        {!collapsed && <Label $collapsed={collapsed}>{item.label}</Label>}
        
        {/* Indicador de submenu (opcional) */}
        {!collapsed && item.children && (
          <span style={{ marginLeft: "auto", fontSize: "10px" }}>
            {isOpen ? "▼" : "▶"}
          </span>
        )}
      </ItemContent>

      {/* Renderização Recursiva de Filhos */}
      {item.children && !collapsed && (
        <SubMenu $open={isOpen}>
          {item.children.map((child) => (
            <SidebarItem
              key={child.key}
              item={child}
              collapsed={collapsed}
              openKeys={openKeys}
              onToggleOpen={onToggleOpen}
              activeKey={activeKey}
              level={level + 1}
            />
          ))}
        </SubMenu>
      )}
    </ItemContainer>
  );
};

export default SidebarItem;