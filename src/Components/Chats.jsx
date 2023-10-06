// Import necessary libraries
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState({}); // Initialize chats as an object

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Set chats to an empty object if doc.data() is null
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // Convert chats object to an array and sort it
  const sortedChats = Object.entries(chats)
    .sort((a, b) => b[1].date - a[1].date)
    .map(([chatId, chatData]) => ({
      id: chatId,
      userInfo: chatData.userInfo,
      lastMessage: chatData.lastMessage,
    }));

  return (
    <div className="chats">
      {sortedChats.map((chat) => (
        <div
          className="userChat"
          key={chat.id}
          onClick={() => handleSelect(chat.userInfo)}
        >
          <img src={chat.userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
