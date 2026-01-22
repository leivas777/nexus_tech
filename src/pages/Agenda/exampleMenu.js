import React from "react";
import WhatsApp from "../../assets/WhatsApp.png";
const Icon = ({ children }) => (
  <span style={{ fontSize: 16, lineHeight: 1 }}>{children}</span>
);

export const exampleMenu = [
  {
    key: "empresa",
    label: "Nexus Tech",
    link: '/'
  },
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <Icon>📊</Icon>,
    link: "/",
  },
  {
    key: 'whatsApp',
    label: 'WhatsApp',
    icon: <img src={WhatsApp} alt="whatsapp" />

  },
  {
    key: "agenda",
    label: "Agenda",
    icon: <Icon>📅</Icon>,
    children: [
      {
        key: "calendar",
        label: "Calendário",
        icon: <Icon>🗓️</Icon>,
        link: "/",
      },
      {
        key: "blocks",
        label: "Bloqueios",
        icon: <Icon>🔒</Icon>,
        link: "/",
      }
    ],
  },
  {
    key: 'finance',
    label: 'Financeiro',
    icon: <Icon>💲</Icon>,
  },
  {
    key: 'customers',
    label: 'Clientes',
    icon: <Icon>👤</Icon>,
    children: [
        {
            key: 'list',
            label: 'Listagem',
            icon: <Icon>☰</Icon>,
            link: '/'
        }
    ]
  },
  {
    key: 'reports',
    label: 'Relatórios',
    icon: <Icon>📈</Icon>
  },
  {
    key: 'professionals',
    label: 'Profissionais',
    icon: <Icon>💼</Icon>,
    children:[
        {
            key: 'list',
            label: 'Listagem',
            icon: <Icon>☰</Icon>,
            link: '/'
        },
        {
            key: 'business_hours',
            label: 'Expedientes',
            icon: <Icon>👩🏻‍💻</Icon>,
            link: '/'
        }
    ]
  },
  {
    key: "settings",
    label: "Configurações",
    icon: <Icon>⚙️</Icon>,
    onClick: () => alert("Configurações clicadas"),
  },
];
