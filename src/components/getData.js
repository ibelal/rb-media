const  getData = (get, type, offset, search, keyword ) => {
    let params = "";
    const end_url = "https://api.themoviedb.org/3/";
    const api_key = '1ef9fd0ce00ab1df135c8453b7222865'

    if(search === 'search' && keyword !== ""){
        params += "search/" + get + "?api_key=" + api_key + "&query=" + keyword
    }else{
        params += get +"/"+ type +"?api_key=" + api_key
    }

    if(!offset){
        offset = 1
    }

    params += "&language=en-US&page=" + offset

    return fetch(end_url + params)
            .then(res => res.json())
}

const  getDetails = (type, id ) => {
    let params = "";
    const end_url = "https://api.themoviedb.org/3/";
    const api_key = '1ef9fd0ce00ab1df135c8453b7222865'

    params += type + "/" + id +"?api_key=" + api_key

    params += "&language=en-US"

    return fetch(end_url + params)
            .then(res => res.json())
}

const  getCredits = (type, id ) => {
    let params = "";
    const end_url = "https://api.themoviedb.org/3/";
    const api_key = '1ef9fd0ce00ab1df135c8453b7222865'

    params += type + "/" + id +"/credits?api_key=" + api_key

    params += "&language=en-US"

    return fetch(end_url + params)
            .then(res => res.json())
}

export {getData , getDetails, getCredits}