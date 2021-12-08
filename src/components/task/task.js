import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { change } from "../../actions";

import { getStorage, setStorage } from './modules/storage';

import Search from './search/search';
import Delete from '../../assets/task/Delete.png'
import Button from 'react-bootstrap/Button';

import './task.css'


const TaskPresentational = props => {
    return (
        <div className="task">
            <div className="container-task">
                <h3>Tasks</h3>
                <Search handleAdd={props.handleAdd} />
                <div className="list-container">
                    {props.taskList.map((item) =>
                        <div className="list-item" key={item.id}>
                            {item.value}
                            <img src={Delete} alt="delete-button"
                                onClick={() => { props.handleDelete(item.id) }}>
                            </img>
                        </div>
                    )}
                </div>
                <div className="footer">
                    You have {props.taskList.length} pending tasks
                    {!props.taskList.length ? null :
                        <Button variant="secondary" onClick={(e) => {
                            props.taskList.forEach(item => props.handleDelete(item.id))
                        }}>Clear All</Button>
                    }
                </div>
            </div>
        </div>
    )
}

const Task = () => {
    const [list, setList] = useState([]);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(change('task'));
        initTask();
    }, [dispatch])


    const initTask = () => {
        let taskList = getStorage();
        if (taskList !== null) {
            let max = taskList.length === 1 ? taskList[0].id : taskList.reduce(function (prev, current) {
                return (prev.id > current.id) ? prev.id : current.id
            });

            setCounter(max + 1);
            setList(taskList);
        }
    }

    const generateIndex = () => {
        let current = counter;
        setCounter(prevState => prevState + 1)
        return current;
    }

    const handleAdd = (item) => {
        let taskList = getStorage();
        let newItem = { id: generateIndex(), value: item }

        if (taskList == null) {
            taskList = [];
            taskList.push(newItem);
            setStorage(taskList);
        } else {
            taskList.push(newItem);
            setStorage(taskList);
        }
        setList(taskList);
    }

    const handleDelete = (id) => {
        let taskList = getStorage();
        if (taskList !== null) {
            let newTaskList = taskList.filter(function (item) { return item.id !== id });
            setStorage(newTaskList);
            setList(newTaskList)
        }
    }

    return (<TaskPresentational
        taskList={list}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
    />
    )
}
export default Task;



// class Task extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             list: [],
//             counter: 0
//         }
//     }

//     componentDidMount() {
//         this.props.changeRoute('task');
//         this.initTask();
//     }

//     initTask = () => {
//         let taskList = getStorage();
//         if (taskList !== null) {
//             let max = taskList.reduce(function (prev, current) {
//                 return (prev.id > current.id) ? prev.id : current.id
//             });
//             this.setState({
//                 counter: max + 1,
//                 list: taskList
//             })
//         }
//     }

//     generateIndex = () => {
//         let current = this.state.counter;
//         this.setState((prevState) => ({
//             counter: prevState.counter + 1
//         }));

//         return current;
//     }

//     handleAdd = (item) => {
//         let taskList = getStorage();
//         let newItem = { id: this.generateIndex(), value: item }

//         if (taskList == null) {
//             taskList = [];
//             taskList.push(newItem);
//             setStorage(taskList);
//         } else {
//             taskList.push(newItem);
//             setStorage(taskList);
//         }

//         this.setState({
//             list: taskList
//         })
//     }

//     handleDelete = (id) => {
//         let taskList = getStorage();
//         let newTaskList = taskList.filter(function (item) { return item.id !== id });
//         setStorage(newTaskList);

//         this.setState({
//             list: newTaskList
//         })
//     }

//     render() {
//         return <TaskPresentational 
//         taskList={this.state.list} 
//         handleDelete={this.handleDelete} 
//         handleAdd={this.handleAdd}
//         />;
//     }
// }
