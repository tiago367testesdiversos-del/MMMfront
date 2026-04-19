import React, { useEffect, useMemo, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

// ============================================================================
// URL DO BACKEND
// ----------------------------------------------------------------------------
// Em ambiente local, o React conversa com o Spring Boot nesta URL.
// Depois, no deploy, trocar para a URL pública do backend.
// ============================================================================
const BACKEND_URL = "https://mmm-backend-zytm.onrender.com";

// ============================================================================
// CORES DO SISTEMA
// ----------------------------------------------------------------------------
// Centralizar cores aqui facilita manutenção visual.
// ============================================================================
const cores = {
  azulPrincipal: "#1d4ed8",
  azulEscuro: "#1e3a8a",
  azulClaro: "#dbeafe",
  azulMuitoClaro: "#eff6ff",
  laranjaPrincipal: "#f59e0b",
  laranjaEscuro: "#d97706",
  fundo: "#f5f8fc",
  fundoSecundario: "#eaf1fb",
  branco: "#ffffff",
  texto: "#0f172a",
  textoSecundario: "#64748b",
  borda: "#dbe4ee",
  sombra: "0 18px 50px rgba(15, 23, 42, 0.08)",
  sombraLeve: "0 10px 28px rgba(15, 23, 42, 0.05)",
  sucesso: "#16a34a",
  sucessoEscuro: "#15803d",
  sucessoFundo: "#f0fdf4",
  erro: "#dc2626",
  erroEscuro: "#b91c1c",
  erroFundo: "#fef2f2",
  aviso: "#b45309",
  avisoFundo: "#fff7ed",
};

// ============================================================================
// ESTILOS
// ----------------------------------------------------------------------------


function criarStyles(isMobile) {
  return {
    pageCentralizada: {
      minHeight: "100dvh",
      background: `linear-gradient(180deg, ${cores.fundo} 0%, ${cores.fundoSecundario} 100%)`,
      padding: isMobile ? "8px" : "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      boxSizing: "border-box",
      overflowY: "auto",
    },

    cardPequeno: {
      width: "100%",
      maxWidth: isMobile ? "100%" : "650px",
      minHeight: "auto",
      maxHeight: isMobile ? "none" : "900px",
      background: cores.branco,
      borderRadius: isMobile ? "20px" : "30px",
      border: `1px solid ${cores.borda}`,
      boxShadow: cores.sombra,
      padding: isMobile ? "12px 10px 12px" : "14px 14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "8px" : "10px",
      boxSizing: "border-box",
      overflow: "hidden",
    },

    logo: {
      width: isMobile ? "90px" : "120px",
      maxWidth: "100%",
      display: "block",
      margin: "0 auto 4px auto",
    },

    topoSocial: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2px",
      textAlign: "center",
    },

    subtitulo: {
      margin: "2px 0 0 0",
      color: cores.azulPrincipal,
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: 800,
      lineHeight: 1.2,
      textAlign: "center",
    },

    descricao: {
      margin: 0,
      color: cores.azulPrincipal,
      lineHeight: 1.5,
      fontSize: isMobile ? "14px" : "16px",
      textAlign: "center",
    },

    barraAcoesInterna: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "10px" : "12px",
    },

    label: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      color: cores.texto,
      fontWeight: 700,
      fontSize: isMobile ? "13px" : "14px",
    },

    input: {
  width: "100%",
  height: isMobile ? 36 : 38,                 // 👈 adiciona altura controlada
  padding: isMobile ? "6px 10px" : "8px 12px", // 👈 diminui o “inchaço”
  borderRadius: isMobile ? "10px" : "12px",   // 👈 mais compacto
  border: `1px solid ${cores.borda}`,
  fontSize: isMobile ? "13px" : "14px",       // 👈 texto menor
  boxSizing: "border-box",
  background: "#fbfdff",
  outline: "none",
  color: cores.texto,
},

    textarea: {
      width: "100%",
      minHeight: isMobile ? "110px" : "130px",
      padding: isMobile ? "13px 14px" : "15px 16px",
      borderRadius: isMobile ? "14px" : "18px",
      border: `1px solid ${cores.borda}`,
      fontSize: isMobile ? "14px" : "15px",
      boxSizing: "border-box",
      background: "#fbfdff",
      outline: "none",
      color: cores.texto,
      resize: "vertical",
      fontFamily: "inherit",
    },

    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "12px",
    },

    botaoPrimario: {
      background: `linear-gradient(135deg, ${cores.azulPrincipal} 0%, ${cores.azulEscuro} 100%)`,
      color: "#fff",
      border: "none",
      borderRadius: isMobile ? "14px" : "18px",
      padding: isMobile ? "14px 16px" : "15px 18px",
      fontWeight: 800,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
      boxShadow: "0 12px 28px rgba(29, 78, 216, 0.18)",
      width: "100%",
    },

    botaoLaranja: {
      background: `linear-gradient(135deg, ${cores.laranjaPrincipal} 0%, ${cores.laranjaEscuro} 100%)`,
      color: "#fff",
      border: "none",
      borderRadius: isMobile ? "14px" : "18px",
      padding: isMobile ? "14px 16px" : "15px 18px",
      fontWeight: 800,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
      boxShadow: "0 12px 28px rgba(245, 158, 11, 0.20)",
      width: "100%",
    },

    botaoSecundario: {
      background: "#eef4fb",
      color: cores.texto,
      border: "1px solid #e2e8f0",
      borderRadius: isMobile ? "12px" : "16px",
      padding: isMobile ? "10px 12px" : "12px 16px",
      fontWeight: 700,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
    },

    botaoSair: {
      background: `linear-gradient(135deg, ${cores.erro} 0%, ${cores.erroEscuro} 100%)`,
      color: "#fff",
      border: "none",
      borderRadius: isMobile ? "12px" : "16px",
      padding: isMobile ? "10px 12px" : "12px 16px",
      fontWeight: 800,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
    },

    faixaMensagemErro: {
      background: cores.erroFundo,
      color: cores.erro,
      border: "1px solid #fecaca",
      borderRadius: "18px",
      padding: "13px 14px",
      textAlign: "center",
      fontWeight: 700,
      lineHeight: 1.5,
    },

    faixaMensagemSucesso: {
      background: cores.sucessoFundo,
      color: cores.sucessoEscuro,
      border: "1px solid #bbf7d0",
      borderRadius: "18px",
      padding: "13px 14px",
      textAlign: "center",
      fontWeight: 700,
      lineHeight: 1.5,
    },

    faixaMensagemAviso: {
      background: cores.avisoFundo,
      color: cores.aviso,
      border: "1px solid #fed7aa",
      borderRadius: "18px",
      padding: "13px 14px",
      textAlign: "center",
      fontWeight: 700,
      lineHeight: 1.5,
    },

    menuBoasVindas: {
      textAlign: "center",
      color: cores.azulEscuro,
      fontSize: isMobile ? "22px" : "clamp(20px, 2.2vw, 26px)",
      fontWeight: 800,
      margin: 0,
    },

    menuTexto: {
      textAlign: "center",
      color: cores.textoSecundario,
      fontSize: isMobile ? "14px" : "15px",
      lineHeight: 1.7,
      margin: 0,
    },

    menuGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "14px",
    },

    menuCardAcao: {
      background: "#fbfdff",
      border: `1px solid ${cores.borda}`,
      borderRadius: isMobile ? "16px" : "18px",
      padding: isMobile ? "14px" : "12px",
      boxShadow: cores.sombraLeve,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      alignItems: "center",
      textAlign: "center",
    },

    menuCardTitulo: {
      margin: 0,
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: 800,
      color: cores.azulPrincipal,
      textAlign: "center",
    },

    menuCardTexto: {
      margin: 0,
      fontSize: isMobile ? "14px" : "15px",
      lineHeight: 1.7,
      color: cores.azulPrincipal,
      textAlign: "center",
    },

    boxDashboard: {
      background: "#fbfdff",
      border: `1px solid ${cores.borda}`,
      borderRadius: isMobile ? "18px" : "24px",
      padding: isMobile ? "12px" : "18px",
      boxShadow: cores.sombraLeve,
      textAlign: "center",
    },

    numeroGrande: {
      fontSize: isMobile ? "24px" : "30px",
      fontWeight: 800,
      color: cores.azulPrincipal,
      margin: "6px 0 0 0",
    },

    textoBox: {
      fontSize: isMobile ? "18px" : "22px",
      fontWeight: 800,
      color: cores.texto,
      margin: "6px 0 0 0",
    },

    textoSecundario: {
      fontSize: isMobile ? "13px" : "14px",
      color: cores.textoSecundario,
      marginTop: "6px",
      lineHeight: 1.5,
    },

    aviso: {
      background: cores.azulMuitoClaro,
      border: "1px solid #bfdbfe",
      borderRadius: "18px",
      padding: "14px 16px",
      textAlign: "center",
      color: cores.azulEscuro,
      fontWeight: 700,
      lineHeight: 1.6,
    },

mensagemDoacao: {
  marginTop: 10,
  fontSize: "13px",
  color: "#2f5bea",
  textAlign: "center",
  lineHeight: "1.4",
},


    // =========================
    // FEED
    // =========================
    feedLista: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },

    feedCard: {
      background: "#ffffff",
      border: `1px solid ${cores.borda}`,
      borderRadius: isMobile ? "18px" : "24px",
      padding: isMobile ? "14px" : "18px",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "12px" : "14px",
      boxShadow: cores.sombraLeve,
    },

    feedHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "flex-start",
      gap: "12px",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },

    feedCabecalhoEsquerdo: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      flex: 1,
      minWidth: 0,
    },

    feedTitulo: {
      margin: 0,
      color: cores.texto,
      fontSize: isMobile ? "17px" : "20px",
      lineHeight: 1.3,
      fontWeight: 800,
    },

    feedMeta: {
      margin: 0,
      color: cores.textoSecundario,
      fontSize: isMobile ? "13px" : "14px",
      lineHeight: 1.6,
    },

    feedDescricao: {
      margin: 0,
      color: "#334155",
      lineHeight: 1.7,
      fontSize: isMobile ? "14px" : "15px",
    },

    feedInfoLinha: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      color: "#475569",
      fontSize: isMobile ? "13px" : "14px",
      background: "#f8fbff",
      border: `1px solid ${cores.borda}`,
      borderRadius: "16px",
      padding: isMobile ? "10px 12px" : "12px 14px",
    },

    feedAcoes: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },

    feedResumoTopo: {
      background: "#f8fbff",
      border: `1px solid ${cores.borda}`,
      borderRadius: "18px",
      padding: "12px 14px",
      color: cores.textoSecundario,
      fontSize: "14px",
      lineHeight: 1.6,
    },

    botaoApoiar: {
      background: `linear-gradient(135deg, ${cores.sucesso} 0%, ${cores.sucessoEscuro} 100%)`,
      color: "#fff",
      border: "none",
      borderRadius: "14px",
      padding: isMobile ? "12px 14px" : "11px 16px",
      fontWeight: 800,
      cursor: "pointer",
      width: isMobile ? "100%" : "auto",
    },

    botaoCarregarMais: {
      background: "#eef4fb",
      color: cores.azulEscuro,
      border: `1px solid ${cores.borda}`,
      borderRadius: "18px",
      padding: isMobile ? "12px 14px" : "14px 18px",
      fontWeight: 800,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
      width: isMobile ? "100%" : "auto",
    },

    secaoComentarios: {
      borderTop: "1px solid #e5e7eb",
      paddingTop: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    comentarioTitulo: {
      margin: 0,
      color: cores.texto,
      fontSize: isMobile ? "16px" : "18px",
    },

    comentarioForm: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    semComentario: {
      background: "#f8fafc",
      border: `1px solid ${cores.borda}`,
      borderRadius: "16px",
      padding: "14px",
      color: cores.textoSecundario,
      lineHeight: 1.6,
    },

    comentarioItem: {
      background: "#f8fafc",
      borderRadius: "16px",
      padding: "13px 14px",
      border: "1px solid #edf2f7",
    },

    comentarioOficial: {
      background: "#eff6ff",
      border: "1px solid #93c5fd",
      borderRadius: "16px",
      padding: "13px 14px",
    },

    comentarioTopo: {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      flexWrap: "wrap",
      color: "#374151",
      fontSize: isMobile ? "12px" : "13px",
      marginBottom: "8px",
    },

    comentarioAutorLinha: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    },

    seloOficial: {
      background: cores.azulPrincipal,
      color: "#fff",
      borderRadius: "999px",
      padding: "4px 10px",
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: 800,
    },

    comentarioTexto: {
      margin: 0,
      color: "#111827",
      lineHeight: 1.7,
      fontSize: isMobile ? "13px" : "14px",
    },

    areaScrollInterno: {
      flex: 1,
      minHeight: 0,
      overflowY: isMobile ? "visible" : "auto",
      paddingRight: isMobile ? "0" : "4px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    telaAnimada: {
      animation: "fadeSlideApp 0.35s ease",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "6px" : "8px",
      flex: 1,
      minHeight: 0,
    },
  };
}

// "Corrige função ordenarComentarios"

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const styles = criarStyles(isMobile);

  function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

  function ordenarComentarios(lista) {
    if (!Array.isArray(lista)) return [];

    return [...lista].sort((a, b) => {
      if (a.usuarioTipo === "PREFEITURA" && b.usuarioTipo !== "PREFEITURA") return -1;
      if (a.usuarioTipo !== "PREFEITURA" && b.usuarioTipo === "PREFEITURA") return 1;

      const dataA = a.dataIso || "";
      const dataB = b.dataIso || "";

      return dataB.localeCompare(dataA);
    });
  }





  // ==========================================================================
  // ESTADOS GERAIS
  // ==========================================================================
  const [telaAtual, setTelaAtual] = useState("inicio");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [problemas, setProblemas] = useState([]);

  // ==========================================================================
  // FORMULÁRIOS
  // ==========================================================================
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
    uf: "",
    bairro: "",
    descricao: "",
  });

  // ==========================================================================
  // DASHBOARD
  // ==========================================================================
  const [cidadeBusca, setCidadeBusca] = useState("");
  const [ufBusca, setUfBusca] = useState("");
  const [dashboard, setDashboard] = useState(null);

  // ==========================================================================
  // FEED
  // ==========================================================================
  const [cidadeFeed, setCidadeFeed] = useState("");
  const [ufFeed, setUfFeed] = useState("");
  const [bairroFeed, setBairroFeed] = useState("");
  const [quantidadeVisivelFeed, setQuantidadeVisivelFeed] = useState(10);
  const [comentariosInput, setComentariosInput] = useState({});

  // ==========================================================================
  // MENSAGENS E LOADING
  // ==========================================================================
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("aviso");
  const [carregando, setCarregando] = useState(false);

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  function mostrarMensagem(texto, tipo = "aviso") {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  function limparMensagem() {
    setMensagem("");
  }

  function hojeFormatoISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function normalizarTexto(texto) {
    return (texto || "").trim().toLowerCase();
  }

  // ==========================================================================
  // PADRONIZA DADOS VINDOS DO BACKEND
  // ----------------------------------------------------------------------------
  // Esta função transforma o JSON do backend em um formato consistente
  // para o React renderizar com segurança.
  // ==========================================================================
  function formatarProblemaBackend(item) {
    const comentariosFormatados = Array.isArray(item.comentarios)
      ? item.comentarios.map((comentario) => ({
          id: comentario.id,
          usuarioId: comentario.usuarioId || comentario.usuario?.id || null,
          usuarioNome: comentario.usuarioNome || comentario.usuario?.nome || "Usuário",
          usuarioTipo:
            comentario.usuarioTipo ||
            comentario.usuario?.tipo ||
            (comentario.oficial ? "PREFEITURA" : "COMUM"),
          texto: comentario.texto || "",
          data:
            comentario.data ||
            (comentario.dataCriacao
              ? new Date(comentario.dataCriacao).toLocaleString("pt-BR")
              : ""),
          dataIso:
            comentario.dataIso ||
            (comentario.dataCriacao
              ? String(comentario.dataCriacao).slice(0, 10)
              : hojeFormatoISO()),
          oficial: Boolean(comentario.oficial),
        }))
      : [];

    const apoiosFormatados = Array.isArray(item.apoios) ? item.apoios : [];

    return {
      id: item.id,
      titulo: item.titulo || "",
      cidade: item.cidade || "",
      uf: item.uf || "",
      bairro: item.bairro || "",
      descricao: item.descricao || "",
      usuarioId: item.usuarioId || item.usuario?.id || null,
      usuarioNome: item.nomeUsuario || item.usuario?.nome || "Usuário",

      // Mantém compatibilidade caso o backend mande listas
      apoios: apoiosFormatados,
      comentarios: comentariosFormatados,

      // Mantém compatibilidade caso o backend mande totais prontos
      totalApoios:
        typeof item.totalApoios === "number"
          ? item.totalApoios
          : Array.isArray(item.apoios)
          ? item.apoios.length
          : 0,

      totalComentarios:
        typeof item.totalComentarios === "number"
          ? item.totalComentarios
          : Array.isArray(item.comentarios)
          ? comentariosFormatados.length
          : 0,

      comentarioOficial: item.comentarioOficial || null,

      dataCriacao: item.dataCriacao
        ? new Date(item.dataCriacao).toLocaleString("pt-BR")
        : "",
      dataCriacaoIso: item.dataCriacao
        ? String(item.dataCriacao).slice(0, 10)
        : hojeFormatoISO(),
    };
  }

  // ==========================================================================
  // BUSCA OS COMENTÁRIOS DE UM PROBLEMA ESPECÍFICO
  // ----------------------------------------------------------------------------
  // Isso é importante porque o backend pode devolver /problemas com menos dados,
  // e /comentario/problema/{id} com os comentários completos.
  // ==========================================================================
  async function carregarComentariosDoProblema(problemaId) {
    try {
      const response = await fetch(`${BACKEND_URL}/comentario/problema/${problemaId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar comentários do problema");
      }

      const data = await response.json();

      const comentariosFormatados = Array.isArray(data)
        ? data.map((comentario) => ({
            id: comentario.id,
            usuarioId: comentario.usuarioId || comentario.usuario?.id || null,
            usuarioNome:
              comentario.usuarioNome || comentario.usuario?.nome || "Usuário",
            usuarioTipo:
              comentario.usuarioTipo ||
              comentario.usuario?.tipo ||
              (comentario.oficial ? "PREFEITURA" : "COMUM"),
            texto: comentario.texto || "",
            data: comentario.dataCriacao
              ? new Date(comentario.dataCriacao).toLocaleString("pt-BR")
              : "",
            dataIso: comentario.dataCriacao
              ? String(comentario.dataCriacao).slice(0, 10)
              : hojeFormatoISO(),
            oficial: Boolean(comentario.oficial),
          }))
        : [];

      return comentariosFormatados;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // ==========================================================================
  // CARREGA TODOS OS PROBLEMAS E, EM SEGUIDA, RECARREGA OS COMENTÁRIOS
  // ----------------------------------------------------------------------------
  // Esta é a função principal de sincronização do feed com o backend.
  // Antes havia DUPLICIDADE desta função no seu código. (Isso quebrava os comentários).
  // ==========================================================================
  async function carregarProblemas() {
    try {
      const response = await fetch(`${BACKEND_URL}/problemas`);

      if (!response.ok) {
        throw new Error("Erro ao buscar relatos");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        setProblemas([]);
        return;
      }

      const problemasBase = data.map(formatarProblemaBackend);

      const problemasComComentarios = await Promise.all(
        problemasBase.map(async (problema) => {
          const comentarios = await carregarComentariosDoProblema(problema.id);

          return {
            ...problema,
            comentarios,
            totalComentarios: comentarios.length,
          };
        })
      );

      setProblemas(problemasComComentarios);
    } catch (error) {
      console.error(error);
      mostrarMensagem("Não foi possível carregar os relatos da cidade.", "erro");
    }
  }

  // ==========================================================================
  // CARREGA USUÁRIOS DO BACKEND
  // ----------------------------------------------------------------------------
  // Útil para atualização local e também para depuração.
  // ==========================================================================
  async function carregarUsuarios() {
    try {
      const response = await fetch(`${BACKEND_URL}/usuarios`);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      const lista = Array.isArray(data) ? data : [];
      setUsuarios(lista);
      return lista;
    } catch (error) {
      console.error(error);
      mostrarMensagem("Não foi possível carregar os usuários.", "erro");
      return [];
    }
  }

  // ==========================================================================
  // EFEITOS INICIAIS
  // ==========================================================================
  useEffect(() => {
    carregarProblemas();
    carregarUsuarios();
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sempre que mudar filtro do feed, volta para 10 itens
  useEffect(() => {
    setQuantidadeVisivelFeed(10);
  }, [cidadeFeed, ufFeed, bairroFeed]);

  // ==========================================================================
  // CADASTRO DE USUÁRIO
  // ----------------------------------------------------------------------------
  // Envia o cadastro para o backend Spring Boot.
  // Depois recarrega a lista de usuários para manter o front sincronizado.
  // ==========================================================================
  async function cadastrarUsuario(e) {
  e.preventDefault();

  const nomeCadastro = formCadastro.nome.trim();
  const emailCadastro = formCadastro.email.trim().toLowerCase();
  const senhaCadastro = formCadastro.senha.trim();

  if (!nomeCadastro || !emailCadastro || !senhaCadastro) {
    mostrarMensagem("Preencha nome, email e senha para concluir o cadastro.", "erro");
    return;
  }

  if (!emailValido(emailCadastro)) {
    mostrarMensagem("Digite um email válido.", "erro");
    return;
  }

  try {
    setCarregando(true);

    const response = await fetch(`${BACKEND_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
      }),
    });

    if (!response.ok) {
      const mensagemErro = await response.text();

      if (response.status === 409) {
        throw new Error(mensagemErro || "Já existe um usuário com esse email.");
      }

      throw new Error(mensagemErro || "Erro ao cadastrar usuário.");
    }

    await carregarUsuarios();

    setFormCadastro({
      nome: "",
      email: "",
      senha: "",
    });

    mostrarMensagem("Cadastro realizado com sucesso!", "sucesso");
    setTelaAtual("login");
  } catch (error) {
    console.error(error);
    mostrarMensagem(error.message || "Não foi possível concluir o cadastro.", "erro");
  } finally {
    setCarregando(false);
  }
}
  // ==========================================================================
  // LOGIN
  // ----------------------------------------------------------------------------
  // Busca usuários no backend e compara email/senha. - com função de validação de email.
  // ==========================================================================
  async function loginUsuario(e) {
  e.preventDefault();

  const emailDigitado = formLogin.email.trim().toLowerCase();
  const senhaDigitada = formLogin.senha.trim();

  // valida campos vazios
  if (!emailDigitado || !senhaDigitada) {
    mostrarMensagem("Digite email e senha.", "erro");
    return;
  }

  // valida formato do email
  if (!emailValido(emailDigitado)) {
    mostrarMensagem("Digite um email válido.", "erro");
    return;
  }

  try {
    const listaUsuarios = await carregarUsuarios();

    // procura usuário
    const usuario = listaUsuarios.find(
      (u) =>
        (u.email || "").trim().toLowerCase() === emailDigitado &&
        (u.senha || "").trim() === senhaDigitada
    );

    if (!usuario) {
      mostrarMensagem("Email ou senha não encontrados.", "erro");
      return;
    }

    // login sucesso
    setUsuarioLogado(usuario);
    setTelaAtual("menu");
    limparMensagem();

    // limpa formulário
    setFormLogin({
      email: "",
      senha: "",
    });

  } catch (error) {
    console.error(error);
    mostrarMensagem("Não foi possível fazer login.", "erro");
  }
}
  // ==========================================================================
  // LOGOUT
  // ==========================================================================
  function logout() {
    setUsuarioLogado(null);
    setTelaAtual("login");
    limparMensagem();
    setDashboard(null);
    setCidadeBusca("");
    setUfBusca("");
    setCidadeFeed("");
    setUfFeed("");
    setBairroFeed("");
    setQuantidadeVisivelFeed(10);
  }

  // ==========================================================================
  // CRIAÇÃO DE PROBLEMA
  // ----------------------------------------------------------------------------
  // Publica o relato no backend e depois recarrega o feed.
  // ==========================================================================
  async function criarProblema(e) {
    e.preventDefault();

    if (!usuarioLogado) {
      mostrarMensagem("Faça login para publicar um relato.", "erro");
      return;
    }

    if (
      !formProblema.titulo.trim() ||
      !formProblema.cidade.trim() ||
      !formProblema.uf.trim() ||
      !formProblema.bairro.trim() ||
      !formProblema.descricao.trim()
    ) {
      mostrarMensagem("Preencha todos os campos do relato.", "erro");
      return;
    }

    try {
      setCarregando(true);

      const response = await fetch(`${BACKEND_URL}/problemas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formProblema.titulo.trim(),
          cidade: formProblema.cidade.trim(),
          uf: formProblema.uf.trim().toUpperCase(),
          bairro: formProblema.bairro.trim(),
          descricao: formProblema.descricao.trim(),
          usuarioId: usuarioLogado.id,
        }),
      });

      if (!response.ok) {
        const mensagemErro = await response.text();
        throw new Error(mensagemErro || "Não foi possível enviar o relato.");
      }

      await carregarProblemas();

      setFormProblema({
        titulo: "",
        cidade: "",
        uf: "",
        bairro: "",
        descricao: "",
      });

      // Preenche automaticamente o feed com a localidade do relato recém-criado
      setCidadeFeed(formProblema.cidade.trim());
      setUfFeed(formProblema.uf.trim().toUpperCase());
      setBairroFeed(formProblema.bairro.trim());

      mostrarMensagem("Relato publicado com sucesso!", "sucesso");
      setTelaAtual("feed");
    } catch (error) {
      console.error(error);
      mostrarMensagem(error.message || "Não foi possível enviar o relato.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  // ==========================================================================
  // MONTA DASHBOARD LOCAL
  // ----------------------------------------------------------------------------
  // Hoje o dashboard é calculado no front com base nos problemas carregados.
  // ==========================================================================
  function construirDashboardLocal(filtrados, cidade, uf) {
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

    const totalProblemas = filtrados.length;

    const totalProblemasHoje = filtrados.filter(
      (p) => p.dataCriacaoIso === hojeFormatoISO()
    ).length;

    const setaProblemas = totalProblemasHoje > 0 ? "↑" : "↓";

    const problemasComComentarioPrefeitura = filtrados.filter((problema) =>
      (problema.comentarios || []).some(
        (comentario) => comentario.usuarioTipo === "PREFEITURA"
      )
    ).length;

    const percentualPrefeitura =
      totalProblemas > 0
        ? Math.round((problemasComComentarioPrefeitura / totalProblemas) * 100)
        : 0;

    const comentariosOficiaisHoje = filtrados.some((problema) =>
      (problema.comentarios || []).some(
        (comentario) =>
          comentario.usuarioTipo === "PREFEITURA" &&
          comentario.dataIso === hojeFormatoISO()
      )
    );

    const setaPrefeitura = comentariosOficiaisHoje ? "↑" : "↓";

    return {
      cidade,
      uf,
      totalProblemas,
      bairroMaisAfetado,
      totalBairroMaisAfetado,
      percentualPrefeitura,
      setaProblemas,
      setaPrefeitura,
    };
  }

  // ==========================================================================
  // BUSCA DASHBOARD
  // ==========================================================================
  function buscarDashboard() {
    if (!cidadeBusca.trim() || !ufBusca.trim()) {
      mostrarMensagem("Digite a cidade e a UF para consultar as estatísticas.", "erro");
      setDashboard(null);
      return;
    }

    const cidadeNormalizada = cidadeBusca.trim();
    const ufNormalizada = ufBusca.trim().toUpperCase();

    const filtrados = problemas.filter(
      (p) =>
        normalizarTexto(p.cidade) === normalizarTexto(cidadeNormalizada) &&
        normalizarTexto(p.uf) === normalizarTexto(ufNormalizada)
    );

    if (filtrados.length === 0) {
      setDashboard(null);
      mostrarMensagem("Nenhum relato foi encontrado para essa cidade.", "aviso");
      return;
    }

    const dashboardLocal = construirDashboardLocal(
      filtrados,
      cidadeNormalizada,
      ufNormalizada
    );

    setDashboard(dashboardLocal);
    limparMensagem();
  }

  // ==========================================================================
  // APOIO
  // ----------------------------------------------------------------------------
  // Envia apoio ao backend e recarrega os problemas.
  // ==========================================================================
  async function apoiarProblema(problemaId) {
    if (!usuarioLogado) {
      mostrarMensagem("Faça login para apoiar.", "erro");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/apoios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId: usuarioLogado.id,
          problemaId: problemaId,
        }),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Não foi possível registrar o apoio.");
      }

      await carregarProblemas();
      mostrarMensagem("Seu apoio foi registrado com sucesso!", "sucesso");
    } catch (error) {
      console.error(error);
      mostrarMensagem(error.message || "Não foi possível apoiar.", "erro");
    }
  }

  // ==========================================================================
  // COMENTAR PROBLEMA
  // ----------------------------------------------------------------------------
  // Esse era um dos pontos principais. Após comentar, o React precisa recarregar
  // os problemas novamente para trazer comentários atualizados do backend.
  // ==========================================================================
  async function comentarProblema(problemaId) {
  if (!usuarioLogado) {
    mostrarMensagem("Faça login para comentar.", "erro");
    return;
  }

  const texto = (comentariosInput[problemaId] || "").trim();

  if (!texto) {
    mostrarMensagem("Digite um comentário antes de enviar.", "erro");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/comentario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId: usuarioLogado.id,
        problemaId: problemaId,
        texto: texto,
      }),
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro || "Não foi possível enviar o comentário.");
    }

    // Limpa o campo de comentário apenas daquele problema
    setComentariosInput((prev) => ({
      ...prev,
      [problemaId]: "",
    }));

    // Recarrega do backend para sincronizar os comentários
    await carregarProblemas();

    mostrarMensagem("Comentário enviado com sucesso!", "sucesso");
  } catch (error) {
    console.error(error);
    mostrarMensagem(
      error.message || "Não foi possível enviar o comentário.",
      "erro"
    );
  }
}

  // ==========================================================================
  // FILTRO DO FEED
  // ==========================================================================
  const problemasFeedFiltrados = useMemo(() => {
    const cidadeNormalizada = normalizarTexto(cidadeFeed);
    const ufNormalizada = normalizarTexto(ufFeed);
    const bairroNormalizado = normalizarTexto(bairroFeed);

    const filtrados = problemas.filter((p) => {
      const cidadeOk = normalizarTexto(p.cidade) === cidadeNormalizada;
      const ufOk = normalizarTexto(p.uf) === ufNormalizada;
      const bairroOk =
        !bairroNormalizado ||
        normalizarTexto(p.bairro || "").includes(bairroNormalizado);

      return cidadeOk && ufOk && bairroOk;
    });

    return [...filtrados].sort((a, b) => Number(b.id) - Number(a.id));
  }, [problemas, cidadeFeed, ufFeed, bairroFeed]);

  const problemasFeedVisiveis = useMemo(() => {
    return problemasFeedFiltrados.slice(0, quantidadeVisivelFeed);
  }, [problemasFeedFiltrados, quantidadeVisivelFeed]);

  const temMaisRelatosParaMostrar =
    problemasFeedFiltrados.length > problemasFeedVisiveis.length;

  // ==========================================================================
  // RENDER DE MENSAGEM
  // ==========================================================================
  function renderMensagem() {
    if (!mensagem) return null;

    if (tipoMensagem === "erro") {
      return <div style={styles.faixaMensagemErro}>{mensagem}</div>;
    }

    if (tipoMensagem === "sucesso") {
      return <div style={styles.faixaMensagemSucesso}>{mensagem}</div>;
    }

    return <div style={styles.faixaMensagemAviso}>{mensagem}</div>;
  }

  function podeVoltar() {
    return ["cadastro", "menu", "criar", "dashboard", "feed"].includes(telaAtual);
  }

  function handleVoltar() {
    limparMensagem();

    if (telaAtual === "cadastro") {
      setTelaAtual("login");
      return;
    }

    if (["criar", "dashboard", "feed"].includes(telaAtual)) {
      setTelaAtual("menu");
      return;
    }

    if (telaAtual === "menu") {
      setTelaAtual("login");
    }
  }

  // ==========================================================================
  // BARRA DE AÇÕES
  // ==========================================================================
  function AcoesTela() {
    if (!podeVoltar() && !usuarioLogado) return null;

    return (
      <div style={styles.barraAcoesInterna}>
        {podeVoltar() && (
          <button type="button" style={styles.botaoSecundario} onClick={handleVoltar}>
            Voltar
          </button>
        )}

        {usuarioLogado && (
          <button type="button" style={styles.botaoSair} onClick={logout}>
            Sair
          </button>
        )}
      </div>
    );
  }

  // ==========================================================================
  // TELA INICIAL
  // ==========================================================================
  if (telaAtual === "inicio") {
    return (
      <div style={styles.pageCentralizada}>
        <style>{`
          @keyframes fadeSlideApp {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.99);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .scroll-app::-webkit-scrollbar {
            width: 8px;
          }

          .scroll-app::-webkit-scrollbar-track {
            background: transparent;
          }

          .scroll-app::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 999px;
          }

          .scroll-app::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>

        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.subtitulo}>Conectando pessoas e soluções</h2>
              <p style={styles.descricao}>
                Sua plataforma social para registrar problemas, apoiar causas e transformar o lugar onde mora.
              </p>
            </div>

            <div style={styles.areaScrollInterno} className="scroll-app">
              <div style={styles.menuCardAcao}>
                <h3 style={styles.menuCardTitulo}>
                  Esta é a sua plataforma social para transformar a cidade.
                </h3>
                <p style={styles.menuCardTexto}>
                 Dê voz ao seu bairro e acompanhe cada melhoria. 
                  Sua participação constrói uma gestão transparente e um lugar melhor para se viver.
                </p>
              </div>
            </div>

            <button
              style={styles.botaoPrimario}
              onClick={() => {
                limparMensagem();
                setTelaAtual("login");
              }}
            >
              Entrar na plataforma
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // LOGIN
  // ==========================================================================
 if (telaAtual === "login") {
  return (
    <div style={styles.pageCentralizada}>
      <div style={styles.cardPequeno}>
        <div style={styles.telaAnimada}>
          <div style={styles.topoSocial}>
            <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
            <h2 style={styles.subtitulo}>Entrar</h2>
            <p style={styles.descricao}>
              Acesse a conta para acompanhar o mural da cidade e participar das discussões de sua comunidade.
            </p>
          </div>

          <form onSubmit={loginUsuario} style={styles.form}>
            <input
              type="email"
              style={styles.input}
              placeholder="Digite seu email"
              value={formLogin.email}
              onChange={(e) =>
                setFormLogin({ ...formLogin, email: e.target.value })
              }
            />

            <input
              type="password"
              style={styles.input}
              placeholder="Digite sua senha"
              value={formLogin.senha}
              onChange={(e) =>
                setFormLogin({ ...formLogin, senha: e.target.value })
              }
            />

            <button type="submit" style={styles.botaoPrimario}>
              Entrar
            </button>
          </form>

          <button
            type="button"
            style={styles.botaoLaranja}
            onClick={() => {
              limparMensagem();
              setTelaAtual("cadastro");
            }}
          >
            Criar conta
          </button>

          <p style={styles.descricao}>
            Representantes da prefeitura devem entrar em contato com{" "}
            <strong>mmm@meumundomelhor.com</strong> para realizar o cadastro oficial.
          </p>

          <p style={styles.mensagemDoacao}>
            Quer ajudar a melhorar sua cidade? 💙
            Contribua com o projeto e apoie essa iniciativa.
            Entre em contato pelo e-mail{" "}
            <strong>ajudemmm@meumundomelhor.com</strong>
          </p>

          {renderMensagem()}
        </div>
      </div>
    </div>
  );
}
  // ==========================================================================
  // CADASTRO
  // ==========================================================================
  if (telaAtual === "cadastro") {
    return (
      <div style={styles.pageCentralizada}>
        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.subtitulo}>Criar conta</h2>
            </div>

            <AcoesTela />

            <form onSubmit={cadastrarUsuario} style={styles.form}>
              <label style={styles.label}>
                Nome
                <input
                  style={styles.input}
                  placeholder="Digite seu nome"
                  value={formCadastro.nome}
                  onChange={(e) =>
                    setFormCadastro({ ...formCadastro, nome: e.target.value })
                  }
                />
              </label>

              <label style={styles.label}>
                Email
                <input
                  style={styles.input}
                  placeholder="Digite seu email"
                  value={formCadastro.email}
                  onChange={(e) =>
                    setFormCadastro({ ...formCadastro, email: e.target.value })
                  }
                />
              </label>

              <label style={styles.label}>
                Senha
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Crie uma senha"
                  value={formCadastro.senha}
                  onChange={(e) =>
                    setFormCadastro({ ...formCadastro, senha: e.target.value })
                  }
                />
              </label>

              <button type="submit" style={styles.botaoPrimario} disabled={carregando}>
                {carregando ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>

            {renderMensagem()}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // MENU
  // ==========================================================================
  if (telaAtual === "menu") {
    return (
      <div style={styles.pageCentralizada}>
        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.menuBoasVindas}>Olá, {usuarioLogado?.nome}</h2>
              <p style={styles.menuTexto}>
                Sua participação fortalece a comunidade. Escolha uma das opções abaixo
                para continuar.
              </p>
            </div>

            <AcoesTela />

            <div style={styles.areaScrollInterno} className="scroll-app">
              <div style={styles.menuGrid}>
                {usuarioLogado?.tipo === "COMUM" && (
                  <div style={styles.menuCardAcao}>
                    <h3 style={styles.menuCardTitulo}>Novo relato</h3>
                    <p style={styles.menuCardTexto}>
                      Registre um problema da sua cidade com título, bairro, localidade e
                      descrição detalhada.
                    </p>
                    <button
                      type="button"
                      style={styles.botaoLaranja}
                      onClick={() => {
                        limparMensagem();
                        setTelaAtual("criar");
                      }}
                    >
                      Relatar problema
                    </button>
                  </div>
                )}

                <div style={styles.menuCardAcao}>
                  <h3 style={styles.menuCardTitulo}>Estatísticas da cidade</h3>
                  <p style={styles.menuCardTexto}>
                    Consulte indicadores do município, volume de relatos e nível de
                    resposta oficial.
                  </p>
                  <button
                    type="button"
                    style={styles.botaoPrimario}
                    onClick={() => {
                      limparMensagem();
                      setTelaAtual("dashboard");
                    }}
                  >
                    Abrir estatísticas
                  </button>
                </div>

                <div style={styles.menuCardAcao}>
                  <h3 style={styles.menuCardTitulo}>Mural da cidade</h3>
                  <p style={styles.menuCardTexto}>
                    Navegue pelos relatos publicados, apoie causas locais e acompanhe os
                    comentários.
                  </p>
                  <button
                    type="button"
                    style={styles.botaoPrimario}
                    onClick={() => {
                      limparMensagem();
                      setTelaAtual("feed");
                    }}
                  >
                    Abrir mural
                  </button>
                </div>
              </div>
            </div>

            {renderMensagem()}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // CRIAR RELATO
  // ==========================================================================
  if (telaAtual === "criar") {
    return (
      <div style={styles.pageCentralizada}>
        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.subtitulo}>Novo relato</h2>
              <p style={styles.descricao}>
                Descreva a situação com clareza para dar visibilidade ao problema e
                facilitar o entendimento da comunidade.
              </p>
            </div>

            <AcoesTela />

            <div style={styles.areaScrollInterno} className="scroll-app">
              <form onSubmit={criarProblema} style={styles.form}>
                <label style={styles.label}>
                  Título do relato
                  <input
                    style={styles.input}
                    placeholder="Ex.: Rua com muitos buracos"
                    value={formProblema.titulo}
                    onChange={(e) =>
                      setFormProblema({ ...formProblema, titulo: e.target.value })
                    }
                  />
                </label>

                <div style={styles.grid2}>
                  <label style={styles.label}>
                    Cidade
                    <input
                      style={styles.input}
                      placeholder="Digite a cidade"
                      value={formProblema.cidade}
                      onChange={(e) =>
                        setFormProblema({ ...formProblema, cidade: e.target.value })
                      }
                    />
                  </label>

                  <label style={styles.label}>
                    UF
                    <input
                      style={styles.input}
                      placeholder="Ex.: MG"
                      maxLength={2}
                      value={formProblema.uf}
                      onChange={(e) =>
                        setFormProblema({
                          ...formProblema,
                          uf: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </label>
                </div>

                <label style={styles.label}>
                  Bairro
                  <input
                    style={styles.input}
                    placeholder="Digite o bairro"
                    value={formProblema.bairro}
                    onChange={(e) =>
                      setFormProblema({ ...formProblema, bairro: e.target.value })
                    }
                  />
                </label>

                <label style={styles.label}>
                  Descrição
                  <textarea
                    style={styles.textarea}
                    placeholder="Explique o problema com o máximo de detalhes possível"
                    value={formProblema.descricao}
                    onChange={(e) =>
                      setFormProblema({
                        ...formProblema,
                        descricao: e.target.value,
                      })
                    }
                  />
                </label>

                <button type="submit" style={styles.botaoPrimario} disabled={carregando}>
                  {carregando ? "Enviando..." : "Publicar relato"}
                </button>
              </form>
            </div>

            {renderMensagem()}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // DASHBOARD
  // ==========================================================================
  if (telaAtual === "dashboard") {
    return (
      <div style={styles.pageCentralizada}>
        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.subtitulo}>Estatísticas da cidade</h2>
              <p style={styles.descricao}>
                Consulte os indicadores por localidade e acompanhe os pontos com maior
                volume de relatos.
              </p>
            </div>

            <AcoesTela />

            <div style={styles.form}>
              <label style={styles.label}>
                Cidade
                <input
                  style={styles.input}
                  placeholder="Digite a cidade"
                  value={cidadeBusca}
                  onChange={(e) => setCidadeBusca(e.target.value)}
                />
              </label>

              <label style={styles.label}>
                UF
                <input
                  style={styles.input}
                  placeholder="UF"
                  maxLength={2}
                  value={ufBusca}
                  onChange={(e) => setUfBusca(e.target.value.toUpperCase())}
                />
              </label>

              <button type="button" style={styles.botaoPrimario} onClick={buscarDashboard}>
                Buscar
              </button>
            </div>

            <div style={styles.areaScrollInterno} className="scroll-app">
              {dashboard && (
                <>
                  <div style={styles.aviso}>
                    Localização consultada: {dashboard.cidade} - {dashboard.uf}
                  </div>

                  <div style={styles.boxDashboard}>
                    <h3>Relatos da cidade</h3>
                    <p style={styles.numeroGrande}>
                      {dashboard.totalProblemas} {dashboard.setaProblemas}
                    </p>
                    <p style={styles.textoSecundario}>
                      Volume total de relatos localizados para a cidade pesquisada.
                    </p>
                  </div>

                  <div style={styles.boxDashboard}>
                    <h3>Bairro com mais relatos</h3>
                    <p style={styles.textoBox}>{dashboard.bairroMaisAfetado || "-"}</p>
                    <p style={styles.textoSecundario}>
                      Total de relatos no bairro: {dashboard.totalBairroMaisAfetado}
                    </p>
                  </div>

                  <div style={styles.boxDashboard}>
                    <h3>Respostas da prefeitura</h3>
                    <p style={styles.numeroGrande}>
                      {dashboard.percentualPrefeitura}% {dashboard.setaPrefeitura}
                    </p>
                    <p style={styles.textoSecundario}>
                      Percentual de relatos com pelo menos um comentário oficial.
                    </p>
                  </div>
                </>
              )}
            </div>

            {renderMensagem()}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FEED
  // ----------------------------------------------------------------------------
  // Aqui foi corrigido:
  // 1. duplicidade da mensagem "Ainda não há comentários"
  // 2. renderização de comentários
  // 3. contagem coerente com o backend
  // ==========================================================================
  if (telaAtual === "feed") {
    return (
      <div style={styles.pageCentralizada}>
        <div style={styles.cardPequeno}>
          <div style={styles.telaAnimada}>
            <div style={styles.topoSocial}>
              <img src={logo} alt="Logo do Meu Mundo Melhor" style={styles.logo} />
              <h2 style={styles.subtitulo}>Mural da cidade</h2>
              <p style={styles.descricao}>
                Consulte os relatos por cidade, UF e bairro, acompanhe a conversa da
                comunidade e interaja com os registros publicados.
              </p>
            </div>

            <AcoesTela />

            <div style={styles.form}>

<div style={styles.form}>
  
  <input
    style={styles.input}
    placeholder="Digite a cidade"
    value={cidadeFeed}
    onChange={(e) => setCidadeFeed(e.target.value)}
  />

  <input
    style={styles.input}
    placeholder="UF"
    maxLength={2}
    value={ufFeed}
    onChange={(e) => setUfFeed(e.target.value.toUpperCase())}
  />

  <input
    style={styles.input}
    placeholder="Digite o bairro (opcional)"
    value={bairroFeed}
    onChange={(e) => setBairroFeed(e.target.value)}
  />
</div>

  
</div>

            <div style={styles.areaScrollInterno} className="scroll-app">
              {cidadeFeed && ufFeed && (
                <div style={styles.feedResumoTopo}>
                  Exibindo <strong>{problemasFeedVisiveis.length}</strong> de{" "}
                  <strong>{problemasFeedFiltrados.length}</strong> relatos da busca atual.
                </div>
              )}

              {cidadeFeed && ufFeed && problemasFeedFiltrados.length === 0 && (
                <div style={styles.aviso}>
                  {bairroFeed.trim()
                    ? "Nenhum relato foi encontrado para essa cidade, UF e bairro."
                    : "Nenhum relato foi encontrado para essa cidade e UF."}
                </div>
              )}

              {cidadeFeed && ufFeed && problemasFeedVisiveis.length > 0 && (
                <div style={styles.feedLista}>
                  {problemasFeedVisiveis.map((p) => (
                    <div key={p.id} style={styles.feedCard}>
                      <div style={styles.feedHeader}>
                        <div style={styles.feedCabecalhoEsquerdo}>
                          <h3 style={styles.feedTitulo}>{p.titulo}</h3>
                          <p style={styles.feedMeta}>
                            {p.cidade} - {p.uf} | {p.bairro}
                          </p>
                        </div>
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
                          type="button"
                          style={styles.botaoApoiar}
                          onClick={() => apoiarProblema(p.id)}
                        >
                          Apoiar ({p.totalApoios})
                        </button>
                      </div>

                      <div style={styles.secaoComentarios}>
                        <h4 style={styles.comentarioTitulo}>
                          Comentários ({p.totalComentarios})
                        </h4>

                        <div style={styles.comentarioForm}>
                          <input
                            style={styles.input}
                            placeholder="Escreva um comentário"
                            value={comentariosInput[p.id] || ""}
                            onChange={(e) =>
                              setComentariosInput((prev) => ({
                                ...prev,
                                [p.id]: e.target.value,
                              }))
                            }
                          />

                          <button
                            type="button"
                            style={styles.botaoPrimario}
                            onClick={() => comentarProblema(p.id)}
                          >
                            Comentar
                          </button>
                        </div>

                        {(p.comentarios || []).length === 0 ? (
                          <div style={styles.semComentario}>
                            Ainda não há comentários neste relato.
                          </div>
                        ) : (
                          ordenarComentarios(p.comentarios || []).map((comentario) => {
                            const comentarioOficial =
                              comentario.usuarioTipo === "PREFEITURA";

                            return (
                              <div
                                key={comentario.id}
                                style={
                                  comentarioOficial
                                    ? styles.comentarioOficial
                                    : styles.comentarioItem
                                }
                              >
                                <div style={styles.comentarioTopo}>
                                  <div style={styles.comentarioAutorLinha}>
                                    <strong>{comentario.usuarioNome}</strong>

                                    {comentarioOficial && (
                                      <span style={styles.seloOficial}>@oficial</span>
                                    )}
                                  </div>

                                  <span>{comentario.data}</span>
                                </div>

                                <p style={styles.comentarioTexto}>
                                  {comentario.texto}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ))}

                  {temMaisRelatosParaMostrar && (
                    <button
                      type="button"
                      style={styles.botaoCarregarMais}
                      onClick={() =>
                        setQuantidadeVisivelFeed((valorAtual) => valorAtual + 10)
                      }
                    >
                      Carregar mais
                    </button>
                  )}
                </div>
              )}
            </div>

            {renderMensagem()}
          </div>
        </div>
      </div>
    );
  }

  return null;
}