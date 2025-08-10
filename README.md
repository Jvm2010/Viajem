Viagem Planner - Final

Instruções:
1. Suba os arquivos para um repositório no GitHub.
2. Ative GitHub Pages na branch main / root.
3. Verifique a chave do Google Maps (roteiro.html) e restrinja seu uso no Google Cloud Console.
4. No Firebase console, confirme que o Realtime Database está habilitado e as regras permitem leitura/escrita para testes.

Observações de segurança:
- Atualmente o app usa um identificador anônimo salvo no localStorage. Para multi-usuario real, integre Firebase Auth.
- Restrinja a API key do Maps para seu domínio.

Arquivos principais:
- roteiro.html: página principal com mapa, lista de locais, ordenação, rota e gastos.
- fotos.html: captura de fotos and upload ao Firebase.
- firebase.js: helpers para salvar/carregar dados do Realtime Database.
