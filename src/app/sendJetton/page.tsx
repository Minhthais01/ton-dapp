'use client';

import React from 'react';
import { beginCell, toNano, Address } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';

const SettingsPage = () => {
    const [tonConnectUI] = useTonConnectUI();

    // Địa chỉ ví người nhận
    const destinationAddress = Address.parse('0QBYfFpRt5XC4AiKSt7UK804rF7BCaLkDpoLfvdYL4qUkwnG');

    // Tạo forwardPayload chứa bình luận
    const forwardPayload = beginCell()
        .storeUint(0, 32) // opcode 0 cho bình luận
        .storeStringTail('Hello, TON!') // Bình luận
        .endCell();

    // Tạo payload giao dịch Jetton
    const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // opcode chuyển Jetton (theo tài liệu của TON)
        .storeUint(0, 64) // query_id (id của giao dịch, có thể là số ngẫu nhiên)
        .storeCoins(toNano('5')) // Số lượng Jetton (9 chữ số thập phân)
        .storeAddress(destinationAddress) // Địa chỉ ví nhận
        .storeAddress(Address.parse('0:0000000000000000000000000000000000000000000000000000000000000000')) // Địa chỉ trả lời (0 nếu không cần thiết)
        .storeBit(0) // Không sử dụng custom_payload
        .storeCoins(toNano('0.02')) // Phí giao dịch hoặc phí bổ sung nếu có
        .storeBit(1) // Forward payload lưu trữ dạng tham chiếu
        .storeRef(forwardPayload) // Đưa forwardPayload vào
        .endCell();
        

    // Địa chỉ ví Jetton Wallet
    const jettonWalletContract = Address.parse('0:4109e76e3c412ed9f5d690c313e3dc9d2160a8dc1b1732050a691a81f17d1db3');

    // Cấu hình giao dịch
    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360, // Giao dịch hết hạn sau 360 giây
        messages: [
            {
                address: jettonWalletContract.toString(), // Địa chỉ ví Jetton
                amount: toNano('0.05').toString(), // Phí giao dịch (phí mạng)
                payload: body.toBoc().toString('base64'), // Payload giao dịch (được mã hóa base64)
            },
        ],
    };

    // Hàm gửi giao dịch
    const sendTransaction = async () => {
        try {
            await tonConnectUI.sendTransaction(myTransaction);
            alert('Transaction sent successfully!');
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Check console for details.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Jetton Transfer</h1>
            <button onClick={sendTransaction} style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
                Send Jetton Transaction
            </button>
        </div>
    );
};

export default SettingsPage;
