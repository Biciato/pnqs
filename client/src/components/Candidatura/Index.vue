<template>
	<section class="section">
		<nav class="level">
			<div class="level-left">
				<h2 class="title">Minhas Candidaturas</h2>
			</div>
			<div class="level-right">
				<div class="level-item">
					<router-link :to="`/solicitacao-elegibilidade`" class="button is-primary">Nova Candidatura</router-link>
				</div>
			</div>
		</nav>
		<hr>
		<div class="columns">
			<div class="column">
				<b-table :data="tableData.length <= 0 ? [] : tableData" :striped="isStriped" :loading="isLoading">
					<template slot-scope="props">
						<b-table-column :field="'id'" :label="'#'">
							{{props.row.id}}
						</b-table-column>
						<b-table-column :field="'name'" :label="'Razão Social'">
							{{props.row.name}}
						</b-table-column>
						<b-table-column :field="'category'" :label="'Categoria'">
							{{props.row.category.name}}
						</b-table-column>
						<b-table-column :field="'date'" :label="'Data'">
							{{props.row.created_at | date}}
						</b-table-column>
						<b-table-column width="200" :field="'status'" :label="'Status'">
							<span class="tag" :class="{'is-warning': props.row.status == 'ANL', 'is-danger': props.row.status == 'REP', 'is-warning': props.row.status == 'DEV', 'is-success': props.row.status == 'APR'}">
								<template v-if="props.row.status == 'ANL'">Em Análise</template>
								<template v-else-if="props.row.status == 'APR'">Aprovado</template>
								<template v-else-if="props.row.status == 'REP'">Reprovado</template>
								<template v-else-if="props.row.status == 'DEV'">Devolvido</template>
							</span>
						</b-table-column>
						<b-table-column width="200" :field="''" :label="''">
							<button type="button" class="button is-small is-primary" @click="view(props.row.id)">Ver Candidatura</button>
							<button type="button" class="button is-small" :disabled="props.row.status != 'ANL'" @click='confirm(props.row.id)'>Excluir</button>
						</b-table-column>
						</template>
					<template slot="empty">
						<section class="section">
							<div class="content has-text-grey has-text-centered">
								<p>
									<b-icon	icon="emoticon-sad"	size="is-large"></b-icon>
								</p>
								<p>
									<span class="is-size-6">Nenhuma candidatura encontrada.</span><br><br>
								</p>
							</div>
						</section>
					</template>
					<template slot="footer">
						<div class="has-text-right is-size-6 has-text-grey">
							{{tableData.length}} candidaturas encontradas
						</div>
					</template>
				</b-table>
			</div>

		</div>
	</section>
</template>


<script>
import SubscriptionService from '../../services/subscription.service'
import store from '../../store/index'

export default {
	data() {
		const tableData = []
		return {
			tableData,
			isLoading: false,
			isStriped: true
		}
	},
	created(){
		this.load();
	},
	methods: {
		load(){
			this.isLoading = true
			store.dispatch('subscription/index').then(() => {
				this.tableData = store.getters['subscription/index']
				this.isLoading = false 
			})
		},
		confirm(id){
			this.$buefy.dialog.confirm({
				title: 'Aviso',
				message: 'Tem certeza que deseja <b>remover</b> essa candidatura?',
				confirmText: 'Remover',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => this.delete(id)
			})
		},
		delete(id) {
			this.isLoading = true
			SubscriptionService
				.delete(id)
				.then(() => {
					this.$buefy.toast.open({
						message: 'Candidatura Removida com Sucesso!',
						type: 'is-success'
					})
					this.load()
				}).catch(() => {
					this.$buefy.dialog.alert({
						title: 'Erro',
						message: 'Ocorreu um erro no sistema. Favor tentar mais tarde ou contactar o administrador.'
					})
					this.isLoading = false
				})
		},
		view(id){
			this.$router.push(`/visualizar-candidatura/${id}`);
		}
	}
}
</script>
