<script lang="ts">
  import {reactive} from "vue";
  import {useRouter} from "vue-router";
  import {useUsersStore} from "@/stores/usersStore";
  import {useVuelidate} from "@vuelidate/core";
  import {email, required} from "@vuelidate/validators";

  export default {
    setup () {
      const {ADD_USER: addUser}: any = useUsersStore()
      const router = useRouter();

      const formData: {
        login: string,
        password: string,
        cpassword: string,
        email: string
      } = reactive({
        login: '',
        password: '',
        cpassword: '',
        email: ''
      })
      const rules = {
        login: { required },
        password: { required },
        cpassword: { required },
        email: { required, email },
      }

      const v = useVuelidate(rules, formData)
      const signUpHandler = async() => {
        const isValid = await v.value.$validate()
        if(!isValid){
          return
        }
        const user = {
          name: formData.login,
          login: formData.email,
          password: formData.password,
          avatar:
              "https://png.pngitem.com/pimgs/s/214-2145309_blank-profile-picture-circle-hd-png-download.png"
        };
        if (
            formData.password === formData.cpassword &&
            (addUser(user))
        ) {
          await router.push({name: "login"});
        }

      }
      return { formData, v,signUpHandler }
    }
  }
</script>

<template lang="pug">
v-app#inspire
  v-container
    .d-flex.align-center.justify-center
      v-sheet.mx-auto( max-width=400 min-width="200" width="40vw")
        v-card.elevation-12
          v-toolbar(dark color="primary")
            v-toolbar-title Sign up
          v-card-text
            v-form(
              fast-fail
              @submit.prevent="signUpHandler"
              validate-on='submit'
            )
              v-text-field(
                name="login"
                label="Login"
                type="text"
                v-model="formData.login"
                :error-messages="`${ v && v.login.$invalid && v.login.$errors.length? v.login.$errors[0].$message : '' }`"
              )
              v-text-field(
                name="email"
                label="Email"
                type="email"
                v-model="formData.email"
                :error-messages="`${ v && v.email.$invalid && v.email.$errors.length? v.email.$errors[0].$message : '' }`"
              )
              v-text-field(
                name="password"
                label="Password"
                type="password"
                v-model="formData.password"
                :error-messages="`${ v && v.password.$invalid && v.password.$errors.length? v.password.$errors[0].$message : '' }`"
              )
              v-text-field(
                name="cpassword"
                label="Confirm password"
                type="password"
                v-model="formData.cpassword"
                :error-messages="`${ v && v.cpassword.$invalid && v.cpassword.$errors.length? v.cpassword.$errors[0].$message : '' }`"
              )
              router-link(to="/login")
                span Go to login
              v-card-actions
                v-spacer
                v-btn(
                  color="primary"
                  type="submit"
                  :disabled="v.$invalid && v.$dirty"
                )  Sign up
</template>



