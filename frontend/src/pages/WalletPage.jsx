import React from 'react'

const WalletPage = () => {
    return (
        <div>
            <div class="py-2">
                <p className="text-2xl text-gray-925">Wallet Settings</p>
            </div>
            <div className="bg-white flex flex-col gap-4 rounded-lg py-3 px-2">
                <div>
                    <p className="text-gray-925 text-sm font-semibold">General Information</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-[2px]">
                        <p className="mb-1 text-xs text-gray-450">Wallet Name</p>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out"
                            placeholder="Enter wallet name"
                        />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <p className="mb-1 text-xs text-gray-450">Initial balance</p>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out"
                            placeholder="Enter Initial balance"
                        />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <p className="mb-1 text-xs text-gray-450">Wallet Currency</p>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out"
                            placeholder="Enter wallet currency"
                        />
                    </div>
                </div>
                <button className="w-full bg-green-button py-2 flex items-center justify-center rounded text-white text-sm font-semibold">
                    Update settings
                </button>
                <div className="flex flex-col gap-4">
                    <div className="text-sm font-semibold text-gray-925">Wallet Member</div>
                    <div class="flex gap-4 items-center">
                        <div class="w-10 h-10 rounded-full bg-gray-400"></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-925">Manish Kumar Prasad</p>
                            <p className="text-gray-450 text-sm">manishraz32@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage