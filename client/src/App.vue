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
<style>
.button.is-primary {
  background-color: #00d1b2 !important;
}
.button.is-primary:hover {
    background-color: #00c4a7 !important;
}
.icon {
  font-size: 24px !important;
}
.b-radio.radio input[type=radio]:checked+.check, .b-radio.radio:hover input[type=radio]+.check {
    border-color: #00d1b2 !important;
}
.b-radio.radio input[type=radio]+.check:before {
    background: #00d1b2 !important;
}
</style>
<script>
import AppHeader from './components/Header/Header.vue'


export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>