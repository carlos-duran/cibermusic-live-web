<template>
  <div class="p-16 text-center text-xl">
    <h2 class="text-2xl md:text-4xl mb-6">Nombre de PLaylist</h2>
    <br />
    <form @submit="create">
      <input 
        id="nombrePlaylist" 
        type="text"  
        class="my-3" 
        v-model="nombrePlaylist"
        placeholder="Mi Nueva Playlist"
        required>
      <br />
      <button class="w-full p-2 bg-primary text-white rounded focus:outline-none focus:shadow-outline"
      >Agregar</button>
    </form>
    <div class="text-center my-3 text-white underline">
      <nuxt-link to="/">Regresar</nuxt-link>
    </div>
    <nuxt-link to="/" class="underline text-base">Regresar al inicio</nuxt-link>
  </div>
</template>

<script>
import PlaylistForm from '~/components/external/PlaylistForm'

export default {
  middleware: 'playlists',
  data() {
    return {
      nombrePlaylist: ''
    }
  },
  methods: {
    create(){
      this.playlists.createPlaylist('',{
        data:{
          name: this.nombrePlaylist
        }
      })
    }
  }
}
</script>