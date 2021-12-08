export const getStorage = () => {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    return taskList;
}

export const setStorage = (taskList) => {
    if (taskList.length > 0) {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    } else {
        localStorage.removeItem('taskList');
    }
}