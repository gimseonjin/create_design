

tableGenerator = () => {
  return (
    <table>
      <tr>
        {columns.map(column => <th>{column.data}</th>)}
      </tr>
    </table>
  );
}