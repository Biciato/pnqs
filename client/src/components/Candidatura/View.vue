<template>
	<section class="section">
		<div class="box">
			<h2 class="title is-3">FICHA DE ELEGIBILIDADE</h2>
			<hr>
			<div class="columns" v-if="subscription.status != 'ANL' || subscription.status != 'DEV'">
				<div class="column">
					<strong class="has-text-grey">Parecer da Elegibilidade</strong>
					<p><template v-if="subscription.status == 'APR'">Aprovado</template><template v-else-if="subscription.status == 'REP'">Reprovado</template><template v-else-if="subscription.status == 'DEV'">Devolvido</template></p>
				</div>
				<div class="column" v-if="subscription.status == 'REP' || subscription.status == 'DEV'">
					<strong class="has-text-grey">Motivo</strong>
					<p>{{subscription.status_reason}}</p>
				</div>
			</div>
			<h2 class="title is-5">Selecione a categoria</h2>
			<div class="block">
				<b-radio :disabled="canEdit" v-model="subscription.subscription_category_id" native-value="1">
					<span class="is-size-7">Inovação em Gestão no Saneamento – IGS</span>
				</b-radio>
				<b-radio  :disabled="canEdit" v-model="subscription.subscription_category_id" native-value="2">
					<span class="is-size-7">Eficiência Operacional no Saneamento – PEOS</span>
				</b-radio>
				<b-radio  :disabled="canEdit" v-model="subscription.subscription_category_id" native-value="3">
					<span class="is-size-7">As Melhores de Gestão no Saneamento – AMEGSA</span>
				</b-radio>
				<b-radio  :disabled="canEdit" v-model="subscription.subscription_category_id" native-value="4">
					<span class="is-size-7">Selo de Qualidade do Fornecedor da Prestação de Serviços e Insumos de Saneamento Ambiental – SQFSA</span>
				</b-radio>
			</div>
			<div class="block" v-if="subscription.subscription_category_id == 3">
				<b-radio  :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="1">
					<span class="is-size-7">Nivel B</span>
				</b-radio>
				<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="2">
					<span class="is-size-7">Nivel I</span>
				</b-radio>
				<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="3">
					<span class="is-size-7">Nivel II</span>
				</b-radio>
				<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="4">
					<span class="is-size-7">Nivel III</span>
				</b-radio>
				<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="5">
					<span class="is-size-7">Nivel IV</span>
				</b-radio>
				<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="6">
					<span class="is-size-7">Nivel IV Plus</span>
				</b-radio>

				<p class="control is-size-7 has-text-grey">Nota: Candidatas Nível III e IV/IV Plus devem candidatar, respectivamente e no mínimo, um e dois trabalhos, na categoria IGS</p>
			</div>
			<template v-if="subscription.subscription_category_id == 4">
				<div class="block" >
					<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="7">
						<span class="is-size-7">Nivel B - 125 Pontos “Iniciação para a Excelência” - Autoavaliação Virtual</span>
					</b-radio>
					<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="8">
						<span class="is-size-7">Nível B - 125 pontos - “Primeiros Passos para a Excelência”</span>
					</b-radio>
					<b-radio :disabled="canEdit" v-model="subscription.subscription_subcategory_id" native-value="9">
						<span class="is-size-7">Nível I – 250 pontos - “Compromisso com a Excelência</span>
					</b-radio><br><br>
					<p class="control is-size-7 has-text-grey">Nota: Nível B 125 pontos, também denominado “Primeiros Passos para a Excelência” e Nível I 250 pontos, também denominado de “Compromisso com a Excelência” seguem a sistemática da Categoria AMEGSA descrita a partir da página 16 do Regulamento PNQS.</p>
				</div>
				<div class="">
					<hr>
					<p>
						O <strong>SQFSA</strong> é destinado a organizações sediadas em território nacional, que prestam serviços ou fornecem insumos para
						organizações que detém a concessão (concessionárias) ou delegação (departamentos ou autarquias municipais e afins) de
						serviço de saneamento ambiental.<br><br>
						São elegíveis os seguintes tipos de organização:<br><br>
						1) Microempreendedor Individual;<br>
						2) Micro e pequena empresa;<br>
						3) Empresa;<br>
						4) ONG – Organização Não Governamental (sem fins lucrativos).<br>
					</p>
					<hr>
				</div>
			</template>
			<template v-if="subscription.subscription_category_id">
				<div class="columns" v-if="subscription.subscription_category_id == 4">
					<div class="column">
						<b-field label="Categoria por porte ou tipo especial sugerida">
							<b-select :disabled="canEdit" v-model="subscription.subscription_company_size_id">
								<option value="1">Microempreendedor individual</option>
								<option value="2">Micro e pequena empresa, com até 50 colaboradores;</option>
								<option value="3">Micro e pequena empresa, com 51 até 500 colaboradores;</option>
								<option value="4">Empresas ou Unidades Autônomas, com até 50 colaboradores;</option>
								<option value="5">Empresas ou Unidades Autônomas, com 51 até 500 colaboradores;</option>
								<option value="6">Empresas ou Unidades Autônomas, com mais de 500 a 2500 colaboradores;</option>
								<option value="7">Empresas ou Unidades Autônomas, com mais de 2501 a 10.000 colaboradores;</option>
								<option value="8">Empresas ou Unidades Autônomas, com mais de 10.000 colaboradores;</option>
								<option value="9">Terceiro Setor (organizações sem Fins Lucrativos) ou suas Unidades Autônomas, independentemente do porte.</option>
							</b-select>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<!--<b-field label="Nome da organização candidata">
							<b-input v-model="subscription.organization_name"></b-input>
						</b-field>-->
						<b-field label="Tipo de Organização">
							<b-select :disabled="canEdit" v-model="subscription.organization_type">
								<option value="Operador Completo">Operador Completo</option>
								<option value="Unidade Autônoma">Unidade Autônoma</option>
								<option value="Unidade de Apoio">Unidade de Apoio</option>
							</b-select>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Unidade autônoma de outra organização?"></b-field>
						<p class="control">
							<b-radio :disabled="canEdit" v-model="subscription.is_autonomous" native-value="1">Sim</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.is_autonomous" native-value="0">Não</b-radio>
						</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="Razão Social">
							<b-input :disabled="canEdit" v-model="subscription.name"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Candidata (Responsável)">
							<b-input :disabled="canEdit" v-model="subscription.candidate"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Forma de Direito"></b-field>
						<p class="control">
							<b-radio :disabled="canEdit" v-model="subscription.is_public" native-value="1">
								Público
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.is_public" native-value="0">
								Privado
							</b-radio>
						</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="CNPJ">
							<b-input :disabled="canEdit" v-model="subscription.document_id" v-cleave="masks.cnpj"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Endereço Home-page (se existir):">
							<b-input :disabled="canEdit" v-model="subscription.homepage"></b-input>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="Principais atividades">
							<b-input :disabled="canEdit" type="textarea"  v-model="subscription.economic_activities"></b-input>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="Quant. de pessoas na força de trabalho">
							<b-input type="number" :disabled="canEdit" v-model="subscription.persons_qt"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Data de início das atividades">
							<b-datepicker :disabled="canEdit" v-model="subscription.economic_activity_start" :date-parser="(date) => formatDate(date)" :date-formatter="(date) => formatDateToInput(date)" placeholder="Selecione a data" icon="calendar-today">
							</b-datepicker>
						</b-field>
					</div>
				</div>
				<br>
				<h1 class="title is-5">Locais das instalações com força de trabalho</h1>
				<h2 class="subtitle is-6"> (No caso da categoria IGS e PEOS, informar onde a prática ou programa é aplicado)</h2>
				<div class="columns">
					<div class="column">
						<button :disabled="canEdit" class="button is-info" @click="isPlacesModalActive = true">Cadastrar Local</button>
					</div>
				</div>
				<hr>
				<b-table :data="tablePlaces.length <= 0 ? [] : tablePlaces" :striped="true" :loading="isLoading">
					<template slot-scope="props">
						<b-table-column :field="'name'" :label="'Nome'">
							{{props.row.name}}
						</b-table-column>
						<b-table-column :field="'address'" :label="'Endereço'">
							{{props.row.street}}, {{props.row.number}} - {{props.row.complement}}; {{props.row.city}} - {{props.row.state}}
						</b-table-column>
						<b-table-column :field="'persons_qtd'" :label="'Qtd. Pessoas'">
							{{props.row.persons_qtd}}
						</b-table-column>
					</template>
					<template slot="empty">
						<section class="section">
							<div class="content has-text-grey has-text-centered">
								<p>
									<span class="is-size-6">Inclua os locais com força de trabalho.</span><br><br>
								</p>
							</div>
						</section>
					</template>
				</b-table>
				<br><br>
				<b-modal :active.sync="isPlacesModalActive" has-modal-card>
					<form action="">
						<div class="modal-card" style="width: 460px;">
							<header class="modal-card-head">
								<p class="modal-card-title">Incluir local com força de trabalho</p>
							</header>
							<section class="modal-card-body">
								<div class="columns">
									<div class="column is-half">
										<b-field label="CEP" >
											<b-input type="text" name="zipcode" v-cleave="masks.cep"  v-model="place.zipcode" autocomplete="post-code" :disabled="isLoading"></b-input>
										</b-field>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field label="Nome">
											<b-input type="text"  v-model="place.name"></b-input>
										</b-field>
									</div>
									<div class="column">
										<b-field label="Qtd. Pessoas">
											<b-input type="number"  v-model="place.persons_qtd"></b-input>
										</b-field>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field label="Logradouro">
											<b-input type="text" name="street"  v-model="place.street" :disabled="isLoading" autocomplete="address-line1"></b-input>
										</b-field>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field label="Número">
											<b-input type="text" name="number"  v-model="place.number" :disabled="isLoading"></b-input>
										</b-field>
									</div>
									<div class="column">
										<b-field label="Complemento">
											<b-input type="text" :disabled="isLoading"></b-input>
										</b-field>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field label="Cidade">
											<b-input type="text" name="street"  v-model="place.city" :disabled="isLoading"></b-input>
										</b-field>
									</div>
									<div class="column">
										<b-field label="Bairro">
											<b-input type="text" name="neighborhood"  v-model="place.neighborhood" :disabled="isLoading"></b-input>
										</b-field>
									</div>
									<div class="column">
										<b-field label="Estado">
											<b-input type="text" name="state"  v-model="place.state" :disabled="isLoading"></b-input>
										</b-field>
									</div>
								</div>
							</section>
							<footer class="modal-card-foot">
								<button class="button" type="button" @click="isPlacesModalActive = false">Cancelar</button>
								<button class="button is-primary" type="button" @click="savePlace()">Incluir</button>
							</footer>
						</div>
					</form>
				</b-modal>

				<h3 class="title is-5">Contatos</h3>
				<hr>
				<h1 class="title is-6">Principal dirigente</h1>
				<div class="columns">
					<div class="column">
						<b-field label="Nome">
							<b-input :disabled="canEdit" v-model="dirigente.name"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Telefone">
							<b-input :disabled="canEdit" v-model="dirigente.phone"  v-cleave="masks.phone"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="E-mail">
							<b-input type="email" :disabled="canEdit" v-model="dirigente.email"></b-input>
						</b-field>
					</div>
				</div>
				<br />
				<h1 class="title is-6">Responsável candidatura</h1>
				<div class="columns">
					<div class="column">
						<b-field label="Nome">
							<b-input :disabled="canEdit" v-model="responsavel.name"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Telefone">
							<b-input :disabled="canEdit" v-model="responsavel.phone" v-cleave="masks.phone"></b-input>
						</b-field>
					</div>
					<div class="column">
						<b-field label="E-mail">
							<b-input type="email" :disabled="canEdit" v-model="responsavel.email"></b-input>
						</b-field>
					</div>
				</div>
				<br />
				<template v-if="subscription.subscription_category_id == 4">
					<h1 class="title is-6">Aplicável para categoria AMEGSA</h1>
					<div class="columns">
						<div class="column">
							<h5 class="title is-6">Atuação na Região</h5>
							<div class="block">
								<b-radio :disabled="canEdit" v-model="subscription.group_id" native-value="3">
									Norte
								</b-radio>
								<b-radio :disabled="canEdit" v-model="subscription.group_id" native-value="4">
									Nordeste
								</b-radio>
								<b-radio :disabled="canEdit" v-model="subscription.group_id" native-value="5">
									Centro-oeste
								</b-radio>
								<b-radio :disabled="canEdit" v-model="subscription.group_id" native-value="6">
									Sul
								</b-radio>
								<b-radio :disabled="canEdit" v-model="subscription.group_id" native-value="7">
									Sudeste
								</b-radio>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<h5 class="title is-6">Atuação no segmento</h5>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="1">
								Água
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="2">
								Esgoto e Efluentes Industriais
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="3">
								Manejo de Águas Pluviais
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="4">
								Resíduos Sólidos
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="8">
								Insumos
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="9">
								Serviços Operacionais e comerciais
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="10">
								Administrativos / Instalações
							</b-radio>
							<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="11">
								Outros Serviços
							</b-radio>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-checkbox :disabled="canEdit" v-model="subscription.agree_sqfsa" native-value="1" true-value="1" false-value="0">
								<strong>Declaração de concordância com o Regulamento, autonomia e ausência de restrição da organização candidata:</strong>
								<br>
								Estamos cientes de que ao participar do SQFSA e submeter a candidatura de nossa organização concordamos com os
								termos e condições do Regulamento do ciclo, em todas as suas etapas.
							</b-checkbox>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-checkbox :disabled="canEdit" v-model="subscription.has_autonomy" native-value="1" true-value="1" false-value="0">
								Declaramos ter funções e estruturas administrativas próprias e autônomas, no sentido de sermos responsáveis pelo
								planejamento das ações para atingir nossos objetivos, cumprir nossa missão e atender nossos clientes. Possuímos clientes
								como pessoas físicas ou outras pessoas jurídicas, consumidoras, usuárias ou compradoras regulares de nossos
								serviços/produtos no mercado que não são de nossa própria organização.
							</b-checkbox>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-checkbox :disabled="canEdit" v-model="subscription.has_restriction" native-value="0" true-value="0" false-value="1">
								Declaramos neste ano e no ano anterior, não temos restrição de atuação transitada em julgado de qualquer natureza junto
								aos órgãos de defesa do consumidor e/ou perante as instituições ou agências públicas federais, estaduais e municipais em
								qualquer um dos três poderes.
							</b-checkbox>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-checkbox :disabled="canEdit" v-model="subscription.agree_examiners" native-value="1" true-value="1" false-value="0">
								Concordamos com a participação de empregados de empresas do setor como acompanhantes da banca de examinadores
								(aplicável as organizações candidatas ao Nível B 125 pontos, também denominado “Primeiros Passos para a Excelência”
								e Nível I 250 pontos, também denominado de “Compromisso com a Excelência”).
							</b-checkbox>
						</div>
					</div>
				</template>
				<template v-if="subscription.subscription_category_id == 3">
					<h1 class="title is-6">Representante no Seminário de benchmarking</h1>
					<div class="columns">
						<div class="column">
							<b-field label="Nome">
								<b-input :disabled="canEdit" v-model="representante.name"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Telefone">
								<b-input :disabled="canEdit" v-model="representante.phone" v-cleave="masks.phone"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="E-mail">
								<b-input type="email" :disabled="canEdit" v-model="responsavel.email"></b-input>
							</b-field>
						</div>
					</div>
					<br />
					<h1 class="title is-6">Aplicável para categoria AMEGSA</h1>
					<div class="columns">
						<div class="column">
							<b-checkbox :disabled="canEdit" v-model="subscription.has_autonomy" native-value="1">
								<strong>Declaração de autonomia da organização candidata:</strong>
								<br>
								Declaramos ter funções e estruturas administrativas próprias e autônomas,
								no sentido de sermos responsáveis pelo planejamento das ações para atingir nossos objetivos,
								cumprir nossa missão e atender nossos clientes. Possuímos clientes como pessoas físicas ou outras pessoas jurídicas,
								consumidoras, usuárias ou compradoras regulares de nossos serviços/produtos no mercado que não são de nossa própria organização.
							</b-checkbox>
						</div>
					</div>
					<!--<div class="column">
						<b-checkbox :disabled="canEdit" v-model="subscription.agree_suspend" native-value="1">
							Concordamos que, no caso de candidatura ao Nível B ou I, essa elegibilidade, mesmo que aprovada, poderá ser suspensa se uma organização controladora,
							que abranja a organização aqui candidata, vier a pleitear elegibilidade em nível acima do aqui postulado.
						</b-checkbox>
					</div>-->
					<div class="column">
						<b-checkbox :disabled="canEdit" v-model="subscription.agree_examiners" native-value="1">
							Concordamos com a participação de empregados de empresas do setor como acompanhantes da banca de examinadores.
						</b-checkbox>
					</div>
				</template>
				<template v-if="subscription.subscription_category_id == 1 || subscription.subscription_category_id == 2">
					<h1 class="title is-6">Apresentador do Case  no Seminário de benchmarking</h1>
					<div class="columns">
						<div class="column">
							<b-field label="Nome">
								<b-input :disabled="canEdit" v-model="apresentador.name"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Telefone">
								<b-input :disabled="canEdit" v-model="apresentador.phone" v-cleave="masks.phone"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="E-mail">
								<b-input type="email" :disabled="canEdit" v-model="apresentador.email"></b-input>
							</b-field>
						</div>
					</div>
				</template>
				<template v-if="subscription.subscription_category_id == 1">
					<h1 class="title is-6">Aplicável para categoria IGS</h1>
					<div class="block">
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="3">
							Água
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="4">
							Esgoto e Efluentes Industriais
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="5">
							Manejo de Águas Pluviais
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="6">
							Resíduos Sólidos
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="7">
							Clientes
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="8">
							Apoio
						</b-radio>
						<b-radio :disabled="canEdit" v-model="subscription.subgroup_id" native-value="9">
							Sócioambiental
						</b-radio>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Denominação da Prática">
								<b-input :disabled="canEdit" v-model="subscription.practice_name"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Data de início da implantação">
								<b-datepicker :disabled="canEdit" v-model="subscription.implantation_start_dt" placeholder="Selecione a data:" icon="calendar-today">
								</b-datepicker>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Resumo da Prática">
								<b-input  v-model="subscription.practice_resume" type="textarea"></b-input>
							</b-field>
							<p class="has-text-danger is-size-7">
								Lembrete: Não são elegíveis Trabalhos relativos a melhorias, ideias ou inovações em produtos, processos ou práticas operacionais,
								como por exemplo: softwares aplicativos, equipamentos, instrumentos, ferramentas, obras e outras soluções técnicas.
							</p>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Área, setor, divisão, departamento, grupo, equipe ou assemelhado, responsável pela Prática:">
								<b-input :disabled="canEdit" v-model="subscription.practice_area"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Questões dos Critérios categoria AMEGSA Nível IV com os quais a prática tem mais relação: (Ex.: 2.d, 3.1b e 8.2a)">
								<b-input :disabled="canEdit" v-model="subscription.criteria_questions"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Partes interessadas mais beneficiadas pela Prática">
								<b-input :disabled="canEdit" v-model="name"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Resultados Alcançados">
								<b-input :disabled="canEdit" v-model="subscription.results" type="textarea"></b-input>
							</b-field>
							<p class="has-text-danger is-size-7">
								Um ou mais tipos de resultados quantitativos relevantes, com demonstração do “antes” e “depois” da prática.
								Podem ser apresentados aqui resultados estimados ou preliminares cuja demonstração, na futura inscrição do Trabalho, será aprimorada.
								Não são considerados elegíveis Trabalhos sem informação de resultados decorrentes do programa.
							</p>
						</div>
					</div>
				</template>
				<template v-if="subscription.subscription_category_id == 2">
					<h1 class="title is-6">Aplicável para categoria PEOS</h1>
					<div class="columns">
						<div class="column">
							<b-field label="Denominação do Programa de aumento da Eficiência">
								<b-input :disabled="canEdit" v-model="subscription.practice_name"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Data de implantação">
								<b-datepicker :disabled="canEdit" v-model="subscription.implantation_start_dt" placeholder="Selecione a data" icon="calendar-today">
								</b-datepicker>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Resumo do Programa">
								<b-input :disabled="canEdit" v-model="subscription.practice_resume" type="textarea"></b-input>
							</b-field>
						</div>
						<div class="column">
							<br>
							<p class="has-text-danger is-size-7">
								Lembrete: Não são elegíveis Trabalhos relativos a softwares aplicativos, equipamentos, instrumentos, ferramentas, obras e outras soluções técnicas.
							</p>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<b-field label="Resultados Alcançados">
								<b-input :disabled="canEdit" v-model="subscription.results" type="textarea"></b-input>
							</b-field>
						</div>
						<div class="column">
							<br>
							<p class="has-text-danger is-size-7">
								Um ou mais tipos de resultados quantitativos relevantes, com demonstração do “antes” e “depois” do Programa.
								Podem ser apresentados aqui resultados estimados ou preliminares cuja demonstração, na futura inscrição do Trabalho, será aprimorada.
								Não são considerados elegíveis Trabalhos sem informação de resultados decorrentes do programa.
							</p>
						</div>
					</div>
				</template>
				<button class="button is-primary" @click="save()" v-if="!canEdit">Enviar Candidatura</button>
			</template>
		</div>

	</section>
</template>
<script>

import moment from 'moment'
import SubscriptionService from '../../services/subscription.service'
import axios from 'axios'

export default {
	data() {
		const tablePlaces = []
		return {
			isLoading: false,
			checkbox: null,
			radio: null,
			name: "",
			subscription: {
				places: [],
				contacts: []
			},
			tablePlaces,
			isPlacesModalActive: false,
			zipcode: "",
			place: {
				zipcode: "",
				street: "",
				state: "",
				neighborhood: "",
				city: "",
				country: ""
			},
			dirigente: {
				type: "DIR"
			},
			apresentador: {
				type: "APR"
			},
			responsavel: {
				type: "RES"
			},
			representante: {
				type: "REP"
			},
			masks: {
				cnpj: {
					delimiters: ['.', '.', '/', '-'],
					blocks: [2,3,3,4,2],
					numericOnly: true
				},
				phone: {
					delimiters: [' ', '-'],
					blocks: [2,5,4],
					numericOnly: true
				},
				cep: {
					delimiters: ['-'],
					blocks: [5,3],
					numericOnly: true
				}
			},
		}
	},
	watch: {
		"place.zipcode"(newValue){
			var cep = newValue.split("-").join("")
			if (cep.length >= 8) {
				axios.get(`https://viacep.com.br/ws/${cep}/json/`, {ignoreheaders: true}).then((res) => {
					let address = res.data
					this.place.neighborhood = address.bairro
					this.place.city = address.localidade
					this.place.street = address.logradouro
					this.place.state = address.uf
					this.place.country = "Brazil"
					this.isLoading = false
				})
			}
		}
	},
	computed: {
		canEdit(){
			return (this.subscription.status != 'DEV')
			//return true
		}
	},
	created(){
		this.getData()
	},
	methods: {
		getData(){
            SubscriptionService.show(this.$route.params.id).then((res) => {
				this.subscription = {
					...res.result,
					economic_activity_start: new Date(res.result["economic_activity_start"]),
					implantation_start_dt: new Date(res.result["implantation_start_dt"])
				}
				delete this.subscription["user"]
				delete this.subscription["companysize"]
				delete this.subscription["subcategory"]
				delete this.subscription["category"]
				delete this.subscription["group"]
				delete this.subscription["subgroup"]
				this.getContacts()
				this.getPlaces()
				this.subscription.agree_examiners = this.$R.toString(this.$R.or(res.result.agree_examiners, []))
			})
		},
		getContacts(){
			for (var i = 0; i < this.subscription.contacts.length; i++) {
				if(this.subscription.contacts[i].type == "DIR")
					this.dirigente = this.subscription.contacts[i]
				if(this.subscription.contacts[i].type == "APR")
					this.apresentador = this.subscription.contacts[i]
				if(this.subscription.contacts[i].type == "RES")
					this.responsavel = this.subscription.contacts[i]
				if(this.subscription.contacts[i].type == "REP")
					this.representante = this.subscription.contacts[i]
			}
		},
		getPlaces(){
			this.tablePlaces = this.subscription.places
		},
		save(){
			this.$validator.validateAll().then((isValid) => {
				if (isValid) {
					this.isLoading = true
					if (this.subscription.status == 'DEV') {
						this.subscription.status = "ANL"
					}
					SubscriptionService.update(this.subscription).then(() => {
						this.isLoading = false
						this.$toast.open({
							message: 'Pedido atualizado com sucesso!',
							type: 'is-success'
						})
						this.$router.push("/candidaturas")
					}).catch((error) => {
						this.isLoading = false
						alert(error.data.message)
						this.getData()
					})
				}
			})
		},
		addPractice(practice){
			this.subscription.practices.push(practice)
		},
		removePractice(practice){
			var indexOf = this.subscription.practices.indexOf(practice)
			if (indexOf >= 0) {
				this.subscription.practices.splice(indexOf, 1)
			}
		},
		formatDateToInput(date){
			return moment(Date.parse(date)).format('DD/MM/YYYY')
		},
		formatDate(date){
			return moment(Date.parse(date)).format('YYYY-MM-DD')
		}
	}
}

</script>
