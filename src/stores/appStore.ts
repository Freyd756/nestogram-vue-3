import {defineStore} from 'pinia';

export const useAppStore = defineStore('AppStore', {
    state: () =>({
        token: null,
        loading: false,
        error: false,
        errorMessage: '',
        isLogined: false,
    }),
    actions: {
        SET_ERROR(error:boolean, text:string) {
            this.error = error;
            this.errorMessage = text;
        }
    }
});

