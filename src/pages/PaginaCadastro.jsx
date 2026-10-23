import { useState } from "react";
import FormularioChamado from "../components/FormularioChamado";

function PaginaCadastro(props) {
  const [erro, setErro] = useState("");

  async function aoSalvar(dadosChamado) {
    setErro("");

    const id = props.chamadoSelecionado
      ? props.chamadoSelecionado.id
      : null;

    const sucesso = await props.aoSalvar(dadosChamado, id);

    if (sucesso) {
      props.aoCancelarEdicao();
    } else {
      setErro("Não foi possível salvar o chamado.");
    }
  }

  return (
    <div className="pagina-cadastro">
      <h2>
        {props.chamadoSelecionado
          ? "Editar chamado"
          : "Abrir novo chamado"}
      </h2>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <FormularioChamado
        chamado={props.chamadoSelecionado}
        tipos={props.tipos}
        locais={props.locais}
        prioridades={props.prioridades}
        aoSalvar={aoSalvar}
      />

      {props.chamadoSelecionado && (
        <button onClick={props.aoCancelarEdicao}>
          Cancelar edição
        </button>
      )}
    </div>
  );
}

export default PaginaCadastro;
