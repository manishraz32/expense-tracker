import { useState } from 'react'

const WalletBalanceCard = ({headerName, balance}) => {

    return (
        <div className="px-[15px] py-3 bg-white rounded-lg">
            <p className="text-[#455A65] font-semibold tracking-wide">{headerName}</p>
            <p className={`text-[24px] font-semibold ${balance < 0 || headerName === "Total Period Expense"? 'text-red-app' : 'text-green-app'} tracking-wider min-w-[240px]`}>{balance} INR</p>
        </div>
    )
}

export default WalletBalanceCard