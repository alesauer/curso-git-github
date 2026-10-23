import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  AlertTriangle, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, ChevronsRight,
  CircleHelp, Clipboard, Clock3, Code2, Command, Download, ExternalLink, FileCode2,
  GitBranch, GitCommitHorizontal, GitFork, GitPullRequest, Github, GraduationCap,
  Home, Lightbulb, Menu, PanelLeftClose, PanelLeftOpen, Play, Search, Settings, Terminal, Users, X
} from 'lucide-react'
import './styles.css'

const repoUrl = 'https://github.com/alesauer/tutorial-git'

const modules = [
  {
    id: 1,
    title: 'Download e Instalação do Git e Git Bash',
    short: 'Download e Instalação',
    icon: Download,
    duration: '20 min',
    intro: 'Passo a passo completo com links oficiais para download, instalação recomendada no Windows com Git Bash e preparação do ambiente local para projetos.',
    objective: 'Ao final, você terá o instalador oficial baixado, o Git e Git Bash instalados corretamente no seu computador, e o terminal pronto para uso.',
    steps: [
      {
        title: 'Baixar o instalador oficial do Git para Windows',
        text: 'Acesse o site oficial do Git e faça o download da versão mais recente do instalador de 64-bit para Windows. O pacote já contém o Git Core, o terminal Git Bash e o utilitário gráfico Git GUI.',
        links: [
          { url: 'https://git-scm.com/download/win', label: 'Download oficial do Git (git-scm.com)' },
          { url: 'https://gitforwindows.org/', label: 'Site oficial Git for Windows' }
        ],
        code: 'https://git-scm.com/download/win',
        lang: 'text'
      },
      {
        title: 'Executar o instalador no Windows',
        text: 'Dê dois cliques no arquivo baixado (Git-2.xx-64-bit.exe) para abrir o assistente de instalação.\n\nFique tranquilo: O instalador do Git for Windows já vem com as melhores opções pré-selecionadas para a grande maioria dos desenvolvedores!\n\nO que você precisa fazer:\n1. Tela de Editor: Se você usa o VS Code, pode selecioná-lo na lista ("Use Visual Studio Code as Git\'s default editor"). Caso contrário, pode manter o editor padrão sugerido.\n2. Demais telas: Mantenha as opções recomendadas já marcadas pelo instalador e clique em Next em todas as etapas.\n3. Na tela final, clique em Install e aguarde a barra de progresso ser concluída.',
        tip: 'O instalador já inclui o Git Bash automaticamente. É ele o terminal que utilizaremos para digitar todos os comandos práticos do curso!'
      },
      {
        title: 'Abrir o Git Bash e testar a instalação',
        text: 'Abra o Git Bash pelo menu Iniciar do Windows ou clicando com o botão direito em qualquer pasta e selecionando "Open Git Bash here". Digite o comando abaixo para confirmar que o Git foi instalado com sucesso:',
        code: 'git --version',
        lang: 'bash'
      },
      {
        title: 'Preparar sua pasta de trabalho e projetos',
        text: 'Antes de iniciar qualquer projeto com Git e GitHub, familiarize-se com os comandos de navegação do terminal e crie uma pasta organizada para hospedar seus repositórios:',
        code: '# 1. Consulte o diretório atual onde você está:\npwd\n\n# 2. Crie uma pasta para seus projetos de desenvolvimento (ex: dev ou projetos):\nmkdir -p ~/dev\n\n# 3. Acesse a pasta criada:\ncd ~/dev\n\n# 4. Confirme que você está no diretório correto:\npwd\nls -la',
        lang: 'bash'
      }
    ],
    exercise: 'Baixe o Git for Windows pelos links fornecidos, conclua a instalação com o Git Bash, abra o terminal e execute os comandos git --version e pwd para certificar que seu ambiente está pronto.',
    check: [
      'Acessei o link oficial e baixei o instalador do Git.',
      'Concluí a instalação incluindo o Git Bash.',
      'Abri o Git Bash pelo menu Iniciar ou menu de contexto.',
      'O comando git --version retornou a versão instalada.',
      'Naveguei no terminal e preparei minha pasta de projetos.'
    ]
  },
  {
    id: 2,
    title: 'Configuração Inicial do Git e Conta GitHub',
    short: 'Configuração inicial',
    icon: Settings,
    duration: '25 min',
    intro: 'Realize a configuração inicial obrigatória do Git no seu computador (identidade de autoria com nome e e-mail), padronize a branch inicial como main e conecte sua conta do GitHub.',
    objective: 'Ao final, você terá o Git configurado com sua autoria em todos os commits futuros, saberá consultar as configurações salvas e terá sua conta do GitHub conectada ao repositório de laboratório.',
    steps: [
      {
        title: 'Configurar sua identidade no Git (Nome e E-mail)',
        text: 'O Git vincula seu nome e e-mail a cada versão (commit) criada no histórico. IMPORTANTE: Use o mesmo endereço de e-mail cadastrado na sua conta GitHub para que suas contribuições fiquem associadas ao seu perfil.',
        code: 'git config --global user.name "Seu Nome Completo"\ngit config --global user.email "seu-email@exemplo.com"',
        lang: 'bash'
      },
      {
        title: 'Padronizar a branch inicial como main',
        text: 'Defina a branch padrão de novos repositórios como "main", alinhando seu ambiente local com o padrão moderno adotado pelo GitHub e pela comunidade.',
        code: 'git config --global init.defaultBranch main',
        lang: 'bash'
      },
      {
        title: 'Conferir e validar as configurações salvas',
        text: 'Revise todas as configurações globais salvas no seu sistema antes de iniciar o versionamento dos projetos:',
        code: 'git config --global --list',
        lang: 'bash'
      },
      {
        title: 'Criar ou acessar sua conta no GitHub',
        text: 'Acesse o portal do GitHub para criar seu cadastro gratuito (caso ainda não possua) ou fazer login com suas credenciais existentes.',
        links: [
          { url: 'https://github.com/signup', label: 'Criar conta gratuita no GitHub' },
          { url: 'https://github.com/login', label: 'Fazer login no GitHub' }
        ],
        code: 'https://github.com/',
        lang: 'text'
      },
      {
        title: 'Acessar o repositório de laboratório do curso',
        text: 'Abra a página do repositório disponibilizado pelo professor. Localize o botão verde "Code" e observe as opções para copiar a URL de clonagem.',
        links: [
          { url: 'https://github.com/alesauer/tutorial-git', label: 'Repositório tutorial-git no GitHub' }
        ],
        code: 'https://github.com/alesauer/tutorial-git.git',
        lang: 'text'
      }
    ],
    exercise: 'No Git Bash, configure seu user.name e user.email com seus dados reais, defina init.defaultBranch como main, execute git config --global --list para validar e acesse o repositório tutorial-git no GitHub.',
    check: [
      'Configurei user.name com meu nome completo.',
      'Configurei user.email com meu e-mail do GitHub.',
      'Defini a branch padrão como main.',
      'O comando git config --global --list exibiu minhas informações.',
      'Acessei minha conta no GitHub e localizei o repositório tutorial-git.'
    ]
  },
  {
    id: 3,
    title: 'Primeiros passos com Git',
    short: 'Comandos essenciais',
    icon: GitCommitHorizontal,
    duration: '40 min',
    intro: 'Aprenda o ciclo fundamental de desenvolvimento: definir sua pasta de trabalho, obter o projeto, inspecionar mudanças, registrar versões e sincronizar com o GitHub.',
    objective: 'Ao final, você terá criado a pasta c:\\dev\\primeiroprojeto, clonado o repositório e realizado o fluxo completo status → add → commit → push e pull.',
    steps: [
      {
        title: 'Definir e acessar a pasta do projeto (c:\\dev\\primeiroprojeto)',
        text: 'Antes de clonar ou versionar qualquer código, organize seu computador definindo uma pasta específica para o projeto. Recomendamos criar a pasta c:\\dev\\primeiroprojeto.\n\nNo Git Bash, o disco C: do Windows é referenciado como /c/. Execute os comandos abaixo para criar e entrar no seu diretório de trabalho:',
        tip: 'Criar uma pasta centralizada como c:\\dev\\primeiroprojeto evita que seus repositórios fiquem soltos no Desktop ou na pasta Downloads!',
        code: '# 1. Cria a pasta c:\\dev\\primeiroprojeto (o parâmetro -p cria subpastas automaticamente)\nmkdir -p /c/dev/primeiroprojeto\n\n# 2. Acessa a pasta recém-criada no terminal\ncd /c/dev/primeiroprojeto\n\n# 3. Confirma o caminho onde você está posicionado\npwd',
        lang: 'bash'
      },
      {
        title: 'Clonar o repositório dentro da pasta do projeto',
        text: 'Com o terminal posicionado em c:\\dev\\primeiroprojeto, faça o clone do repositório de laboratório. O Git criará a pasta tutorial-git contendo todos os arquivos e o histórico de commits do curso:',
        code: '# 1. Clona o repositório do curso para a pasta atual\ngit clone https://github.com/alesauer/tutorial-git.git\n\n# 2. Entra na pasta do repositório clonado\ncd tutorial-git\n\n# 3. Lista os arquivos do projeto\nls -la',
        lang: 'bash'
      },
      {
        title: 'Consultar o estado e as diferenças (status e diff)',
        text: 'O comando git status é o seu melhor amigo: use-o para verificar em qual branch você está e quais arquivos foram modificados. Com o git diff, você compara exatamente as linhas alteradas antes de preparar a versão:',
        code: '# Verifica a branch atual e o estado dos arquivos\ngit status\n\n# Compara as diferenças entre o código atual e o último commit\ngit diff',
        lang: 'bash'
      },
      {
        title: 'Preparar e registrar uma alteração (add e commit)',
        text: 'Edite um arquivo de exercício (ou crie um novo). Use o comando git add para colocar a mudança na área de preparação (staging) e registre um commit com uma mensagem descritiva:',
        code: '# Prepara o arquivo alterado para o commit (ou use git add . para todos)\ngit add README.md\n\n# Registra a versão com uma mensagem clara sobre o que foi feito\ngit commit -m "docs: atualiza README do projeto"\n\n# Confere os últimos commits registrados no histórico local\ngit log --oneline -n 3',
        lang: 'bash'
      },
      {
        title: 'Sincronizar com o GitHub (push e pull)',
        text: 'Envie seus commits locais para o repositório remoto no GitHub usando push. Para baixar atualizações feitas por outros colaboradores, utilize o comando pull:\n\nAo executar o primeiro git push no seu computador, o Git Credential Manager abrirá automaticamente uma janela no seu navegador solicitando a autorização ("Sign in with your browser"). Basta confirmar uma única vez!',
        tip: 'Suas credenciais ficam gravadas com segurança no Gerenciador de Credenciais do Windows. Você não precisará digitar senhas nos próximos envios deste computador.',
        code: '# Envia seus commits para o GitHub (na 1ª vez abrirá o login no navegador)\ngit push\n\n# Puxa e aplica atualizações mais recentes do repositório remoto\ngit pull',
        lang: 'bash'
      }
    ],
    exercise: 'Crie e acesse a pasta c:\\dev\\primeiroprojeto no Git Bash. Dentro dela, clone o repositório tutorial-git, crie um arquivo chamado meu-primeiro-commit.txt, faça o git add, registre seu git commit e confira o histórico com git log --oneline.',
    check: [
      'Criei e acessei a pasta c:\\dev\\primeiroprojeto no terminal.',
      'Clonei o repositório tutorial-git dentro da pasta do projeto.',
      'Compreendi a diferença entre git add (área de preparação) e git commit (registro permanente).',
      'Consultei o histórico com git log --oneline.',
      'Entendi o papel do git push (enviar) e git pull (receber) na sincronização com o GitHub.'
    ]
  },
  {
    id: 4,
    title: 'Branches e Pull Requests',
    short: 'Colaborar com segurança',
    icon: GitPullRequest,
    duration: '40 min',
    intro: 'Trabalhe em uma linha de desenvolvimento isolada (branch dev) e proponha a integração das suas alterações à branch principal (main) por meio de um Pull Request no GitHub.',
    objective: 'Ao final, você terá criado a branch dev, enviado commits para ela e aberto um Pull Request para revisão de código.',
    steps: [
      {
        title: 'Criar e alternar para a branch dev',
        text: 'Crie uma branch chamada dev para isolar o desenvolvimento de novas funcionalidades sem alterar diretamente a branch principal (main):',
        tip: 'O comando git switch -c dev cria a nova branch e já alterna para ela em uma única etapa!',
        code: 'git switch -c dev',
        lang: 'bash'
      },
      {
        title: 'Registrar e publicar a branch dev no GitHub',
        text: 'Faça uma alteração em um arquivo, crie um commit e publique a branch dev no repositório remoto com o parâmetro -u origin dev:',
        code: '# Prepara e registra o commit na branch dev\ngit add .\ngit commit -m "feat: desenvolve melhorias na branch dev"\n\n# Publica a branch dev no GitHub\ngit push -u origin dev',
        lang: 'bash'
      },
      {
        title: 'Abrir um Pull Request no GitHub',
        text: 'No GitHub, acesse a aba "Pull requests" e clique em "New pull request". Configure a branch main como base e a branch dev para comparar:',
        code: 'Base: main  ←  Compare: dev\nTítulo: Integração das alterações da branch dev\nDescrição: Detalha as melhorias implementadas na branch dev para revisão antes do merge.',
        lang: 'text'
      }
    ],
    exercise: 'Crie a branch dev com git switch -c dev, faça uma alteração, envie para o remoto com git push -u origin dev e abra um Pull Request no GitHub propondo a integração da dev na main.',
    check: [
      'Criei e acessei a branch dev com git switch -c dev.',
      'Publiquei a branch dev no GitHub com git push -u origin dev.',
      'Abri ou revisei um Pull Request comparando dev com main.',
      'Entendo que Pull Request é uma proposta de integração no GitHub, e não um comando do Git.'
    ]
  },
  {
    id: 5,
    title: 'Comandos intermediários e avançados',
    short: 'Histórico, conflitos e recuperação',
    icon: GitFork,
    duration: '50 min',
    intro: 'Aprofunde seu domínio no Git com ferramentas essenciais para o dia a dia profissional: integração com merge, anatomia e resolução de conflitos, isolamento temporário com stash, estratégias seguras de recuperação (restore, amend, revert), auditoria de histórico (graph, diff, blame) e versionamento semântico com tags.',
    objective: 'Ao final, você saberá resolver conflitos de merge sem medo de perder código, guardar tarefas temporárias com o stash, recuperar arquivos e commits com segurança usando o comando certo para cada situação, e publicar versões oficiais (releases) no GitHub.',
    steps: [
      {
        title: 'Integração de branches (git merge) e anatomia dos conflitos',
        text: 'O merge integra o histórico de duas branches. Para trazer as alterações da branch dev para a branch principal (main), você deve sempre se posicionar na branch receptora antes de executar a mesclagem:\n1. Alternar para a branch principal: git switch main\n2. Executar a fusão: git merge dev\n\n• O que causa um conflito no Git?\nO Git é inteligente: se um desenvolvedor alterou o topo de um arquivo e outro alterou o rodapé, o Git junta tudo automaticamente sem conflito (Fast-forward ou Merge commit automático).\nUm conflito SÓ acontece quando as duas branches alteraram a MESMA linha do mesmo arquivo de maneiras diferentes desde a divisão. O Git não adivinha qual versão manter e delega essa decisão para você!\n\n• Anatomia visual dos marcadores de conflito:\nAo pausar o merge com conflito, o Git insere marcadores diretamente no arquivo de código:\n<<<<<<< HEAD (código da sua branch atual main)\n=======\n>>>>>>> dev (código vindo da branch dev)\n\n• Passo a passo para resolver sem erro:\n1. Digite git status para listar os arquivos com conflito (aparecerão como "both modified").\n2. Abra o arquivo no VS Code, apague as linhas dos marcadores (<<<<<<<, =======, >>>>>>>) e deixe apenas o código final desejado.\n3. Salve o arquivo e marque como resolvido com git add .\n4. Finalize a integração com git commit (o Git já sugere a mensagem automática de merge!).',
        tip: 'No VS Code, quando um arquivo com conflito é aberto, o editor exibe botões mágicos no topo do bloco: "Accept Current Change" (mantém o da main), "Accept Incoming Change" (substitui pelo da dev), "Accept Both" (mantém ambos) e "Compare Changes". Clicar em um deles resolve o bloco instantaneamente!',
        warning: '🚨 Botão de Pânico (git merge --abort):\nSe você começou a resolver conflitos, se confundiu ou percebeu que não era hora de integrar agora, NÃO SE DESESPERE! Basta executar git merge --abort no terminal.\nO Git cancela a operação imediatamente e devolve seu repositório exatamente ao estado intacto e seguro anterior ao merge!',
        code: '# 1. Posicione-se na branch que receberá as alterações\ngit switch main\n\n# 2. Inicia o merge da branch dev\ngit merge dev\n\n# 3. Caso o terminal avise "CONFLICT", veja os arquivos afetados\ngit status\n\n# 4. Após editar os arquivos e remover os marcadores, conclua o merge:\ngit add .\ngit commit -m "merge: resolve conflitos entre main e dev"\n\n# DICA DE SEGURANÇA: Se quiser cancelar tudo e voltar atrás com segurança:\n# git merge --abort',
        lang: 'bash'
      },
      {
        title: 'Guardar trabalho temporário com git stash (A gaveta do desenvolvedor)',
        text: 'Cenário comum no dia a dia:\nVocê está programando uma funcionalidade na branch dev, seus arquivos ainda estão incompletos e cheios de erros temporários (código quebrado), e de repente surge um chamado urgente para verificar um bug na branch main.\n\nO Git NÃO permite alternar de branch se suas alterações locais colidirem com os arquivos da outra branch, e você NÃO deve comitar código quebrado!\n\nA solução perfeita é o git stash: ele funciona como uma gaveta rápida e segura. Ele "guarda" temporariamente todas as suas modificações não comitadas e deixa seu diretório de trabalho 100% limpo para alternar de branch livremente.\n\n• Comandos essenciais da gaveta de stash:\n• git stash push -u -m "descricao": Guarda as alterações incluindo novos arquivos criados (-u) com uma mensagem descritiva.\n• git stash list: Lista todas as gavetas salvas no histórico (stash@{0}, stash@{1}, etc.).\n• git stash show -p: Inspeciona em detalhes o código guardado antes de aplicá-lo.\n• git stash pop: Restaura as alterações no código e REMOVE o registro da gaveta (mais utilizado).\n• git stash apply: Restaura as alterações, mas MANTÉM uma cópia na gaveta (útil para testar o mesmo código em mais de uma branch).',
        tip: 'Se você aplicar o stash e houver conflito de código com a branch atual, execute:\ngit stash branch nome-da-nova-branch\nO Git criará automaticamente uma branch nova a partir do commit original e aplicará o conteúdo guardado nela sem conflitar!',
        warning: 'Limpeza da gaveta:\nO stash foi projetado para pausas rápidas (horas ou no mesmo dia). Evite deixar stashes acumulados por semanas, pois você pode se esquecer do que estava guardado.\n• Para descartar um stash específico: git stash drop stash@{0}\n• Para limpar todos os stashes de uma vez: git stash clear',
        code: '# 1. Guarda tudo na gaveta temporária (-u inclui novos arquivos criados)\ngit stash push -u -m "wip: implementação parcial do formulário"\n\n# 2. Seu ambiente agora está limpo! Mude de branch e resolva a urgência\ngit switch main\n# ... faz a verificação necessária na main ...\n\n# 3. Retorne para a dev e recupere seu trabalho de onde parou\ngit switch dev\ngit stash pop\n\n# 4. Caso queira listar os itens guardados no stash:\ngit stash list',
        lang: 'bash'
      },
      {
        title: 'Guia de Sobrevivência: Desfazer alterações com segurança (restore, amend e revert)',
        text: 'Saber desfazer alterações sem perder seu código é fundamental. O Git moderno possui comandos cirúrgicos para cada estágio do arquivo:\n\n1. Arquivo modificado no computador (antes do git add):\nSe você testou um trecho de código que não funcionou e quer descartar as alterações locais, voltando ao estado do último commit:\ngit restore nome-do-arquivo.ext\n\n2. Arquivo colocado no stage por engano (depois do git add):\nSe você executou git add em um arquivo com senhas ou incompleto e quer tirá-lo do palco sem apagar o que escreveu:\ngit restore --staged nome-do-arquivo.ext\n\n3. Errou a mensagem do último commit local (git commit --amend):\nCometeu um erro de digitação na mensagem do commit ou esqueceu de incluir um arquivo? Você pode "emendar" o commit mais recente sem criar um segundo commit feio:\ngit commit --amend -m "feat: mensagem corrigida"\n\n4. O commit já foi enviado ao GitHub (git revert):\nSe um commit com bug já foi compartilhado no GitHub remoto, você NÃO deve reescrever o passado. O comando git revert cria um NOVO commit com o efeito oposto, mantendo a história da equipe intacta e transparente.',
        tip: 'Para reverter um commit enviado ao GitHub:\n1. Veja o histórico recente com git log --oneline -n 5\n2. Copie os primeiros 7 caracteres do hash do commit com defeito (ex: 8f3c1a2)\n3. Execute git revert 8f3c1a2. O Git criará um commit com o título "Revert ..." de forma limpa. Envie com git push origin main!',
        warning: '⚠️ CUIDADO MÁXIMO COM git reset --hard!\nMuitos tutoriais na internet sugerem `git reset --hard HEAD~1` para apagar commits. O comando reset --hard é DESTRUTIVO: ele reescreve a história e apaga o código do seu disco sem pedir confirmação.\nRegra profissional: Em branches compartilhadas (como main), NUNCA use git reset --hard. Prefira sempre git revert!',
        code: '# CENÁRIO 1: Descarta alterações locais não salvas em um arquivo\ngit restore index.html\n\n# CENÁRIO 2: Tira um arquivo da área de stage (unstage) sem apagar o código\ngit restore --staged .env\n\n# CENÁRIO 3: Emenda arquivos esquecidos ou altera a mensagem do último commit local\ngit add arquivo-esquecido.txt\ngit commit --amend -m "feat: adiciona componente com validação de campos"\n\n# CENÁRIO 4: Reverte de forma segura um commit já enviado ao GitHub remoto\ngit log --oneline -n 3\ngit revert <hash-do-commit>\ngit push origin main',
        lang: 'bash'
      },
      {
        title: 'Auditoria do Histórico: git log em árvore, diff e blame',
        text: 'Em equipes profissionais, conseguir investigar o que aconteceu no repositório é uma das habilidades mais valorizadas.\n\n• Desenho da árvore de branches no terminal:\nO comando tradicional git log exibe páginas longas de texto. Com os parâmetros --oneline --graph --all, o Git desenha as ramificações e convergências das branches como um grafo colorido direto no terminal, mostrando onde cada branch está apontando.\n\n• Comparação de código com git diff:\n• git diff: Exibe linha por linha o que você alterou nos arquivos locais que ainda NÃO foram adicionados com git add.\n• git diff --staged: Exibe o que já foi preparado na staging area pronto para virar commit.\n\n• Investigação por linha com git blame:\nO comando git blame arquivo.ext lista cada linha do arquivo ao lado do nome do autor que a escreveu, data e hash do commit. É fundamental para entender o contexto histórico de por que uma regra foi implementada.',
        tip: 'Crie atalhos (aliases) personalizados no Git Bash para economizar tempo todos os dias!\nExecute no terminal:\ngit config --global alias.grafo "log --oneline --graph --all"\ngit config --global alias.s "status -s"\ngit config --global alias.d "diff"\nAgora você só precisa digitar `git grafo` para ver o mapa visual e `git s` para um status limpo e resumido!',
        warning: 'Cultura do git blame:\nO termo "blame" significa culpar em inglês, mas no dia a dia profissional ele NUNCA deve ser usado para apontar dedos! Ele serve para encontrar quem tem mais conhecimento sobre uma regra de negócio complexa para tirar dúvidas de forma colaborativa.',
        code: '# 1. Visualiza a árvore completa de branches e merges no terminal\ngit log --oneline --graph --all\n\n# 2. Compara as alterações do seu código local com o último commit\ngit diff\n\n# 3. Compara o que já está na área de preparação (staged)\ngit diff --staged\n\n# 4. Descobre quem escreveu e quando cada linha de um arquivo foi alterada\ngit blame README.md\n\n# 5. Configura o atalho definitivo "git grafo" para seu Git global\ngit config --global alias.grafo "log --oneline --graph --all"',
        lang: 'bash'
      },
      {
        title: 'Versionamento Semântico (SemVer) e Tags de Release no GitHub',
        text: 'Enquanto branches estão sempre em movimento com novos commits, as Tags são marcadores fixos e imutáveis no tempo. Elas marcam momentos históricos oficiais do seu projeto, como o lançamento de uma nova versão (ex: v1.0.0, v1.1.0, v2.0.0).\n\n• O que é Versionamento Semântico (SemVer)?\nO padrão mundial da indústria adota o formato MAJOR.MINOR.PATCH (ex: v1.2.3):\n• MAJOR (1.0.0 → 2.0.0): Mudança que quebra compatibilidade com versões anteriores (breaking changes).\n• MINOR (1.0.0 → 1.1.0): Novas funcionalidades adicionadas de forma 100% retrocompatível.\n• PATCH (1.0.0 → 1.0.1): Correções pontuais de defeitos (bug fixes) sem novos recursos.\n\n• Tipos de Tags no Git:\n• Tag leve: Apenas um apelido para um commit (ex: git tag v1.0.0).\n• Tag anotada (Recomendada): Salva como um objeto completo no Git, guardando nome do autor, e-mail, data e mensagem de release (ex: git tag -a v1.0.0 -m "mensagem").\n\n• Publicação de Releases no GitHub:\nTags não são enviadas ao remoto com o git push comum. Elas precisam ser enviadas explicitamente com git push origin v1.0.0 ou git push origin --tags.\nNo GitHub, as tags aparecem na aba "Releases", permitindo que qualquer pessoa baixe o código-fonte empacotado em .zip daquela versão estável.',
        tip: 'Após enviar sua tag para o GitHub:\n1. Acesse seu repositório no navegador e clique em "Releases" na barra lateral direita.\n2. Clique em "Draft a new release" e escolha a tag v1.0.0.\n3. Clique no botão "Generate release notes": o GitHub analisará todos os Pull Requests e commits desde a versão anterior e criará o texto de lançamento automaticamente!',
        warning: 'Como apagar uma tag criada por engano:\nSe você criou uma tag com o nome errado ou no commit incorreto:\n• Para excluir localmente no seu computador: git tag -d v1.0.0\n• Para excluir no GitHub remoto: git push origin --delete v1.0.0',
        code: '# 1. Cria uma tag anotada de versão oficial com mensagem descritiva\ngit tag -a v1.0.0 -m "Release v1.0.0: Primeira versão estável do projeto"\n\n# 2. Lista todas as tags existentes no repositório\ngit tag\n\n# 3. Exibe os metadados completos da tag (autor, data, mensagem e commit)\ngit show v1.0.0\n\n# 4. Envia a tag para o GitHub (cria a Release remota)\ngit push origin v1.0.0\n\n# 5. Para enviar todas as tags locais pendentes de uma só vez:\ngit push origin --tags',
        lang: 'bash'
      }
    ],
    exercise: 'Coloque em prática o fluxo avançado: 1. Na branch main, crie a tag anotada v1.0.0 e envie com git push origin v1.0.0. 2. Na branch dev, faça uma alteração temporária em um arquivo, guarde na gaveta com git stash push -u -m "wip-teste", confira com git stash list e recupere com git stash pop. 3. Conclua o commit, volte para a main e realize o git merge dev (se surgir conflito, resolva ou pratique o git merge --abort para ver o cancelamento seguro). 4. Crie o alias git grafo e visualize sua árvore de commits completa.',
    check: [
      'Compreendo a causa dos conflitos de merge e sei ler e resolver os marcadores <<<<<<< HEAD e >>>>>>> dev.',
      'Conheço o botão de segurança git merge --abort para cancelar merges conflitantes sem perder dados.',
      'Domino o git stash (-u, list, pop e apply) para guardar trabalho temporário ao trocar de contexto.',
      'Sei quando usar git restore (descarte local), git commit --amend e git revert (reversão pública segura).',
      'Criei o alias de grafo no Git e sei inspecionar alterações com git diff e git blame.',
      'Entendo o Versionamento Semântico (SemVer) e publiquei uma tag anotada com git push origin v1.0.0.'
    ]
  },
  {
    id: 6, title: 'Git no Visual Studio Code', short: 'Fluxo visual integrado', icon: Code2, duration: '25 min',
    intro: 'Use o painel Source Control do VS Code para visualizar mudanças e executar operações comuns sem sair do editor.',
    objective: 'Ao final, você conseguirá revisar diferenças, preparar arquivos, criar commits e trabalhar com branches pela interface.',
    steps: [
      { title: 'Abra o projeto', text: 'Abra a pasta clonada no VS Code. O editor detectará automaticamente o repositório Git.', code: 'code tutorial-git', lang: 'bash' },
      { title: 'Revise as alterações', text: 'Abra Source Control na barra lateral. Selecione um arquivo para comparar a versão atual com a anterior.', code: 'Ctrl + Shift + G', lang: 'text' },
      { title: 'Prepare e registre', text: 'Use o botão + ao lado do arquivo para preparar a mudança, escreva a mensagem e confirme o commit. Depois, sincronize quando apropriado.', code: 'Stage → mensagem do commit → Commit → Sync/Push', lang: 'text' }
    ],
    exercise: 'Repita o exercício do módulo 3 usando apenas a interface do VS Code e compare o resultado com os comandos do terminal.',
    check: ['Abri o repositório no VS Code.', 'Revisei um diff.', 'Fiz stage e commit pela interface.', 'Localizei a opção de branch.']
  },
  {
    id: 7, title: 'GitHub Desktop', short: 'Git com interface gráfica', icon: PanelLeftOpen, duration: '20 min',
    intro: 'Conheça uma alternativa gráfica para clonar repositórios, revisar alterações e sincronizar commits.',
    objective: 'Ao final, você conseguirá executar o fluxo básico de versionamento pelo GitHub Desktop.',
    steps: [
      { title: 'Instale e entre na conta', text: 'Baixe o aplicativo pelo site oficial e autentique-se com sua conta GitHub.', code: 'https://desktop.github.com/', lang: 'text' },
      { title: 'Clone o projeto', text: 'Use File → Clone Repository e selecione o repositório do curso.', code: 'alesauer/tutorial-git', lang: 'text' },
      { title: 'Faça commit e sincronize', text: 'Revise a lista de mudanças, selecione os arquivos, escreva uma mensagem e confirme o commit. Use Push origin para publicar.', code: 'Changes → Summary → Commit to branch → Push origin', lang: 'text' }
    ],
    exercise: 'Repita uma alteração não crítica do laboratório usando GitHub Desktop. Compare como o aplicativo apresenta os mesmos conceitos de stage, commit e push.',
    check: ['Clonei o repositório no Desktop.', 'Revisei alterações antes do commit.', 'Publiquei uma branch ou sincronizei o repositório.', 'Sei relacionar as ações da interface aos comandos Git.']
  }
]

function CodeSnippet({ code, lang = 'bash' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      const area = document.createElement('textarea')
      area.value = code
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }
  return <div className="snippet">
    <div className="snippet-top"><span><span className="terminal-dot" />{lang === 'bash' ? 'Terminal' : lang === 'text' ? 'Exemplo' : lang}</span><button className="copy-btn" onClick={copy} aria-label="Copiar código">{copied ? <Check size={15}/> : <Clipboard size={15}/>} {copied ? 'Copiado' : 'Copiar'}</button></div>
    <pre><code>{code}</code></pre>
  </div>
}

function App() {
  const [activeId, setActiveId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completed, setCompleted] = useState({})
  const [checked, setChecked] = useState({})
  const [mobileMenu, setMobileMenu] = useState(false)
  const activeModule = activeId ? modules.find(m => m.id === activeId) : null
  const completedCount = modules.filter(m => completed[m.id]).length
  const progress = Math.round((completedCount / modules.length) * 100)
  const selectModule = (id) => { setActiveId(id); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const toggleCheck = (moduleId, itemIndex) => setChecked(prev => ({ ...prev, [`${moduleId}-${itemIndex}`]: !prev[`${moduleId}-${itemIndex}`] }))
  const markComplete = () => { if (activeId) setCompleted(prev => ({ ...prev, [activeId]: !prev[activeId] })) }

  return <div className={`app-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
    <header className="topbar">
      <div className="brand" onClick={() => selectModule(null)} role="button" tabIndex={0} title="Voltar ao início">
        <div className="brand-mark"><GitBranch size={21}/></div>
        <div className="brand-text"><strong>Curso Git / GitHub</strong><span>do Prof. S@uer</span></div>
      </div>
      <div className="top-actions">
        <a className="repo-link" href={repoUrl} target="_blank" rel="noreferrer">
          <Github size={17}/> Repositório do curso <ExternalLink size={13}/>
        </a>
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir navegação">
          {mobileMenu ? <X/> : <Menu/>}
        </button>
      </div>
    </header>

    <div className="layout">
      <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`} aria-label="Navegação do curso">
        <div className="sidebar-head">
          <div><span className="sidebar-label">CONTEÚDO DO CURSO</span><h2>Trilha de aprendizagem</h2></div>
          <button className="collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}>
            {sidebarOpen ? <PanelLeftClose size={18}/> : <PanelLeftOpen size={18}/>}
          </button>
        </div>
        <div className="progress-box">
          <div className="progress-label"><span>Seu progresso</span><strong>{progress}%</strong></div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}/></div>
          <span className="progress-caption">{completedCount} de {modules.length} módulos concluídos</span>
        </div>
        <nav className="module-nav">
          <button
            className={`module-link ${activeId === null ? 'active' : ''}`}
            onClick={() => selectModule(null)}
            title="Início do curso"
          >
            <span className="module-icon"><Home size={18}/></span>
            <span className="module-text">
              <strong>Início · Apresentação</strong>
              <small>Visão geral</small>
            </span>
            <span className="module-state">
              {activeId === null ? <span className="active-dot"/> : null}
            </span>
          </button>
          {modules.map(module => {
            const Icon = module.icon;
            const isActive = module.id === activeId;
            return <button key={module.id} className={`module-link ${isActive ? 'active' : ''}`} onClick={() => selectModule(module.id)} title={module.title}>
              <span className="module-icon"><Icon size={18}/></span>
              <span className="module-text"><strong>{String(module.id).padStart(2, '0')} · {module.title}</strong><small>{module.short}</small></span>
              <span className="module-state">{completed[module.id] ? <CheckCircle2 size={17}/> : isActive ? <span className="active-dot"/> : <span className="module-empty"/>}</span>
            </button>
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-icon"><CircleHelp size={18}/></div>
          <div className="help-copy"><strong>Precisa de ajuda?</strong><span>Consulte a documentação oficial.</span><a href="https://git-scm.com/doc" target="_blank" rel="noreferrer">Documentação Git <ExternalLink size={12}/></a></div>
        </div>
        <a className="github-card" href={repoUrl} target="_blank" rel="noreferrer">
          <Github size={20}/>
          <span><strong>Repositório de laboratório</strong><small>alesauer/tutorial-git</small></span>
          <ExternalLink size={14}/>
        </a>
      </aside>

      {!sidebarOpen && (
        <button className="expand-floating" onClick={() => setSidebarOpen(true)} aria-label="Expandir navegação">
          <ChevronsRight size={19}/><span>Conteúdo</span>
        </button>
      )}

      {mobileMenu && <button className="mobile-backdrop" aria-label="Fechar menu" onClick={() => setMobileMenu(false)}/>}

      <main className="main-content">
        {activeId === null ? (
          <div className="home-view">
            <section className="welcome-card">
              <div className="welcome-copy">
                <div className="eyebrow"><span className="eyebrow-dot"/> TRILHA PRÁTICA DE DESENVOLVIMENTO</div>
                <h1>Domine o Git.<br/><span>Colabore com confiança.</span></h1>
                <p>Aprenda a controlar versões, organizar seu trabalho e colaborar em projetos reais usando Git e GitHub.</p>
                <div className="welcome-actions">
                  <button className="primary-btn" onClick={() => selectModule(1)}>
                    <Play size={16} fill="currentColor"/> Começar o curso
                  </button>
                  <a href={repoUrl} target="_blank" rel="noreferrer" className="text-link">
                    Ver repositório <ExternalLink size={14}/>
                  </a>
                </div>
              </div>
              <div className="welcome-illustration" aria-hidden="true">
                <div className="orbit orbit-one"/>
                <div className="orbit orbit-two"/>
                <div className="git-tile"><GitBranch size={54}/></div>
                <div className="float-card float-card-top"><GitCommitHorizontal size={17}/><span>commit</span><CheckCircle2 size={15}/></div>
                <div className="float-card float-card-bottom"><GitPullRequest size={17}/><span>pull request</span></div>
                <div className="green-spark spark-one"/>
                <div className="green-spark spark-two"/>
              </div>
            </section>

            <section className="stats-row" aria-label="Informações do curso">
              <div className="stat-card"><div className="stat-icon"><BookOpen size={19}/></div><div><strong>7 módulos</strong><span>Do básico ao avançado</span></div></div>
              <div className="stat-card"><div className="stat-icon"><Clock3 size={19}/></div><div><strong>~3 horas</strong><span>Conteúdo prático</span></div></div>
              <div className="stat-card"><div className="stat-icon"><Users size={19}/></div><div><strong>Aprenda fazendo</strong><span>Exercícios e colaboração</span></div></div>
            </section>
          </div>
        ) : (
          <div className="lesson-view">
            <div className="breadcrumb">
              <button className="breadcrumb-btn" onClick={() => selectModule(null)}>
                <Home size={13}/> Início
              </button>
              <ChevronRight size={14}/>
              <span>{`Módulo ${activeId}`}</span>
              <ChevronRight size={14}/>
              <strong>{activeModule.title}</strong>
            </div>

            <section className="lesson-heading">
              <div>
                <div className="section-kicker">SEU CONTEÚDO</div>
                <h2>{activeModule.title}</h2>
                <p>{activeModule.intro}</p>
              </div>
              <span className="duration"><Clock3 size={14}/>{activeModule.duration}</span>
            </section>

            <div className="objective-card">
              <div className="objective-icon"><GraduationCap size={20}/></div>
              <div>
                <strong>Objetivo desta etapa</strong>
                <p>{activeModule.objective}</p>
              </div>
            </div>

            <section className="steps-section">
              <div className="section-title-row">
                <h3>Passo a passo</h3>
                <span>{activeModule.steps.length} etapas</span>
              </div>
              <div className="steps-list">
                {activeModule.steps.map((step, index) => (
                  <article className="step-card" key={`${activeId}-${step.title}`}>
                    <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="step-body">
                      <h4>{step.title}</h4>
                      <p className="step-desc">{step.text}</p>
                      {step.links && (
                        <div className="step-links-row">
                          {step.links.map(link => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="step-link-badge"
                            >
                              <ExternalLink size={13}/> {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                      {step.tip && (
                        <div className="step-tip-box">
                          <Lightbulb size={18}/>
                          <div>
                            <strong>Dica do Professor:</strong>
                            <span>{step.tip}</span>
                          </div>
                        </div>
                      )}
                      {step.warning && (
                        <div className="step-warning-box">
                          <AlertTriangle size={18}/>
                          <div>
                            <strong>Atenção / Segurança:</strong>
                            <span>{step.warning}</span>
                          </div>
                        </div>
                      )}
                      {step.code && <CodeSnippet code={step.code} lang={step.lang}/>}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="exercise-card">
              <div className="exercise-header">
                <div className="exercise-icon"><FileCode2 size={19}/></div>
                <div>
                  <span className="section-kicker">MÃO NA MASSA</span>
                  <h3>Exercício prático</h3>
                </div>
              </div>
              <p>{activeModule.exercise}</p>
              <div className="exercise-repo">
                <Github size={16}/>
                <span>Repositório utilizado nos testes</span>
                <a href={repoUrl} target="_blank" rel="noreferrer">
                  alesauer/tutorial-git <ExternalLink size={13}/>
                </a>
              </div>
            </section>

            <section className="checklist-card">
              <div className="section-title-row">
                <div>
                  <h3>Checklist de aprendizagem</h3>
                  <p>Marque os itens que você já concluiu nesta etapa.</p>
                </div>
                <span className="check-count">
                  {activeModule.check.filter((_, i) => checked[`${activeId}-${i}`]).length}/{activeModule.check.length}
                </span>
              </div>
              <div className="checklist">
                {activeModule.check.map((item, index) => (
                  <label className={`check-item ${checked[`${activeId}-${index}`] ? 'checked' : ''}`} key={item}>
                    <input
                      type="checkbox"
                      checked={!!checked[`${activeId}-${index}`]}
                      onChange={() => toggleCheck(activeId, index)}
                    />
                    <span className="custom-check"><Check size={13}/></span>
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="lesson-footer">
              <button
                className="secondary-btn"
                onClick={() => activeId === 1 ? selectModule(null) : selectModule(activeId - 1)}
              >
                <ChevronLeft size={16}/> {activeId === 1 ? 'Início' : 'Módulo anterior'}
              </button>
              <button
                className={`complete-btn ${completed[activeId] ? 'is-complete' : ''}`}
                onClick={markComplete}
              >
                {completed[activeId] ? <CheckCircle2 size={17}/> : <Check size={17}/>}{' '}
                {completed[activeId] ? 'Etapa concluída' : 'Marcar como concluída'}
              </button>
              <button
                className="primary-btn next-btn"
                disabled={activeId === modules.length}
                onClick={() => selectModule(activeId + 1)}
              >
                Próximo módulo <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        )}

        <footer className="footer">
          <span>Curso Git / GitHub do Prof. S@uer</span>
          <span>Aprender · Praticar · Colaborar</span>
        </footer>
      </main>
    </div>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)

