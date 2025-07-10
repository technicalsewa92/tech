import { OrderHistoryPage } from "@/features/dashboard/OrderHistoryPage";

export default function Component() {
  return (
    <main className=" p-5 flex flex-col w-full gap-4 ">
      <header>
        <h1 className="text-xl font-medium">Order History</h1>
      </header>
      <OrderHistoryPage />
    </main>
  )
}
