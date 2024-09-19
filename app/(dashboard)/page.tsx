"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { onOpen } = useNewAccount();
  const { data: accounts, isLoading } = useGetAccounts();

  // if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <UserButton afterSwitchSessionUrl="/" />
      <br />
      <Button onClick={onOpen}>Add an account</Button>
      {/* <div>
        {accounts?.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div> */}
    </>
  );
}
