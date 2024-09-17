"use client";
import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import PopularCard from "./PopularCard";
import StatCard from "./StatCard";
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <PopularCard />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard 
        title="Customer & Expenses"
        baseIcon={<Package className="text-blue-600 w-6 h-6"/>}
        dateRange="22 - 29 Oct 2023" 
        details={[
          {title:"Customer Growth",amount:"169.00",changePercentage:131,componentIcon:TrendingUp},
          {title:"Expenses",amount:"10.00",changePercentage:-56,componentIcon:TrendingDown}
        ]}
      />
      <StatCard 
        title="Dues & Pending Orders"
        baseIcon={<CheckCircle className="text-blue-600 w-6 h-6"/>}
        dateRange="01 - 19 Nov 2023" 
        details={[
          {title:"Dues",amount:"2500.00",changePercentage:69,componentIcon:TrendingUp},
          {title:"Pending Orders",amount:"147.00",changePercentage:-20,componentIcon:TrendingDown}
        ]}
      />
      <StatCard 
        title="Sales & Discount"
        baseIcon={<Tag className="text-blue-600 w-6 h-6"/>}
        dateRange="15 - 25 Dec 2023" 
        details={[
          {title:"Sales",amount:"1000.00",changePercentage:78,componentIcon:TrendingUp},
          {title:"Discount",amount:"300.00",changePercentage:-15,componentIcon:TrendingDown}
        ]}
      />
    </div>
  )
}

export default Dashboard;