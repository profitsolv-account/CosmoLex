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

    const [plan, setPlan] = useState<'basic' | 'plus' | 'pro'>('basic');
    const [numberOfUsers, setNumberOfUsers] = useState(1);
    const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(8);
    const [hourlyRate, setHourlyRate] = useState(250);

    const planPrices = {
        basic: 35,
        plus: 55,
        pro: 69,
    };

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
                label: 'Mango Practice Subscription',
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

            <div className="bg-white rounded-2xl pt-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 border-b border-[#ccc] pb-10">
                    <div>
                        <label className="block text-lg font-bold mb-1">Number of Users</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 outline-0"
                            value={numberOfUsers}
                            onChange={(e) => setNumberOfUsers(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold mb-1">*Hours Saved per Week</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 outline-0"
                            value={hoursSavedPerWeek}
                            onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-bold mb-1">Hourly Rate ($)</label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 outline-0"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">

                    <div className="md:border-r border-[#ccc] p-4">
                        <h3 className="text-2xl text-center font-semibold mb-2">Users Pricing Plans</h3>
                        <div className="md:flex gap-4">
                            {(['basic', 'plus', 'pro'] as const).map((p) => (
                                <div
                                    key={p}
                                    className={`py-2 font-semibold text-center`}
                                >
                                    {p.charAt(0).toUpperCase() + p.slice(1)} (${planPrices[p]}/user/mo)
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="rounded-md p-4 pb-20">

                        <div className="border-b border-[#ccc] mb-4">

                            <h3 className="text-2xl text-center font-semibold mb-2">Annual Subscription Plan</h3>
                            <div className="flex gap-4 justify-center">
                                {(['basic', 'plus', 'pro'] as const).map((p) => (
                                    <div
                                        key={p}
                                        onClick={() => setPlan(p)}
                                        className={`px-4 py-2 font-bold cursor-pointer text-xl ${
                                            plan === p ? 'text-primary-dark ' : 'text-gray-500'
                                        }`}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-xl mb-2"><strong>Mango Practice Annual Cost:</strong> ${annualCost.toLocaleString()}</p>
                        <p className="text-xl mb-2"><strong>Annual Savings**:</strong> ${annualSavings.toLocaleString()}</p>
                        <p className="font-bold text-primary-dark text-2xl mt-1"><strong>Net Gain:</strong> ${netGain.toLocaleString()}</p>
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-2xl mt-5 py-10 px-10">
                <h3 className="text-3xl text-center font-semibold mb-2">Net Gain Per Month Year 1</h3>
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