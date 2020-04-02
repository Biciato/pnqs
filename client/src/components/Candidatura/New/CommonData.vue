<template>
    <div class="common-data">
        <div class="columns">
            <div class="column">
                <b-field label="Tipo de Organização">
                    <b-select :disabled="canEdit" v-model="editedSubscription.organization_type">
                        <option value="Operador Completo">Operador Completo</option>
                        <option value="Unidade Autônoma de outra organização">
                            Unidade Autônoma de outra organização
                        </option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-field label="Razão Social (responsável)">
                    <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                        <b-input :disabled="canEdit" name="name" v-model="editedSubscription.name"></b-input>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Denominação da candidata">
                    <ValidationProvider name="cadidate" rules="required" v-slot="{ errors }">
                        <b-input :disabled="canEdit" name="cadidate" v-model="editedSubscription.candidate"></b-input>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Forma de Direito"></b-field>
                <p class="control">
                    <b-radio :disabled="canEdit" v-model="editedSubscription.is_public" native-value="1">
                        Público
                    </b-radio>
                    <b-radio :disabled="canEdit" v-model="editedSubscription.is_public" native-value="0">
                        Privado
                    </b-radio>
                </p>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-field label="CNPJ">
                    <ValidationProvider name="document" rules="required|cnpj" v-slot="{ errors }">
                        <b-input
                            :disabled="canEdit"
                            name="document"
                            v-model="editedSubscription.document_id"
                            v-cleave="masks.cnpj"
                            maxlength="18"
                        ></b-input>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Endereço Home-page (se existir):">
                    <b-input :disabled="canEdit" v-model="editedSubscription.homepage"></b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Data de início das atividades">
                    <ValidationProvider name="data_atividade" rules="required" v-slot="{ errors }">
                        <b-datepicker
                            :disabled="canEdit"
                            name="data_atividade"
                            v-model="editedSubscription.economic_activity_start"
                            :date-parser="date => formatDate(date)"
                            :date-formatter="date => formatDateToInput(date)"
                            placeholder="Selecione a data"
                            icon="calendar-today"
                        ></b-datepicker>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
                <p class="help is-danger">Com mais de um ano de existência. Anterior a 2019.</p>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-field label="Principais atividades">
                    <ValidationProvider name="atividades" rules="required" v-slot="{ errors }">
                        <b-input
                            :disabled="canEdit"
                            name="atividades"
                            type="textarea"
                            v-model="editedSubscription.economic_activities"
                        ></b-input>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
            </div>
        </div>
        <div class="columns">
            <div class="column is-two-fifths">
                <b-field label="Quantidade de pessoas na força de trabalho">
                    <ValidationProvider name="qtd_pessoas" rules="required" v-slot="{ errors }">
                        <b-input
                            :disabled="canEdit"
                            name="qtd_pessoas"
                            type="number"
                            min="1" step="1"
                            v-model="editedSubscription.persons_qt"
                        ></b-input>
                        <span style="color: red">{{ errors[0] }}</span>
                    </ValidationProvider>
                </b-field>
                <p class="help is-danger">
                    Incluir terceiros que estejam sob coordenação da candidata.
                </p>
            </div>
            <div class="column">
                <b-field label="Percentual da força de trabalho - Apenas para unidades autônomas ou de apoio">
                    <b-input
                        :disabled="canEdit"
                        type="text"
                        v-model="editedSubscription.persons_perc"
                        v-cleave="masks.percent"
                    ></b-input>
                </b-field>
                <p class="help is-danger">
                    No caso de unidade autônoma ou áreas de apoio, informar o percentual da força de trabalho da candidata em relação à
                    organização controladora, incluindo no cálculo os terceiros que estejam sob a coordenação da
                    candidata.
                </p>
            </div>
        </div>
        <br />
        <h1 class="title is-5">Locais das instalações com força de trabalho</h1>
        <h2 class="subtitle is-6">
            (No caso da categoria IGS e PEOS, informar onde a prática ou programa é aplicado)
        </h2>
        <div class="columns" v-if="!canEdit">
            <div class="column">
                <a class="button is-info" @click="isPlacesModalActive = true">Cadastrar Local</a>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-table
                    :data="
                        editedSubscription.places.length <= 0 ? [] : editedSubscription.places
                    "
                    :striped="true"
                    :loading="isLoading"
                >
                    <template slot-scope="props">
                        <b-table-column :field="'name'" :label="'Nome'">{{ props.row.name }}</b-table-column>
                        <b-table-column :field="'address'" :label="'Endereço'">
                            {{ props.row.street }}, {{ props.row.number }} - {{ props.row.complement }};
                            {{ props.row.city }} -
                            {{ props.row.state }}
                        </b-table-column>
                        <b-table-column :field="'persons_qtd'" :label="'Quantidade de Pessoas'">
                            {{ props.row.persons_qtd }}
                        </b-table-column>
                        <b-table-column :field="''" :label="'#'">
                            <button
                                type="button"
                                class="button is-small"
                                :disabled="canEdit"
                                @click="editPlace(props.row)"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                class="button is-danger is-small"
                                :disabled="canEdit"
                                @click="removePlace(props.row)"
                            >
                                X
                            </button>
                        </b-table-column>
                    </template>
                    <template slot="empty">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <span class="is-size-6">Inclua os locais com força de trabalho.</span>
                                <br />
                                <br />
                            </p>
                        </div>
                    </template>
                </b-table>
                <p class="help is-danger">
                    No caso de haver muitas instalações que prestam serviços equivalentes, pode-se agrupá-las em uma
                    linha apenas usando o CEP sem preenchimento. Exemplo: Nome: 150 sedes regionais ou municipais com
                    unidades operacionais no interior; Logradouro: regiões norte, sul, leste, oeste e capital do Estado;
                    Qtd. de pessoas (aprox.): de 20 a 240. A localização da principal sede administrativa deve estar com
                    endereço completo.
                </p>
                <br />
                <br />
            </div>
        </div>

        <h3 class="title is-5">Contatos</h3>
        <div class="columns" v-if="!canEdit">
            <div class="column">
                <a class="button is-info" @click="isContatosModalActive = true">Cadastrar Contato</a>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <b-table
                    :data="
                        editedSubscription.contacts.length <= 0
                            ? []
                            : editedSubscription.contacts
                    "
                    :striped="true"
                    :loading="isLoading"
                >
                    <template slot-scope="props">
                        <b-table-column :field="'type'" :label="'Categoria'">
                            <span v-if="props.row.type == 'DIR'">Principal dirigente</span>
                            <span v-else-if="props.row.type == 'RES'">Responsável Candidatura</span>
                            <span v-else-if="props.row.type == 'APR'">
                                Apresentador do Case no Seminário de benchmarking
                            </span>
                            <span v-else-if="props.row.type == 'REP'">Representante no Seminário de benchmarking</span>
                            <span v-else>Fornecedor indicado</span>
                        </b-table-column>
                        <b-table-column :field="'name'" :label="'Nome'">{{ props.row.name }}</b-table-column>
                        <b-table-column :field="'phone'" :label="'Telefone'">{{ props.row.phone }}</b-table-column>
                        <b-table-column :field="'email'" :label="'E-mail'">{{ props.row.email }}</b-table-column>
                        <b-table-column :field="''" :label="'#'">
                            <button
                                type="button"
                                class="button is-small"
                                :disabled="canEdit"
                                @click="editContact(props.row)"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                class="button is-danger is-small"
                                :disabled="canEdit"
                                @click="removeContact(props.row)"
                            >
                                X
                            </button>
                        </b-table-column>
                    </template>
                    <template slot="empty">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <span class="is-size-6">Nenhum contato cadastrado.</span>
                                <br />
                                <br />
                            </p>
                        </div>
                    </template>
                </b-table>
                <br />
                <br />
            </div>
        </div>

        <b-modal :active.sync="isPlacesModalActive" has-modal-card>
            <place-modal :subscription="subscription" :place="place" @added-place="addPlace($event)"></place-modal>
        </b-modal>
        <b-modal :active.sync="isContatosModalActive" has-modal-card>
            <contato-modal
                :subscription="subscription"
                :contact="contact"
                @added-contact="addContact($event)"
            ></contato-modal>
        </b-modal>
    </div>
</template>

<script>
    import { ValidationProvider } from "vee-validate";
    import moment from "moment";
    import PlaceModal from "./PlaceModal.vue";
    import ContatoModal from "./ContactModal.vue";
    import store from "../../../store/index";

    export default {
        props: ["subscription", "canEdit"],
        components: {
            PlaceModal,
            ContatoModal,
            ValidationProvider,
        },
        data() {
            return {
                isLoading: false,
                isPlacesModalActive: false,
                isContatosModalActive: false,
                editedSubscription: {
                    is_public: "0",
                },
                place: null,
                contact: null,
                masks: {
                    cnpj: {
                        delimiters: [".", ".", "/", "-"],
                        blocks: [2, 3, 3, 4, 2],
                        numericOnly: true,
                    },
                    percent: {
                        numeral: true,
                        prefix: "%",
                        tailPrefix: true,
                    },
                },
                errors: [],
            };
        },
        watch: {
            editedSubscription() {
                store.commit("subscription/setSubscription", this.editedSubscription);
            },
        },
        created() {
            this.editedSubscription = this.subscription;
            if (this.editedSubscription.economic_activity_start && !this.canEdit) {
                this.editedSubscription.economic_activity_start = new Date(
                    this.editedSubscription.economic_activity_start
                );
            }
        },
        methods: {
            formatDateToInput(date) {
                return moment(Date.parse(date)).format("DD/MM/YYYY");
            },
            formatDate(date) {
                return moment(Date.parse(date)).format("YYYY-MM-DD");
            },
            addPlace(place) {
                var indexof = this.editedSubscription.places.indexOf(place);
                if (indexof > -1) {
                    this.editedSubscription.places[indexof] = place;
                } else {
                    this.editedSubscription.places.push(place);
                }
                this.place = {};
            },
            editPlace(place) {
                this.place = place;
                this.isPlacesModalActive = true;
            },
            addContact(contact) {
                var indexof = this.editedSubscription.contacts.indexOf(contact);
                if (indexof > -1) {
                    this.editedSubscription.contacts[indexof] = contact;
                } else {
                    this.editedSubscription.contacts.push(contact);
                }
                this.contact = {};
            },
            editContact(contact) {
                this.contact = contact;
                this.isContatosModalActive = true;
            },
            removePlace(place) {
                var indexOf = this.editedSubscription.places.indexOf(place);
                if (indexOf >= 0) {
                    this.editedSubscription.places.splice(indexOf, 1);
                }
            },
            removeContact(contact) {
                var indexOf = this.editedSubscription.contacts.indexOf(contact);
                if (indexOf >= 0) {
                    this.editedSubscription.contacts.splice(indexOf, 1);
                }
            },
        },
    };
</script>
