# Curso Git / GitHub do Prof. S@uer

Página de curso feita com React + Vite, em português, com navegação lateral recolhível à esquerda, módulos didáticos, snippets de código copiáveis, checklist de aprendizagem e acompanhamento de progresso local.

## Requisitos
- Node.js compatível com a versão atual do Vite (consulte https://vite.dev/guide/)
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite, normalmente http://localhost:5173.

## Gerar build de produção

```bash
npm run build
npm run preview
```

## Executar com Docker e Docker Compose

Para subir a aplicação encapsulada em container (Nginx otimizado para produção):

```bash
# Constrói a imagem e inicia o container em segundo plano
docker compose up -d --build

# Para visualizar os logs
docker compose logs -f

# Para parar o container
docker compose down
```

Acesse a aplicação no navegador em: **http://localhost:3090** (ou na porta configurada na variável `PORT`).

## Repositório de laboratório
https://github.com/alesauer/tutorial-git

## Observações
- O progresso e o checklist são mantidos no estado da página; ainda não há autenticação, backend ou persistência entre sessões.
- O layout é responsivo; em telas pequenas a navegação abre como menu lateral.
- A imagem mencionada no pedido não chegou anexada a esta conversa. A página foi construída com base na descrição textual e usa uma composição original, não uma reprodução exata da imagem de referência.
