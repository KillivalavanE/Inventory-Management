import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  componentIcon: LucideIcon;
};

type StatCardProps = {
  title: string;
  baseIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({ title, baseIcon, details, dateRange }: StatCardProps) => {
    const formatPercentage = (value:number) => {
        const signal = value>=0 ? "+" : "";
        return `${signal}${value.toFixed()}%`;
    }

    const getColor = (value:number) => value>=0 ? 'text-green-500' : 'text-red-500';
    return (
        <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
            {/* header */}
            <div>
                <div className="flex justify-between items-center mb-2 px-5 pt-4">
                    <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
                    <span className="text-xs text-gray-400">{dateRange}</span>
                </div>
                <hr />
            </div>
            {/* body */}
            <div className="flex mb-6 items-center justify-around gap-4 px-5">
                <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">{baseIcon}</div>
                <div className="flex-1">
                    {details.map((item,index)=>(
                        <div key={index}>
                            <div className="flex items-center justify-between my-4">
                                <span className="text-gray-500">{item.title}</span>
                                <span className="font-bold text-gray-800">{item.amount}</span>
                                <div className="flex items-center">
                                    <item.componentIcon className={`w-4 h-4 mr-1 ${getColor(item.changePercentage)}`}/>
                                    <span className={`font-medium ${getColor(item.changePercentage)}`}>{formatPercentage(item.changePercentage)}</span>
                                </div>
                            </div>
                            {index < details.length-1 && <hr />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
