
export const dynamic = 'force-dynamic'

import UserComplains from "@/features/complain/my-complains";
const AllComplains = async () => {
    return <>
      <UserComplains />
    </>;
};

export default AllComplains;


export async function generateMetadata() {
  return {
    title: `Complains | Technical sewa`,
  };
}