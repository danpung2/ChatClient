import axios from "axios";

interface Room {
    roomId: string;
    roomName: string;
}

async function getAllRoomList(): Promise<Room[]>{
    const res = await axios
        .get("/api/chat/room/all", {});
    console.log(res.data);
    return res.data;
}

async function createRoom(roomName: string){
    const res = await axios
        .post("/api/chat/room", { roomName });
    return res.data;
}

export { getAllRoomList, createRoom };