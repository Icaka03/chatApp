import { useState, useRef } from "react";
import { Auth } from "./Auth.js";

import Cookies from "universal-cookie";
import { Chat } from "./Chat.js";
const cookies = new Cookies();

export default function Home() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          {" "}
          <label>Enter Room name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}{" "}
    </div>
  );
}
