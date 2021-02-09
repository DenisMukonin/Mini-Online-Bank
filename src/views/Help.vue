<template>
  <app-page back title="Помощь">
    <question-item
      v-for="q in questions"
      :key="q.title"
      :question="q"
    >
    </question-item>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import QuestionItem from "@/components/question/QuestionItem";

export default {
  setup() {
    const questions = [
      {title: 'Вопрос первый?', text:'Ответ на первый вопрос'},
      {title: 'Второй вопрос?', text:'И ответ на второй вопрос'},
    ]
    return {
      questions
    }
  },
  components: { AppPage, QuestionItem }
}
</script>
