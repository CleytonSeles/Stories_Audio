  <template>
    <div>
      <h1>Upload</h1>
      <form @submit.prevent="uploadAudio">
        <div>
          <label for="audio">Audio:</label>
          <input type="file" @change="handleFileUpload" id="audio" required>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  </template>

  <script>
  import apiClient from '../services/api';

  export default {
    name: 'Upload',
    data() {
      return {
        file: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async uploadAudio() {
        if (!this.file) return;

        const formData = new FormData();
        formData.append('file', this.file);

        try {
          await apiClient.post('/audio/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      },
    },
  };
  </script>
