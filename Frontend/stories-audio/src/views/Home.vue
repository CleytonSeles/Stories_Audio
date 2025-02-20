  <template>
    <div>
      <h1>Home</h1>
      <ul>
        <li v-for="audio in audios" :key="audio.id">
          {{ audio.filename }}
          <button @click="deleteAudio(audio.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>

  <script>
  import apiClient from '../services/api';

  export default {
    name: 'Home',
    data() {
      return {
        audios: [],
      };
    },
    created() {
      this.fetchAudios();
    },
    methods: {
      async fetchAudios() {
        try {
          const response = await apiClient.get('/audio/list');
          this.audios = response.data;
        } catch (error) {
          console.error('Error fetching audios:', error);
        }
      },
      async deleteAudio(id) {
        try {
          await apiClient.delete(`/audio/${id}`);
          this.fetchAudios();
        } catch (error) {
          console.error('Error deleting audio:', error);
        }
      },
    },
  };
  </script>
