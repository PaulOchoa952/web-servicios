import {Injectable} from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiProv {
    url = environment.apiURL;
    getBooks(): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get(this.url+'books').then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}