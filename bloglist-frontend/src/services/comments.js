import axios from "axios";

const baseUrl = "/api/blogs";

const getConfig = () => {
  return {
    headers: { "Content-Type": "application/json" },
  };
};

const create = async (comment) => {
  const response = await axios.post(
    `${baseUrl}/${comment.blog}/comments`,
    comment,
    getConfig()
  );
  console.log(response);
  return response.data;
};

export default { create };
