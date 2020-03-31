<template>
  <div class="modal-card" style="width: 660px;">
        <header class="modal-card-head">
            <p class="modal-card-title">Escolha a Ficha à ser importada</p>
        </header>
        <section class="modal-card-body">
            <div class="columns">
                <div class="column">
                    <b-table :data="tableData.length <= 0 ? [] : tableData" :striped="true" :loading="isLoading">
                        <template slot-scope="props">
                            <b-table-column :field="'name'" :label="'Razão Social'">
                                {{props.row.name}}
                            </b-table-column>
                            <b-table-column :field="'category'" :label="'Categoria'">
                                {{props.row.category.name}}
                            </b-table-column>
                            <b-table-column :field="'date'" :label="'Data'">
                                {{props.row.created_at | date}}
                            </b-table-column>
                            <b-table-column width="200" :field="''" :label="''">
                                <button type="button" class="button is-small is-info" @click='sendId(props.row.id)'>Escolher</button>
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
                    </b-table>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
import SubscriptionService from "../../../services/subscription.service";

export default {
    data() {
        return {
            isLoading: false,
            tableData: []
        }
    },
    created(){
        this.isLoading = true
        SubscriptionService.getPastSublist()
            .then(resp => {
                this.tableData = resp.result
                this.isLoading = false
            })
            .catch(err => alert(err))
	},
	methods: {
		sendId(id){
            this.$emit('send-id', id)
            this.$parent.close()
		}
	}
}
</script>

