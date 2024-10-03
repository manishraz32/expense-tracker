import { useMutation } from '@apollo/client';
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CREATE_WALLET } from '../graphql/mutations/wallet.mutations';

const WalletPage = () => {
    const [createWallet, { loading }] = useMutation(CREATE_WALLET);
    const _id = JSON.parse(localStorage.getItem('user'))._id;
    const [walletFormData, setWalletFormData] = useState({
        walletName: "",
        initialBalance: ""
    });

    // Validation errors state
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWalletFormData({ ...walletFormData, [name]: value });

        // Resetting the error state when user starts typing
        setErrors({ ...errors, [name]: "" });
    };

    // Validate the form before submission
    const validateForm = () => {
        const newErrors = {};

        if (!walletFormData.walletName) {
            newErrors.walletName = "Wallet Name is required";
        }

        if (!walletFormData.initialBalance) {
            newErrors.initialBalance = "Initial Balance is required";
        } else if (isNaN(walletFormData.initialBalance)) {
            newErrors.initialBalance = "Initial Balance must be a number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // If no errors, form is valid
    };

    const handleUpdateClick = async () => {
        if (validateForm()) {
            try {
                const response = await createWallet({
                    variables: {
                        input: {
                            walletName: walletFormData.walletName,
                            initialBalance: parseFloat(walletFormData.initialBalance),
                            userId: _id
                        },
                    },
                });

                toast.success('Wallet updated successfully!');

            } catch (error) {
                if (error.networkError) {
                    // Handle network-related errors, like connection issues
                    console.error('Network error:', error.networkError);
                    toast.error('Network error, please check your connection.');
                } else if (error.graphQLErrors) {
                    // Handle GraphQL errors returned from the server
                    // GraphQL returns multiple errors
                    error.graphQLErrors.forEach(({ message, path, extensions }) => {
                        console.error(
                            `GraphQL error: Message: ${message}, Path: ${path}, Code: ${extensions.code}`
                        );
                        toast.error(`Error: ${message}`);
                    });
                }
            }
        } else {
            toast.error('Please fix the validation errors.');
        }
    };

    return (
        <div className="flex flex-col gap-4 flex-grow px-[16px] py-4 bg-[#F4F7FA] xl:px-[15%]">
            <div>
                <div className="py-2">
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
                                className={`border ${errors.walletName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out`}
                                placeholder="Enter wallet name"
                                name="walletName"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.walletName && <p className="text-red-500 text-xs mt-1">{errors.walletName}</p>}
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="mb-1 text-xs text-gray-450">Initial Balance</p>
                            <input
                                type="text"
                                className={`border ${errors.initialBalance ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out`}
                                placeholder="Enter Initial balance"
                                name="initialBalance"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.initialBalance && <p className="text-red-500 text-xs mt-1">{errors.initialBalance}</p>}
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <p className="mb-1 text-xs text-gray-450">Wallet Currency</p>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2 focus:border-gray-400 focus:outline-none transition duration-150 ease-in-out text-gray-700 font-semibold"
                                placeholder="Enter wallet currency"
                                value="INR"
                                readOnly
                            />
                        </div>
                    </div>
                    <button
                        className="w-full bg-green-button py-2 flex items-center justify-center rounded text-white text-sm font-semibold"
                        onClick={handleUpdateClick}
                    >
                        Update settings
                    </button>
                    <div className="flex flex-col gap-4">
                        <div className="text-sm font-semibold text-gray-925">Wallet Member</div>
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-925">Manish Kumar Prasad</p>
                                <p className="text-gray-450 text-sm">manishraz32@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage;
