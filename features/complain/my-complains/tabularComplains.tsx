import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Complain } from './types';
import { TablePagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Phone, Package } from 'lucide-react';

export default function TabularComplains({
  loading,
  page,
  data,
  total,
  setPage,
}: {
  loading: boolean;
  data?: Complain[];
  page: number;
  total: number;
  setPage: (size: number) => void;
}) {
  const { push } = useRouter();
  console.log(data);
  return (
    <div className="py-4 mb-4">
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
              <TableCell>UID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Cus Mobile</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Service Desc</TableCell>
              <TableCell>Defect</TableCell>
              <TableCell>Repair</TableCell>
              <TableCell>Symptom</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={`hover:bg-primary hover:bg-opacity-20 hover:cursor-pointer ${
                  i % 2 ? 'bg-gray-100' : ''
                }`}
                onClick={() => push(`/complains/${row?.id}`)}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>{row.call_uid}</TableCell>
                <TableCell>
                  {row.cust_first_name} {row.cust_last_name}
                </TableCell>
                <TableCell>{row.cust_phone_mobile}</TableCell>
                <TableCell>{row.brand_name}</TableCell>
                <TableCell>{row.product_name}</TableCell>
                <TableCell>{row.model_number}</TableCell>
                <TableCell>{row.sc_name}</TableCell>
                <TableCell>{row.Call_status_val}</TableCell>
                <TableCell>{row.call_service_desc}</TableCell>
                <TableCell>{row.defect_code}</TableCell>
                <TableCell>{row.repair_code}</TableCell>
                <TableCell>{row.symptom_code}</TableCell>
                <TableCell>{row.call_dt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={total}
        rowsPerPage={10}
        page={page}
        onPageChange={(e, value) => setPage(value)}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
