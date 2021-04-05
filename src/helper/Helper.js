export const createMockedRequest = (delay, mockedData) => 
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(mockedData);
        }, delay);
    })
}

export const filterByField = (data, field, value) => 
{
    return data.filter(elem => elem[field] === value);
}

export const getItemsInCart = (cart) => 
{
    let totalNumber = 0;
    
    if (cart && cart.lenght > 0) {
        totalNumber = cart.reduce(
            (total, item) => total + item.quantity, 
            0
        );
    } 

    return totalNumber;
}

