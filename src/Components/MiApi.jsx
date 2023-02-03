export const getData = async () => {
        const url = 'https://api.bsale.cl/v1/third_party_documents.json?year=2023&limit=50&codesii=33';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access_token': 'c06e1e766d41927c4502702e72061f3e20bec459',
        },
        });
        const data = await response.json();
        return data.items;
    };   

export default getData;