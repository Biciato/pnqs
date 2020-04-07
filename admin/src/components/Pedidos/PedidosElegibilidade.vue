<template>
	<section class="section">

		<nav class="level">
			<div class="level-left">
				<div class="level-item">
					<h2 class="title">Pedidos de Elegibilidade</h2>
				</div>
			</div>
		</nav>
		<hr>
		<div class="columns is-desktop">
			<div class="column">
				<b-field label="Filtrar por ano:">
					<b-select placeholder="Selecione um ano" v-model="filters.year">
						<option v-for="year in years" :value="year" :key="year">
							{{ year }}
						</option>
					</b-select>
				</b-field>
			</div>
			<div class="column">
				<b-field label="Filtrar por Razão Social:">
					<b-input v-model="filters.razao_social"></b-input>
				</b-field>
			</div>
			<div class="column">
				<b-field label="Filtrar por CNPJ:">
					<b-input v-model="filters.cnpj" v-mask="'##.###.###/####-##'"></b-input>
				</b-field>
			</div>
			<div class="column">
				<b-field label="Filtrar por categoria:">
					<b-select v-model="filters.category" expanded>
						<option v-for="cat in cats" :value="cat.id" :key="cat.id">
							{{ cat.name }}
						</option>
					</b-select>
				</b-field>
			</div>
			<div class="column">
				<div class="level-right">
					<b-field label="Filtrar por status:">
						<b-select placeholder="Selecione um status" v-model="filters.status">
							<option v-for="status in statuses" :value="status.id" :key="status.id">
								{{ status.name }}
							</option>
						</b-select>
					</b-field>
				</div>
			</div>
		</div>
		<hr>
		<div class="columns">
			<div class="column">
				<b-table :data="tableData.length <= 0 ? [] : tableData" :striped="isStriped" :loading="isLoading" paginated :per-page="25" :default-sort-direction="'desc'">
					<template slot-scope="props">
						<b-table-column :field="'id'" :label="'ID'" sortable numeric>
							{{props.row.id}}
						</b-table-column>
						<b-table-column :field="'name'" :label="'Razão Social'">
							{{props.row.name}}
						</b-table-column>
						<b-table-column :field="'candidate'" :label="'Candidata'">
							{{props.row.candidate}}
						</b-table-column>
						<b-table-column :field="'category.name'" :label="'Categoria'">
							{{props.row.category.name}}
						</b-table-column>
						<b-table-column :field="'date'" :label="'Data'">
							{{props.row.created_at | date}}
						</b-table-column>
						<b-table-column :field="'status'" :label="'Status'">
							<span class="tag" :class="{'is-warning': props.row.status == 'ANL', 'is-danger': props.row.status == 'REP', 'is-warning': props.row.status == 'DEV', 'is-success': props.row.status == 'APR'}">
								<template v-if="props.row.status == 'ANL'">Em Análise</template>
								<template v-else-if="props.row.status == 'APR'">Aprovado</template>
								<template v-else-if="props.row.status == 'REP'">Reprovado</template>
								<template v-else-if="props.row.status == 'DEV'">Devolvido</template>
							</span>
						</b-table-column>
						<b-table-column :field="'details'" :label="'#'">
							<button class="button is-small" @click="$router.push(`/dados-formulario/${props.row.id}`)">
								VER
							</button>
							<button class="button is-small is-info" style="margin-top: 0.5em" @click="$router.push(`/editar-formulario/${props.row.id}`)">
								EDITAR
							</button>
						</b-table-column>
					</template>
					<template slot="empty">
						<section class="section">
							<div class="content has-text-grey has-text-centered">
								<p>
									<b-icon	icon="emoticon-sad"	size="is-large"></b-icon>
								</p>
								<p>
									<span class="is-size-6">Nenhum pedido encontrado.</span><br><br>
								</p>
							</div>
						</section>
					</template>
					<template slot="footer">
						<div class="has-text-right is-size-6 has-text-grey">
							{{tableData.length}} pedidos encontrados
						</div>
					</template>
				</b-table>
			</div>

		</div>
	</section>
</template>


<script>
import subscriptionApi from '../../api/subscription'
import moment from 'moment'
import {mask} from 'vue-the-mask'

export default {
	name: "PedidosElegibilidade",
	directives: {mask},
	data() {
		const tableData = []
		return {
			tableData,
			isLoading: false,
			isStriped: true,
			years: [],
			filters: {
				year: moment().year(),
				cnpj: '',
				razao_social: '',
				category: '',
				status: ''
			},
			cats: [
				[ 1, 'IGS' ],
				[ 2, 'PEOS' ],
				[ 3, 'AMEGSA' ],
				[ 4, 'SQFSA' ],
				[ 0, '' ]
			].map(item => ({ id: item[0], name: item[1] })),
			statuses: [
				['ANL', 'Em análise'],
				['APR', 'Aprovado' ],
				['REP', 'Reprovado' ],
				['DEV', 'Em Revisão' ],
				['', '']
			].map(item => ({ id: item[0], name: item[1] }))
		}
	},
	created(){
		this.years = Array(moment().year() - 2018 + 2).fill(2017).map((x, y) => y === 0 ? '' : x + y).reverse()
		this.filters.year = this.years[0]
		this.load()
	},
	watch: {
		filters: {
			handler(){
				this.load()
			},
			deep: true
		}
	},
	methods: {
		load(){
			this.isLoading = true
			subscriptionApi.get_all(this.filters).then((result) => {
				this.tableData = result.data.result
				this.isLoading = false
			})
		}
	}
}
</script>
