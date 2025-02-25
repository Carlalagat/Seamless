import { ref } from "vue";
import { get } from "./main";

export const getPosts = () => {
  const isLoading = ref(true);
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const response = await get("posts").then((response) => {
        const data = response.data;
        posts.value = data;
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    isLoading.value = false;
    console.log(isLoading);
  };

  return { posts, error, load };
};

export const getPost = (id) => {
  const isLoading = ref(true);
  const post = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const response = await get(`posts/${id}`).then((response) => {
        const data = response.data;
        post.value = data;
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    isLoading.value = false;
    console.log(isLoading);
  };

  return { post, error, load };
};
