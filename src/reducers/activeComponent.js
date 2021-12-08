const activeComponent = (route = null, action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.value;
        default:
            return route;
    };
};

export default activeComponent;