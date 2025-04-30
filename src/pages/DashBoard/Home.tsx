import React from "react";
import PageMeta from "../../components/common/PageMeta";
import StatisticsChart from "../../components/ecommerce/StaticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";

const Home = () => {
  return (
    <>
      <PageMeta title="Home" description="Home page of the application" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>
    </>
  );
};

export default Home;
