<template>
    <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="savePratica">
            <div class="modal-card" style="width: 760px;">
                <header class="modal-card-head">
                    <p class="modal-card-title">Incluir Práticas</p>
                </header>
                <section class="modal-card-body">
                    <div class="columns">
                        <div class="column">
                            <b-field label="Categoria por porte ou tipo especial sugerida">
                                <b-select v-model="practice.practice_category">
                                    <option value="IGS">IGS - Transformação Digital ou Gestão Avançada</option>
                                    <option value="PEOS">PEOS - Gestão de Perdas ou Gestão de Eficiência Energética</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                    <template v-if="practice.practice_category == 'IGS'">
                        <h1 class="title is-6">Tema</h1>
                        <div class="block">
                            <b-radio v-model="practice.subgroup_id" native-value="3">
                                Transformação Digital
                            </b-radio>
                            <b-radio v-model="practice.subgroup_id" native-value="4">
                                Gestão Avançada
                            </b-radio>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Denominação da Prática">
                                    <ValidationProvider name="practice_name" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.name" name="practice_name"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Data de início da implantação">
                                    <ValidationProvider name="implantation_start_dt" rules="required" v-slot="{ errors }">
                                        <b-datepicker name="implantation_start_dt" v-model="practice.implantation_start_dt" placeholder="Selecione a data:" icon="calendar-today">
                                        </b-datepicker>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                                <p class="help is-danger">Serão válidas as práticas implementadas a partir de 2017.</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Resumo da Prática">
                                    <ValidationProvider name="resume" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.resume" name="resume" type="textarea"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                                <p class="has-text-danger is-size-7">
                                    Não são elegíveis Trabalhos relativos a melhorias, ideias ou inovações em produtos, processos ou práticas operacionais,
                                    como por exemplo: softwares aplicativos, equipamentos, instrumentos, ferramentas, obras e outras soluções técnicas.
                                </p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Área, setor, divisão, departamento, grupo, equipe ou assemelhado, responsável pela Prática:">
                                    <ValidationProvider name="area" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.area" name="area"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Questões dos Critérios categoria AMEGSA Nível III com os quais a prática tem mais relação: (Ex.: 2.d, 3.1b e 8.2a)">
                                    <ValidationProvider name="criteria_questions" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.criteria_questions" name="criteria_questions"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Partes interessadas mais beneficiadas pela Prática">
                                    <ValidationProvider name="stakeholders" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.stakeholders" name="stakeholders"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Resultados Alcançados">
                                    <ValidationProvider name="results" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.results" name="results" type="textarea"></b-input>
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
                    <template v-if="practice.practice_category == 'PEOS'">
                        <h1 class="title is-6">Tema</h1>
                        <div class="block">
                            <b-radio v-model="practice.subgroup_id" native-value="3">
                                Gestão de Perdas
                            </b-radio>
                            <b-radio v-model="practice.subgroup_id" native-value="4">
                                Gestão de Eficiência Energética
                            </b-radio>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Denominação do Programa de aumento da Eficiência">
                                    <ValidationProvider name="practice_name" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.name" name="practice_name"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Data de implantação">
                                    <ValidationProvider name="implantation_start_dt" rules="required" v-slot="{ errors }">
                                        <b-datepicker name="implantation_start_dt" v-model="practice.implantation_start_dt" placeholder="Selecione a data:" icon="calendar-today">
                                        </b-datepicker>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                                <p class="help is-danger">Serão válidas os Programas implementados a partir de 2017.</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="Resumo do Programa">
                                    <ValidationProvider name="resume" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.resume" name="resume" type="textarea"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                                <p class="has-text-danger is-size-7">
                                    Lembrete: Não são elegíveis Trabalhos relativos a softwares aplicativos, equipamentos, instrumentos, ferramentas, obras e outras soluções técnicas.
                                </p>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <b-field label="Resultados Alcançados">
                                    <ValidationProvider name="results" rules="required" v-slot="{ errors }">
                                        <b-input v-model="practice.results" name="results" type="textarea"></b-input>
                                        <span style="color: red">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </b-field>
                                <p class="has-text-danger is-size-7">
                                    Um ou mais tipos de resultados quantitativos relevantes, com demonstração do “antes” e “depois” do Programa.
                                    Podem ser apresentados aqui resultados estimados ou preliminares cuja demonstração, na futura inscrição do Trabalho, será aprimorada.
                                    Não são considerados elegíveis Trabalhos sem informação de resultados decorrentes do programa.
                                </p>
                            </div>
                        </div>
                    </template>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Cancelar</button>
                    <button class="button is-primary" type="submit" :disabled="invalid">Salvar</button>
                </footer>
            </div>
        </form>
    </ValidationObserver>
</template>

<script>

// import subscriptionApi from '../../../api/subscription'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
	components: {
		ValidationProvider, ValidationObserver
	},
	props: ["subscription"],
	data(){
		return {
			isLoading: false,
			practice: {
				subgroup_id: "3"
			}
		}
	},
	methods: {
		savePratica(){
            this.$emit('added-practice', this.practice)
            this.$parent.close()
		}
	}
}
</script>
