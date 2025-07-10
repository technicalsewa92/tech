import React from 'react';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('@mui/material/Button'), {
  ssr: false,
  loading: () => (
    <div
      className="h-8 w-full bg-gray-200 animate-pulse rounded-md mb-2"
      style={{ minWidth: 96, minHeight: 32 }}
    />
  ),
});
import { MdOutlineDashboard } from 'react-icons/md';
import { FaDoorOpen } from 'react-icons/fa';
import { DropdownMenuItem, DropdownMenuContent } from './ui/dropdownmenu';

interface NavUserDropdownProps {
  user: any;
  onDashboard: () => void;
  onLogout: () => void;
}

const NavUserDropdown: React.FC<NavUserDropdownProps> = ({
  user,
  onDashboard,
  onLogout,
}) => (
  <DropdownMenuContent>
    <DropdownMenuItem>
      <div className="flex flex-col gap-2">
        <Button
          className="bg-cyan-500 text-white rounded-md py-2 gap-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300 min-w-[96px] min-h-[32px]"
          onClick={onDashboard}
          disableElevation
        >
          <MdOutlineDashboard className="text-xl" />
          Dashboard
        </Button>
        <Button
          onClick={onLogout}
          className="bg-cyan-500 text-white rounded-md gap-2 py-2 text-xs hover:bg-cyan-600 cursor-pointer transition-all hover:duration-300 min-w-[96px] min-h-[32px]"
          disableElevation
        >
          <FaDoorOpen className="text-xl" />
          Log Out
        </Button>
      </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
);

export default NavUserDropdown;
