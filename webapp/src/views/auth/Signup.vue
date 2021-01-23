<template>
  <div class="signup-view">
    <h2>Signup</h2>
    <hr />
    <div v-if="!loading">
      <form @submit.prevent="signup()">
        <div>
          <label for="username">Username</label><br>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label for="password">Password</label><br>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button :disabled="formInvalid">Signup</button>
          <br>
          <router-link to="/auth/login"
            >Already have an account? Login</router-link
          >
        </div>
      </form>
      <div v-if="error">
        <p>Username doesn't exists</p>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'Signup',
  data: () => ({
    username: '',
    password: '',
    loading: false,
    error: null,
  }),
  methods: {
    ...mapMutations(['setAccessToken']),
    async signup() {
      this.loading = true;
      try {
        const data = await axios
          .post('http://localhost:3000/api/auth/signup', {
            username: this.username,
            password: this.password,
          })
          .then((res) => res.data);
        this.setAccessToken(data.access_token);
        this.loading = false;
        this.$router.push({ path: '/' });
      } catch (err) {
        this.error = err;
        console.log(err)
        this.loading = false;
      }
    },
  },
  computed: {
    formInvalid() {
      return this.password == '' && this.username == ''
    }
  }
};
</script>
