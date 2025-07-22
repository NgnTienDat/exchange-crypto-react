import { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { BASE_URL } from "../utils/Url";

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${BASE_URL}/ws/crypto-coin`),
            // reconnectDelay: 5000,    
            debug: (str) => console.log(str),
            onConnect: (frame) => {
                console.log("✅ Connected to WebSocket server");
                console.log("Headers:", frame.headers);
                setConnected(true);
                setStompClient(client);
            },
            onDisconnect: () => setConnected(false),
        });

        client.activate()

        return () => {
            client.deactivate()
        };
    }, []);

    return (
        <SocketContext.Provider value={{ stompClient, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext)
export default useSocket;
