function BarraNavegacao(props) {
  return (
    <nav className="barra-navegacao">
      <button onClick={function () {
        props.aoNavegar("inicio");
      }}>
        Início
      </button>

      <button onClick={function () {
        props.aoNavegar("chamados");
      }}>
        Chamados
      </button>

      <button onClick={function () {
        props.aoNavegar("novo");
      }}>
        Abrir chamado
      </button>
    </nav>
  );
}

export default BarraNavegacao;
