import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ItemLi = styled.li`
  margin: 2px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px;
  border-radius: 10px;

  color: inherit;
  user-select: none;

  background: ${(p) => (p.$active ? "rgba(99,102,241,0.18)" : "transparent")};

  &:hover {
    background: ${(p) =>
      p.$active ? "rgba(99,102,241,0.22)" : "rgba(255,255,255,0.06)"};
  }

  &:focus-within {
    outline: 2px solid rgba(99, 102, 241, 0.9);
    outline-offset: 2px;
  }
`;

const IconBox = styled.span`
  width: 22px;
  min-width: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img{
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
  }
`;

const Label = styled.span`
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: ${(p) => (p.$collapsed ? "none" : "inline")};
`;

const Caret = styled.span`
  display: ${(p) => (p.$collapsed ? "none" : "inline-flex")};
  transform: ${(p) => (p.$open ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 160ms ease;
  opacity: 0.85;
`;

const ActionButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
`;

const LinkLike = styled.a`
  all: unset;
  cursor: pointer;
  width: 100%;
`;

const Submenu = styled.ul`
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0;

  display: ${(p) => (p.$open ? "block" : "none")};
`;

const Indent = styled.div`
  padding-left: ${(p) => Math.min(p.$level * 14, 42)}px;
`;

function hasChildren(item) {
  return Array.isArray(item.children) && item.children.length > 0;
}

export default function SidebarItem({
  item,
  collapsed,
  openKeys,
  onToggleOpen,
  activeKey,
  level,
  LinkComponent,
}) {
  const open = openKeys.includes(item.key);
  const children = hasChildren(item);
  const active = activeKey === item.key;

  const labelForA11y = item.label;
  const titleWhenCollapsed = collapsed ? item.label : undefined;

  const onActivate = (e) => {
    // Se tem children, toggle abre/fecha
    if (children) {
      e.preventDefault();
      onToggleOpen(item.key);
      return;
    }

    // Caso seja um item de ação
    if (item.onClick) item.onClick();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate(e);
    }
  };

  const renderClickable = () => {
    // Link: usa LinkComponent (pode ser react-router-dom Link) ou <a />
    if (item.link) {
      const Comp = LinkComponent || "a";
      const linkProps =
        Comp === "a"
          ? { href: item.link }
          : { to: item.link }; // padrão para react-router-dom Link

      return (
        <Comp {...linkProps} aria-label={collapsed ? labelForA11y : undefined} title={titleWhenCollapsed}>
          <LinkLike
            role="menuitem"
            tabIndex={0}
            onClick={onActivate}
            onKeyDown={onKeyDown}
            aria-current={active ? "page" : undefined}
            aria-expanded={children ? open : undefined}
            aria-haspopup={children ? "menu" : undefined}
          >
            <Row $active={active}>
              <IconBox aria-hidden="true">{item.icon}</IconBox>
              <Label $collapsed={collapsed}>{item.label}</Label>
              {children && <Caret $open={open} $collapsed={collapsed}>▶</Caret>}
            </Row>
          </LinkLike>
        </Comp>
      );
    }

    // Botão: abre submenu ou executa ação
    return (
      <ActionButton
        role="menuitem"
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={onKeyDown}
        aria-label={collapsed ? labelForA11y : undefined}
        title={titleWhenCollapsed}
        aria-current={active ? "page" : undefined}
        aria-expanded={children ? open : undefined}
        aria-haspopup={children ? "menu" : undefined}
      >
        <Row $active={active}>
          <IconBox aria-hidden="true">{item.icon}</IconBox>
          <Label $collapsed={collapsed}>{item.label}</Label>
          {children && <Caret $open={open} $collapsed={collapsed}>▶</Caret>}
        </Row>
      </ActionButton>
    );
  };

  return (
    <ItemLi role="none">
      <Indent $level={level}>
        {renderClickable()}

        {children && (
          <Submenu role="menu" aria-label={`${item.label} submenu`} $open={open && !collapsed}>
            {item.children.map((child) => (
              <SidebarItem
                key={child.key}
                item={child}
                collapsed={collapsed}
                openKeys={openKeys}
                onToggleOpen={onToggleOpen}
                activeKey={activeKey}
                level={level + 1}
                LinkComponent={LinkComponent}
              />
            ))}
          </Submenu>
        )}
      </Indent>
    </ItemLi>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    link: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.array,
  }).isRequired,

  collapsed: PropTypes.bool.isRequired,
  openKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleOpen: PropTypes.func.isRequired,

  activeKey: PropTypes.string,
  level: PropTypes.number.isRequired,
  LinkComponent: PropTypes.elementType,
};

SidebarItem.defaultProps = {
  activeKey: undefined,
  LinkComponent: "a",
};