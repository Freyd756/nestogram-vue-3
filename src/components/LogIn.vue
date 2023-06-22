<script lang="ts">;

// import { mapActions, mapState } from "vuex";
  // import type {Ref} from "vue";
  import {reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {useUsersStore} from "@/stores/usersStore";
  import { required, email } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'

  export default {
    setup () {
      const router = useRouter();
      const {LOG_IN:logInAction,isLogined}:any = useUsersStore()

      const formData:{
        login:string,
        password: string
      } = reactive({
        login: '',
        password: '',
      })
      const rules = {
        login: { required, email },
        password: { required },
      }
      const v = useVuelidate(rules, formData)
      const loginHandler = async() =>{
        const isValid = await v.value.$validate()
          if(!isValid){
            return
          }
          (await logInAction({
            login: formData.login.trim(),
            password: formData.password.trim()
          })) &&
          await router.push({ name: "dashboard" }) &&
          (formData.login = "") &&
          (formData.password = "");
        }
      return { formData, v,loginHandler }
    }
  }
</script>

<template lang="pug">
v-app#inspire
  v-container
    .d-flex.align-center.justify-center
      v-sheet.mx-auto( max-width=400 min-width="200" width="40vw")
        v-card.elevation-12
          v-toolbar( dark color="primary")
            v-toolbar-title Login
          v-card-text
            v-form(
                fast-fail
                @submit.prevent="loginHandler"
                validate-on='submit'
            )
              v-text-field(
                name="login"
                label="Login"
                type="text"
                v-model="formData.login"
                :error-messages="`${ v && v.login.$invalid && v.login.$errors.length ? v.login.$errors[0].$message : '' }`"
              )
              v-text-field(
                id="password"
                name="password"
                label="Password"
                type="password"
                v-model="formData.password"
                :error-messages="`${ v && v.password.$invalid && v.password.$errors.length? v.password.$errors[0].$message : '' }`"

              )
              router-link(to="/signup")
                span You are not have account? Go to signup
              v-card-actions
                v-spacer
                v-btn(
                  color="primary"
                  type="submit"
                  :disabled="v.$invalid && v.$dirty"
                ) Login
</template>
