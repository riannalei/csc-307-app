import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={row._id}> 
        <td>{row._id}</td> 
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          {/* Pass _id to removeCharacter function */}
          <button onClick={() => props.removeCharacter(row._id)}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};


const Table = (props) => {
  const { characterData, removeCharacter } = props;

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} />
    </table>
  );
};

export default Table;
