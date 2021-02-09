<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

<!--    <h2>{{ pas }}</h2>-->
    <button class="btn primary" type="submit" :disabled="isSubmitting || isToManyAttempts">Войти</button>
    <span class="text-danger" v-if="isToManyAttempts">Часто пытаетесь войти в систему</span>
  </form>
</template>

<script>
import {useLoginForm} from '../use/login-form'
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "@/utils/error";

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {
      ...useLoginForm()
    }
  }

}
</script>

<style scoped>

</style>
