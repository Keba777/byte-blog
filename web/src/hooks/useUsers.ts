import { useState } from "react";
import { User } from "@/types/user";
import userService from "@/services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const createUser = (newUser: FormData): Promise<void> => {
    return userService
      .createUser(newUser)
      .then((response) => {
        const createdUser: User = response.data;
        console.log("User created:", createdUser);
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        const errorMessage =
          error.response?.data.message || "An error occurred";
        setError(errorMessage);
        throw error;
      });
  };

  // const updateUser = (updatedUser: User) => {
  //   const originalUsers = [...users];
  //   userService
  //     .updateUser(updatedUser)
  //     .then((res) => {
  //       const updatedUsers = users.map((user) =>
  //         user._id === res.data._id ? res.data : user
  //       );
  //       setUsers(updatedUsers);
  //       console.log("User updated successfully!", res.data);
  //     })

  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });
  // };

  // const deleteUser = (user: User) => {
  //   const originalUsers = [...users];
  //   setUsers(users.filter((b) => b._id !== user._id));

  //   userService.deleteUser(user._id).catch(() => {
  //     setError("Failed to delete blog.");
  //     setUsers(originalUsers);
  //   });
  // };

  return {
    users,
    error,
    isLoading,
    setUsers,
    setError,
    setLoading,
    createUser,
    // updateUser,
    // deleteUser,
  };
};

export default useUsers;
