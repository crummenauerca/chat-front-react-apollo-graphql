import logo from "../assets/images/logo.png";
import newMessageSound from "../assets/sounds/newMessage.mp3";
import userOnlineSound from "../assets/sounds/userOnline.mp3";
import userOfflineSound from "../assets/sounds/userOffline.mp3";

export default function showNotification(title, body, type) {
  let sound = null;
  switch (type) {
    case "online": {
      sound = userOnlineSound;
      body = `${body} está on-line 😃`;
      break;
    }
    case "offline": {
      sound = userOfflineSound;
      body = `${body} está off-line 😥`;
      break;
    }
    default: {
      sound = newMessageSound;
    }
  }

  new Audio(sound).play();

  if (sound === newMessageSound) {
    return;
  }

  if (Notification.permission === "granted") {
    // Para evitar notificações repetidas diante de várias abas abertas da aplicação
    if (localStorage.getItem("@simple-chat/lastNotification") === title + body + type) {
      return;
    }

    new Notification(`Simple chat | ${title}`, {
      body,
      icon: logo,
    }).onclick = () => window.focus();

    localStorage.setItem("@simple-chat/lastNotification", title + body + type);
  }
}
