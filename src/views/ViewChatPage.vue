<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="getBackButtonText()" default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" >
      <ion-item>
        <ion-icon :icon="personCircle" color="primary"></ion-icon>
        <ion-label class="ion-text-wrap">
          <h2>
            {{ receiverUser.name }}
            <span class="date">
              <ion-note>{{ message.date }}</ion-note>
            </span>
          </h2>
          <!-- <h3>To: <ion-note>Me</ion-note></h3> -->
        </ion-label>
      </ion-item>
      
      <div class="ion-padding" id="chatBox" ref="chatbox" style="height: 80%; overflow-y: scroll">
        <div v-for="msg in messages" :key="msg._id">
          <div class="direct-chat-msg" :class="isSender(msg.sender_id) ? 'left' :  'right'">
            <div class="direct-chat-infos clearfix">
              <span
                class="direct-chat-name text-muted"
                :class="isSender(msg.sender_id) ? 'float-left' : 'float-right'"
              ></span>
              <span
                class="direct-chat-timestamp"
                :class="isSender(msg.sender_id) ? 'float-left' : 'float-right'"
              >{{ dateToRead(msg.createdAt) }}</span>
            </div>
          </div>
          <div class="direct-chat-text">{{ msg.message}}</div>
        </div>  
      </div>
    </ion-content>
    <ion-footer>
      <ion-item>
        <ion-input class="chat-input" v-model="message" placeholder="Type message here" @Keyup.enter="send"></ion-input>
        <button item-right class="chat-input"  @click="send">send
          <ion-icon slot="end" name="paper-plane-outline"></ion-icon>
        </button>
      </ion-item>
    </ion-footer>
  </ion-page>
</template>

<script>
import { useRoute } from 'vue-router';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonToolbar,IonInput } from '@ionic/vue';
import { personCircle } from 'ionicons/icons';
//import { getMessage } from '../data/mymessages';
import { defineComponent } from 'vue';
import axios from 'axios'
import moment from 'moment'
import '../theme/chatstyle.css';
export default defineComponent({
  name: 'ViewMessagePage',
  data() {
    return {
      personCircle,
      messages: '',
      message: '',
      senderId: '',
      receiverId: '',
      receiverUser: '',
      interval: null,
      url: "http://localhost:5001/api",
      getBackButtonText: () => {
        const win = window;
        const mode = win && win.Ionic && win.Ionic.mode;
        return mode === 'ios' ? 'Inbox' : '';
      }
    }
  },
  setup() {
    const route = useRoute();
    //const message = this.getMessages(route.params.id);
    
    return { route }
  },
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonToolbar,
    IonInput,
  },
  methods: {
    isSender(id){
        return this.senderId == id;
    },
    dateToRead(createdAt){
      return moment(createdAt).format("DD/MM/YYYY hh:mm A")
    },
    send(){
      axios({
        method: 'post',
        url: this.url + '/chats/addmessage',
        data:{
          sender_id: this.senderId,
          receiver_id:  this.receiverId,
          seen: false,
          message:  this.message
        },
        headers:{}
      }).then(response => {
        console.log(response)
        this.fetchMessages();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.message = "";
      });
    },
    fetchMessages(){
      axios.get(this.url + `/chats/getmessages?sender_id=${this.senderId}&receiver_id=${ this.receiverId}`)
      .then(response => {
        if(response.data.statusCode == 200) {
          this.messages = response.data.messages;
          this.receiverUser = response.data.receiverUser[0]
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        // Scroll down to bottom
        let chatbox = this.$refs.chatbox;
        chatbox.scrollTop = chatbox.scrollHeight;
      });
    }
  },
  mounted(){
    this.senderId = localStorage.getItem('userId') 
    this.receiverId = this.route.params.id
    this.fetchMessages();

    this.interval = setInterval(() => this.fetchMessages(), 30000);
  }
});
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .date {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}

.chat-input {
    flex: 0 0 auto;
    height: 60px;
    background: #ffffff;
    border: #fafafa;
    /* border-top: 1px solid #2671ff; */
    /* box-shadow: 0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28); */
    margin-left:10px
}
.chat-input input {
    height: 59px;
    line-height: 60px;
    outline: 0 none;
    border: none;
    width: calc(100% - 60px);
    color: white;
    text-indent: 10px;
    font-size: 12pt;
    padding: 0;
    background: #fafafa;
}
.chat-input button {
    float: right;
    outline: 0 none;
    border: none;
    background: rgba(252, 246, 246, 0.993);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 2px 0 0 0;
    margin: 10px;
    transition: all 0.15s ease-in-out;
}
input[type=text]:focus, textarea:focus {
  outline: none;
}
textarea{
  overflow: hidden;
  
}
</style>