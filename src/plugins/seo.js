export default (app, inject) => {
  inject("seo", function seo(object) {
    return {
      title: object.title,
      meta: [
        {
          name: "title",
          content: object.title,
          hid: "title",
        },
        {
          property: "og:title",
          content: object.title,
          hid: "og:title",
        },
        {
          hid: "description",
          name: "description",
          content: object.description,
        },
        {
          property: "og:description",
          content: object.description,
          hid: "og:description",
        },
      ],
    };
  });
};
