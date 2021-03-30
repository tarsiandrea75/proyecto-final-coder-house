export const createMockedRequest = (delay, mockedData) => 
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(mockedData);
        }, delay);
    })
}

export  const filterByField = (data, field, value) => 
{
    return data.filter(elem => elem[field] === value);
}

