<template>
  <div class="signin">
      <div class="box">
          <p class="title">ログイン</p>
          <form>
              <input type="email" placeholder="メールアドレス" v-model="email" />
              <input type="password" placeholder="パスワード" v-model="password" />
              <button @click="signIn">ログイン</button>

              <p class="login">会員登録は<a class="router" @click="$router.push('/signup')">こちら</a></p>
          </form>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signIn() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
                if(data.user.emailVerified) {
                    this.$store.dispatch("changeUserData", {
                        user: data.user
                    });
                    this.$router.replace("/");
                }
            });
        }
    }
}
</script>

<style scoped>
.box {
    margin: 100px auto;
    background: #2a3644;
    border-radius: 5px;
    padding: 20px;
    width: 300px;
}
.title {
    font-size: 24px;
    color: #f4f4f4;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.7);
    font-weight: bold;
    text-align: center;
}
form {
    text-align: center;
}
input {
    background: rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
    margin-top: 20px;
    padding: 8px;
    font-size: 15px;
    width: 80%;
    border-radius: 10px;
    border: 1px solid #000;
    color: #fff;
}
button {
  position: relative;
  display: block;
  margin: 25px auto 15px;
  padding: 17px;
  width: 244px;
  font-size: 1.2em;
  background: #f26964;
  color: #f4f4f4;
  box-shadow: 0px 3px 0px #ab4b47;
  cursor: pointer;
}
button:active {
    top: 3px;
    box-shadow: none;
}
.login {
    color: #fff;
}
.router {
    color: #87cefa;
    text-decoration: underline;
    cursor: pointer;
}
</style>