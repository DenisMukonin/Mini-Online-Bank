<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-model title="Создание заявки" v-if="modal" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-model>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import AppModel from "@/components/ui/AppModel";
import AppLoader from "@/components/ui/AppLoader";
import RequestModal from "@/components/request/RequestModal";
import RequestFilter from "@/components/request/RequestFilter";
import {useStore} from "vuex";

export default {
  name: 'Home',
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    // watch(filter, val => console.log(val) ) для проверки работы фильтра

    onMounted(async () =>{
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    // const requests = computed(() => store.getters['request/requests'])
    const requests = computed(() => store.getters['request/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter(request => {
          if (filter.value.status) {
            return filter.value.status === request.status
          }
          return request
        })
    )
    return {
      modal, requests, loading, filter
    }
  },
  components: { AppPage, RequestTable, AppModel, RequestModal, AppLoader, RequestFilter }
}
</script>
