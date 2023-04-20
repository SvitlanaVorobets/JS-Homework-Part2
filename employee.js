import { User } from "./user.js";

export class Employee extends User{
    constructor(id, name, phone, email, companyName, website){
        super(id, name, phone, email);
        this.companyName = companyName;
        this.website = website;
    }
}