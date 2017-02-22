//-- next line, cannot use this: import axios from 'axios'
//-- the above import line causes this error:
//-- Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
const axios = require('axios')

var pict = {}

pict.apiPath = '/pic/api';
pict.baseUrl = process.env.NODE_ENV=='development'
                ? 'http://alpha.in.dynetics.com/lance_test' + pict.apiPath
                : pict.apiPath + '/test-index.php';
pict.isDev = process.env.NODE_ENV=='development' ? 1 : 0;

pict.initialize = function() {
    var ax = axios.create({
        params : {
            test : 1,
            isDev: pict.isDev
        },
    });
    return ax.get(pict.baseUrl + '/employee/initialize');
}
pict.search = function(phrase) {
    return axios.get(pict.baseUrl + '/employees/search/' + phrase);
}
pict.employee = function(id) {
    return axios.get(pict.baseUrl + '/employees/' + id);
}
pict.employeesByOrgApiPath = function(org) {
    return "/e/orgs/" + org;
}
pict.letterApiPath = function(letter) {
    return "/e/lname/" + letter;
}
pict.orgApiPath = function(org) {
    return pict.baseUrl + '/employees/org/' + org;
}
pict.byOrg = function(org) {
    return axios.get(pict.orgApiPath(org));
}
pict.lastNameStartsWithApiPath = function(letter) {
    return pict.baseUrl + '/employees/lname/' + letter;
}
pict.lastNameStartsWith = function(letter) {
    return axios.get(pict.lastNameStartsWithApiPath(letter));
}
pict.image = function(emplObj) {
    if ( emplObj && emplObj.image ) {
        return 'data:image/jpeg;base64,' + emplObj.image;
    } else {
        return 'data:image/gif;base64,R0lGODlhcABUAIABAP///////yH5BAUKAAEALAAAAABwAFQAAAJvjI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjICFYAADs=';
    }
}
pict.pathToEmpl = function(id) {
    return "/e/" + id;
}
module.exports = pict;