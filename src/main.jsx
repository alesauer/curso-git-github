import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, ChevronsRight,
  CircleHelp, Clipboard, Clock3, Code2, Command, Download, ExternalLink, FileCode2,
  GitBranch, GitCommitHorizontal, GitFork, GitPullRequest, Github, GraduationCap,
  Home, Menu, PanelLeftClose, PanelLeftOpen, Play, Search, Settings, Terminal, Users, X
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
        title: 'Executar o instalador (Opções recomendadas)',
        text: 'Execute o arquivo baixado (Git-2.xx-64-bit.exe) e siga as telas do assistente com as seguintes opções recomendadas:\n• Select Components: Marque "Git Bash Here" e "Git GUI Here".\n• Default Editor: Selecione o Visual Studio Code (ou Nano) como editor padrão.\n• Adjusting your PATH: Escolha a opção recomendada "Git from the command line and also from 3rd-party software".\n• Terminal Emulator: Escolha "Use MinTTY (the default terminal of MSYS2)".\n• Line Ending: Mantenha "Checkout Windows-style, commit Unix-style line endings".\nAvance com Next até finalizar a instalação.',
        code: '# Nenhuma linha de comando necessária nesta etapa.\n# Basta seguir o assistente mantendo as opções recomendadas acima.',
        lang: 'text'
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
    id: 3, title: 'Primeiros passos com Git', short: 'Comandos essenciais', icon: GitCommitHorizontal, duration: '35 min',
    intro: 'Aprenda o ciclo básico de trabalho: obter o projeto, alterar arquivos, preparar mudanças, registrar versões e sincronizar com o GitHub.',
    objective: 'Ao final, você conseguirá realizar o fluxo status → add → commit → push e atualizar sua cópia com pull.',
    steps: [
      { title: 'Clone o repositório', text: 'O clone cria uma cópia local e configura a conexão com o repositório remoto.', code: 'git clone https://github.com/alesauer/tutorial-git.git\ncd tutorial-git', lang: 'bash' },
      { title: 'Confira o estado e as diferenças', text: 'Use status para ver arquivos alterados e diff para inspecionar mudanças ainda não preparadas.', code: 'git status\ngit diff', lang: 'bash' },
      { title: 'Prepare e registre uma alteração', text: 'Edite um arquivo de exercício. Depois, prepare-o e crie um commit com uma mensagem objetiva.', code: 'git add README.md\ngit commit -m "Atualiza README"', lang: 'bash' },
      { title: 'Sincronize com o GitHub', text: 'Envie seus commits ao remoto. Para trazer atualizações remotas, use pull.', code: 'git push\ngit pull', lang: 'bash' }
    ],
    exercise: 'Clone o repositório, crie um arquivo chamado meu-primeiro-commit.txt, registre um commit e confira o histórico com git log --oneline. Não envie alterações diretamente para a branch principal compartilhada sem autorização do professor.',
    check: ['Clonei o repositório.', 'Entendo a diferença entre add e commit.', 'Consigo consultar o histórico.', 'Entendo a diferença entre commit e push.']
  },
  {
    id: 4, title: 'Branches e Pull Requests', short: 'Colaborar com segurança', icon: GitPullRequest, duration: '40 min',
    intro: 'Trabalhe em uma alteração isolada e proponha sua integração ao projeto por meio de um Pull Request (PR).',
    objective: 'Ao final, você terá criado uma branch, enviado commits e participado de uma revisão de código.',
    steps: [
      { title: 'Crie uma branch de trabalho', text: 'Use um nome curto que indique a tarefa. Evite desenvolver diretamente na branch principal.', code: 'git switch -c docs/adiciona-apresentacao', lang: 'bash' },
      { title: 'Registre e envie a alteração', text: 'Faça uma mudança pequena, crie um commit e publique a branch no GitHub.', code: 'git add .\ngit commit -m "Adiciona apresentação do projeto"\ngit push -u origin docs/adiciona-apresentacao', lang: 'bash' },
      { title: 'Abra um Pull Request', text: 'No GitHub, compare sua branch com a branch de destino. Explique o que mudou e peça revisão a um colega.', code: 'Título: Adiciona apresentação do projeto\nDescrição: Resume a mudança e como foi verificada.', lang: 'text' }
    ],
    exercise: 'Em dupla, uma pessoa abre um PR e a outra revisa, deixa um comentário útil e aprova ou solicita ajustes. Faça o merge somente após a revisão e conforme as regras do repositório.',
    check: ['Criei uma branch separada.', 'Publiquei a branch no GitHub.', 'Abri ou revisei um Pull Request.', 'Entendo que PR é uma proposta de integração, não um comando Git.']
  },
  {
    id: 5, title: 'Comandos intermediários e avançados', short: 'Histórico e recuperação', icon: GitFork, duration: '45 min',
    intro: 'Conheça comandos para integrar mudanças, guardar trabalho temporário e recuperar alterações com cuidado.',
    objective: 'Ao final, você saberá escolher uma estratégia segura para situações comuns de versionamento.',
    steps: [
      { title: 'Integrar uma branch', text: 'Mude para a branch que receberá as alterações e faça o merge da branch de origem.', code: 'git switch main\ngit merge nome-da-branch', lang: 'bash' },
      { title: 'Guardar alterações temporariamente', text: 'Stash é útil quando você precisa trocar de contexto sem criar um commit ainda.', code: 'git stash\ngit stash list\ngit stash pop', lang: 'bash' },
      { title: 'Desfazer com segurança', text: 'Restore pode descartar alterações locais. Revert cria um commit que desfaz outro commit sem reescrever o histórico compartilhado.', code: 'git restore --staged arquivo.txt\ngit revert <hash-do-commit>', lang: 'bash' },
      { title: 'Consultar e marcar versões', text: 'Use log para investigar o histórico e tag para marcar uma versão importante.', code: 'git log --oneline --graph\ngit tag v1.0.0', lang: 'bash' }
    ],
    exercise: 'Em um repositório de teste, simule um conflito entre duas branches, resolva os marcadores de conflito e conclua a integração. Não experimente reset --hard em trabalho importante.',
    check: ['Sei quando usar merge.', 'Entendo para que serve stash.', 'Sei que restore pode descartar mudanças.', 'Consigo identificar e resolver um conflito.']
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
                      <CodeSnippet code={step.code} lang={step.lang}/>
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

