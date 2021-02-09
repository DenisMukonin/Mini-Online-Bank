import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email', // название контрола,
        yup.string().trim().required('Введите емаил').email('Введите корректный емаил') // набор валидаторов
    )

    const PASSWORD_MIN_LEN = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Введите пароль').min(PASSWORD_MIN_LEN,`Пароль должен быть не меньше ${PASSWORD_MIN_LEN} символов,сейчас _ символов`)
    )

    const isToManyAttempts = computed(() => submitCount.value >=3)

    watch(isToManyAttempts, val => {
        if (val) {
            setTimeout(() => {
                submitCount.value = 0
            }, 1500)
        }
    })

    const onSubmit = handleSubmit(async values => {
        // console.log('Form', values)
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        }
        catch (e) {
        }

    })

    return {
        email, eError, eBlur,
        password, pError, pBlur,
        onSubmit, isSubmitting,
        isToManyAttempts
    }
}
