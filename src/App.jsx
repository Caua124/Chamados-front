import { useState, useEffect } from "react";
import BarraNavegacao from "./components/BarraNavegacao";
import MensagemErro from "./components/MensagemErro";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaListagem from "./pages/PaginaListagem";
import PaginaCadastro from "./pages/PaginaCadastro";
import PaginaDetalhes from "./pages/PaginaDetalhes";
import api from "./services/api";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState({});
  const [chamados, setChamados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState("inicio");

  async function carregarDados() {
    setCarregando(true);
    const respostaUsuario = await api.get("/eu");
    const respostaChamados = await api.get("/chamados");
    const respostaTipos = await api.get("/tipos");
    const respostaLocais = await api.get("/locais");
    const respostaPrioridades = await api.get("/prioridades");

    setUsuario(respostaUsuario.data);
    setChamados(respostaChamados.data);
    setTipos(respostaTipos.data);
    setLocais(respostaLocais.data);
    setPrioridades(respostaPrioridades.data);

    setErro("");
    setCarregando(false);
  }

  useEffect(function () {
    async function iniciar() {
      await carregarDados();
    }

    iniciar();
  }, []);

  function navegar(novaPagina) {
    setPagina(novaPagina);
  }

  async function selecionarChamado(chamado) {
    const resposta = await api.get("/chamados/" + chamado.id);

    setChamadoSelecionado(resposta.data);
    navegar("detalhes");
  }

  function editarChamado(chamado) {
    setChamadoSelecionado(chamado);
    navegar("editar");
  }

  async function salvarChamado(dados, id) {
    if (id) {
      await api.put("/chamados/" + id, dados);
    } else {
      await api.post("/chamados", dados);
    }

    await carregarDados();

    setChamadoSelecionado(null);
    navegar("chamados");

    return true;
  }

  async function excluirChamado(id) {
    await api.delete("/chamados/" + id);

    await carregarDados();

    setChamadoSelecionado(null);
    navegar("chamados");
  }

  async function iniciarChamado(id, responsavel) {
    await api.patch("/chamados/" + id + "/iniciar", {
      responsavel: responsavel
    });

    const resposta = await api.get("/chamados/" + id);

    setChamadoSelecionado(resposta.data);

    await carregarDados();

    return true;
  }

  async function resolverChamado(id, solucao) {
    await api.patch("/chamados/" + id + "/resolver", {
      solucao: solucao
    });

    const resposta = await api.get("/chamados/" + id);

    setChamadoSelecionado(resposta.data);

    await carregarDados();

    return true;
  }

  function cancelarEdicao() {
    setChamadoSelecionado(null);
    navegar("chamados");
  }

  return (
    <div className="App">
      <header>
        <h1>Sistema de Chamados de Manutenção</h1>

        <p>
          Usuário: {usuario.nome || usuario.nome_completo || "Carregando..."}
        </p>
      </header>

      <BarraNavegacao aoNavegar={navegar} />

      <main>
        <MensagemErro mensagem={erro} />

        {pagina === "inicio" && (
          <PaginaInicial aoNavegar={navegar} />
        )}

        {pagina === "chamados" && (
          <PaginaListagem
            chamados={chamados}
            carregando={carregando}
            aoSelecionar={selecionarChamado}
            aoNavegar={navegar}
          />
        )}

        {pagina === "detalhes" && (
          <PaginaDetalhes
            chamado={chamadoSelecionado}
            aoIniciar={iniciarChamado}
            aoResolver={resolverChamado}
            aoExcluir={excluirChamado}
            aoVoltar={cancelarEdicao}
            aoEditar={editarChamado}
          />
        )}

        {pagina === "novo" && (
          <PaginaCadastro
            tipos={tipos}
            locais={locais}
            prioridades={prioridades}
            aoSalvar={salvarChamado}
            aoCancelarEdicao={cancelarEdicao}
          />
        )}

        {pagina === "editar" && (
          <PaginaCadastro
            chamadoSelecionado={chamadoSelecionado}
            tipos={tipos}
            locais={locais}
            prioridades={prioridades}
            aoSalvar={salvarChamado}
            aoCancelarEdicao={cancelarEdicao}
          />
        )}
      </main>
    </div>
  );
}

export default App;