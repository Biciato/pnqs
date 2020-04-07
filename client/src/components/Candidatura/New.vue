<template>
	<section class="section">
        <ValidationObserver ref="form">
            <form @submit.prevent="validate">
                <div class="box">
                    <div class="columns">
                        <div class="column">
                            <h2 class="title is-3">FICHA DE ELEGIBILIDADE</h2>
                            <a class="button is-primary" @click="showSublist = true">Carregar Dados</a>
                            <h5 class="title is-5" style="margin-top: 0.5em">Selecione a categoria</h5>
                            <div class="block">
                                <b-radio v-model="subscription.subscription_category_id" native-value="1">
                                    <span class="is-size-7">Inovação em Gestão no Saneamento – IGS</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_category_id" native-value="2">
                                    <span class="is-size-7">Eficiência Operacional no Saneamento – PEOS</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_category_id" native-value="3">
                                    <span class="is-size-7">As Melhores de Gestão no Saneamento Ambiental – AMEGSA</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_category_id" native-value="4">
                                    <span class="is-size-7">Selo de Qualidade do Fornecedor da Prestação de Serviços e Insumos de Saneamento Ambiental – SQFSA</span>
                                </b-radio>
                            </div>
                            <h5 class="title is-5" v-if="['1','2'].includes(subscription.subscription_category_id)">Tema</h5>
                            <div class="block" v-if="subscription.subscription_category_id === '1'">
                                <b-radio v-model="subscription.tema_igs" native-value="Transformação Digital">
                                    <span class="is-size-7">Transformação Digital</span>
                                </b-radio>
                                <b-radio v-model="subscription.tema_igs" native-value="Gestão Avançada">
                                    <span class="is-size-7">Gestão Avançada</span>
                                </b-radio>
                            </div>
                            <div class="block" v-if="subscription.subscription_category_id === '2'">
                                <b-radio v-model="subscription.tema_peos" native-value="Gestão de Perdas">
                                    <span class="is-size-7">Gestão de Perdas</span>
                                </b-radio>
                                <b-radio v-model="subscription.tema_peos" native-value="Gestão de Eficiência Energética">
                                    <span class="is-size-7">Gestão de Eficiência Energética</span>
                                </b-radio>
                            </div>
                            <div class="block" v-if="subscription.subscription_category_id == 3">
                                <b-radio v-model="subscription.subscription_subcategory_id" native-value="1">
                                    <span class="is-size-7">Nivel B</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_subcategory_id" native-value="2">
                                    <span class="is-size-7">Nivel I</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_subcategory_id" native-value="3">
                                    <span class="is-size-7">Nivel II</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_subcategory_id" native-value="5">
                                    <span class="is-size-7">Nivel III (Troféus: Platina ou Diamante)</span>
                                </b-radio>
                                <b-radio v-model="subscription.subscription_subcategory_id" native-value="6">
                                    <span class="is-size-7">Nivel III+ (Troféus: Rubi, Duplo Rubi ou Turmalina Paraíba) </span>
                                </b-radio>
                                <p class="control is-size-7 has-text-grey">
                                    Para categoria AMEGSA consulte o Regulamento para ver restrições ao Nível B, Nível mínimo possível cf. 
                                    reconhecimento anterior, Nível mínimo possível para Unidades Autônomas, porte mínimo obrigatório para Unidades 
                                    Autônomas e de Apoio ao Nível III e III+, candidaturas concomitantes obrigatórias IGS e PEOS se escolher Níveis II, III ou III+, 
                                    limites de candidaturas por controladora ou grupo empresarial.   
                                </p>
                                <p v-if="subscription.subscription_subcategory_id == 3" class="help is-danger">No Nível II a candidata AMEGSA deve apresentar candidatura concomitante de, no mínimo, um Case na categoria IGS ou PEOS.</p>
                                <p v-if="subscription.subscription_subcategory_id == 4" class="help is-danger">No Nível III a candidata AMEGSA deve apresentar candidatura concomitante de, no mínimo, um Case na categoria IGS ou PEOS e indicar ao menos um fornecedor para se candidatar ao SQFSA, cujo nome será informado nesta Ficha de Elegibilidade.</p>
                                <p v-if="subscription.subscription_subcategory_id >= 5" class="help is-danger">Nos Níveisl IV e IV Plus a candidata deve apresentar candidatura concomitante de, no mínimo, dois Cases na categoria IGS ou PEOS e indicar ao menos um fornecedor para se candidatar ao SQFSA, cujo nome será informado nesta Ficha de Elegibilidade.</p>
                            </div>
                            <template v-if="subscription.subscription_category_id == 4">
                                <div class="block" >
                                    <b-radio v-model="subscription.subscription_subcategory_id" native-value="8">
                                        <span class="is-size-7">Nível B - 125 pontos - “Primeiros Passos para a Excelência”</span>
                                    </b-radio>
                                    <b-radio v-model="subscription.subscription_subcategory_id" native-value="9">
                                        <span class="is-size-7">Nível I – 250 pontos - “Compromisso com a Excelência</span>
                                    </b-radio>
                                    <b-radio v-model="subscription.subscription_subcategory_id" native-value="10">
                                        <span class="is-size-7">Nível II – "Rumo à Excelência"</span>
                                    </b-radio>
                                     <b-radio v-model="subscription.subscription_subcategory_id" native-value="7">
                                        <span class="is-size-7">Nível III - "Excelência"</span>
                                    </b-radio><br><br>
                                    <p class="control is-size-7 has-text-grey">
                                        Nota: O <strong>SQFSA</strong> é destinado a organizações com CNPJ próprio sediadas em território nacional, que 
                                        prestam serviços ou  fornecem insumos para organizações que detém a concessão (concessionárias) ou delegação 
                                        (departamentos ou autarquias municipais e afins) de serviços de saneamento ambiental.
                                    </p>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <h5 class="title is-6">Atuação na Região</h5>
                                        <div class="block">
                                            <b-checkbox v-model="group_ids" native-value="Norte">
                                                Norte
                                            </b-checkbox>
                                            <b-checkbox v-model="group_ids" native-value="Nordeste">
                                                Nordeste
                                            </b-checkbox>
                                            <b-checkbox v-model="group_ids" native-value="Centro-oeste">
                                                Centro-oeste
                                            </b-checkbox>
                                            <b-checkbox v-model="group_ids" native-value="Sul">
                                                Sul
                                            </b-checkbox>
                                            <b-checkbox v-model="group_ids" native-value="Sudeste">
                                                Sudeste
                                            </b-checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <h5 class="title is-6">Atuação no segmento</h5>
                                        <b-checkbox v-model="subgroup_ids" native-value="Água">
                                            Água
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Esgoto e Efluentes Industriais">
                                            Esgoto e Efluentes Industriais
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Manejo de Águas Pluviais">
                                            Manejo de Águas Pluviais
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Resíduos Sólidos">
                                            Resíduos Sólidos
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Insumos">
                                            Insumos
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Serviços Operacionais e comerciais">
                                            Serviços Operacionais e comerciais
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Administrativos / Instalações">
                                            Administrativos / Instalações
                                        </b-checkbox>
                                        <b-checkbox v-model="subgroup_ids" native-value="Outros Serviços">
                                            Outros Serviços
                                        </b-checkbox>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <template v-if="subscription.subscription_category_id">
                        <div class="columns" v-if="['3','4'].includes(subscription.subscription_category_id)">
                            <div class="column">
                                <b-field label="Categoria por porte ou tipo especial sugerida">
                                    <b-select v-model="subscription.subscription_company_size_id">
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
                            <div class="column is-half" v-if="subscription.subscription_subcategory_id >= 4">
                                <b-field label="Razão Social do fornecedor indicado">
                                    <ValidationProvider name="indicate_company_name" rules="required" v-slot="{ errors }">
                                        <b-input name="indicate_company_name" v-model="subscription.indicate_company_name"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>

                        <common-data :subscription="subscription" :canEdit="false"></common-data>


                        <template v-if="subscription.subscription_category_id == 1">
                            <h1 class="title is-6">Aplicável para categoria IGS</h1>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Denominação da Prática">
                                        <b-input v-model="subscription.practice_name"></b-input>
                                    </b-field>

                                </div>
                                <div class="column">
                                    <b-field label="Data de início da implantação">
                                        <b-datepicker v-model="subscription.implantation_start_dt" placeholder="Selecione a data:" icon="calendar-today">
                                        </b-datepicker>
                                    </b-field>
                                    <p class="help is-danger">Serão válidas as práticas implementadas a partir de 2017.</p>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Resumo da Prática">
                                        <ValidationProvider name="resume" rules="required" v-slot="{ errors }">
                                            <b-input v-model="subscription.practice_resume" name="resume" type="textarea"></b-input>
                                            <span style="color: red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </b-field>
                                    <p class="has-text-danger is-size-7">
                                        Não são elegíveis Trabalhos relativos a melhorias, ideias ou inovações em produtos, processos ou práticas operacionais,
                                        como por exemplo: softwares aplicativos, equipamentos, instrumentos, ferramentas, obras e outras soluções técnicas.
                                    </p>
                                    <p class="has-text-danger is-size-7">
                                        <strong style="color: red">Ver outras condições de elegibilidade no Guia regulamento vigente.</strong>
                                    </p>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Área, setor, divisão, departamento, grupo, equipe ou assemelhado, responsável pela Prática:">
                                        <b-input v-model="subscription.practice_area"></b-input>
                                    </b-field>
                                </div>
                                <div class="column">
                                    <b-field label="Questões dos Critérios categoria AMEGSA Nível III com os quais a prática tem mais relação: (Ex.: 2.2a, 3.1d e 8.2a)">
                                        <b-input v-model="subscription.criteria_questions"></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Partes interessadas mais beneficiadas pela Prática">
                                        <b-input v-model="name"></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Resultados Alcançados">
                                        <ValidationProvider name="results" rules="required" v-slot="{ errors }">
                                            <b-input v-model="subscription.results" name="results" type="textarea"></b-input>
                                            <span style="color: red">{{ errors[0] }}</span>
                                        </ValidationProvider>
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
                                        <ValidationProvider name="practice_name" rules="required" v-slot="{ errors }">
                                            <b-input v-model="subscription.practice_name" name="practice_name"></b-input>
                                            <span style="color: red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </b-field>
                                </div>
                                <div class="column">
                                    <b-field label="Data de implantação">
                                        <b-datepicker v-model="subscription.implantation_start_dt" placeholder="Selecione a data" icon="calendar-today">
                                        </b-datepicker>
                                    </b-field>
                                    <p class="help is-danger">Será válido o programa implementado a partir de 2017.</p>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Resumo do Programa">
                                        <ValidationProvider name="resume" rules="required" v-slot="{ errors }">
                                            <b-input v-model="subscription.practice_resume" type="textarea" name="resume"></b-input>
                                            <span style="color: red">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </b-field>
                                    <p class="is-size-7">
                                        <strong style="color: red">Ver outras condições de elegibilidade no Guia regulamento vigente.</strong>
                                    </p>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column">
                                    <b-field label="Resultados Alcançados">
                                        <b-input v-model="subscription.results" type="textarea"></b-input>
                                    </b-field>
                                    <p class="has-text-danger is-size-7">
                                        Um ou mais tipos de resultados quantitativos relevantes, com demonstração do “antes” e “depois” do Programa.
                                        Podem ser apresentados aqui resultados estimados ou preliminares cuja demonstração, na futura inscrição do Trabalho, será aprimorada.
                                        Não são considerados elegíveis Trabalhos sem informação de resultados decorrentes do programa.
                                    </p>
                                </div>
                            </div>
                        </template>
                        <template v-if="subscription.subscription_category_id == 3">
                            <h3 class="title is-5">Cadastro das Práticas / Programas</h3>
                            <div class="columns">
                                <div class="column">
                                    <a class="button is-info" @click="isPraticasModalActive = true">Cadastrar Prática</a>
                                </div>
                            </div>
                            <hr>
                            <b-table :data="subscription.practices.length <= 0 ? [] : subscription.practices" :striped="true" :loading="isLoading">
                                <template slot-scope="props">
                                    <b-table-column :field="'name'" :label="'Denominação da Prática'">
                                        {{props.row.name}}
                                    </b-table-column>
                                    <b-table-column :field="'name'" :label="'Categoria da Prática'">
                                        {{props.row.practice_category}}
                                    </b-table-column>
                                    <b-table-column :field="''" :label="'#'">
                                        <a class="button is-danger is-small" @click="removePractice(props.row)">X</a>
                                    </b-table-column>
                                </template>
                                <template slot="empty">
                                    <section class="section">
                                        <div class="content has-text-grey has-text-centered">
                                            <p>
                                                <span class="is-size-6">Inclua as práticas.</span><br><br>
                                            </p>
                                        </div>
                                    </section>
                                </template>
                            </b-table>
                        </template>
                        <hr>
                        <template v-if="['3','4'].includes(subscription.subscription_category_id)">
                            <h4 style="display: inline-block; margin-bottom: 1em;">
                                <strong>Declaração de concordância com o Regulamento, autonomia e ausência de restrição da organização candidata:</strong>
                            </h4>
                            <div class="columns">
                                <div class="column">
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <b-checkbox v-model="subscription.agree_sqfsa" native-value="0">
                                            Estamos cientes de que ao participar do PNQS e submeter a candidatura de nossa organização concordamos com os
                                            termos e condições do Regulamento do ciclo, em todas as suas etapas.
                                        </b-checkbox>
                                        <span style="color: red">{{ errors[0] && 'É preciso aceitar essa declaração' }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <b-checkbox v-model="subscription.has_autonomy" native-value="0">
                                            Declaramos ter funções e estruturas administrativas próprias e autônomas, no sentido de sermos responsáveis pelo
                                            planejamento das ações para atingir nossos objetivos, cumprir nossa missão e atender nossos clientes. Possuímos clientes
                                            como pessoas físicas ou outras pessoas jurídicas, consumidoras, usuárias ou compradoras regulares de nossos
                                            serviços/produtos no mercado que não são de nossa própria organização.
                                        </b-checkbox>
                                        <span style="color: red">{{ errors[0] && 'É preciso aceitar essa declaração' }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <b-checkbox v-model="subscription.has_restriction" native-value="0">
                                            Declaramos neste ano e no ano anterior, não temos restrição de atuação transitada em julgado de qualquer natureza junto
                                            aos órgãos de defesa do consumidor e/ou perante as instituições ou agências públicas federais, estaduais e municipais em
                                            qualquer um dos três poderes.
                                        </b-checkbox>
                                        <span style="color: red">{{ errors[0] && 'É preciso aceitar essa declaração' }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <b-checkbox v-model="subscription.agree_examiners" native-value="0">
                                        Concordamos com a participação de voluntários, empregados de empresas do setor de saneamento ambiental,
                                         sem conflitos de interesse, na Banca Examinadora designada para a avaliação.
                                    </b-checkbox>
                                </div>
                            </div>
                        </template>
                        <br><br>
                        <button class="button is-primary" :class="{'is-loading': isLoading}">Enviar Candidatura</button>
                        <a href="/candidaturas" class="button is-info" style="margin-left: 0.5em">Voltar</a>
                    </template>
                </div>
            </form>
        </ValidationObserver>
		<b-modal :active.sync="isPraticasModalActive" has-modal-card>
			<praticas-modal :subscription="subscription" @added-practice="addPractice($event)"></praticas-modal>
		</b-modal>
        <b-modal :active.sync="showSublist" has-modal-card>
            <sublist-modal @send-id="handleIdClicked($event)"></sublist-modal>
        </b-modal>
        <b-message type="is-success" v-if="showAfterRegister">
             “Sua inscrição foi cadastrada sob nº {{ id }} com sucesso e em breve será analisada pelos consultores responsáveis. 
                Para acompanhar o status da sua ficha basta acessar o sistema novamente com seu login a qualquer momento.
                Imprima esta página, ela é o seu comprovante de submissão da ficha de elegibilidade. <br>
                <b>Imprima essa tela, ou salve como PDF ela será o seu comprovante de cadastro.”</b>
        </b-message>
	</section>
</template>
<script>


import CommonData from './New/CommonData.vue'
import PraticasModal from './New/PraticasModal.vue'
import SublistModal from "./New/SublistModal";
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import SubscriptionService from '../../services/subscription.service'
import store from '../../store/index'
import moment from 'moment'

export default {
	components: {
		PraticasModal,
        CommonData,
        SublistModal,
        ValidationProvider,
        ValidationObserver
	},
	data() {
		return {
			subscription_category_id: "",
			isLoading: false,
			name: "",
			subscription: {
				is_public: "0",
				places: [],
				contacts: [],
                practices: []
            },
            errors: [],
            id: null,
            showSublist: false,
            showAfterRegister: false,
            isPraticasModalActive: false,
            group_ids: [],
            subgroup_ids: []
		}
	},
	watch: {
		"subscription_category_id"(newValue){
            const date = new Date
			this.subscription = {
                is_public: "0",
                tema_igs: '',
                tema_peos: '',
				places: [],
				contacts: [],
                practices: [],
                year: date.getFullYear()
			}
            this.subscription.subscription_category_id = newValue
            store.commit('subscription/setSubscription', this.subscription)
        }
	},
	created(){

	},
	methods: {
		validate(){
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return this.$buefy.dialog.alert({
                            title: 'Aviso',
                            message: 'Por favor, preencha todos os campos necesários.',
                            confirmText: 'Ok!'
                        })
                }
                if (this.subscription.places.length < 1) {
                        this.$buefy.dialog.alert({
                            title: 'Aviso',
                            message: 'É obrigatório enviar ao menos um local da instalação com força de trabalho.',
                            confirmText: 'Ok!'
                        })
                }
                if (this.subscription.subscription_category_id === 3) {
                    if (this.subscription.practices.length < 1) {
                            this.$buefy.dialog.alert({
                                title: 'Aviso',
                                message: 'Favor cadastrar pelo menos 1 Prática',
                                confirmText: 'Ok!'
                            })
                    }
                    if (
                        this.subscription.practices.length > 0 &&
                        this.subscription.places.length > 0
                    ) {
                        this.save()
                    }
                } else {
                    if (
                        this.subscription.places.length > 0
                    ) {
                        this.save()
                    }
                }
            })
        },
        save() {
            this.isLoading = true
            this.subscription.subgroup_id = this.subgroup_ids.join()
            this.subscription.group_id = this.group_ids.join()
            SubscriptionService.store(this.subscription).then(resp => {
                this.isLoading = false
                this.$buefy.toast.open({
                    message: 'Pedido enviado com sucesso!',
                    type: 'is-success'
                })
                this.id = resp.id
                this.showAfterRegister = true
            }).catch(() => {
                this.isLoading = false
                this.$buefy.toast.open({
                    message: 'Algo deu errado. Por favor, tente mais tarde ou contate o administrador!',
                    type: 'is-error'
                })
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
        handleIdClicked(id) {
            SubscriptionService.show(id).then(resp => {
                this.subscription = resp
                this.subscription.economic_activity_start = new Date(resp["economic_activity_start"]),
                this.subscription.implantation_start_dt = new Date(resp["implantation_start_dt"])
                delete this.subscription["id"]
                delete this.subscription["user"]
                delete this.subscription["created_at"]
                delete this.subscription["updated_at"]
				delete this.subscription["companysize"]
                delete this.subscription["subcategory"]
				delete this.subscription["category"]
				delete this.subscription["group"]
                delete this.subscription["subgroup"]
                this.getContacts()
				this.getPlaces()
				this.getSubgroupIds(this.subscription.subgroup_id)
				this.getGroupIds(this.subscription.group_id)
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
		getGroupIds(group_ids) {
			if (group_ids) {
				if (group_ids.length > 1) {
					this.group_ids = group_ids.split(',').map(item => item.trim())
				} else {
					this.group_ids = this.group_ids.find(group_id => group_id.id === group_ids).name
				}
			} 
		},
		getSubgroupIds(subgroup_ids) {
			if (subgroup_ids) {
				if (subgroup_ids.length > 1) {
					this.subgroup_ids = subgroup_ids.split(',').map(item => item.trim())
				} else {
					this.subgroup_ids = this.subgroups.find(subgroup => subgroup.id === subgroup_ids).name
				}
			} 
		},
		formatDateToInput(date){
			return moment(Date.parse(date)).format('DD/MM/YYYY')
		},
		formatDate(date){
			return moment(Date.parse(date)).format('YYYY-MM-DD')
		},
        
	}
}

</script>
