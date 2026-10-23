function PaginaInicial(props) {
  return (
    <div className="pagina-inicial">
      <h2>Sistema de Chamados de Manutenção</h2>

      <p>
        Bem-vindo ao sistema de gerenciamento de chamados de manutenção.
      </p>

      <p>
        Aqui você pode registrar problemas, acompanhar solicitações e
        gerenciar os atendimentos.
      </p>

      <div className="acoes-iniciais">
        <button onClick={function () {
          props.aoNavegar("chamados");
        }}>
          Consultar chamados
        </button>

        <button onClick={function () {
          props.aoNavegar("novo");
        }}>
          Abrir novo chamado
        </button>
      </div>
    </div>
  );
}

export default PaginaInicial;
