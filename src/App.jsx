import React, { useState } from "react";

export default function App() {
  // =========================
  // CONTROLE DE TELAS
  // =========================
  const [telaAtual, setTelaAtual] = useState("login");

  // =========================
  // ESTADOS PRINCIPAIS
  // =========================
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [problemas, setProblemas] = useState([]);

  // =========================
  // FORMULÁRIOS
  // =========================
  const [formCadastro, setFormCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });

  const [formProblema, setFormProblema] = useState({
    titulo: "",
    cidade: "",
    bairro: "",
    descricao: "",
  });

  // =========================
  // DASHBOARD E FEED
  // =========================
  const [cidadeBusca, setCidadeBusca] = useState("");
  const [dashboard, setDashboard] = useState(null);

  const [cidadeFeed, setCidadeFeed] = useState("");
  const [comentariosInput, setComentariosInput] = useState({});

  // =========================
  // MENSAGENS DO SISTEMA
  // =========================
  const [mensagem, setMensagem] = useState("");

  // =========================
  // CADASTRO DE USUÁRIO
  // =========================
  function cadastrarUsuario(e) {
    e.preventDefault();

    // validação simples
    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      setMensagem("Preencha todos os campos do cadastro");
      return;
    }

    // não deixa cadastrar email repetido
    const emailJaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === formCadastro.email.toLowerCase()
    );

    if (emailJaExiste) {
      setMensagem("Já existe usuário com esse email");
      return;
    }

    // regra mantida como você pediu:
    // senha 123456 => prefeitura
    // qualquer outra => comum
    const tipo = formCadastro.senha === "123456" ? "PREFEITURA" : "COMUM";

    const novoUsuario = {
      id: Date.now(),
      nome: formCadastro.nome,
      email: formCadastro.email,
      senha: formCadastro.senha,
      tipo,
    };

    setUsuarios([...usuarios, novoUsuario]);

    // limpa formulário
    setFormCadastro({
      nome: "",
      email: "",
      senha: "",
    });

    setMensagem("Usuário cadastrado com sucesso!");
    setTelaAtual("login");
  }

  // =========================
  // LOGIN
  // =========================
  function loginUsuario(e) {
    e.preventDefault();

    const usuario = usuarios.find(
      (u) => u.email === formLogin.email && u.senha === formLogin.senha
    );

    if (!usuario) {
      setMensagem("Usuário não encontrado");
      return;
    }

    setUsuarioLogado(usuario);
    setTelaAtual("menu");
    setMensagem("");

    setFormLogin({
      email: "",
      senha: "",
    });
  }

  // =========================
  // LOGOUT
  // =========================
  function logout() {
    setUsuarioLogado(null);
    setTelaAtual("login");
    setMensagem("");
    setDashboard(null);
    setCidadeBusca("");
    setCidadeFeed("");
  }

  // =========================
  // CRIAR PROBLEMA
  // SOMENTE USUÁRIO COMUM
  // =========================
  function criarProblema(e) {
    e.preventDefault();

    if (usuarioLogado.tipo === "PREFEITURA") {
      setMensagem("Usuário prefeitura não pode criar problema");
      return;
    }

    if (
      !formProblema.titulo ||
      !formProblema.cidade ||
      !formProblema.bairro ||
      !formProblema.descricao
    ) {
      setMensagem("Preencha todos os campos do problema");
      return;
    }

    const novoProblema = {
      id: Date.now(),
      titulo: formProblema.titulo,
      cidade: formProblema.cidade,
      bairro: formProblema.bairro,
      descricao: formProblema.descricao,
      usuarioId: usuarioLogado.id,
      usuarioNome: usuarioLogado.nome,
      apoios: [],
      comentarios: [],
      dataCriacao: new Date().toLocaleString("pt-BR"),
    };

    // coloca o problema novo no topo
    setProblemas([novoProblema, ...problemas]);

    setFormProblema({
      titulo: "",
      cidade: "",
      bairro: "",
      descricao: "",
    });

    setMensagem("Problema criado com sucesso!");
  }

  // =========================
  // DASHBOARD POR CIDADE
  // =========================
  function buscarDashboard() {
    if (!cidadeBusca.trim()) {
      setMensagem("Digite uma cidade");
      setDashboard(null);
      return;
    }

    const filtrados = problemas.filter(
      (p) => p.cidade.toLowerCase() === cidadeBusca.toLowerCase()
    );

    if (filtrados.length === 0) {
      setDashboard(null);
      setMensagem("Nenhum problema encontrado nessa cidade");
      return;
    }

    // conta quantos problemas existem por bairro
    const bairrosContagem = {};

    filtrados.forEach((p) => {
      bairrosContagem[p.bairro] = (bairrosContagem[p.bairro] || 0) + 1;
    });

    let bairroMaisAfetado = "";
    let totalBairroMaisAfetado = 0;

    for (const bairro in bairrosContagem) {
      if (bairrosContagem[bairro] > totalBairroMaisAfetado) {
        bairroMaisAfetado = bairro;
        totalBairroMaisAfetado = bairrosContagem[bairro];
      }
    }

    // conta comentários totais e comentários da prefeitura
    let totalComentarios = 0;
    let comentariosPrefeitura = 0;

    filtrados.forEach((problema) => {
      const comentarios = problema.comentarios || [];
      totalComentarios += comentarios.length;

      comentarios.forEach((comentario) => {
        if (comentario.usuarioTipo === "PREFEITURA") {
          comentariosPrefeitura += 1;
        }
      });
    });

    // percentual de comentários da prefeitura
    const percentualPrefeitura =
      totalComentarios > 0
        ? ((comentariosPrefeitura / totalComentarios) * 100).toFixed(1)
        : "0.0";

    // regra simples para setas
    const setaProblemas = filtrados.length >= 3 ? "↑" : filtrados.length >= 1 ? "→" : "↓";
    const setaPrefeitura =
      Number(percentualPrefeitura) >= 30
        ? "↑"
        : Number(percentualPrefeitura) > 0
        ? "→"
        : "↓";

    setDashboard({
      cidade: cidadeBusca,
      totalProblemas: filtrados.length,
      bairroMaisAfetado,
      totalBairroMaisAfetado,
      percentualPrefeitura,
      setaProblemas,
      setaPrefeitura,
    });

    setMensagem("");
  }

  // =========================
  // APOIAR PROBLEMA
  // UM APOIO POR USUÁRIO
  // =========================
  function apoiarProblema(problemaId) {
    if (!usuarioLogado) return;

    const atualizados = problemas.map((problema) => {
      if (problema.id !== problemaId) return problema;

      const jaApoiou = problema.apoios.includes(usuarioLogado.id);

      if (jaApoiou) {
        setMensagem("Você já apoiou este problema");
        return problema;
      }

      return {
        ...problema,
        apoios: [...problema.apoios, usuarioLogado.id],
      };
    });

    setProblemas(atualizados);
  }

  // =========================
  // COMENTAR PROBLEMA
  // =========================
  function comentarProblema(problemaId) {
    const texto = comentariosInput[problemaId]?.trim();

    if (!texto) {
      setMensagem("Digite um comentário");
      return;
    }

    const atualizados = problemas.map((problema) => {
      if (problema.id !== problemaId) return problema;

      const novoComentario = {
        id: Date.now(),
        usuarioId: usuarioLogado.id,
        usuarioNome: usuarioLogado.nome,
        usuarioTipo: usuarioLogado.tipo,
        texto,
        data: new Date().toLocaleString("pt-BR"),
      };

      return {
        ...problema,
        comentarios: [...problema.comentarios, novoComentario],
      };
    });

    setProblemas(atualizados);

    // limpa só o input daquele problema
    setComentariosInput({
      ...comentariosInput,
      [problemaId]: "",
    });

    setMensagem("");
  }

  // =========================
  // FILTRO DO FEED POR CIDADE
  // =========================
  const problemasFeed = problemas.filter(
    (p) => p.cidade.toLowerCase() === cidadeFeed.toLowerCase()
  );

  // =========================
  // TELA LOGIN
  // =========================
  if (telaAtual === "login") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.titulo}>MMM</h1>
          <h2 style={styles.subtitulo}>Login</h2>

          <form onSubmit={loginUsuario} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Email"
              value={formLogin.email}
              onChange={(e) =>
                setFormLogin({ ...formLogin, email: e.target.value })
              }
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Senha"
              value={formLogin.senha}
              onChange={(e) =>
                setFormLogin({ ...formLogin, senha: e.target.value })
              }
            />

            <button style={styles.botaoPrimario}>Entrar</button>
          </form>

          <button
            style={styles.botaoSecundario}
            onClick={() => {
              setMensagem("");
              setTelaAtual("cadastro");
            }}
          >
            Criar conta
          </button>

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
        </div>
      </div>
    );
  }

  // =========================
  // TELA CADASTRO
  // =========================
  if (telaAtual === "cadastro") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.subtitulo}>Cadastro</h2>

          <form onSubmit={cadastrarUsuario} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Nome"
              value={formCadastro.nome}
              onChange={(e) =>
                setFormCadastro({ ...formCadastro, nome: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Email"
              value={formCadastro.email}
              onChange={(e) =>
                setFormCadastro({ ...formCadastro, email: e.target.value })
              }
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Senha"
              value={formCadastro.senha}
              onChange={(e) =>
                setFormCadastro({ ...formCadastro, senha: e.target.value })
              }
            />

            <button style={styles.botaoPrimario}>Cadastrar</button>
          </form>

          <button
            style={styles.botaoSecundario}
            onClick={() => {
              setMensagem("");
              setTelaAtual("login");
            }}
          >
            Voltar
          </button>

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
        </div>
      </div>
    );
  }

  // =========================
  // TELA MENU
  // =========================
  if (telaAtual === "menu") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.subtitulo}>Bem-vindo, {usuarioLogado.nome}</h2>

          <div style={styles.badgeTipo}>
            Tipo de usuário: {usuarioLogado.tipo}
          </div>

          {/* só usuário comum pode criar problema */}
          {usuarioLogado.tipo === "COMUM" && (
            <button
              style={styles.botaoPrimario}
              onClick={() => {
                setMensagem("");
                setTelaAtual("criar");
              }}
            >
              Criar Problema
            </button>
          )}

          <button
            style={styles.botaoPrimario}
            onClick={() => {
              setMensagem("");
              setTelaAtual("dashboard");
            }}
          >
            Ver Dashboard
          </button>

          <button
            style={styles.botaoPrimario}
            onClick={() => {
              setMensagem("");
              setTelaAtual("feed");
            }}
          >
            Ver Feed
          </button>

          <button style={styles.botaoSair} onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // TELA CRIAR PROBLEMA
  // =========================
  if (telaAtual === "criar") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.subtitulo}>Novo Problema</h2>

          <form onSubmit={criarProblema} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Título"
              value={formProblema.titulo}
              onChange={(e) =>
                setFormProblema({ ...formProblema, titulo: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Cidade"
              value={formProblema.cidade}
              onChange={(e) =>
                setFormProblema({ ...formProblema, cidade: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Bairro"
              value={formProblema.bairro}
              onChange={(e) =>
                setFormProblema({ ...formProblema, bairro: e.target.value })
              }
            />

            <textarea
              style={styles.textarea}
              placeholder="Descrição"
              value={formProblema.descricao}
              onChange={(e) =>
                setFormProblema({ ...formProblema, descricao: e.target.value })
              }
            />

            <button style={styles.botaoPrimario}>Salvar Problema</button>
          </form>

          <button
            style={styles.botaoSecundario}
            onClick={() => {
              setMensagem("");
              setTelaAtual("menu");
            }}
          >
            Voltar
          </button>

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
        </div>
      </div>
    );
  }

  // =========================
  // TELA DASHBOARD
  // =========================
  if (telaAtual === "dashboard") {
    return (
      <div style={styles.page}>
        <div style={styles.containerGrande}>
          <h2 style={styles.subtitulo}>Dashboard por Cidade</h2>

          <div style={styles.topBar}>
            <input
              style={styles.input}
              placeholder="Digite a cidade"
              value={cidadeBusca}
              onChange={(e) => setCidadeBusca(e.target.value)}
            />

            <button style={styles.botaoPrimario} onClick={buscarDashboard}>
              Buscar
            </button>

            <button
              style={styles.botaoSecundario}
              onClick={() => {
                setMensagem("");
                setTelaAtual("menu");
              }}
            >
              Voltar
            </button>
          </div>

          {dashboard && (
            <div style={styles.dashboardGrid}>
              <div style={styles.boxDashboard}>
                <h3>Problemas da Cidade</h3>
                <p style={styles.numeroGrande}>
                  {dashboard.totalProblemas} {dashboard.setaProblemas}
                </p>
              </div>

              <div style={styles.boxDashboard}>
                <h3>Bairro com Mais Problemas</h3>
                <p style={styles.textoBox}>
                  {dashboard.bairroMaisAfetado || "-"}
                </p>
                <p style={styles.textoSecundario}>
                  Total: {dashboard.totalBairroMaisAfetado}
                </p>
              </div>

              <div style={styles.boxDashboard}>
                <h3>% Comentários da Prefeitura</h3>
                <p style={styles.numeroGrande}>
                  {dashboard.percentualPrefeitura}% {dashboard.setaPrefeitura}
                </p>
              </div>
            </div>
          )}

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
        </div>
      </div>
    );
  }

  // =========================
  // TELA FEED
  // =========================
  if (telaAtual === "feed") {
    return (
      <div style={styles.page}>
        <div style={styles.containerGrande}>
          <h2 style={styles.subtitulo}>Feed por Cidade</h2>

          <div style={styles.topBar}>
            <input
              style={styles.input}
              placeholder="Digite a cidade do feed"
              value={cidadeFeed}
              onChange={(e) => setCidadeFeed(e.target.value)}
            />

            <button
              style={styles.botaoSecundario}
              onClick={() => {
                setMensagem("");
                setTelaAtual("menu");
              }}
            >
              Voltar
            </button>
          </div>

          {!cidadeFeed && (
            <div style={styles.aviso}>
              Digite uma cidade para visualizar apenas o feed daquela cidade.
            </div>
          )}

          {cidadeFeed && problemasFeed.length === 0 && (
            <div style={styles.aviso}>
              Nenhum problema encontrado para essa cidade.
            </div>
          )}

          {cidadeFeed &&
            problemasFeed.map((p) => (
              <div key={p.id} style={styles.feedCard}>
                <div style={styles.feedHeader}>
                  <div>
                    <h3 style={styles.feedTitulo}>{p.titulo}</h3>
                    <p style={styles.feedMeta}>
                      {p.cidade} - {p.bairro}
                    </p>
                  </div>

                  <div style={styles.feedBadge}>Problema</div>
                </div>

                <p style={styles.feedDescricao}>{p.descricao}</p>

                <div style={styles.feedInfoLinha}>
                  <span>
                    <strong>Autor:</strong> {p.usuarioNome}
                  </span>
                  <span>
                    <strong>Data:</strong> {p.dataCriacao}
                  </span>
                </div>

                <div style={styles.feedAcoes}>
                  <button
                    style={styles.botaoApoiar}
                    onClick={() => apoiarProblema(p.id)}
                  >
                    Apoiar ({p.apoios.length})
                  </button>
                </div>

                <div style={styles.secaoComentarios}>
                  <h4 style={styles.comentarioTitulo}>Comentários</h4>

                  <div style={styles.comentarioForm}>
                    <input
                      style={styles.input}
                      placeholder="Escreva um comentário"
                      value={comentariosInput[p.id] || ""}
                      onChange={(e) =>
                        setComentariosInput({
                          ...comentariosInput,
                          [p.id]: e.target.value,
                        })
                      }
                    />

                    <button
                      style={styles.botaoPrimario}
                      onClick={() => comentarProblema(p.id)}
                    >
                      Comentar
                    </button>
                  </div>

                  {p.comentarios.length === 0 ? (
                    <div style={styles.semComentario}>
                      Ainda não há comentários neste problema.
                    </div>
                  ) : (
                    p.comentarios.map((comentario) => (
                      <div key={comentario.id} style={styles.comentarioItem}>
                        <div style={styles.comentarioTopo}>
                          <strong>{comentario.usuarioNome}</strong>
                          <span>{comentario.data}</span>
                        </div>

                        <p style={styles.comentarioTexto}>
                          {comentario.texto}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

          {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
        </div>
      </div>
    );
  }

  return null;
}

// =========================
// ESTILOS
// =========================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef3f8",
    padding: "30px 16px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    maxWidth: "520px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  containerGrande: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  titulo: {
    textAlign: "center",
    margin: 0,
    color: "#1d4ed8",
  },

  subtitulo: {
    margin: 0,
    textAlign: "center",
    color: "#111827",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  botaoPrimario: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  botaoSecundario: {
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  botaoSair: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  botaoApoiar: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  mensagem: {
    textAlign: "center",
    color: "#b91c1c",
    fontWeight: "bold",
    marginTop: "8px",
  },

  badgeTipo: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "10px 12px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },

  topBar: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },

  boxDashboard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "18px",
  },

  numeroGrande: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#1d4ed8",
    margin: "8px 0 0 0",
  },

  textoBox: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "10px 0 0 0",
  },

  textoSecundario: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "8px",
  },

  aviso: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
    color: "#475569",
  },

  feedCard: {
    background: "#ffffff",
    border: "1px solid #dbe4ee",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  feedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },

  feedTitulo: {
    margin: 0,
    color: "#111827",
  },

  feedMeta: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  feedBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  feedDescricao: {
    margin: 0,
    color: "#374151",
    lineHeight: 1.5,
  },

  feedInfoLinha: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    color: "#475569",
    fontSize: "14px",
  },

  feedAcoes: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  secaoComentarios: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  comentarioTitulo: {
    margin: 0,
    color: "#111827",
  },

  comentarioForm: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  semComentario: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "12px",
    color: "#64748b",
  },

  comentarioItem: {
    background: "#f3f4f6",
    borderRadius: "12px",
    padding: "12px",
  },

  comentarioTopo: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    color: "#374151",
    fontSize: "13px",
    marginBottom: "6px",
  },

  comentarioTexto: {
    margin: 0,
    color: "#111827",
    lineHeight: 1.4,
  },
};