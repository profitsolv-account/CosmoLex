import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';
import {CustomLink} from "@/components/ui/customLink";
import {PageDataType} from "@/types";
import classNames from "classnames";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController
);


type Props = {
    pageData: PageDataType;
    className?: string;
}

const NetGainCalculator: React.FC<Props> = ({pageData, className}) => {
    const months = 12;
    const labels = Array.from({ length: months }, (_, i) => `Month ${i + 1}`);

    const [plan, setPlan] = useState<'standard' | 'elite'>('standard');
    const [numberOfUsers, setNumberOfUsers] = useState(1);
    const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(8);
    const [hourlyRate, setHourlyRate] = useState(250);

    const planPrices: {[index: string]: number} = {
        standard: 99,
        elite: 129,
    };

    const plans:Array<'standard' | 'elite'> = ['standard', 'elite'];

    const monthlySubscriptionPerUser = planPrices[plan];
    const monthlyCost = monthlySubscriptionPerUser * numberOfUsers;
    const annualCost = monthlyCost * 12;

    const annualSavings = ((numberOfUsers * hoursSavedPerWeek) * hourlyRate * 44) / 10;
    const netGain = annualSavings - annualCost;
    const monthlyNetGain = (annualSavings / 12) - monthlyCost;

    const chartData = {
        labels,
        datasets: [
            {
                label: 'CosmoLex Subscription',
                type: 'line' as const,
                data: Array.from({ length: months }, () => annualCost),
                borderColor: '#0c193a',
                pointBackgroundColor: 'white',
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Total Monthly Gain',
                type: 'bar' as const,
                data: Array.from({ length: months }, (_, i) => monthlyNetGain * (i + 1) + monthlyCost * (i + 1)),
                backgroundColor: '#202B46',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: false, text: '' },
        },
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return `$${value.toLocaleString()}`;
                    },
                },
            },
            x: {
                type: 'category',
            },
        },
    } as const;

    return (
        <div className={classNames("p-6 max-w-5xl mx-auto", className)}>

            <div className="bg-white rounded-2xl pt-10 shadow-[0_0_20px_rgba(0,0,0,0.1)]">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 border-b border-[#e5e5e5] pb-5">
                    <div>
                        <label className="block text-lg font-bold mb-1 text-[18px]">Number of Users</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 outline-0 border-[#e6e6e6] bg-[#fcfcfc]"
                            value={numberOfUsers}
                            onChange={(e) => setNumberOfUsers(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold mb-1 text-[18px]">*Hours Saved per Week</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 outline-0 border-[#e6e6e6] bg-[#fcfcfc]"
                            value={hoursSavedPerWeek}
                            onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold mb-1 text-[18px]">Hourly Rate ($)</label>
                        <div className="flex relative border rounded-md  border-[#e6e6e6] bg-[#fcfcfc]">
                            <span className="bg-[#eee] flex items-center justify-center px-4 rounded-[4px] border-r border-[#e6e6e6]">$</span>
                            <input
                                type="number"
                                className="w-full outline-0 p-2 "
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">

                    <div className="md:border-r border-[#e5e5e5] p-4 pt-8">
                        <h3 className="text-center font-semibold mb-2 text-[25px]">Users Pricing Plans</h3>
                        <p className="text-center text-[16px] mb-6">Monthly price per users</p>
                        <div className="md:flex gap-16 justify-center">
                            {(plans).map((p) => (
                                <div
                                    key={p}
                                    className='py-2 font-semibold text-center flex flex-col'
                                >
                                    <div className="text-center font-semibold mb-2 text-[20px] capitalize">
                                        {p}
                                    </div>
                                    <div className="text-[16px]">
                                        ${planPrices[p]}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="rounded-md p-4 pb-20 pt-8">

                        <div className="border-b border-[#e5e5e5] mb-6 pb-4">

                            <h3 className="text-center font-semibold text-[25px] mb-2">Annual Subscription Plan</h3>
                            <div className="flex gap-4 justify-center">
                                {(plans).map((p) => (
                                    <div
                                        key={p}
                                        onClick={() => setPlan(p)}
                                        className={`px-4 py-2 font-bold cursor-pointer text-xl capitalize ${
                                            plan === p ? 'text-primary-dark ' : 'text-gray-500'
                                        }`}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-xl mb-2">
                            <div className="font-bold inline-block min-w-[200px] text-[16px]">CosmoLex Annual Cost: </div>
                            ${annualCost.toLocaleString()}
                        </div>
                        <div className="text-xl mb-3">
                            <div className="font-bold inline-block min-w-[200px] text-[16px]">Annual Savings**: </div>
                            ${annualSavings.toLocaleString()}
                        </div>

                        <div className="bg-green py-1.5 text-center">
                            <div className="text-primary-dark text-[16px] mt-1">
                                <div className="font-bold inline-block mr-3">Net Gain:</div>
                                ${netGain.toLocaleString()}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="bg-white rounded-2xl mt-5 py-10 px-10 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                <h3 className="text-3xl text-center font-bold mb-2">Net Gain Per Month Year 1</h3>
                <Chart type='bar' data={chartData} options={chartOptions} />

                <p className="mt-10 italic">
                    ** Savings is the additional billable time revenue determined by multiplying the minutes saved per day, per timekeeper by the prorated hourly rate (5 minutes a day saved by one timekeeper who bills at $250/hour gains $20.83 of billable time a day). The daily gain is then multiplied by 22 working days in a month to determine the monthly savings (and multiplied by 12 months for the annual savings).
                </p>

                <div className="flex items-center justify-center mt-10">
                    <CustomLink href={pageData.settings?.freeTrialLink || ""} className="base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark">Try for free</CustomLink>
                </div>
            </div>
        </div>
    );
};

export default NetGainCalculator;