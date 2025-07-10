import UserComplains from '@/features/complain/my-complains';
import Commissions from '@/features/dashboard/comission/Comissions';
const AllComissions = async () => {
  return (
    <>
      <Commissions />
    </>
  );
};

export default AllComissions;

export async function generateMetadata() {
  return {
    title: `Commission | Technical sewa`,
  };
}
