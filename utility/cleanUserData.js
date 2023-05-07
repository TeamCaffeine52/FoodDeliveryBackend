const cleanUserData = (userData) => {
    const tmpUserData = {
        firstName : userData.firstName,
        lastName : userData.lastName,
        email: userData.email,
        image : userData.image
    }
    return tmpUserData;
}

export {cleanUserData};