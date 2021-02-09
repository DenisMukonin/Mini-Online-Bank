<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{request.fio}}</p>
    <p><strong>Телефон владельца</strong>: {{request.phone}}</p>
    <p><strong>Cумма</strong>: {{currency(request.sum)}}</p>
    <p><strong>Стутус</strong>:
      <app-status :type="request.status"></app-status>
    </p>

    <div class="form-control" style="width: 50%">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="active">Активен</option>
        <option value="cancelled">Отменена</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершен</option>
      </select>
      <span>Выбрвн: {{ status }}</span>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Заявки с Id = {{ $route.params.id }} нет</h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref, onMounted, computed} from 'vue'
import {currency} from "@/utils/carrency";

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const request = ref({})
    const status = ref()

    console.log(route.params.id)

    onMounted( async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })


    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, currency, remove, update, status, hasChanges
    }
  },
  components: { AppPage, AppLoader, AppStatus }
}
</script>

<style scoped>

</style>
