Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@Hiren-Gamit 
bharathirajatut
/
ionic-vue
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
ionic-vue/data & event binding example/Home.vue
@bharathirajatut
bharathirajatut Create Home.vue
Latest commit 31ed49b on Feb 9, 2021
 History
 1 contributor
Executable File  111 lines (93 sloc)  1.95 KB

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true" class="ion-padding">
        <h1 class="ion-text-center">My Chat App</h1>
        <h6 class="ion-text-center">Registration</h6>
        <!-- <p><ion-button fill="outline"><ion-icon name="logo-facebook"></ion-icon></ion-button>  <ion-button fill="outline"><ion-icon name="logo-google"></ion-icon></ion-button></p>
        <h6 class="ion-text-center">Or</h6> -->
        <ion-list lines="full" class="ion-no-margin">
            <ion-item>
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input v-model="userEmail"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" v-model="userPassword"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Age</ion-label>
                <ion-input  v-model="age"></ion-input>
            </ion-item>
            <section class="full-width ion-margin-top">
                <ion-button expand="full" color="primary"  @click="login">Register</ion-button>
            </section>
        </ion-list>
        <p class="ion-text-center">Alredy have an account? <ion-label :routerLink="'/login'" class="register-link">Login here</ion-label></p>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
IonButton,IonItem,IonInput,IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'RegisterPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonInput,
    IonLabel
  },
  data(){
     return{
      name:"",
      userEmail:'',
      userPassword:'',
      age:'',
    }
  },
  methods:{
    add()
    {
      this.total=parseFloat(this.value1)+parseFloat(this.value2)
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}
#container a {
  text-decoration: none;
}
.register-link {
    cursor: pointer;
    color: blue;
}
</style>