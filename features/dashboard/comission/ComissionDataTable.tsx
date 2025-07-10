import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function TabularCommission({
  loading,
  page,
  data,
  total,
  setPage,
}: {
  loading: boolean;
  data?: ComissionsType[];
  page: number;
  total: number;
  setPage: (size: number) => void;
}) {
  const { push } = useRouter();

  // Calculate totals for billed amount and commission
  const totalBilledAmount =
    data?.reduce((acc, row) => acc + Number(row.grand_total || 0), 0) || 0;
  const totalCommission =
    data?.reduce((acc, row) => acc + Number(row.comission || 0), 0) || 0;

  return (
    <div className="py-4 mb-4">
      {loading && (
        <div>
          <div className="flex justify-center items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton
              className="h-5 w-5 rounded-full"
              style={{ animationDelay: '-0.15s' }}
            />
            <Skeleton
              className="h-5 w-5 rounded-full"
              style={{ animationDelay: '-0.3s' }}
            />
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell>SN</TableCell>
              <TableCell>Call Id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Address</TableCell>
              <TableCell>Dealer Name</TableCell>
              <TableCell>Billed Amount</TableCell>
              <TableCell>Commission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-gray-300 font-semibold">
              <TableCell colSpan={5} align="right" className="text-xs">
                Total:
              </TableCell>
              <TableCell className="text-xs">{totalBilledAmount}</TableCell>
              <TableCell className="text-xs">{totalCommission}</TableCell>
            </TableRow>
            {data?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={`hover:bg-primary hover:bg-opacity-20 text-sm hover:cursor-pointer ${
                  i % 2 ? 'bg-gray-100' : ''
                }`}
              >
                <TableCell component="th" scope="row" className="text-xs">
                  {i + 1}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.call_uid}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.customer_name}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.customer_address}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.dealer_name}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.grand_total}
                </TableCell>
                <TableCell className="text-xs font-thin">
                  {row.comission}
                </TableCell>
              </TableRow>
            ))}

            {/* Totals Row */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={total}
        rowsPerPage={100}
        page={page}
        onPageChange={(e, value) => setPage(value)}
      />
    </div>
  );
}
