import React from 'react';
import TableRow from '@/feature/map/components/TableRow.tsx';

const MapTable: React.FC = () => {
  return (
    <table className="m-auto w-[90%]">
      <TableRow floor={6} />
      <TableRow floor={5} />
      <TableRow floor={2} />
      <TableRow floor={1} />
    </table>
  );
};

export default MapTable;
