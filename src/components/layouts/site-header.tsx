import { MainNav } from "@/components/navigation/main-nav";

export function SiteHeader() {
  return (
    <header>
      <div>
        {/* DESKTOP NAVBAR */}
        <MainNav />
        {/* MOBILE NAVBAR */}
        <div>
        </div>
      </div>
    </header>
  );
}
