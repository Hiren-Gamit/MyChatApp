<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>My Chat App</ion-title>
          <ion-button slot="end" @click="logout" class="logout-button"> <ion-icon name="log-out-outline"></ion-icon></ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Chat App eee</ion-title>
          <ion-item>
            <ion-button slot="end" @click="logout" class="logout-button"> <ion-icon name="log-out-outline"></ion-icon></ion-button>
          </ion-item>
        </ion-toolbar>
      </ion-header>
      
      <ion-list>
        <Messaging v-for="message in messages" :key="message._id"  :message="message" />
        <!-- <MessageListItem v-for="message in messages" :key="message.id" :message="message" /> -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
// import MessageListItem from '@/components/MessageListItem.vue';
import Messaging from '@/components/Messaging.vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    // MessageListItem,
    Messaging
  },
  data() {
    return {
      messages: '',
      url: "http://localhost:5000/api",
    }
  },
  methods: {
    refresh: (ev) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    },
    logout(){
      localStorage.clear();
      this.$router.push('/login')
    }
  },
  mounted(){
    const userId = localStorage.getItem('userId')
    if(!userId){
      this.$router.push('/login')
    }
    axios.get(this.url + `/users/getusers?userid=${userId}`)
    .then((response) => {
      this.messages = response.data.users
    })
  },
});
</script>

<style scoped>

.logout-button{
  margin-right: 3px;
  color: blue
}
</style>