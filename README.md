# Viagem — Modernizado
Projeto atualizado com UI moderna usando Tailwind CDN, PWA básico e melhorias.

## O que foi melhorado
- Design moderno responsivo com Tailwind (sem build tool)
- Roteiro com mapa interativo e marcadores persistidos no localStorage
- Campo de busca com Autocomplete (Google Places)
- Painel de gastos com export CSV
- Página de fotos com filtros estilo Tumblr, galeria local e download
- PWA manifest + service worker para offline básico

## Instruções rápidas
1. Ajuste a chave do Google Maps no arquivo `roteiro.html` (já incluída nesta versão, restrinja depois no Console do Google Cloud).
2. Faça upload no GitHub como no tutorial anterior.
3. Ative GitHub Pages (branch main / root).
4. Acesse no celular e adicione à tela inicial.

## Segurança da API Key
A chave de API do Maps está no `roteiro.html`. **Recomenda-se** restringir a chave para seu domínio nas configurações do Google Cloud Console para evitar uso indevido.
