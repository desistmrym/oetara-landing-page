const apiUrl = 'https://cms.oetara.co.id/wp-json/wp/v2';
const acf = 'acf_format=standard';
const field = '_fields=id,modified,slug,status,title,acf';

const getInformation = () => {
    return fetch(apiUrl + '/information?'+acf+'&'+field)
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return error;
    });
}

export {
    getInformation
}