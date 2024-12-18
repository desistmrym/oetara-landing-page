const apiUrl = 'https://cms.oetara.co.id/wp-json/wp/v2';
const acf = 'acf_format=standard';
const field = '_fields=id,modified,slug,status,title,acf';
const field_by_id_name = '_fields=id,name'

const getTeam = () => {
    return fetch(apiUrl + '/team?'+acf)
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return error;
    });
}

const getNavTeam = () => {
    return fetch(apiUrl + '/navigator-team?'+acf+'&'+field_by_id_name)
    .then(response => {
        return response.json();
    }) 
    .catch(error => {
        return error;
    })
}

const getClient = () => {
    return fetch(apiUrl + '/client?'+acf+'&'+field)
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return error;
    });
}

const getClientById = (id) => {
    return fetch(apiUrl + '/client/'+id+'?'+acf+'&'+field)
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return error;
    });
}

const getJob = () => {
    return fetch(apiUrl + '/job?'+acf+'&'+field)
    .then(response => {
        return response.json();
    })
    .catch(error => {
        return error;
    });
}

export {
    getTeam,
    getNavTeam,
    getClient,
    getClientById,
    getJob
}