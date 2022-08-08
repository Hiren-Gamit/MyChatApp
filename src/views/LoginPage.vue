<template>
    <ion-content :fullscreen="true" class="ion-padding">
        <h1 class="ion-text-center">My Chat App</h1>
        <h6 class="ion-text-center">Login</h6>
        <!-- <p><ion-button fill="outline"><ion-icon name="logo-facebook"></ion-icon></ion-button>  <ion-button fill="outline"><ion-icon name="logo-google"></ion-icon></ion-button></p>
        <h6 class="ion-text-center">Or</h6> -->
        <ion-list lines="full" class="ion-no-margin">
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input v-model="userEmail"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" v-model="userPassword"></ion-input>
            </ion-item>
            <section class="full-width ion-margin-top">
                <ion-button expand="full" color="primary"  @click="login">Login</ion-button>
            </section>
        </ion-list>
        <p class="ion-text-center">Don't have an account? <ion-label :routerLink="'/register'" class="register-link">Signup here</ion-label></p>
    </ion-content>
</template>

<script>
import {  IonItem, IonButton, IonLabel, IonInput } from '@ionic/vue';
//import { chevronForward } from 'ionicons/icons';
import {defineComponent} from 'vue';
import axios from 'axios'
export default defineComponent ({
    name: 'LoginPage',
    components: {
        IonLabel,
        IonInput,
        IonButton,
        IonItem,
    },
    data(){
        return{
            userEmail: '',
            userPassword: '',
            url: 'http://localhost:5000/api',
            isLogged: false, 
        }
    },
    methods: {
        login(){
            axios({
                method: 'post',
                url: this.url + '/users/login',
                data:{
                    email: this.userEmail,
                    password: this.userPassword
                }
            })
            .then(response =>  {
                if(response.data.statusCode == 200) {
                    localStorage.setItem('userId',response.data.data[0]._id)
                    this.$router.push('/home')
                }
            })
        }
    },
    mounted(){

        const userId = localStorage.getItem('userId')
        if (userId) {
            this.isLogged = true
            this.$router.push('/home')
        }
    }
})
</script>

<style scoped>
.register-link {
    cursor: pointer;
    color: blue;
}
</style>