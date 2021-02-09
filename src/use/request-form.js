import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useField, useForm} from "vee-validate";
import * as yup from 'yup'

export function useRequestForm(fn) {
    // const store = useStore()
    // const router = useRouter()

    const {handleSubmit, isSubmitting} = useForm({
        initialValues: { //установка начальных значений
            status: 'active'
        }
    })

    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
        'fio', // название контрола,
        yup.string().trim().required('Введите ФИО') //.name() // набор валидаторов
    )

    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone', // название контрола,
        yup.string()
            .trim()
            // .typeError('Это не похоже на номер телефона')
            // .positive('Номер телефона не может начинаться с минуса')
            // .integer('Номер телефона не может содержать десятичную точку')
            // .min(5)
            .required('Введите номер телефона')
    )

    const {value: sum, errorMessage: sError, handleBlur: sBlur} = useField(
        'sum', // название контрола,
        yup.number()
            .required('Введите сумму заявки')
            .min(0, 'Сумма не может быть меньше 0')
    )

    const {value: status} = useField('status')


    const onSubmit = handleSubmit(fn)


    // const options = [
    // { value: active, text : 'Активна'},
    // { value: cancelled, text : 'Отменена'},
    // { value: pending, text : 'Ожидает'},
    // { value: done, text : 'Готова'},
    // }]

    // const status = ref('Активна')//options.value

    return {
        fio, fError, fBlur,
        phone, pError, pBlur,
        sum, sError, sBlur,
        // selected, seError, seBlur,
        status, //options,
        onSubmit, isSubmitting
    }
}
