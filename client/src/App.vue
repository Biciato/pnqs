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
.b-checkbox.checkbox input[type=checkbox]:checked+.check, .b-checkbox.checkbox:hover input[type=checkbox]+.check {
    border-color: #00d1b2 !important;
}
.b-checkbox.checkbox input[type=checkbox]:checked + .check {
    background: #00d1b2 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:white' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E") no-repeat center center !important;
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