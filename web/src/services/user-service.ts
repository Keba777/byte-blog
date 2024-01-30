import apiClient from "./api-client";
import { Credential } from "@/types/user";

class UserService {
  createUser(user: FormData) {
    return apiClient.post("/users", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  loginUser(credential: Credential) {
    return apiClient.post("/auth", credential);
  }

  // updateUser(user: User) {
  //   return apiClient.patch("/users/" + user._id, user);
  // }

  // deleteUser(_id: string) {
  //   return apiClient.delete("/users/" + _id);
  // }
}

const userService = new UserService();
export default userService;
