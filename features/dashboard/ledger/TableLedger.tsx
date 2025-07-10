import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import Skeleton from '@/components/ui/Skeleton';

interface Transaction {
  description: string;
  amount_in: string;
  amount_out: string;
  created_on: string;
  username: string;
  call_id: string | null;
  cid: string | null;
}

export default function TabularLedger({
  loading,
  page,
  data,
  total,
  setPage,
}: {
  loading: boolean;
  data?: Transaction[];
  page: number;
  total: number;
  setPage: (size: number) => void;
}) {
  const { push } = useRouter();

  // Calculate total amount_in and amount_out
  const totalAmountIn = data?.reduce(
    (acc, transaction) => acc + parseFloat(transaction.amount_in || '0'),
    0
  );

  const totalAmountOut = data?.reduce(
    (acc, transaction) => acc + parseFloat(transaction.amount_out || '0'),
    0
  );
  const difference = (totalAmountIn || 0) - (totalAmountOut || 0);
  return (
    <div className=" mb-4">
      {loading && (
        <div>
          <div className="flex justify-center items-center space-x-2">
            <Skeleton
              className="h-5 w-5 rounded-full"
              style={{ animationDelay: '-0.3s' }}
            />
            <Skeleton
              className="h-5 w-5 rounded-full"
              style={{ animationDelay: '-0.15s' }}
            />
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell>SN</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Amount In</TableCell>
              <TableCell>Amount Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-gray-200  ">
              <TableCell colSpan={3} className="font-bold">
                Total
              </TableCell>
              <TableCell className="font-bold">
                {totalAmountIn?.toFixed(2)}
              </TableCell>
              <TableCell className="font-bold">
                {totalAmountOut?.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-300 font-semibold">
              <TableCell colSpan={4} align="right" className="text-xs">
                Difference:
              </TableCell>
              <TableCell colSpan={2} className="text-xs">
                {difference}
              </TableCell>
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

                <TableCell className="text-xs font-semibold">
                  {row.description}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {row.username}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {row.amount_in}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {row.amount_out}
                </TableCell>
              </TableRow>
            ))}

            {/* Row for displaying total amounts */}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={total}
        rowsPerPage={60}
        page={page}
        onPageChange={(e, value) => setPage(value)}
      />
    </div>
  );
}
