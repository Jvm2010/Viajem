
## Versão gratuita - notas e instruções

Este projeto foi adaptado para funcionar com ferramentas gratuitas:

- Mapas: Leaflet + OpenStreetMap tiles (já incluso).
- Rotas: usa o servidor público OSRM (https://router.project-osrm.org) para calcular rotas (uso limitado, não recomendado para produção com alto tráfego).
- Cálculo de combustível: feito no frontend. Insira consumo (km/L) e preço (R$/L) e clique em "Calcular rota".
- Favoritos e "visitado": persistidos localmente em `localStorage`.
- Geração de vídeo: o botão "Gerar slideshow" cria um vídeo WebM no navegador usando `canvas` + `MediaRecorder` (sem IA). Para IA avançada você pode integrar serviços externos via backend (Creatomate/Kapwing/Runway).

Como testar localmente:
1. Descompacte o ZIP e abra `viagem_app_extracted/index.html` em um servidor estático (recomendado `npx serve` ou abrir via Live Server).
2. Use "Entrar" ou "Convidado" para acessar `roteiro.html`.
3. Adicione locais no mapa (clicando) e salve. Adicione pelo menos 2 locais e clique em "Calcular rota".
4. Em Fotos, faça upload de imagens e clique em "Gerar slideshow".

Limitações:
- O servidor OSRM usado é público — não é para produção.
- Browser precisa suportar MediaRecorder com codecs WebM (Chrome, Edge têm melhor compatibilidade).
