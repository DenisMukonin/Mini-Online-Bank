<template>
  <span :class="['badge', className ]">{{ text }}</span>
</template>

<script>
import {ref,computed, watch} from "vue";

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'pending', 'done'].includes(value)
      }
    }
  },
  setup(props) {
    const classesMap = {
      active: 'primary',
      cancelled: 'danger',
      pending: 'warning',
      done: 'primary',
    }
    const textMap = {
      active: 'Активна',
      cancelled: 'Отменена',
      pending: 'Выполняется',
      done : 'Завершен'
    }

    watch(props, val => {
      className.value = classesMap[val.type]
      text.value = textMap[val.type]
    })
    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])
    // const className = computed(() => classesMap[props.type])
    // const text = computed(() => textMap[props.type])

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>
