<template>
  <div>
    <h1>Nuxt module playground!</h1>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.user }}:</strong> {{ msg.text }}
      </li>
    </ul>

    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" type="text" placeholder="Type a message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
const { $io } = useNuxtApp();

const messages = ref([]); // reactive property to hold the messages
const newMessage = ref(""); // reactive property to hold the new message
const username = ref("玩家一"); // reactive property to hold the username

const sendMessage = () => {
  $io.emit("send message", { text: newMessage.value, user: username.value });
  messages.value.push({ text: newMessage.value, user: username.value }); // push the new message into the array
  newMessage.value = "";
};

onMounted(() => {
  $io.on("connect", () => {
    console.log("connected 123", $io.id);
  });
  $io.on("user disconnected", function (data) {
    // alert(`${data} got disconnected`);
  });

  $io.on("assign username", (data) => {
    username.value = data;
  });

  $io.on("new message sent", (data) => {
    // alert(data);
    messages.value.push(data); // push the new message into the array
  });
});
</script>
