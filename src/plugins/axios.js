export default function (context) {
  context.$axios.onRequest((config) => {
    config.headers.common.Authorization = `bearer ${context.store.state.auth.token}`;
  });
}
