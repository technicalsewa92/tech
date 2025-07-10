import Nav from "@/components/Nav";
import Footer from "@/components/footer/Footer";
import UserProfile from "@/features/account/profile";
const page = async () => {
  return (
    <>
    
      <UserProfile />

    </>
  );
};


export default page;

export async function generateMetadata() {
  return {
    title: `My Profile | Technical sewa`,
  };
}
