import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">Layout</main>
    </>
  );
};

export default DashboardLayout;
