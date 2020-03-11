<template>
	<div class="not-found">
		<div class="content-card text-center">
			<img src="https://d1die9xfrk270c.cloudfront.net/images/fred.png" alt="">
			<h1>Página não encontrada</h1>
			<p>Infelizmente não encontramos a página que você estava procurando.
				Verifique se a url está correta ou tente voltar para a <router-link :to="'/'">página inicial</router-link>.
			</p>
			<button type="button" class="button" @click="$router.push('/')">Página Inicial</button>
		</div>
	</div>
</template>

<script>

export default {
	name: "NotFound",
	created(){
	}
}
</script>
