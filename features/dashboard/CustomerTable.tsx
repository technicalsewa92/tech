import React, { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import ReviewDialog from "./ReviewModel"

export const CustomTable = ({
  data,
  status,
}: {
  data: any
  status: string
}) => {
  const reversedData = [...data].reverse()
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  return (
    <div className="bg-white">
      <ReviewDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
      <Table className="bg-white text-sm">
        <TableBody>
          {reversedData?.map((value: any, index: number) => (
            <TableRow
              key={index}
              className="flex justify-between items-center xl:px-10"
            >
              <TableCell className="text-sm">
                <div className="flex flex-col gap-1">
                  <Link href={`/order-history/${value.salesId}?status=${status}`}>
                    Order ID:{" "}
                    <span className="text-blue-600">{value.salesNum}</span>
                  </Link>
                  <div>
                    Placed on <span className="font-medium">{value.date}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div>
                  Amount: <span className="font-medium">{value.amt}</span>
                </div>
              </TableCell>
              <TableCell className={`text-center hidden md:flex`}>
                <span
                  className={`p-2 rounded-lg ${
                    status === "Confirm"
                      ? "bg-blue-300 text-white"
                      : status === "Pending"
                        ? "bg-yellow-600 text-white"
                        : status === "Processing"
                          ? "bg-orange-500 text-white"
                          : status === "OntheWay"
                            ? "bg-purple-800 text-white"
                            : status === "Delivered"
                              ? "bg-green-500 text-white"
                              : status === "Cancelled"
                                ? "bg-red-600 text-white"
                                : "bg-black text-white"
                  }`}
                >
                  {status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/order-history/${value.salesId}`}>
                  View Details
                </Link>
                {/* {status === "Delivered" && (
                  <div>
                    <p
                    onClick={()=>{
                      handleOpenDialog()
                    }}
                      className="text-blue-600 cursor-pointer"
                    >
                      Add Review
                    </p>
                  </div>
                )} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
