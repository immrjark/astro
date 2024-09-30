<template>
  <div v-if="isLoading">
    Loading....
  </div>
  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>
  <button v-else @click="likePost">
    <span>{{ likeCount }}</span>
    Like 
  </button>
  {{ likeClicks }}
</template>

+
<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti'
import debounce from 'lodash.debounce' // solo tienes que envolver con el debounde la función que queires que actue así y listo -> debounde()

  interface Props {
    postId: string;
  }

  const props = defineProps<Props>() // esto es propio de Vue
  // console.log(props.postId); 
  
  
  // oara calcular la cantidad de likes actuales
  const likeCount = ref(0);
  const likeClicks = ref(0);
  const isLoading = ref(true);

  watch(likeCount, () => {
    // console.log('New like');
    fetch(`/api/posts/likes/${props.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: likeClicks.value})
    })
  })

  const likePost = () => {
    // console.log('+1 like' , props.postId)
    // likeCount.value = likeCount.value + 1
    likeCount.value  ++ // es como lo de arriba
    confetti({
      particleCount: 100,
      spread: 70,
      origin:{
        x: Math.random(),
        y: Math.random() -0.2,
      }
    })
    likeClicks.value ++
  }

  const getCurrentLikes = async () => {
    const resp = await fetch(`/api/posts/likes/${props.postId}`)
    // console.log(resp);
    
    if( !resp.ok ) return

    const data = await resp.json()
    console.log(data);
    likeCount.value = data.likes
    isLoading.value = false
    
  }

  getCurrentLikes()

</script>
<style scoped>
  button {
    background-color: #eab308;
    color: black/80;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s;
    font-size: medium;
    font-weight: 700;
  }
  button:hover {
    background-color: #c1950f;
    
  }
</style>