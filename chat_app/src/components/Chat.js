import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
export const Chat = (props) => {
  const { room } = props;
  const [newMeassage, setNewMeassage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMeassage === "") return;

    await addDoc(messageRef, {
      text: newMeassage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMeassage("");
  };
  return (
    <div className="chat">
      <div className="header">
        <h1> Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div>
        <div className="messaages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              <span className="user">{message.user}: </span>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMeassage(e.target.value)}
          value={newMeassage}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
