'use client'
import toast from "react-hot-toast";
import NavLinks from "./Navlinks";
import SidebarHeader from "./SidebarHeader";
import {useRouter} from 'next/navigation'

const Sidebar = () => {

  const router = useRouter()

  const Logout = () => {
    localStorage.removeItem('token')
    router.push("/");
    toast.success("logout success")
  }

  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
      {/* first row */}
      <SidebarHeader />
      {/* second row */}
      <NavLinks />
      {/* third row */}
      <button onClick={Logout} className="btn bg-blue-500 text-white text-xl hover:text-black" >Logout</button>
      {/* <MemberProfile /> */}
    </div>
  );
};
export default Sidebar;
