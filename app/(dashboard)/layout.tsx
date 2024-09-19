"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  const { onOpen } = useNewAccount();
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <Button onClick={onOpen}>Add an account</Button>
      </main>
    </>
  );
};

export default DashboardLayout;
