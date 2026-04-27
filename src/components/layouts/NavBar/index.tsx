import { cn } from "@/libs/utils";
import { NavBarProps } from "./interface";

function NavBar({ className, userName, roleName }: NavBarProps) {
  return (
    <nav className={cn("h-16 bg-white", className)}>
      <div className="px-4 py-3 w-full h-full bg-orange-50/50 flex items-center justify-end">
        <div className="flex flex-col items-end">
          <div className="text-base font-medium text-gray-700">{userName}</div>
          <p className="text-xs font-normal text-gray-500">{roleName}</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
