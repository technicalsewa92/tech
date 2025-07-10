import React from 'react';

const OrderTracking = () => {
  const steps = [
    { title: 'Order Placed', completed: true },
    { title: 'Processed', completed: true },
    { title: 'Shipped', completed: true },
    { title: 'Out for Delivery', completed: false },
    { title: 'Delivered', completed: false },
  ];

  return (
    <div className="  flex flex-col justify-center items-center py-3 px-4">
      <div className="w-full  mx-auto bg-white p-4 py-6 shadow-md rounded-lg">

        <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold mb-6">Order Status</h1>

          {steps.map((step, index) => (
            <div key={index} className="relative flex-1 text-center">
              <div
                className={`${
                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                } w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-bold`}
              >
                {index + 1}
              </div>
              <p className="mt-2 text-sm font-medium">{step.title}</p>
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-full w-full h-1 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default OrderTracking;
