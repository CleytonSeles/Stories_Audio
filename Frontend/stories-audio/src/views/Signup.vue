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
      </form>
    </div>
  </template>

  <script>
  import apiClient from '../services/api';

  export default {
    name: 'Signup',
    data() {
      return {
        username: '',
        password: '',
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
          console.error('Error signing up:', error);
        }
      },
    },
  };
  </script>
