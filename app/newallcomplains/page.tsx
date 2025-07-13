import Nav from '@/components/Nav';
import Footer from '@/components/footer/Footer';
import UserComplains from '@/features/complain/my-complains';
const page = async () => {
  return (
    <>
      <UserComplains />
    </>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Complains | Technical sewa`,
  };
}
