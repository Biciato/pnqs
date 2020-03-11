<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="container">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
  </div>
</template>

<script>
import AppHeader from './components/Header/Header.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>