import apiClient from "@/config/axios";

const isLoggedIn = async () => {
  try {
    const { data } = await apiClient.get("auth/whoami");
    return data.user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export default isLoggedIn;
