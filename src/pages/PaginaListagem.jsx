function PaginaListagem(props) {
  return (
    <div className="pagina-listagem">
      <h2 className="titulo2">Chamados de manutenção</h2>

      <div className="acoes-listagem">
        <button onClick={function () {
          props.aoNavegar("novo");
        }}>
          Abrir chamado
        </button>
      </div>

      {props.carregando && <p>Carregando chamados...</p>}

      {!props.carregando && props.chamados.length === 0 && (
        <p>Nenhum chamado encontrado.</p>
      )}

      {!props.carregando && props.chamados.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Local</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {props.chamados.map(function (chamado) {
              return (
                <tr key={chamado.id}>
                  <td>{chamado.id}</td>
                  <td>{chamado.titulo}</td>
                  <td>{chamado.tipo}</td>
                  <td>{chamado.local}</td>
                  <td>{chamado.prioridade}</td>
                  <td>{chamado.status}</td>

                  <td>
                    <button onClick={function () {
                      props.aoSelecionar(chamado);
                    }}>
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaginaListagem;
