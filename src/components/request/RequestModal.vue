<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', {invalid: fError}]">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div :class="['form-control', {invalid: sError}]" @blur="sBlur">
      <label for="sum">Сумма</label>
      <input type="number" id="sum" v-model="sum">
      <small v-if="sError">{{ sError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
<!--        <option v-for="option in options" :value="option.value">{{ option.text }}</option>-->
        <option value="active">Активен</option>
        <option value="cancelled">Отменена</option>
        <option value="pending">Выполняется</option>
        <option value="done">Завершен</option>
      </select>
      <span>Выбрвн: {{ status }}</span>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Создать заявку</button>
  </form>
</template>

<script>
import {useRequestForm} from '../../use/request-form'
import {useStore} from "vuex";

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      try {
        console.log('onForm', values)
        await store.dispatch('request/create', values)
        emit('created')
        // await store.dispatch('auth/login', values)
        // router.push('/')
      }
      catch (e) {
      }
    }

    return {
      ...useRequestForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
