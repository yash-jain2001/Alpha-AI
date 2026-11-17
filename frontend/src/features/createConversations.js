import api from "../../utils/axios.js"

export const createConversations = async () => {
  try {
    const {data} = await api.get("/api/chat/create-conversation")
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
};
