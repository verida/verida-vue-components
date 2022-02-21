import PulseLoader from "vue-spinner/src/PulseLoader.vue";



export const getPulseLoader = () => {
    const isJestRunning = process.env.JEST_WORKER_ID ? true : false;
    if (!isJestRunning) {
        return ''
    } 
    return PulseLoader
}