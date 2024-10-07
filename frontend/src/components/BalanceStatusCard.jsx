import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_WALLET_BY_ID } from '../graphql/queries/wallet.query'
import WalletBalanceCard from './WalletBalanceCard'

const BalanceStatusCard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Query
    const { data, error, loading } = useQuery(GET_WALLET_BY_ID, {
        variables: { id: user?.wallet?._id }
    })

    return (
        <>
            <WalletBalanceCard
                headerName="Current Wallet Balance"
                balance={data?.getWalletById?.moneyLeft.toFixed(2)}
            />
            <WalletBalanceCard
                headerName="Total Period Change"
                balance={data?.getWalletById?.changeTillNow.toFixed(2)}
            />
            <WalletBalanceCard
                headerName="Total Period Expense"
                balance={data?.getWalletById?.spentSoFar.toFixed(2)}
            />
            <WalletBalanceCard
                headerName="Total Period Income"
                balance={data?.getWalletById?.moneyAddedSoFar.toFixed(2)}
            />
        </>
    )
}

export default BalanceStatusCard