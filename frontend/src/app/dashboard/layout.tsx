import { DashboardFooter, DashboardHeader } from "@/components";
import { Typography } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      {children}
      <DashboardFooter />
    </>
  );
}
