<template>
	<AppRouter />
	<GuestMenu v-model:visible="showGuestMenu" />
	<UserMenu v-model:visible="showUserMenu" />
	<ScrollTop />
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import AppRouter from './AppRouter.vue'
import ScrollTop from './components/ScrollTop.vue'
import GuestMenu from './components/GuestMenu.vue'
import UserMenu from './components/UserMenu.vue'
import { showGuestMenu } from './stores/ui'
import { showUserMenu } from './stores/ui'

function handleKey(e){
	if(e.key === 'm') showGuestMenu.value = !showGuestMenu.value
}

onMounted(()=>{
	window.addEventListener('keydown', handleKey)
	// expose global ref for console debugging
	try{ window.__showGuestMenuRef = showGuestMenu }catch(e){}
})

onBeforeUnmount(()=> window.removeEventListener('keydown', handleKey))

// watch kept for future use (no logging)
// keep silent watches for menu refs
watch(showGuestMenu, ()=>{})
watch(showUserMenu, ()=>{})
</script>



