import { useEffect, useState } from 'react';
import CommonProgressBar from '../components/CommonProgressBar';

const BudgetPage = () => {

    return (
        <div className="flex flex-col gap-4">
            <div className="p-[15px] shadow-custom bg-white flex flex-col gap-3 rounded-lg">
                <div>
                    <h1 className="font-semibold text-[18px] text-gray-925">Test</h1>
                    <p className="text-sm text-gray-450"> All Wallets</p>
                </div>
                <div>
                    <p className="text-gray-450"><span className="text-[20px] font-bold text-green-app">2000.00 USD </span>left</p>
                    <p className="text-gray-450 text-sm"> FROM 7000 USD</p>
                </div>
                <div>
                    <div>
                        <CommonProgressBar value={50} />
                    </div>
                    <div className="flex justify-between mt-1">
                        <p className="text-gray-450 text-sm">Sep 19, 2024</p>
                        <p className="text-gray-450 text-sm">Oct 19, 2024</p>
                    </div>
                </div>
            </div>
            <div className="px-[15px] py-10 shadow-custom bg-white flex flex-col gap-3 rounded-lg">
                <p className="text-sm text-gray-450 text-center">Take control of your expenses and save more money with budgets!</p>
                <button className="w-full bg-green-button py-2 flex items-center justify-center rounded text-white text-sm font-semibold">Create a New Budget</button>
            </div>
        </div>
    )
}

export default BudgetPage;