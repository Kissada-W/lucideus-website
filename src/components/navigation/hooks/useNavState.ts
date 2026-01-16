import { usePathname } from "next/navigation";
import * as React from "react";

export function useNavState() {
  const pathname = usePathname();
  const [openMegaId, setOpenMegaId] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setOpenMegaId(null);
    setMobileOpen(false);
  }, [pathname]);

  return {
    openMegaId,
    setOpenMegaId,
    mobileOpen,
    setMobileOpen,
  };
}
