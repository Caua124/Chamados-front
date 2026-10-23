import { useState } from "react";

function PaginaDetalhes(props) {
  const [responsavel, setResponsavel] = useState("");
  const [solucao, setSolucao] = useState("");
  const [erro, setErro] = useState("");
  const chamado = props.chamado;

  function editarChamado() {
    props.aoEditar(chamado);
  }

  async function iniciarChamado() {
    if (responsavel === "") {
      setErro("Informe o nome do responsável pelo atendimento.");
      return;
    }

    setErro("");

    const sucesso = await props.aoIniciar(
      chamado.id,
      responsavel
    );

    if (!sucesso) {
      setErro("Não foi possível iniciar o atendimento.");
    }
  }

  async function resolverChamado() {
    if (solucao === "") {
      setErro("Informe a solução aplicada ao chamado.");
      return;
    }

    setErro("");

    const sucesso = await props.aoResolver(chamado.id, solucao);

    if (!sucesso) {
      setErro("Não foi possível resolver o chamado.");
    }
  }

  async function excluirChamado() {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este chamado?"
    );

    if (confirmou) {
      await props.aoExcluir(chamado.id);
    }
  }

  if (!chamado) {
    return (
      <div className="pagina-detalhes">
        <p>Nenhum chamado selecionado.</p>
        <button onClick={props.aoVoltar}>
          Voltar para os chamados
        </button>
      </div>
    );
  }

  return (
    <div className="pagina-detalhes">
      <h2>Detalhes do chamado</h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <p><strong>ID:</strong> {chamado.id}</p>
      <p><strong>Título:</strong> {chamado.titulo}</p>
      <p><strong>Descrição:</strong> {chamado.descricao}</p>
      <p><strong>Tipo:</strong> {chamado.tipo}</p>
      <p><strong>Local:</strong> {chamado.local}</p>
      <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
      <p><strong>Data de abertura:</strong> {chamado.data_abertura}</p>
      <p><strong>Status:</strong> {chamado.status}</p>
      <p>
        <strong>Responsável:</strong>{" "}
        {chamado.responsavel || "Não definido"}
      </p>
      <p>
        <strong>Solução:</strong>{" "}
        {chamado.solucao || "Ainda não resolvido"}
      </p>
      <p>
        <strong>Data de resolução:</strong>{" "}
        {chamado.data_resolucao || "Não resolvido"}
      </p>

      <button onClick={editarChamado}>
        Editar chamado
      </button>

      {chamado.status !== "Resolvido" && (
        <>
          <h3>Iniciar atendimento</h3>

          <label>Responsável:</label>
          <input
            type="text"
            value={responsavel}
            onChange={function (evento) {
              setResponsavel(evento.target.value);
            }}
          />

          <button onClick={iniciarChamado}>
            Iniciar atendimento
          </button>

          <h3>Resolver chamado</h3>

          <label>Solução aplicada:</label>
          <textarea
            value={solucao}
            onChange={function (evento) {
              setSolucao(evento.target.value);
            }}
          />

          <button onClick={resolverChamado}>
            Resolver chamado
          </button>

          <button onClick={excluirChamado}>
            Excluir chamado
          </button>
        </>
      )}

      <p>
        <button className="botao-voltar" onClick={props.aoVoltar}>
          Voltar para a listagem
        </button>
      </p>
    </div>
  );
}

export default PaginaDetalhes;