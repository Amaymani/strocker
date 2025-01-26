import React from 'react'
import { FloatingDock } from "@/components/ui/floating-doc";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import navLinks from "@/utils/navLinks"
import Logo from "@/components/logo"
import { CardSpotlight } from '@/components/ui/card-spotlight';
import axios from 'axios';
import Link from 'next/link';

const topStocks = ({ initialStocks }) => {
    const router = useRouter();
    const links = navLinks;
    const [stocksData, setStocksData] = useState(initialStocks)

    return (
        <div className='bg-gray-200 h-[100vh] dark:bg-zinc-950'>
            <Logo />
            <div className='heading flex justify-center text-4xl font-bold mt-4 ml-5 mb-8'>Top stocks</div>
            <div className='ml-5 grid lg:grid-cols-4 gap-4 grid-cols-2'>
                { stocksData?.stockData?.length > 0 ? (
                    stocksData.stockData.map((stock) => (
                        <Link href={`/stock/${stock.symbol}`} key={stock.symbol}>
                            <CardSpotlight className="flex justify-start items-center h-52 w-96 rounded-xl">
                                <div className='py-5 z-50'>
                                    <Image src={stock.img} height={100} width={100} alt='stocks_logo' />
                                    <div className='text-xl font-semibold mt-4'>{stock.stockName}</div>
                                </div>
                                <div className='w-full flex flex-col justify-end text-xl font-bold text-green-600'>
                                    {stock.price.o < stock.price.c ?
                                        (<div className='flex justify-end text-xl font-bold text-green-600'>${stock.price.c}</div>)
                                        : (<div className='flex justify-end text-xl font-bold text-red-600'>${stock.price.c}</div>)}
                                    <div>{stock.price.o < stock.price.c ? (<div className='flex justify-end text-sm font-bold text-green-600'>
                                        {((stock.price.c - stock.price.o) / stock.price.o).toFixed(2)}%
                                    </div>) : (<div className='flex justify-end text-sm font-bold text-red-600'>
                                        {((stock.price.c - stock.price.o) / stock.price.o).toFixed(2)}%
                                    </div>)}</div>
                                </div>

                            </CardSpotlight>
                        </Link>
                    ))) : (
                        <p>No stocks available</p>
                      )

                }
            </div>
            <div className='flex fixed bottom-10  items-center justify-center h-[3rem] w-full'>
                <FloatingDock
                    items={links}
                />
            </div>
        </div>
    )
}

export default topStocks;


export async function getServerSideProps(context) {
    try {
        const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000";

        const stockRes = await axios.get(`${baseURL}/api/top-stocks`, {
            params: { page: "top-stocks" },
        });

        return {
            props: {
                initialStocks: stockRes.data,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                initialStocks: stockRes.data || {}, // Ensure stockRes.data is a valid object
            },
        };
    }
}