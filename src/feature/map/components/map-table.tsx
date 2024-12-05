import React from 'react';
import TableRow from '@/feature/map/components/table-row';

const MapTable: React.FC = () => {
  return (
    <table className="m-auto w-[320px] bg-[#A3A3A333]">
      <TableRow floor={6} />
      <TableRow floor={5} />
      <TableRow floor={2} />
      <TableRow floor={1} />
    </table>
  );
};

export default MapTable;
