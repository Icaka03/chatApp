import { useState, useRef } from "react";
import { Auth } from "./Auth.js";

import Cookies from "universal-cookie";
import { Chat } from "./Chat.js";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config.js";
import "../styles/Home.css";
const cookies = new Cookies();

export default function Home() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  // const [isThereRoom, setIsThereRoom] = useState(false);
  const roomInputRef = useRef(null);
  let isThereRoom = false;
  if (room !== "" && room !== null) {
    isThereRoom = true;
  }
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auto-token");
    setIsAuth(false);
    setRoom(null);
  };
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <div className={isThereRoom ? "chat-room" : "room-choose"}>
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="room">
            {" "}
            <div className="room-heading">
              <label>Enter Room name</label>
            </div>
            <div>
              <input
                ref={roomInputRef}
                className="room-input"
                placeholder="Write room's name here"
              />
            </div>
            <div>
              <button
                onClick={() => setRoom(roomInputRef.current.value)}
                className="enter-chat-button"
              >
                Enter Chat
              </button>
            </div>
          </div>
        )}{" "}
        <div className={"sign-out"}>
          <button
            onClick={signUserOut}
            className={
              isThereRoom ? "chat-sign-out-button" : " sign-out-button "
            }
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
