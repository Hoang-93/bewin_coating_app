import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard  from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import DataTable from './BasicTableOne';

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Danh Sach Cửa Hàng" />
      <div className=" bg-white  dark:bg-white/[0.03] border rounded-2xl border-gray-800 ">

        <DataTable />

      </div>
    </>
  );
}
