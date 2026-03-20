#!/bin/bash
echo "🔍 Rodando auditoria do Agente..."
npm run check-frontend # ou check-frontend

if [ $? -eq 0 ]; then
  echo "✅ Tudo limpo! Gerando README do commit..."
  # Aqui você cola o texto que eu (Gemini) gerei para o seu commit
  git add .
  git commit -m "$1"
  echo "🚀 Pronto para o push!"
else
  echo "❌ O Agente barrou o commit. Limpe o código antes de tentar novamente."
  exit 1
fi