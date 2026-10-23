import { useState } from "react";

function FormularioChamado(props) {
  const [titulo, setTitulo] = useState(props.chamado?.titulo || "");
  const [descricao, setDescricao] = useState(props.chamado?.descricao || "");
  const [tipo, setTipo] = useState(props.chamado?.tipo || "");
  const [local, setLocal] = useState(props.chamado?.local || "");
  const [prioridade, setPrioridade] = useState(props.chamado?.prioridade || "");
  const [dataAbertura, setDataAbertura] = useState(props.chamado?.data_abertura || "");

  async function enviarFormulario(evento) {
    evento.preventDefault();

    const chamado = {
      titulo: titulo,
      descricao: descricao,
      tipo: tipo,
      local: local,
      prioridade: prioridade,
      data_abertura: dataAbertura
    };

    await props.aoSalvar(chamado);
  }

  return (
    <form onSubmit={enviarFormulario}>
      <label>Título:</label>
      <input
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        required
      />

      <label>Descrição:</label>
      <textarea
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        required
      />

      <label>Tipo:</label>
      <select value={tipo} onChange={(evento) => setTipo(evento.target.value)} required>
        <option value="">Selecione</option>
        {props.tipos.map((item, indice) => (
          <option key={indice} value={item}>{item}</option>
        ))}
      </select>

      <label>Local:</label>
      <select value={local} onChange={(evento) => setLocal(evento.target.value)} required>
        <option value="">Selecione</option>
        {props.locais.map((item, indice) => (
          <option key={indice} value={item}>{item}</option>
        ))}
      </select>

      <label>Prioridade:</label>
      <select
        value={prioridade}
        onChange={(evento) => setPrioridade(evento.target.value)}
        required
      >
        <option value="">Selecione</option>
        {props.prioridades.map((item, indice) => (
          <option key={indice} value={item}>{item}</option>
        ))}
      </select>

      <label>Data de abertura:</label>
      <input
        type="date"
        value={dataAbertura}
        onChange={(evento) => setDataAbertura(evento.target.value)}
        required
      />

      <button type="submit">
        {props.chamado ? "Salvar alterações" : "Cadastrar chamado"}
      </button>
    </form>
  );
}

export default FormularioChamado;