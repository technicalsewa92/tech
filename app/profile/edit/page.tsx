import Nav from "@/components/Nav";
import Footer from "@/components/footer/Footer";
import EditProfile from "@/features/account/edit-profile";
const page = async () => {
  return (
    <>
      {/* <Nav /> */}
      <EditProfile />
  
    </> 
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Edit My Profile | Technicalsewa and solution",
  };
}
