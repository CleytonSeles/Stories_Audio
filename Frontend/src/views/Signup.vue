<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">Signup</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  name: 'SignupView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async signup() {
      try {
        await apiClient.post('/auth/signup', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = 'Error signing up: ' + error.response.data.message;
        console.error('Error signing up:', error);
      }
    },
  },
};
</script>
