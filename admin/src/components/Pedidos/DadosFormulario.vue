<template>
	<section class="section">
		<template v-if="!isLoading">
			<div class="box">
				<h2 class="title">#{{subscription.id}} - {{subscription.name}}</h2>
				<span class="tag" :class="{'is-warning': subscription.status == 'ANL', 'is-danger': subscription.status == 'REP', 'is-success': subscription.status == 'APR'}">
					<template v-if="subscription.status == 'ANL'">Em Análise</template>
					<template v-else-if="subscription.status == 'APR'">Aprovado</template>
					<template v-else-if="subscription.status == 'REP'">Reprovado</template>
					<template v-else-if="subscription.status == 'DEV'">Devolvido</template>
				</span>
				<hr>
				<div class="columns">
					<div class="column" v-if="subscription.category">
						<strong class="has-text-grey">Categoria:</strong>
						<p>{{subscription.category.name}}</p>
					</div>
					<div class="column" v-if="subscription.subcategory">
						<strong class="has-text-grey">Sub Categoria:</strong>
						<p>{{subscription.subcategory.name}}</p>
					</div>
				</div>
				<div class="columns" v-if="subscription.companysize">
					<div class="column">
						<strong class="has-text-grey">Categoria por porte ou tipo especial sugerida:</strong>
						<p>{{subscription.companysize.name}}</p>
					</div>
				</div>
				<div class="columns" v-if="subscription.subscription_subcategory_id >= 4">
					<div class="column">
						<strong class="has-text-grey">Razão Social do fornecedor indicado:</strong>
						<p>{{subscription.indicate_company_name}}</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<strong class="has-text-grey">Tipo da organização candidata:</strong>
						<p>{{subscription.organization_type}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Unidade autônoma de outra organização?</strong>
						<p v-if="subscription.is_autonomous">Sim</p>
						<p v-else>Não</p>
					</div>
					<div class="column" v-if="subscription.company_size">
						<strong class="has-text-grey">Categoria por porte ou tipo especial sugerida:</strong>
						<p>{{subscription.company_size.name}}</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<strong class="has-text-grey">Razão Social:</strong>
						<p v-if="subscription.organization_name">{{subscription.organization_name}}</p>
						<p v-if="subscription.name">{{subscription.name}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Candidata (Responsável):</strong>
						<p>{{subscription.candidate}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Forma de Direito:</strong>
						<p v-if="subscription.is_public">Público</p>
						<p v-else>Privado</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<strong class="has-text-grey">CNPJ:</strong>
						<p>{{subscription.document_id}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Home-page:</strong>
						<p>{{subscription.homepage}}</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<strong class="has-text-grey">Principais Atividades:</strong>
						<p>{{subscription.economic_activities}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Data de início das atividades:</strong>
						<p>{{subscription.economic_activity_start | date}}</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<strong class="has-text-grey">Qtde. de pessoas na força de trabalho:</strong>
						<p>{{subscription.persons_qt}}</p>
					</div>
					<div class="column">
						<strong class="has-text-grey">Perc. da força de trabalho:</strong>
						<p>{{subscription.persons_perc}}</p>
					</div>
				</div>
				<br>
				<h6 class="is-size-4">Locais das instalações com força de trabalho</h6>
				<hr>
				<template v-for="place in subscription.places">
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Nome:</strong>
							<p>{{place.name}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Endereço:</strong>
							<p>{{place.street}}, {{place.number}} - {{place.complement}}; {{place.city}} - {{place.state}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Qtde. de pessoas:</strong>
							<p>{{place.persons_qtd}}</p>
						</div>
					</div>
				</template>
				<br>

				<h3 class="title is-5">Contatos</h3>
				<div class="columns">
					<div class="column">
						<b-table :data="subscription.contacts.length <= 0 ? [] : subscription.contacts" :striped="true" :loading="isLoading">
							<template slot-scope="props">
								<b-table-column :field="'type'" :label="'Categoria'">
									<span v-if="props.row.type == 'DIR'">Principal dirigente</span>
									<span v-else-if="props.row.type == 'RES'">Responsável Candidatura</span>
									<span v-else-if="props.row.type == 'APR'">Apresentador do Case  no Seminário de benchmarking</span>
									<span v-else-if="props.row.type == 'REP'">Representante no Seminário de benchmarking</span>
									<span v-else>Fornecedor indicado</span>
								</b-table-column>
								<b-table-column :field="'name'" :label="'Nome'">
									{{props.row.name}}
								</b-table-column>
								<b-table-column :field="'phone'" :label="'Telefone'">
									{{props.row.phone}}
								</b-table-column>
								<b-table-column :field="'email'" :label="'E-mail'">
									{{props.row.email}}
								</b-table-column>
							</template>
							<template slot="empty">
								<div class="content has-text-grey has-text-centered">
									<p>
										<span class="is-size-6">Nenhum contato cadastrado.</span><br><br>
									</p>
								</div>
							</template>
						</b-table>
						<br><br>
					</div>
				</div>

				<br>
				<template v-if="subscription.category.id == 1">
					<h5 class="is-size-5">Aplicável IGS</h5>
					<hr>
					<div class="columns" v-if="subscription.group">
						<div class="column">
							<strong class="has-text-grey">Grupo:</strong>
							<p>{{subscription.group.name}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Subgrupo:</strong>
							<template v-if="subscription.subgroup">
								<p>{{subscription.subgroup.name}}</p>
							</template>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Denominação da prática:</strong>
							<p>{{subscription.practice_name}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Data de início daimplantação:</strong>
							<p>{{subscription.implantation_start_dt | date}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Resumo da prática:</strong>
							<p>{{subscription.practice_resume}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Área, setor, divisão, departamento, grupo, equipe ou assemelhado, responsável pela prárica:</strong>
							<p>{{subscription.practice_area}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Questões dos Critérios AMEGSA Nível IV com os quais a prática tem mais relação:</strong>
							<p>{{subscription.criteria_questions}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Resultados alcançados:</strong>
							<p>{{subscription.results}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Partes interessadas mais beneficiadas pela prática:</strong>
							<p>{{subscription.stakeholders}}</p>
						</div>
					</div>
				</template>
				<template v-if="subscription.category.id == 2">
					<h5 class="is-size-5">Aplicável PEOS</h5>
					<hr>
					<div class="columns" v-if="subscription.group">
						<div class="column">
							<strong class="has-text-grey">Grupo:</strong>
							<p>{{subscription.group.name}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Denominação do Programa de aumento da Eficiência:</strong>
							<p>{{subscription.practice_name}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Data da implantação:</strong>
							<p>{{subscription.implantation_start_dt | date}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<strong class="has-text-grey">Resumo do Programa:</strong>
							<p>{{subscription.practice_resume}}</p>
						</div>
						<div class="column">
							<strong class="has-text-grey">Resultados alcançados:</strong>
							<p>{{subscription.results}}</p>
						</div>
					</div>
				</template>
				<template v-if="subscription.category.id == 3">
					<h3 class="title is-5">Cadastro das Práticas / Programas</h3>
					<hr>
					<b-table :data="this.subscription.practices.length <= 0 ? [] : this.subscription.practices" :striped="true" :loading="isLoading" detailed detail-key="id" :show-detail-icon="true">
						<template slot-scope="props">
							<b-table-column :field="'name'" :label="'Denominação da Prática'">
								{{props.row.name}}
							</b-table-column>
							<b-table-column :field="'name'" :label="'Categoria da Prática'">
								{{props.row.practice_category}}
							</b-table-column>
						</template>
						<template slot="detail" slot-scope="props">
							<article class="media">
								<div class="media-content">
									<div class="content">
										<template v-if="props.row.practice_category == 'IGS'">
											<h1 class="title is-6">Aplicável para categoria IGS</h1>
											<div class="block">
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="3">
													Água
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="4">
													Esgoto e Efluentes Industriais
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="5">
													Manejo de Águas Pluviais
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="6">
													Resíduos Sólidos
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="7">
													Clientes
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="8">
													Apoio
												</b-radio>
												<b-radio :disabled="true" v-model="props.row.subgroup_id" native-value="9">
													Sócioambiental
												</b-radio>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Denominação da Prática</strong></p>
													<p>{{props.row.name}}</p>
												</div>
												<div class="column">
													<p><strong>Data de início da implantação</strong></p>
													<p>{{props.row.implantation_start_dt | date}}</p>
												</div>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Resumo da Prática</strong></p>
													<p>{{props.row.resume}}</p>
												</div>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Área, setor, divisão, departamento, grupo, equipe ou assemelhado, responsável pela Prática:</strong></p>
													<p>{{props.row.area}}</p>
												</div>
												<div class="column">
													<p><strong>Questões dos Critérios categoria AMEGSA Nível IV com os quais a prática tem mais relação: (Ex.: 2.d, 3.1b e 8.2a)</strong></p>
													<p>{{props.row.criteria_questions}}</p>
												</div>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Partes interessadas mais beneficiadas pela Prática</strong></p>
													<p>{{props.row.stakeholders}}</p>
												</div>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Resultados Alcançados</strong></p>
													<p>{{props.row.results}}</p>
												</div>
											</div>
										</template>
										<template v-if="props.row.practice_category == 'PEOS'">
											<h1 class="title is-6">Aplicável para categoria PEOS</h1>
											<div class="columns">
												<div class="column">
													<p><strong>Denominação do Programa de aumento da Eficiência</strong></p>
													<p>{{props.row.name}}</p>
												</div>
												<div class="column">
													<p><strong>Data de implantação</strong></p>
													<p>{{props.row.implantation_start_dt}}</p>
												</div>
											</div>
											<div class="columns">
												<div class="column">
													<p><strong>Resumo do Programa</strong></p>
													<p>{{props.row.resume}}</p>
												</div>
											</div>

											<div class="columns">
												<div class="column">
													<p><strong>Resultados Alcaçados</strong></p>
													<p>{{props.row.results}}</p>
												</div>
											</div>
										</template>
									</div>
								</div>
							</article>
						</template>
						<template slot="empty">
							<section class="section">
								<div class="content has-text-grey has-text-centered">
									<p>
										<span class="is-size-6">Nenhuma prática cadastrada.</span><br><br>
									</p>
								</div>
							</section>
						</template>
					</b-table><br>
					<div class="columns">
						<div class="column">
							<p>
								<strong>Declaração de autonomia da organização candidata:</strong>
								<br>
								Declaramos ter funções e estruturas administrativas próprias e autônomas,
								no sentido de sermos responsáveis pelo planejamento das ações para atingir nossos objetivos,
								cumprir nossa missão e atender nossos clientes. Possuímos clientes como pessoas físicas ou outras pessoas jurídicas,
								consumidoras, usuárias ou compradoras regulares de nossos serviços/produtos no mercado que não são de nossa própria organização.
							</p>
							<span v-if="subscription.has_autonomy"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								Concordamos que, no caso de candidatura ao Nível B ou I, essa elegibilidade, mesmo que aprovada, poderá ser suspensa se uma organização controladora,
								que abranja a organização aqui candidata, vier a pleitear elegibilidade em nível acima do aqui postulado.
							</p>
							<span v-if="subscription.agree_suspend"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								Concordamos com a participação de empregados de empresas do setor como acompanhantes da banca de examinadores.
							</p>
							<span v-if="subscription.agree_examiners"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>
						</div>
					</div>
				</template>
				<template v-if="subscription.category.id == 4">
					<h5 class="is-size-5">Aplicável SQFSA</h5>
					<hr>
					<div class="columns" v-if="subscription.group">
						<div class="column">
							<strong class="has-text-grey">Atuação na Região:</strong>
							<p>{{subscription.group.name}}</p>
						</div>
					</div>
					<div class="columns" v-if="subscription.subgroup">
						<div class="column">
							<strong class="has-text-grey">Atuação no segmento:</strong>
							<p>{{subscription.subgroup.name}}</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								<strong>Declaração de concordância com o Regulamento, autonomia e ausência de restrição da organização candidata:</strong>
								<br>
								Estamos cientes de que ao participar do SQFSA e submeter a candidatura de nossa organização concordamos com os
								termos e condições do Regulamento do ciclo, em todas as suas etapas.
							</p>
							<span v-if="subscription.agree_sqfsa"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								Declaramos ter funções e estruturas administrativas próprias e autônomas, no sentido de sermos responsáveis pelo
								planejamento das ações para atingir nossos objetivos, cumprir nossa missão e atender nossos clientes. Possuímos clientes
								como pessoas físicas ou outras pessoas jurídicas, consumidoras, usuárias ou compradoras regulares de nossos
								serviços/produtos no mercado que não são de nossa própria organização.
							</p>
							<span v-if="subscription.has_autonomy"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>

						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								Declaramos neste ano e no ano anterior, não temos restrição de atuação transitada em julgado de qualquer natureza junto
								aos órgãos de defesa do consumidor e/ou perante as instituições ou agências públicas federais, estaduais e municipais em
								qualquer um dos três poderes.
							</p>
							<span v-if="subscription.has_restriction"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>

						</div>
					</div>
					<div class="columns">
						<div class="column">
							<p>
								Concordamos com a participação de empregados de empresas do setor como acompanhantes da banca de examinadores
								(aplicável as organizações candidatas ao Nível B 125 pontos, também denominado “Primeiros Passos para a Excelência”
								e Nível I 250 pontos, também denominado de “Compromisso com a Excelência”).
							</p>
							<span v-if="subscription.agree_examiners"><strong>Concordou</strong></span>
							<span v-else><strong>Não concordou</strong></span>
						</div>
					</div>
				</template>
				<div class="columns is-centered" v-if="subscription.status == 'ANL'">
					<div class="column">
						<button class="button is-success" @click="approve()">Aprovar</button>
						<button class="button is-warning" @click="isReviewModalActive = true">Devolver</button>
						<button class="button is-danger" @click="isRepproveModalActive = true"> Reprovar </button>
						<button class="button is-info" @click="remove()"> Cancelar </button>
						<button class="button" @click="$router.push('/pedidos-elegibilidade')">Voltar</button>
					</div>
				</div>
				<div class="columns" v-if="subscription.status == 'REP'">
					<div class="column">
						<strong>Motivo da reprovação:</strong>
						<p>{{subscription.status_reason}}</p>
					</div>
				</div>
			</div>
			<b-modal :active.sync="isRepproveModalActive" has-modal-card>
				<form action="">
					<div class="modal-card">
						<header class="modal-card-head">
							<h4 class="modal-card-title">Motivo</h4>
						</header>
						<section class="modal-card-body">
							<b-field label="Informe o Motivo">
								<b-input maxlength="200" type="textarea" v-model="repproveReason"></b-input>
							</b-field>
							<hr>
						</section>
						<footer class="modal-card-foot">
							<button class="button is-success" type="button" @click="repprove()">Salvar</button>
							<button class="button" type="button" @click="isRepproveModalActive = false">Cancelar</button>
						</footer>
					</div>
				</form>
			</b-modal>

			<b-modal :active.sync="isReviewModalActive" has-modal-card>
				<form action="">
					<div class="modal-card">
						<header class="modal-card-head">
							<h4 class="modal-card-title">Motivo da devolução</h4>
						</header>
						<section class="modal-card-body">
							<b-field label="Digite o motivo da reprovação">
								<b-input maxlength="200" type="textarea" v-model="repproveReason"></b-input>
							</b-field>
							<hr>
						</section>
						<footer class="modal-card-foot">
							<button class="button is-success" type="button" :disabled="isLoading" :class="{'is-loading': isLoading}" @click="review()">Salvar</button>
							<button class="button" type="button" @click="isReviewModalActive = false">Cancelar</button>
						</footer>
					</div>
				</form>
			</b-modal>
		</template>
		<b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
	</section>
</template>

<script>

import subscriptionApi from '../../api/subscription'

export default {
	data() {
		return {
			isLoading: false,
			subscription: {},
			isRepproveModalActive: false,
			isReviewModalActive: false,
			repproveReason: ""
		}
	},
	created(){
		this.getData()
	},
	methods: {
		getData(){
			this.isLoading = true
			subscriptionApi.get(this.$route.params.id).then((res) => {
				this.subscription = res.data.result;

				this.subscription.has_autonomy = (this.subscription.has_autonomy == 1)
				this.subscription.agree_examiners = (this.subscription.agree_examiners == 1)
				this.subscription.agree_sqfsa = (this.subscription.agree_sqfsa == 1)
				this.subscription.has_restriction = (this.subscription.has_restriction == 1)

				this.isLoading = false
			})
		},
		approve(){
			if (confirm("Tem certeza que deseja aprovar essa subscrição?")) {
				const subs = {id: this.subscription.id, 'status': 'APR'}
				subscriptionApi.update(subs).then((result) => {
					this.$toast.open({
						message: 'Subscrição aprovada com sucesso!',
						type: 'is-success'
					})
					this.getData()
				});
			}
		},
		remove() {
			if (confirm("Tem certeza que deseja cancelar essa subscrição?")) {
				subscriptionApi.remove(this.subscription.id).then((result) => {
					this.$toast.open({
						message: 'Subscrição cancelada com sucesso!',
						type: 'is-success'
					})
					this.$router.push('/pedidos-elegibilidade')
				});
			}
		},
		repprove(){
			const subs = {id: this.subscription.id, 'status': 'REP', 'status_reason': this.repproveReason}
			subscriptionApi.update(subs).then((result) => {
				this.$toast.open({
					message: 'Subscrição reprovada com sucesso!',
					type: 'is-success'
				})
				this.isRepproveModalActive = false
				this.getData()
			});
		},
		review(){
			this.isLoading = true
			const subs = {id: this.subscription.id, 'status': 'DEV', 'status_reason': this.repproveReason}
			subscriptionApi.update(subs).then((result) => {
				this.$toast.open({
					message: 'Subscrição enviada para correção com sucesso!',
					type: 'is-success'
				})
				this.isLoading = false
				this.getData()
				this.isReviewModalActive = false
			});
		}
	}
}

</script>
