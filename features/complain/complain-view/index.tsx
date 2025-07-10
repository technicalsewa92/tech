'use client';
import { api } from '@/lib/api';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Skeleton from '@/components/ui/Skeleton';
import React, { useEffect, useState } from 'react';
import { Complain } from './types';
import ReviewForm from './Addreview';

export default function ComplainView({ complainId }: { complainId: number }) {
  const [complain, setComplainData] = useState<Complain | null>(null);
  const [loading, setLoading] = useState(true);
  const [usedParts, setusedParts] = useState([]);
  const [review, setreview] = useState({ list: [], total: '0' });
  const getComplainById = async (complainId: number) => {
    //
    const fdata = new FormData();
    fdata.append('complain_id', `${complainId}`);

    const { data: complainData } = await api.post(
      '/techsewa/publiccontrol/publicComplain/getcomplaindetails',
      fdata
    );

    setComplainData(complainData);
    setLoading(false);
  };
  const getReviewData = async (complainId: number) => {
    //
    const fdata = new FormData();
    fdata.append('complain_id', `${complainId}`);
    fdata.append('page', `${1}`);

    const { data: complainData } = await api.post(
      '/techsewa/publiccontrol/publiccomplain/getratingDetails',
      fdata
    );

    setreview(complainData);
    setLoading(false);
  };
  const getUsedPartsById = async (complainId: number) => {
    //
    const fdata = new FormData();
    fdata.append('id', `${complainId}`);

    const { data: complainData } = await api.post(
      '/techsewa/publiccontrol/publicComplain/getUsedPartByComplain',
      fdata
    );
    console.log(complainData);
    setusedParts(complainData);
  };
  useEffect(() => {
    getComplainById(complainId);
    getUsedPartsById(complainId);
    getReviewData(complainId);
  }, [complainId]);
  console.log(complain);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('id') ?? '{}';

      const storedData = localStorage.getItem('data');
      if (storedData) {
        // console.log("Stored data", storedData);
        try {
          const parsedData = JSON.parse(storedData);
          // setData(parsedData)
          console.log('Parsed data', parsedData);
          if (parsedData.dealer == '1') {
            setUserType('Dealer');
          } else {
            setUserType(parsedData.type);
          }
        } catch (error) {
          // console.error("Failed to parse stored data", error)
        }
      } else {
        // alert("Please login to continue");
        // router.push("/login");
      }
    }
  }, []);
  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center space-x-2 mt-16">
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
    );
  return (
    <div className="container mx-auto text-xs pb-20">
      <div className="py-4 space-x-4 space-y-4">
        <div className="gap-y-2 md:gap-y-4 md:grid md:grid-cols-2 md:gap-x-4">
          <div className="border border-opacity-20 border-primary">
            <div className="p-2 text-white bg-primary font-bold">
              CUSTOMER INFO
            </div>
            <div className="py-2 md:grid md:grid-cols-2">
              <div className="">
                <div className="px-2">
                  <span className="font-bold"> Name:</span>{' '}
                  {complain?.cust_first_name} {complain?.cust_last_name}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  {' '}
                  <span className="font-bold"> Email:</span> {complain?.email}
                </div>
              </div>
            </div>
            <div className="py-2 bg-opacity-20 md:grid md:grid-cols-2 bg-primary">
              <div className="">
                <div className="px-2">
                  <span className="font-bold"> City:</span>{' '}
                  {complain?.cust_address.split('/')[0]}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold"> Local Address:</span>{' '}
                  {complain?.cust_address.split('/')[1]}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 ">
              <div className="">
                <div className="px-2">
                  {' '}
                  <span className="font-bold">Do Not Disturb Time:</span>
                  {complain?.dnd}{' '}
                </div>
              </div>
            </div>
            <div className="py-2  md:grid md:grid-cols-2  bg-primary bg-opacity-20">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Alternate Number:</span>{' '}
                  {complain?.cust_phone_office}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold"> Mobile:</span>{' '}
                  {complain?.cust_phone_mobile}{' '}
                </div>
              </div>
            </div>

            <div className="py-2 md:grid md:grid-cols-2">
              <div className="">
                <div className="px-2">
                  {' '}
                  <span className="font-bold"> Appointment Date:</span>{' '}
                  {complain?.appoint_date}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  {' '}
                  <span className="font-bold"> Appointment Time:</span>{' '}
                  {complain?.appoint_time}
                </div>
              </div>
            </div>
            {/* <div className="py-2 bg-opacity-20 md:grid md:grid-cols-2 bg-primary">
  <div className="flex items-center">
    <div className="px-2">
      <span className="font-bold ">Warranty:</span>
    </div>
    {complain?.cust_warranty && (
      <a 
        href={complain.cust_warranty} 
        className="w-full text-sm text-blue-400 break-words hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {complain.cust_warranty}
      </a>
    )}
  </div>
</div> */}
            <div className="py-2 bg-opacity-20 md:grid md:grid-cols-1 bg-primary">
              <div className="flex w-full">
                <div className="px-2">
                  <span className="font-bold">Warranty card:</span>
                </div>
                {complain?.cust_warranty && (
                  <a
                    href={complain?.cust_warranty}
                    target="_blank"
                    className="w-[80%] truncate text-blue-600 underline"
                    title={complain?.cust_warranty}
                  >
                    {complain?.cust_warranty}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border border-opacity-20 border-primary">
            <div className="p-2 text-white bg-primary font-bold">
              PRODUCT INFORMATION
            </div>
            <div className="py-2 md:grid md:grid-cols-2">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Brand/product:</span>{' '}
                  {complain?.service_category_name}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Brand:</span>{' '}
                  {complain?.product_name}/{complain?.brand}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 bg-opacity-20 bg-primary">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Product Category:</span>{' '}
                  {complain?.product_category_name}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Service type:</span>{' '}
                  {complain?.service_type}
                </div>
              </div>
            </div>
            <div className="py-2 bg-opacity-20 md:grid md:grid-cols-2 ">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Set Serial No:</span>{' '}
                  {complain?.call_serial_no}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Model Number:</span>{' '}
                  {complain?.model}{' '}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 bg-opacity-20 bg-primary">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Dealer:</span>{' '}
                  {complain?.call_dealer_name}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Call At:</span>{' '}
                  {complain?.call_at == '1'
                    ? 'Customer Location'
                    : complain?.call_status == '2'
                      ? 'Dealer Location'
                      : complain?.call_status == '3'
                        ? 'Godown'
                        : 'Workshop'}
                </div>
              </div>
            </div>
            <div className="py-2 bg-opacity-20  md:grid md:grid-cols-2 "></div>
            <div className="py-2 md:grid md:grid-cols-1 bg-opacity-20">
              <div className="px-2 overflow-wrap break-words">
                <span className="font-bold">
                  Problem Reported by Customer / Remarks:
                </span>{' '}
                {complain?.customer_remarks}
              </div>
            </div>
          </div>
          <div className="border border-opacity-20 border-primary">
            <div className="p-2 text-white bg-primary font-bold">
              CALL ASSIGNMENT
            </div>
            <div className="py-2 md:grid md:grid-cols-2">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Service Request No:</span>{' '}
                  {complain?.call_uid}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Registered On:</span>{' '}
                  {complain?.call_dt}/{complain?.call_tm}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 bg-primary bg-opacity-20">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Service Center Name:</span>{' '}
                  {complain?.svc_name}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Technician Name:</span>{' '}
                  {complain?.tech_name}
                </div>
              </div>
            </div>
            <div className="py-2  md:grid md:grid-cols-2 ">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Technician Mobile No:</span>{' '}
                  {complain?.tech_mobile}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Call Status:</span>{' '}
                  {complain?.call_status == '0'
                    ? 'Open'
                    : complain?.call_status == '1'
                      ? 'Pending'
                      : complain?.call_status == '2'
                        ? 'Part Pending'
                        : complain?.call_status == '3'
                          ? 'Closed'
                          : complain?.call_status == '4'
                            ? 'cancelled'
                            : complain?.call_status == '5'
                              ? 'Temp Closed'
                              : ''}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 bg-primary bg-opacity-20">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Pending Reason:</span>{' '}
                  {complain?.call_reason_pending}
                </div>
              </div>
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Call Completed On:</span>
                  {complain?.call_visit_tm_in}, {complain?.call_visit_tm_out}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2">
              <div className="">
                <div className="px-2">
                  <span className="font-bold ">Warranty Type:</span>
                  {complain?.call_type == '1'
                    ? 'Pre Sales'
                    : complain?.call_type == '2'
                      ? 'Warranty'
                      : complain?.call_type == '3'
                        ? 'Non Warranty'
                        : complain?.call_type == '4'
                          ? 'Demo'
                          : complain?.call_type == '5'
                            ? 'FSC'
                            : complain?.call_type == '6'
                              ? 'DOA'
                              : complain?.call_type == '9'
                                ? 'PDI'
                                : complain?.call_type == '10'
                                  ? 'Semi Wrnty'
                                  : complain?.call_type == '11'
                                    ? 'Installation'
                                    : complain?.call_type == '12'
                                      ? 'AMC'
                                      : ''}
                </div>
              </div>
            </div>
            <div className="py-2 md:grid md:grid-cols-2 bg-primary bg-opacity-20">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Photo:</span>{' '}
                  {complain?.photo && (
                    <ImageWithFallback
                      src={complain?.photo}
                      alt=""
                      height={200}
                      width={400}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="py-2  md:grid md:grid-cols-2 ">
              <div className="">
                <div className="px-2">
                  <span className="font-bold">Tech Warranty:</span>{' '}
                  {complain?.tech_warranty}
                </div>
              </div>
            </div>
          </div>
          <div className="border border-opacity-20 border-primary">
            <div className="p-2 text-white bg-primary font-bold">
              CALL VISIT DETAILS
            </div>
            <div className="space-y-">
              <div className="py-2 md:grid md:grid-cols-2">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Call Visit Date:</span>{' '}
                    {complain?.call_visit_dt}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Call Visit In Time:</span>{' '}
                    {complain?.call_visit_tm_in}
                  </div>
                </div>
              </div>
              <div className="py-2 bg-opacity-20 md:grid md:grid-cols-2 bg-primary">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Call Visit Out Time:</span>{' '}
                    {complain?.call_visit_tm_out}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Dispatched on:</span>{' '}
                    {complain?.call_status == '3' ? complain?.call_dt : ''}{' '}
                  </div>
                </div>
              </div>
              <div className="py-2 md:grid md:grid-cols-2">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Dispach Remarks:</span>{' '}
                    {complain?.dispatch_remarks}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Bill No:</span>{' '}
                    {complain?.bill_no}
                  </div>
                </div>
              </div>
              {/* {usedParts!=null?
              <div className="py-2 md:grid md:grid-cols-2 bg-opacity-20 bg-primary">
                <div className="">
                  <div className="px-2">Used Parts:{usedParts!["part_number"]} </div>
                </div>
               
              </div>:<></>} */}
              <div className="py-2 md:grid md:grid-cols-2 bg-primary bg-opacity-20">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Paid Amount:</span>
                    {complain?.grand_total}{' '}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Call Verified Status:</span>{' '}
                    {complain?.happy_status == '1'
                      ? 'Verified'
                      : 'Not Verified'}
                  </div>
                </div>
              </div>
              <div className="py-2  md:grid md:grid-cols-2 ">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Bill Date:</span>{' '}
                    {complain?.bill_date}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Symptom Code:</span>{' '}
                    {complain?.symptom_code}
                  </div>
                </div>
              </div>
              <div className="py-2 md:grid md:grid-cols-2 bg-primary bg-opacity-20">
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Defect Code:</span>{' '}
                    {complain?.defect_code}
                  </div>
                </div>
                <div className="">
                  <div className="px-2">
                    <span className="font-bold">Repair Code:</span>{' '}
                    {complain?.repair_code}
                  </div>
                </div>
              </div>
              <div className="py-2 md:grid md:grid-cols-1 bg-opacity-20">
                <div className="px-2 overflow-wrap break-words">
                  <span className="font-bold">Workout Done:</span>{' '}
                  {complain?.call_engineer_remark}
                </div>
              </div>
            </div>
          </div>
          {usedParts != null && complain?.call_status == '3' ? (
            <div className="border border-opacity-20 border-primary">
              <div className="p-2 text-white bg-primary">Used Parts</div>

              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-primary p-2">Part Number</th>
                    <th className="border border-primary p-2">Quantity</th>
                    <th className="border border-primary p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {usedParts?.map(item => (
                    <tr
                      key={item['parts_used_id']}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <td className="border border-primary p-2">
                        {item['part_number']}
                      </td>
                      <td className="border border-primary p-2">
                        {item['part_quantity']}
                      </td>
                      <td className="border border-primary p-2">
                        {item['price'] || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}

          {/* <div className="border border-opacity-20 border-primary">
            <div className="p-2 text-white bg-primary">Payment Info</div>
            <div className="flex"></div>
          </div> */}
        </div>
        {complain?.call_status === '3' &&
          userType === 'Customer' &&
          review!['list'].length === 0 && (
            <div className="mb-2 md:w-[45%] w-full">
              <h2 className="text-base font-semibold">Add Your Review</h2>
              <div className="reviews"></div>
              <ReviewForm complainId={complainId} />
            </div>
          )}

        {/* <div>rate technician form ..</div> */}
      </div>
    </div>
  );
}
