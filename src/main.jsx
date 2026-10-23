import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import {
  AlertTriangle, ArrowRight, Award, BookOpen, Camera, Check, CheckCheck, CheckCircle2, ChevronLeft, ChevronRight, ChevronsRight,
  CircleHelp, Clipboard, Clock3, Code2, Command, Compass, Cpu, Download, Edit3, ExternalLink, Eye, FileCode2,
  GitBranch, GitCommitHorizontal, GitFork, GitPullRequest, Github, Globe, GraduationCap,
  Home, Image as ImageIcon, Layers, Lightbulb, Link2, LogOut, Mail, Menu, PanelLeftClose, PanelLeftOpen, Play, Printer, Rocket, Search,
  Send, Settings, ShieldCheck, Sparkles, Terminal, Trash2, UploadCloud, User, UserCheck, Users, Workflow, X
} from 'lucide-react'
import './styles.css'

const repoUrl = 'https://github.com/alesauer/tutorial-git'

const STORAGE_KEYS = {
  STUDENT: 'git_course_student',
  COMPLETED: 'git_course_completed',
  CHECKED: 'git_course_checked',
  EVIDENCES: 'git_course_evidences',
  SENT_PREFIX: 'git_course_email_sent_'
}

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (err) {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err)
  }
}

async function compressImageFile(file, maxWidth = 1200, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = document.createElement('img')
      img.onload = () => {
        let width = img.width
        let height = img.height
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/webp', quality)
        resolve(dataUrl)
      }
      img.onerror = () => reject(new Error('Erro ao carregar a imagem para compressão.'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Erro ao ler arquivo.'))
    reader.readAsDataURL(file)
  })
}

const moduleEvidenceGuide = {
  1: {
    title: 'Print do Git Bash instalado',
    instruction: 'Tire um print da janela do Git Bash executando "git --version" e "pwd", comprovando a instalação no Windows.',
    allowLink: false,
    placeholder: ''
  },
  2: {
    title: 'Print da identidade Git configurada',
    instruction: 'Tire um print do terminal Git Bash executando "git config --global --list", mostrando seu user.name e user.email.',
    allowLink: false,
    placeholder: ''
  },
  3: {
    title: 'Link do repositório ou print do Git status/log',
    instruction: 'Cole o link do repositório no GitHub (ex: https://github.com/seu-usuario/tutorial-git) OU anexe print do terminal com "git status" e "git log --oneline".',
    allowLink: true,
    placeholder: 'https://github.com/seu-usuario/tutorial-git'
  },
  4: {
    title: 'Link da branch dev ou print de branches/merge',
    instruction: 'Cole o link da branch "dev" no GitHub OU anexe print do terminal executando "git branch -a" e "git log".',
    allowLink: true,
    placeholder: 'https://github.com/seu-usuario/tutorial-git/tree/dev'
  },
  5: {
    title: 'Link do Pull Request ou print da tela do PR',
    instruction: 'Cole o link do Pull Request aberto no GitHub OU anexe o print da tela do seu Pull Request.',
    allowLink: true,
    placeholder: 'https://github.com/alesauer/tutorial-git/pull/...'
  },
  6: {
    title: 'Print dos comandos avançados (stash / cherry-pick / bisect)',
    instruction: 'Tire um print do terminal executando "git stash list" ou "git cherry-pick" ou "git bisect" comprovando o laboratório avançado.',
    allowLink: false,
    placeholder: ''
  },
  7: {
    title: 'Print do histórico rebase ou link do repositório final',
    instruction: 'Tire um print do terminal com "git log --oneline -n 5" demonstrando o histórico linear após o rebase OU cole o link do repositório.',
    allowLink: true,
    placeholder: 'https://github.com/seu-usuario/tutorial-git'
  }
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

function generateCertificateCode(name, dateStr) {
  const base = `${name || 'ESTUDANTE'}-${dateStr || ''}-GIT-GITHUB-SAUER`.toUpperCase()
  let hash = 0
  for (let i = 0; i < base.length; i++) {
    hash = ((hash << 5) - hash) + base.charCodeAt(i)
    hash |= 0
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')
  return `GIT-${hex.slice(0, 4)}-${hex.slice(4, 8)}`
}

async function sendCertificateEmail(student, certCode, issueDate) {
  const targetEmail = (student?.email || '').trim().toLowerCase()
  const targetName = (student?.name || 'Estudante').trim()

  if (!targetEmail) {
    throw new Error('O e-mail do aluno não está cadastrado. Por favor, clique no botão no topo e cadastre seu e-mail.')
  }

  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    const templateParams = {
      to_name: targetName,
      to_email: targetEmail,
      user_email: targetEmail,
      email: targetEmail,
      recipient: targetEmail,
      to: targetEmail,
      reply_to: targetEmail,
      certificate_code: certCode,
      completion_date: issueDate,
      course_name: 'Curso Prático de Git e GitHub do Prof. S@uer',
      course_hours: '3 horas de prática intensiva',
      skills: 'Git Bash, Configuração, add, commit, push, pull, branches, merge, pull requests, cherry-pick, stash, bisect e rebase',
      site_url: window.location.origin
    }
    const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    return { success: true, simulated: false, res }
  }

  // Fallback simulado para desenvolvimento e demonstração caso as credenciais não estejam no .env
  await new Promise(resolve => setTimeout(resolve, 1200))
  console.info('[EmailJS Simulação] Certificado despachado:', { student, certCode, issueDate })
  return {
    success: true,
    simulated: true,
    message: 'Envio simulado com sucesso! Para envio real por e-mail, configure suas credenciais no arquivo .env.'
  }
}

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

function ConceptsPage({ onStartCourse, onBackHome }) {
  return (
    <div className="concepts-view">
      <div className="breadcrumb">
        <button className="breadcrumb-btn" onClick={onBackHome}>
          <Home size={13}/> Início
        </button>
        <ChevronRight size={14}/>
        <span>Fundamentos</span>
        <ChevronRight size={14}/>
        <strong>Entenda Antes de Praticar</strong>
      </div>

      <header className="concepts-hero">
        <div className="eyebrow"><span className="eyebrow-dot"/> GUIA CONCEITUAL · PROF. S@UER</div>
        <h2>Entenda Antes de Praticar</h2>
        <p>
          Antes de digitar qualquer comando no terminal, compreender o modelo mental do Git e o ecossistema do GitHub tornará seu aprendizado dez vezes mais rápido e evitará os erros mais comuns cometidos por iniciantes.
        </p>
        <div className="concepts-meta-row">
          <span className="concepts-badge"><Compass size={14}/> Fundamentos Essenciais</span>
          <span className="concepts-badge"><Clock3 size={14}/> ~10 min de leitura</span>
          <span className="concepts-badge"><Sparkles size={14}/> Didática Visual</span>
        </div>
      </header>

      {/* Seção 1: Git vs GitHub */}
      <section className="concepts-section">
        <div className="concepts-section-head">
          <span className="section-kicker">A GRANDE DIFERENÇA</span>
          <h3>1. Git vs. GitHub: Não confunda mais!</h3>
          <p>São duas tecnologias complementares, mas com naturezas e propósitos completamente diferentes.</p>
        </div>

        <div className="compare-grid">
          <div className="compare-card">
            <div className="compare-card-head">
              <div className="compare-icon git-icon"><GitBranch size={24}/></div>
              <div>
                <strong>Git</strong>
                <span>O Motor Local de Versionamento</span>
              </div>
            </div>
            <ul className="compare-list">
              <li><CheckCircle2 size={16}/> <strong>O que é:</strong> Um software de controle de versões distribuído de código aberto, criado por Linus Torvalds em 2005.</li>
              <li><CheckCircle2 size={16}/> <strong>Onde executa:</strong> Localmente no seu computador, via terminal (Git Bash, Prompt, PowerShell) ou extensões de editores.</li>
              <li><CheckCircle2 size={16}/> <strong>Independência:</strong> Funciona 100% offline. Você não precisa de conexão com a internet para criar commits, branches ou inspecionar histórico.</li>
              <li><CheckCircle2 size={16}/> <strong>Responsabilidade:</strong> Gravar o histórico de alterações arquivo a arquivo, permitindo voltar no tempo a qualquer momento.</li>
            </ul>
          </div>

          <div className="compare-card">
            <div className="compare-card-head">
              <div className="compare-icon github-icon"><Github size={24}/></div>
              <div>
                <strong>GitHub</strong>
                <span>A Plataforma de Colaboração em Nuvem</span>
              </div>
            </div>
            <ul className="compare-list">
              <li><CheckCircle2 size={16}/> <strong>O que é:</strong> Um serviço web na nuvem (da Microsoft) que hospeda repositórios Git remotos e ferramentas de colaboração.</li>
              <li><CheckCircle2 size={16}/> <strong>Onde executa:</strong> Nos servidores da nuvem, acessado pelo navegador ou ferramentas gráficas.</li>
              <li><CheckCircle2 size={16}/> <strong>Conexão:</strong> Exige internet para sincronizar seu trabalho local com a equipe através de envio (push) e recebimento (pull).</li>
              <li><CheckCircle2 size={16}/> <strong>Responsabilidade:</strong> Trabalho em equipe, revisão de código (Pull Requests), automações (CI/CD), rastreamento de problemas (Issues) e portfólio.</li>
            </ul>
          </div>
        </div>

        <div className="analogy-banner">
          <strong>💡 Analogia Clássica:</strong> Pense no <strong>Git</strong> como o motor a combustão do seu carro (a ferramenta que faz o veículo rodar de verdade). O <strong>GitHub</strong> é a rodovia conectada, o posto de recarga e a garagem coletiva onde vários motoristas se encontram para viajar juntos.
        </div>
      </section>

      {/* Seção 2: O Funcionamento Interno - O Ciclo dos 3 Estados */}
      <section className="concepts-section">
        <div className="concepts-section-head">
          <span className="section-kicker">ARQUITETURA INTERNA</span>
          <h3>2. Como o Git funciona por dentro: O Ciclo das 3 Áreas Locais</h3>
          <p>O maior segredo para dominar o Git é entender o caminho que um arquivo percorre antes de se tornar histórico definitivo.</p>
        </div>

        <div className="workflow-diagram">
          <div className="stage-card">
            <span className="stage-num">01</span>
            <h4>Working Directory</h4>
            <p>Seus arquivos reais no disco, sendo editados no VS Code. Aqui as alterações ainda são voláteis e não estão registradas.</p>
            <div className="stage-command">Edição no VS Code</div>
          </div>

          <div className="stage-card">
            <span className="stage-num">02</span>
            <h4>Staging Area (Index)</h4>
            <p>A "bancada de preparação". Você seleciona cirurgicamente quais arquivos alterados farão parte do próximo registro.</p>
            <div className="stage-command">git add &lt;arquivo&gt;</div>
          </div>

          <div className="stage-card">
            <span className="stage-num">03</span>
            <h4>Local Repository (.git)</h4>
            <p>O cofre permanente no seu computador. Quando você comita, o Git tira uma "foto" definitiva e grava com hash criptográfico.</p>
            <div className="stage-command">git commit -m "..."</div>
          </div>

          <div className="stage-card">
            <span className="stage-num">04</span>
            <h4>Remote Repository</h4>
            <p>O repositório na nuvem no GitHub. Onde seu histórico é publicado para a equipe e mantido em backup seguro.</p>
            <div className="stage-command">git push / git pull</div>
          </div>
        </div>

        <div className="step-tip-box">
          <Lightbulb size={18}/>
          <div>
            <strong>Por que a Staging Area existe?</strong>
            <span>Imagine que você alterou 5 arquivos: 3 corrigem um formulário e 2 mudam as cores do rodapé. A Staging Area permite adicionar com git add apenas os 3 do formulário e fazer um commit focado, deixando os outros 2 para outro commit separado. Isso mantém o histórico limpo e organizado!</span>
          </div>
        </div>
      </section>

      {/* Seção 3: Características Fundamentais do Git */}
      <section className="concepts-section">
        <div className="concepts-section-head">
          <span className="section-kicker">CARACTERÍSTICAS TÉCNICAS</span>
          <h3>3. Por que o Git domina o mundo do desenvolvimento?</h3>
          <p>Quatro pilares técnicos que tornam o Git a ferramenta padrão em 99% das empresas de tecnologia do planeta.</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-item-icon"><Workflow size={22}/></div>
            <div className="feature-item-text">
              <h4>1. Arquitetura 100% Distribuída</h4>
              <p>Ao contrário de ferramentas antigas (como SVN), no Git todo desenvolvedor possui uma cópia local completa de todo o histórico. Se o servidor cair, qualquer computador tem o backup integral do projeto.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-item-icon"><Layers size={22}/></div>
            <div className="feature-item-text">
              <h4>2. Snapshots no Tempo (Fotos Reais)</h4>
              <p>O Git não armazena apenas "diferenças de linhas" perdidas; ele enxerga o projeto como uma sucessão de fotografias completas no tempo, garantindo integridade e restauração instantânea de qualquer versão.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-item-icon"><ShieldCheck size={22}/></div>
            <div className="feature-item-text">
              <h4>3. Integridade Criptográfica (Hashes SHA)</h4>
              <p>Cada commit recebe uma impressão digital matemática única (como a1b2c3d...). É matematicamente impossível alterar uma única linha de código no passado sem que o Git detecte a fraude imediatamente.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-item-icon"><Cpu size={22}/></div>
            <div className="feature-item-text">
              <h4>4. Branches Ultraleves e Quase Gratuitas</h4>
              <p>Em outros sistemas, criar uma branch significava duplicar gigabytes de arquivos. No Git, uma branch é apenas um ponteiro de 41 bytes na memória. Você pode criar, mesclar e apagar branches em milissegundos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Possibilidades do GitHub no Mercado */}
      <section className="concepts-section">
        <div className="concepts-section-head">
          <span className="section-kicker">O PODER DO GITHUB</span>
          <h3>4. As possibilidades que o GitHub abre para sua carreira</h3>
          <p>Muito mais que um repositório: o GitHub é a principal plataforma de engenharia de software colaborativa da atualidade.</p>
        </div>

        <div className="possibilities-grid">
          <div className="possibility-card">
            <div className="icon-pill"><Users size={20}/></div>
            <h4>Colaboração e Code Review</h4>
            <p>Trabalhe em equipe sem conflitos diretos. Use Pull Requests para revisar código, sugerir melhorias linha por linha e aprovar alterações com rigor profissional.</p>
          </div>

          <div className="possibility-card">
            <div className="icon-pill"><Rocket size={20}/></div>
            <h4>Automação com GitHub Actions (CI/CD)</h4>
            <p>Configure pipelines automáticos: a cada commit, o GitHub pode testar seu código, verificar falhas de segurança e fazer deploy automático em produção.</p>
          </div>

          <div className="possibility-card">
            <div className="icon-pill"><Globe size={20}/></div>
            <h4>Comunidade Open Source & Portfólio</h4>
            <p>Contribua com os maiores projetos do mundo (Linux, React, Python) e construa seu portfólio público visível para recrutadores e empresas globais.</p>
          </div>
        </div>
      </section>

      {/* Seção 5: Glossário de Sobrevivência */}
      <section className="concepts-section">
        <div className="concepts-section-head">
          <span className="section-kicker">VOCABULÁRIO FUNDAMENTAL</span>
          <h3>5. Glossário Rápido de Termos do Git/GitHub</h3>
          <p>Os 8 termos que você mais ouvirá no dia a dia profissional:</p>
        </div>

        <div className="glossary-grid">
          <div className="glossary-item">
            <code>Repositório (Repo)</code>
            <span>A pasta do projeto gerenciada pelo Git contendo todos os arquivos e o histórico oculto na pasta .git.</span>
          </div>
          <div className="glossary-item">
            <code>Commit</code>
            <span>Um ponto de salvamento permanente no histórico, acompanhado de autor, data e mensagem explicativa.</span>
          </div>
          <div className="glossary-item">
            <code>Branch (Ramificação)</code>
            <span>Uma linha paralela de desenvolvimento para criar funcionalidades sem afetar a versão principal (main).</span>
          </div>
          <div className="glossary-item">
            <code>Merge (Mesclagem)</code>
            <span>A operação de unir o histórico de uma branch secundária (dev) de volta à branch principal.</span>
          </div>
          <div className="glossary-item">
            <code>Pull Request (PR)</code>
            <span>Uma proposta formal no GitHub para revisar e mesclar as alterações de uma branch em outra.</span>
          </div>
          <div className="glossary-item">
            <code>Clone</code>
            <span>Cópia idêntica de um repositório remoto baixada para o seu computador pela primeira vez.</span>
          </div>
          <div className="glossary-item">
            <code>Push (Enviar)</code>
            <span>Envia seus commits registrados localmente para o repositório remoto na nuvem (GitHub).</span>
          </div>
          <div className="glossary-item">
            <code>Pull (Puxar)</code>
            <span>Baixa e mescla as alterações mais recentes feitas pela equipe no GitHub para o seu computador.</span>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <div className="concepts-cta">
        <div>
          <h4>Tudo pronto para a prática?</h4>
          <p>Agora que você tem o mapa mental claro, vamos instalar o Git e dar seus primeiros passos práticos!</p>
        </div>
        <div className="concepts-cta-actions">
          <button className="secondary-btn" onClick={onBackHome}>
            <Home size={16}/> Voltar ao início
          </button>
          <button className="primary-btn" onClick={onStartCourse}>
            <Play size={16} fill="currentColor"/> Iniciar Módulo 01 (Download & Instalação)
          </button>
        </div>
      </div>
    </div>
  )
}

function RegisterModal({ isOpen, onClose, currentStudent, onSave, onLogout }) {
  if (!isOpen) return null

  const [name, setName] = useState(currentStudent?.name || '')
  const [email, setEmail] = useState(currentStudent?.email || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (trimmedName.length < 3) {
      setError('Por favor, informe seu nome completo (mínimo de 3 caracteres).')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setError('Por favor, informe um endereço de e-mail válido.')
      return
    }

    setError('')
    onSave({
      name: trimmedName,
      email: trimmedEmail,
      registeredAt: currentStudent?.registeredAt || new Date().toISOString()
    })
    onClose()
  }

  return (
    <div className="app-modal-backdrop" onClick={currentStudent ? onClose : undefined} role="dialog" aria-modal="true">
      <div className="app-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="app-modal-header">
          <div>
            <div className="section-kicker">IDENTIFICAÇÃO DO ALUNO</div>
            <h3>{currentStudent ? 'Editar Cadastro do Estudante' : 'Identificação para o Certificado'}</h3>
            <p>
              {currentStudent
                ? 'Atualize seu nome ou e-mail cadastrado.'
                : 'Cadastre seu nome e e-mail para registrar suas conquistas e receber seu certificado oficial ao concluir o curso.'}
            </p>
          </div>
          {currentStudent && (
            <button className="app-modal-close-btn" onClick={onClose} aria-label="Fechar modal">
              <X size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="app-modal-body">
          <div className="modal-evidence-alert">
            <Camera size={18} />
            <div>
              <strong>Evidências práticas obrigatórias:</strong>
              <span>Para emitir o certificado, é obrigatório anexar os prints do Git Bash e links do GitHub ao final de cada módulo. Lembre-se de registrar suas evidências durante as aulas!</span>
            </div>
          </div>

          {error && (
            <div className="step-warning-box" style={{ margin: '0 0 16px', padding: '10px 14px' }}>
              <AlertTriangle size={16} />
              <div><span>{error}</span></div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="student-name">Nome completo (para emissão do certificado)</label>
            <input
              id="student-name"
              type="text"
              placeholder="Ex: Maria Clara de Souza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
            <span className="form-hint">O nome digitado será impresso exatamente como inserido no certificado oficial.</span>
          </div>

          <div className="form-group">
            <label htmlFor="student-email">E-mail para envio do certificado</label>
            <input
              id="student-email"
              type="email"
              placeholder="seu-email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="form-hint">Ao atingir 100% de conclusão com as evidências anexadas, você receberá a notificação oficial neste e-mail.</span>
          </div>

          <div className={`form-actions ${currentStudent ? 'form-actions-between' : ''}`}>
            {currentStudent ? (
              <button
                type="button"
                className="modal-logout-btn"
                onClick={onLogout}
                title="Sair e limpar os dados deste aluno neste navegador"
              >
                <LogOut size={15} /> Sair e Limpar Sessão
              </button>
            ) : null}

            <div className="form-actions-right">
              {currentStudent && (
                <button type="button" className="secondary-btn" onClick={onClose}>
                  Cancelar
                </button>
              )}
              <button type="submit" className="primary-btn">
                <Check size={16} /> {currentStudent ? 'Salvar Alterações' : 'Iniciar Minha Jornada'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function EvidenceSection({ moduleId, currentEvidence, onSaveEvidence, onRemoveEvidence }) {
  const guide = moduleEvidenceGuide[moduleId]
  if (!guide) return null

  const [linkInput, setLinkInput] = useState(currentEvidence?.type === 'link' ? currentEvidence.data : '')
  const [isDragOver, setIsDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleProcessFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Por favor, selecione ou cole um arquivo de imagem válido (PNG, JPEG, WebP).')
      return
    }
    setError('')
    setLoading(true)
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 0.7)
      onSaveEvidence(moduleId, {
        type: 'image',
        data: compressedDataUrl,
        filename: file.name || 'print-terminal.webp',
        updatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      })
    } catch (err) {
      console.error('Erro na compressão:', err)
      setError('Não foi possível processar a imagem do print.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        handleProcessFile(file)
        e.preventDefault()
        break
      }
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleProcessFile(file)
  }

  const handleSaveLink = (e) => {
    e.preventDefault()
    const trimmed = linkInput.trim()
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setError('Por favor, informe uma URL válida iniciando com https://')
      return
    }
    setError('')
    onSaveEvidence(moduleId, {
      type: 'link',
      data: trimmed,
      updatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    })
  }

  return (
    <section className="evidence-card" onPaste={handlePaste} tabIndex={0} aria-label="Seção de comprovação do laboratório">
      <div className="evidence-header">
        <div className="evidence-header-left">
          <div className="evidence-icon-circle"><Camera size={22} /></div>
          <div>
            <h3>Comprovação Prática (Evidência Obrigatória)</h3>
            <p>Anexe a evidência deste módulo para habilitar a emissão do seu certificado.</p>
          </div>
        </div>
        <span className={`evidence-status-badge ${currentEvidence ? 'is-attached' : 'is-pending'}`}>
          {currentEvidence ? <CheckCheck size={14} /> : <AlertTriangle size={14} />}
          {currentEvidence ? 'Evidência Anexada' : 'Evidência Pendente'}
        </span>
      </div>

      <div className="evidence-guide-box">
        <strong>O que registrar:</strong> {guide.instruction}
      </div>

      {error && (
        <div className="step-warning-box" style={{ margin: '0 0 14px', padding: '10px 14px' }}>
          <AlertTriangle size={16} />
          <div><span>{error}</span></div>
        </div>
      )}

      {currentEvidence ? (
        <div className="evidence-attached-preview">
          {currentEvidence.type === 'image' ? (
            <img
              src={currentEvidence.data}
              alt="Evidência do laboratório"
              className="attached-media-thumb"
              onClick={() => window.open(currentEvidence.data, '_blank')}
              title="Clique para abrir imagem em tamanho real"
            />
          ) : (
            <div className="evidence-icon-circle" style={{ width: 40, height: 40 }}>
              <Link2 size={20} />
            </div>
          )}

          <div className="attached-info">
            <strong>
              <CheckCheck size={16} /> Comprovante registrado com sucesso!
            </strong>
            {currentEvidence.type === 'image' ? (
              <span>Arquivo: {currentEvidence.filename || 'Captura de tela'} · Anexado às {currentEvidence.updatedAt}</span>
            ) : (
              <div>
                <a href={currentEvidence.data} target="_blank" rel="noreferrer" className="attached-link-preview">
                  <ExternalLink size={13} /> {currentEvidence.data}
                </a>
                <span>Registrado às {currentEvidence.updatedAt}</span>
              </div>
            )}
          </div>

          <div className="attached-actions">
            {currentEvidence.type === 'image' && (
              <button
                type="button"
                className="secondary-btn"
                onClick={() => window.open(currentEvidence.data, '_blank')}
                title="Visualizar em tamanho real"
                style={{ padding: '8px 12px' }}
              >
                <Eye size={14} /> Ver
              </button>
            )}
            <button
              type="button"
              className="secondary-btn"
              onClick={() => onRemoveEvidence(moduleId)}
              title="Remover e anexar outra"
              style={{ color: '#b91c1c', padding: '8px 12px' }}
            >
              <Trash2 size={14} /> Substituir
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Dropzone para Imagem / Ctrl+V */}
          <div
            className={`evidence-dropzone ${isDragOver ? 'is-dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragOver(false)
              const file = e.dataTransfer.files?.[0]
              if (file) handleProcessFile(file)
            }}
            onClick={() => document.getElementById(`file-input-${moduleId}`)?.click()}
          >
            <input
              id={`file-input-${moduleId}`}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="dropzone-inner">
              <UploadCloud size={32} />
              <div className="dropzone-title">
                {loading ? 'Comprimindo e processando imagem...' : 'Clique para selecionar print OU cole com Ctrl + V'}
              </div>
              <div className="dropzone-desc">Formatos PNG, JPG, JPEG ou WebP</div>
              <div className="dropzone-shortcut">Dica: Tire o print (Win + Shift + S) e aperte Ctrl+V aqui</div>
            </div>
          </div>

          {/* Opção alternativa de link para módulos que aceitam GitHub */}
          {guide.allowLink && (
            <form onSubmit={handleSaveLink} className="evidence-link-box">
              <label htmlFor={`link-input-${moduleId}`}>Ou envie o link do seu repositório / Pull Request no GitHub:</label>
              <div className="evidence-link-row">
                <input
                  id={`link-input-${moduleId}`}
                  type="url"
                  placeholder={guide.placeholder || 'https://github.com/...'}
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                />
                <button type="submit" className="primary-btn" disabled={!linkInput.trim()}>
                  <Link2 size={15} /> Salvar Link
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  )
}

function MissingEvidenceModal({ isOpen, onClose, missingModules, onGoToModule }) {
  if (!isOpen) return null

  return (
    <div className="app-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="app-modal-box missing-evidence-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="app-modal-header">
          <div>
            <div className="section-kicker" style={{ color: '#b45309' }}>EVIDÊNCIAS PENDENTES</div>
            <h3>Faltam evidências para liberar o certificado!</h3>
            <p>
              Para comprovar que você realizou a prática completa, anexe os prints ou links dos seguintes módulos:
            </p>
          </div>
          <button className="app-modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div className="app-modal-body">
          <div className="missing-list">
            {missingModules.map(m => (
              <div className="missing-item" key={m.id}>
                <div className="missing-item-info">
                  <strong>Módulo {m.id}: {m.title}</strong>
                  <span>{moduleEvidenceGuide[m.id]?.instruction}</span>
                </div>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => { onClose(); onGoToModule(m.id) }}
                  style={{ padding: '8px 14px', fontSize: 13 }}
                >
                  Anexar <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Entendido, vou anexar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CertificateModal({ isOpen, onClose, student, issueDate, emailStatus, emailMsg, onResendEmail, evidencesCount = 7 }) {
  if (!isOpen) return null

  const certCode = generateCertificateCode(student?.name, issueDate)

  const handlePrint = () => {
    window.print()
  }

  const skillsList = [
    'Git Core & Git Bash no Windows',
    'Autoria & Identidade Git (config)',
    'Ciclo de Vida: Add, Commit, Push & Pull',
    'Branches, Merge & Resolução de Conflitos',
    'GitHub, Forks & Pull Requests',
    'Git Stash, Cherry-pick & Bisect',
    'Git Rebase Interativo & Boas Práticas',
    `Homologação de ${evidencesCount} de 7 Evidências Práticas (Prints & GitHub)`
  ]

  return (
    <div className="app-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cert-modal-box app-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-topbar">
          <strong>
            <Award size={20} /> Certificado Oficial de Conclusão
          </strong>
          <div className="cert-modal-actions">
            <button
              className="secondary-btn"
              onClick={onResendEmail}
              title="Reenviar certificado por e-mail"
              disabled={emailStatus === 'sending'}
            >
              {emailStatus === 'sending' ? <Clock3 size={15} /> : <Mail size={15} />}
              {emailStatus === 'sending' ? 'Enviando...' : 'Reenviar por E-mail'}
            </button>
            <button className="primary-btn" onClick={handlePrint} title="Imprimir certificado ou salvar em PDF">
              <Printer size={15} /> Imprimir / Salvar PDF
            </button>
            <button className="app-modal-close-btn" onClick={onClose} aria-label="Fechar">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="cert-scroll-area">
          {emailStatus === 'sending' && (
            <div className="cert-email-status-banner is-sending">
              <Clock3 size={18} />
              <div>
                <strong>Enviando certificado por e-mail...</strong>
                <span>Despachando notificação para <b>{student?.email}</b>.</span>
              </div>
            </div>
          )}
          {emailStatus === 'sent' && (
            <div className="cert-email-status-banner is-sent">
              <CheckCircle2 size={18} />
              <div>
                <strong>Certificado enviado com sucesso!</strong>
                <span>{emailMsg || `Uma cópia de confirmação foi enviada para ${student?.email}.`}</span>
              </div>
            </div>
          )}
          {emailStatus === 'error' && (
            <div className="cert-email-status-banner is-error">
              <AlertTriangle size={18} />
              <div>
                <strong>Atenção no envio do e-mail:</strong>
                <span>{emailMsg || 'Não foi possível despachar o e-mail automaticamente. Você pode tentar reenviar ou salvar como PDF.'}</span>
              </div>
            </div>
          )}

          <div className="certificate-frame">
            <div className="certificate-inner">
              <div className="cert-badge-row">
                <span className="cert-kicker">CURSO PRÁTICO OFICIAL · RECONHECIMENTO DE MÉRITO</span>
              </div>
              <h1>Certificado de Conclusão</h1>
              <p className="cert-intro-text">Certificamos com distinção acadêmica e técnica que</p>
              <div className="cert-student-name">{student?.name || 'Estudante'}</div>
              <p className="cert-statement">
                concluiu com aproveitamento integral todos os <strong>7 módulos práticos</strong> e atividades do{' '}
                <strong>Curso Git / GitHub do Prof. S@uer</strong>, acumulando carga horária estimada de{' '}
                <strong>3 horas de desenvolvimento prático</strong> e demonstrando competência nas seguintes áreas:
              </p>

              <div className="cert-skills-pills">
                {skillsList.map((skill) => (
                  <span className="cert-skill-pill" key={skill}>
                    ✓ {skill}
                  </span>
                ))}
              </div>

              <div className="cert-meta-footer">
                <div className="cert-meta-left">
                  <span>Data de emissão: <strong>{issueDate}</strong></span>
                  <span>Código de autenticação: <strong>{certCode}</strong></span>
                  <span>E-mail do titular: <strong>{student?.email}</strong></span>
                </div>

                <div className="cert-seal" title="Certificado Verificado 100%">
                  <Award size={36} />
                </div>

                <div className="cert-signature">
                  <div className="cert-signature-line" />
                  <strong>Prof. S@uer</strong>
                  <span>Instrutor & Especialista Git/GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeId, setActiveId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completed, setCompleted] = useState(() => loadFromStorage(STORAGE_KEYS.COMPLETED, {}))
  const [checked, setChecked] = useState(() => loadFromStorage(STORAGE_KEYS.CHECKED, {}))
  const [mobileMenu, setMobileMenu] = useState(false)

  // Registration, Certificate & Evidence State
  const [student, setStudent] = useState(() => loadFromStorage(STORAGE_KEYS.STUDENT, null))
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [pendingModule, setPendingModule] = useState(null)
  const [showCertModal, setShowCertModal] = useState(false)
  const [showMissingModal, setShowMissingModal] = useState(false)
  const [certEmailStatus, setCertEmailStatus] = useState('idle')
  const [certEmailMsg, setCertEmailMsg] = useState('')
  const [evidences, setEvidences] = useState(() => loadFromStorage(STORAGE_KEYS.EVIDENCES, {}))
  const [issueDate] = useState(() =>
    new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  )

  const activeModule = activeId ? modules.find(m => m.id === activeId) : null
  const completedCount = modules.filter(m => completed[m.id]).length
  const totalChecks = modules.reduce((sum, m) => sum + m.check.length, 0)
  const checkedCount = modules.reduce((sum, m) => sum + m.check.filter((_, i) => checked[`${m.id}-${i}`]).length, 0)
  const allModulesDone = modules.length > 0 && modules.every(m => !!completed[m.id])

  const missingEvidenceModules = modules.filter(m => !evidences[m.id]?.data)
  const hasAllEvidences = missingEvidenceModules.length === 0

  // Progress: 100% when all 7 modules are completed, or proportional based on modules + checks
  const progress = allModulesDone
    ? 100
    : Math.min(
        99,
        Math.round(
          ((completedCount / modules.length) * 75) +
          (totalChecks > 0 ? (checkedCount / totalChecks) * 25 : 0)
        )
      )

  const selectModule = (id) => {
    setActiveId(id)
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSaveEvidence = (moduleId, evidenceData) => {
    setEvidences(prev => {
      const next = { ...prev, [moduleId]: evidenceData }
      saveToStorage(STORAGE_KEYS.EVIDENCES, next)
      return next
    })
  }

  const handleRemoveEvidence = (moduleId) => {
    setEvidences(prev => {
      const next = { ...prev }
      delete next[moduleId]
      saveToStorage(STORAGE_KEYS.EVIDENCES, next)
      return next
    })
  }

  const triggerCertificateAndEmail = (studentProfile) => {
    const profile = studentProfile || student
    if (!profile) {
      setShowRegisterModal(true)
      return
    }

    if (!hasAllEvidences) {
      setShowMissingModal(true)
      return
    }

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      })
    } catch (e) {
      console.warn('Confetti error:', e)
    }

    setShowCertModal(true)

    const emailSentKey = `${STORAGE_KEYS.SENT_PREFIX}${profile.email}`
    const alreadySent = localStorage.getItem(emailSentKey)

    if (!alreadySent) {
      const certCode = generateCertificateCode(profile.name, issueDate)
      setCertEmailStatus('sending')
      setCertEmailMsg('')

      sendCertificateEmail(profile, certCode, issueDate)
        .then((result) => {
          setCertEmailStatus('sent')
          if (result.simulated) {
            setCertEmailMsg(result.message)
          } else {
            setCertEmailMsg(`Certificado enviado com sucesso para ${profile.email}.`)
          }
          try {
            localStorage.setItem(emailSentKey, 'true')
          } catch (err) {}
        })
        .catch((err) => {
          console.error('Erro ao enviar certificado:', err)
          setCertEmailStatus('error')
          setCertEmailMsg(err.text || err.message || 'Falha ao enviar e-mail via EmailJS.')
        })
    } else {
      setCertEmailStatus('sent')
      setCertEmailMsg(`Certificado já despachado anteriormente para ${profile.email}.`)
    }
  }

  const handleStartCourse = (targetModuleId = 1) => {
    if (!student) {
      setPendingModule(targetModuleId)
      setShowRegisterModal(true)
    } else {
      selectModule(targetModuleId)
    }
  }

  const handleSaveStudent = (newStudentData) => {
    setStudent(newStudentData)
    saveToStorage(STORAGE_KEYS.STUDENT, newStudentData)
    if (pendingModule) {
      selectModule(pendingModule)
      setPendingModule(null)
    } else if (allModulesDone && hasAllEvidences) {
      triggerCertificateAndEmail(newStudentData)
    }
  }

  const toggleCheck = (moduleId, itemIndex) => {
    setChecked(prev => {
      const next = { ...prev, [`${moduleId}-${itemIndex}`]: !prev[`${moduleId}-${itemIndex}`] }
      saveToStorage(STORAGE_KEYS.CHECKED, next)
      return next
    })
  }

  const markComplete = () => {
    if (activeId) {
      const willBeComplete = !completed[activeId]
      setCompleted(prev => {
        const next = { ...prev, [activeId]: willBeComplete }
        saveToStorage(STORAGE_KEYS.COMPLETED, next)
        return next
      })

      // When completing a module, automatically mark its checklist items as completed
      if (willBeComplete) {
        setChecked(prev => {
          const next = { ...prev }
          const currentMod = modules.find(m => m.id === activeId)
          if (currentMod) {
            currentMod.check.forEach((_, idx) => {
              next[`${activeId}-${idx}`] = true
            })
          }
          saveToStorage(STORAGE_KEYS.CHECKED, next)
          return next
        })
      }
    }
  }

  const handleFinishCourse = () => {
    // 1. Mark all modules as complete and all checklist items as checked
    const allCompleted = {}
    const allChecked = { ...checked }
    modules.forEach(m => {
      allCompleted[m.id] = true
      m.check.forEach((_, i) => {
        allChecked[`${m.id}-${i}`] = true
      })
    })
    setCompleted(allCompleted)
    setChecked(allChecked)
    saveToStorage(STORAGE_KEYS.COMPLETED, allCompleted)
    saveToStorage(STORAGE_KEYS.CHECKED, allChecked)

    // 2. Prompt registration if not registered
    if (!student) {
      setShowRegisterModal(true)
      return
    }

    // 3. Prompt missing evidence modal if any evidence is missing!
    if (!hasAllEvidences) {
      setShowMissingModal(true)
      return
    }

    // 4. Trigger certificate and email
    triggerCertificateAndEmail(student)
  }

  // Automatic celebration and email dispatch when reaching 100% AND has all evidences
  useEffect(() => {
    if (progress === 100 && student?.email && hasAllEvidences) {
      const emailSentKey = `${STORAGE_KEYS.SENT_PREFIX}${student.email}`
      const alreadySent = localStorage.getItem(emailSentKey)

      if (!alreadySent) {
        triggerCertificateAndEmail(student)
      }
    }
  }, [progress, student, hasAllEvidences, issueDate])

  const handleResendEmail = async () => {
    if (!student?.email) {
      setShowRegisterModal(true)
      return
    }
    const certCode = generateCertificateCode(student.name, issueDate)
    setCertEmailStatus('sending')
    setCertEmailMsg('')
    try {
      const result = await sendCertificateEmail(student, certCode, issueDate)
      setCertEmailStatus('sent')
      if (result.simulated) {
        setCertEmailMsg(result.message)
      } else {
        setCertEmailMsg(`Certificado reenviado com sucesso para ${student.email}!`)
      }
    } catch (err) {
      console.error('Erro ao reenviar certificado:', err)
      setCertEmailStatus('error')
      setCertEmailMsg(err.text || err.message || 'Não foi possível reenviar o e-mail.')
    }
  }

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Deseja realmente sair e limpar a sua sessão?\n\n' +
      'Isso removerá seus dados cadastrais, progresso e evidências salvas neste navegador, permitindo que um novo estudante inicie o curso.'
    )
    if (!confirmed) return

    try {
      localStorage.removeItem(STORAGE_KEYS.STUDENT)
      localStorage.removeItem(STORAGE_KEYS.COMPLETED)
      localStorage.removeItem(STORAGE_KEYS.CHECKED)
      localStorage.removeItem(STORAGE_KEYS.EVIDENCES)
      if (student?.email) {
        localStorage.removeItem(`${STORAGE_KEYS.SENT_PREFIX}${student.email}`)
      }
    } catch (err) {
      console.warn('Erro ao limpar localStorage:', err)
    }

    setStudent(null)
    setCompleted({})
    setChecked({})
    setEvidences({})
    setShowRegisterModal(false)
    setShowCertModal(false)
    setShowMissingModal(false)
    setActiveId(null)
  }

  return (
    <div className={`app-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <header className="topbar">
        <div className="brand" onClick={() => selectModule(null)} role="button" tabIndex={0} title="Voltar ao início">
          <div className="brand-mark"><GitBranch size={21}/></div>
          <div className="brand-text"><strong>Curso Git / GitHub</strong><span>do Prof. S@uer</span></div>
        </div>
        <div className="top-actions">
          {student ? (
            <div className="student-profile-group">
              <button
                className="student-profile-btn"
                onClick={() => setShowRegisterModal(true)}
                title="Clique para ver ou editar seu cadastro de estudante"
              >
                <span className="student-avatar"><UserCheck size={13} /></span>
                <span>{student.name.split(' ')[0]}</span>
                <Edit3 size={12} className="student-edit-icon" />
              </button>
              <button
                className="student-logout-topbar-btn"
                onClick={handleLogout}
                title="Sair e limpar a sessão deste estudante"
                aria-label="Sair e limpar sessão"
              >
                <LogOut size={13} />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <button
              className="student-register-btn"
              onClick={() => { setPendingModule(null); setShowRegisterModal(true) }}
              title="Cadastre seu nome e e-mail para o certificado"
            >
              <User size={14} /> Cadastrar Estudante
            </button>
          )}

          {progress === 100 && (
            <button
              className="top-cert-btn"
              onClick={() => setShowCertModal(true)}
              title="Visualizar e imprimir seu Certificado Oficial de Conclusão"
            >
              <Award size={16} /> Ver Certificado
            </button>
          )}

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

          {progress === 100 && (
            <button
              className="sidebar-cert-banner"
              onClick={() => setShowCertModal(true)}
              title="Clique para ver ou imprimir seu Certificado Oficial"
            >
              <div className="cert-banner-icon"><Award size={20} /></div>
              <div>
                <strong>100% Concluído!</strong>
                <span>Ver Certificado Oficial</span>
              </div>
            </button>
          )}

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
            <button
              className={`module-link ${activeId === 'concepts' ? 'active' : ''}`}
              onClick={() => selectModule('concepts')}
              title="Entenda Antes de Praticar: Funcionamento, características e possibilidades"
            >
              <span className="module-icon"><Compass size={18}/></span>
              <span className="module-text">
                <strong>Entenda Antes de Praticar</strong>
                <small>Fundamentos e conceitos</small>
              </span>
              <span className="module-state">
                {activeId === 'concepts' ? <span className="active-dot"/> : null}
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
              {progress === 100 && (
                <div className="course-completed-celebration-card" style={{ margin: '0 0 24px' }}>
                  <div className="celebration-icon"><Award size={32} /></div>
                  <div className="celebration-text">
                    <h3>🎉 Parabéns! Você concluiu 100% do curso de Git &amp; GitHub!</h3>
                    <p>Seu Certificado Oficial está emitido e autenticado. Você pode visualizá-lo, imprimi-lo ou reenviá-lo a qualquer momento.</p>
                  </div>
                  <button className="primary-btn complete-course-btn" onClick={() => triggerCertificateAndEmail()}>
                    <Award size={17} /> Visualizar Meu Certificado
                  </button>
                </div>
              )}
              <section className="welcome-card">
                <div className="welcome-copy">
                  <div className="eyebrow"><span className="eyebrow-dot"/> TRILHA PRÁTICA DE DESENVOLVIMENTO</div>
                  <h1>Domine o Git.<br/><span>Colabore com confiança.</span></h1>
                  <p>Aprenda a controlar versões, organizar seu trabalho e colaborar em projetos reais usando Git e GitHub.</p>
                  <div className="welcome-actions">
                    <button className="primary-btn" onClick={() => handleStartCourse(1)}>
                      <Play size={16} fill="currentColor"/> Começar o curso
                    </button>
                    <button className="secondary-btn" onClick={() => selectModule('concepts')} title="Entenda o funcionamento, características e possibilidades antes de praticar">
                      <Compass size={16}/> Entenda Antes de Praticar
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

              <section className="start-course-warning-banner">
                <div className="warning-banner-icon"><Camera size={26} /></div>
                <div className="warning-banner-content">
                  <div className="warning-banner-tag">AVISO OBRIGATÓRIO PARA O CERTIFICADO</div>
                  <h4>Atenção Estudante: Tire prints das suas práticas durante cada módulo!</h4>
                  <p>
                    Para que seu <strong>Certificado Oficial</strong> seja liberado ao final do curso, é obrigatório comprovar a realização das atividades práticas anexando os prints dos comandos no terminal (Git Bash) ou links dos seus repositórios e Pull Requests no GitHub em cada um dos 7 módulos.
                    <br />
                    <strong>Evite ter que refazer os passos:</strong> conforme for executando os comandos e exercícios das aulas, tire uma captura de tela (<kbd>Win + Shift + S</kbd>) e anexe na etapa correspondente!
                  </p>
                </div>
              </section>

              <section className="stats-row" aria-label="Informações do curso">
                <div className="stat-card"><div className="stat-icon"><BookOpen size={19}/></div><div><strong>7 módulos</strong><span>Do básico ao avançado</span></div></div>
                <div className="stat-card"><div className="stat-icon"><Clock3 size={19}/></div><div><strong>~3 horas</strong><span>Conteúdo prático</span></div></div>
                <div className="stat-card"><div className="stat-icon"><Users size={19}/></div><div><strong>Aprenda fazendo</strong><span>Exercícios e colaboração</span></div></div>
              </section>
            </div>
          ) : activeId === 'concepts' ? (
            <ConceptsPage onStartCourse={() => handleStartCourse(1)} onBackHome={() => selectModule(null)} />
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

              <div className="lesson-evidence-reminder">
                <div>
                  <Camera size={18} />
                  <span>
                    <strong>Lembrete de Evidência:</strong> Não esqueça de capturar o print dos comandos no Git Bash ou copiar o link do GitHub desta etapa para anexar na seção abaixo.
                  </span>
                </div>
                <span className={`evidence-status-badge ${evidences[activeId] ? 'is-attached' : 'is-pending'}`}>
                  {evidences[activeId] ? <CheckCheck size={14} /> : <AlertTriangle size={14} />}
                  {evidences[activeId] ? 'Evidência Anexada' : 'Evidência Pendente'}
                </span>
              </div>

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

              <EvidenceSection
                moduleId={activeId}
                currentEvidence={evidences[activeId]}
                onSaveEvidence={handleSaveEvidence}
                onRemoveEvidence={handleRemoveEvidence}
              />

              {allModulesDone && (
                <div className="course-completed-celebration-card">
                  <div className="celebration-icon"><Award size={32} /></div>
                  <div className="celebration-text">
                    <h3>🎉 Parabéns! Você concluiu todos os 7 módulos do curso!</h3>
                    <p>Seu Certificado Oficial com código autenticador está disponível para visualização, impressão e envio por e-mail.</p>
                  </div>
                  <button className="primary-btn complete-course-btn" onClick={() => triggerCertificateAndEmail()}>
                    <Award size={17} /> Visualizar Certificado
                  </button>
                </div>
              )}

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
                {activeId === modules.length ? (
                  <button
                    className="primary-btn complete-course-btn"
                    onClick={handleFinishCourse}
                  >
                    <Award size={17}/> {allModulesDone ? 'Ver Certificado' : 'Concluir Curso & Emitir Certificado'}
                  </button>
                ) : (
                  <button
                    className="primary-btn next-btn"
                    onClick={() => selectModule(activeId + 1)}
                  >
                    Próximo módulo <ChevronRight size={16}/>
                  </button>
                )}
              </div>
            </div>
          )}

          <footer className="footer">
            <span>Curso Git / GitHub do Prof. S@uer</span>
            <span>Aprender · Praticar · Colaborar</span>
          </footer>
        </main>
      </div>

      <MissingEvidenceModal
        isOpen={showMissingModal}
        onClose={() => setShowMissingModal(false)}
        missingModules={missingEvidenceModules}
        onGoToModule={(modId) => {
          setShowMissingModal(false)
          selectModule(modId)
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        currentStudent={student}
        onSave={handleSaveStudent}
        onLogout={handleLogout}
      />

      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        student={student}
        issueDate={issueDate}
        emailStatus={certEmailStatus}
        emailMsg={certEmailMsg}
        onResendEmail={handleResendEmail}
        evidencesCount={modules.filter(m => !!evidences[m.id]?.data).length}
      />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)

