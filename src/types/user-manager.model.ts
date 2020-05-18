import { User } from "./user.model";

export class UserManager {
    private users: User[];

    constructor() {
        this.users = [];
    }

    add(user: User) {
        this.users.push(user);
    }

    get(id: string) {
        return this.users.find((user) => user.id === id);
    }

    getUsersInRoom(room: string) {
        return this.users.filter(user => user.room === room);
    }

    remove(id: string) {
        const index = this.users.findIndex((user) => user.id == id);

        if (index != 1) {
            return this.users.splice(index, 1)[0];
        }
    }
}
