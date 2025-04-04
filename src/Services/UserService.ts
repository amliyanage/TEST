import axios from "axios";
import { User } from "../model/User";

const API_URL = "https://8015b5dbc0724d38882ac90397c27649.weavy.io/api/users";
const API_KEY = "wys_hMWpXdekxcn9Gc8Ioah3azOllzUZ7l3HN9yB";

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const UserService = {
  getUsers: () => axios.get<User[]>(API_URL, { headers }),
};

export default UserService;
