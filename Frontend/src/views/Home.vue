<template>
  <div>
    <h1>Home</h1>
    <ul>
      <li v-for="audio in audios" :key="audio.id">
        {{ audio.filename }}
        <button @click="deleteAudio(audio.id)">Delete</button>
      </li>
    </ul>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  name: 'HomeView',
  data() {
    return {
      audios: [],
      errorMessage: '',
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
        this.errorMessage = 'Error fetching audios: ' + error.response.data.message;
        console.error('Error fetching audios:', error);
      }
    },
    async deleteAudio(id) {
      try {
        await apiClient.delete(`/audio/${id}`);
        this.fetchAudios();
      } catch (error) {
        this.errorMessage = 'Error deleting audio: ' + error.response.data.message;
        console.error('Error deleting audio:', error);
      }
    },
  },
};
</script>
