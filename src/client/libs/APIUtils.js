import request from 'superagent-bluebird-promise';


export default {

    root: 'http://api.vamos.local:9000/',
    headers: null,

    setHeaders(cookie) {

        if (!cookie) return null;

        const token = JSON.parse(cookie).token;

        this.headers = {
            'Authorization': 'Bearer ' + token
        };
    },


    get(path, params = {}) {
        if (this.headers) {
            return request.get(this.root + path)
                .set(this.headers)
                .query(params)
                .promise();
        } else {
            return request.get(this.root + path)
                .query(params)
                .promise();
        }
    },

    post(path, data = {}) {
        if (this.headers) {

            return request.post(this.root + path)
                .send(data)
                .set(this.headers)
                .promise();
        }
    },

    put(path, data = {}) {
        if (this.headers) {

            return request.put(this.root + path)
                .send(data)
                .set(this.headers)
                .promise();
        }
    },

    delete(path) {
        if (this.headers) {

            return request.delete(this.root + path)
                .set(this.headers)
                .promise();
        }
    }

};
