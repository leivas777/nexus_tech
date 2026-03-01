import React from "react";
import WhatsApp from "../../assets/WhatsApp.png";
import Instagram from "../../assets/instagram.png";
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
    link: "/dashboard",
  },
  {
    key: 'whatsApp',
    label: 'Conectar WhatsApp',
    icon: <img src={WhatsApp} alt="whatsapp" />
  },
  {
    key: 'instagram',
    label: 'Conectar Instagram',
    icon: <img src={Instagram} alt="instagram" />
  },
  {
    key: "messages-dock",
    label: "Centro de Mensagens",
    icon: <Icon>📨</Icon>
  },
  {
    key: 'business-settings',
    label: 'Meu Negócio',
    icon: <Icon>🏢</Icon>
  },
  {
    key: "services",
    label: "Meus Serviços",
    icon: <Icon>🚚</Icon>
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
