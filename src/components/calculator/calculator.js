import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { change } from "../../actions";

import './calculator.css'

const keypadNumber = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', 'C', '='];
const keypadOperations = ['÷', '×', '-', '+'];

const Calculator = () => {
    const [currentValue, setValue] = useState(null);
    const [currentOperation, setOperation] = useState(null);
    const [currentTotal, setTotal] = useState(null);
    const [lastOperation, setLastOperation] = useState(null);
    const [display, setDisplay] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(change('calculator'));
    }, [dispatch]);


    const keyEntry = (key) => {

        let current = currentValue;
        let currentInt = parseInt(current);
        let operation = currentOperation;
        let total = currentTotal;

        if (key !== 'C' && key !== '=' && !keypadOperations.includes(key)) {
            if (operation !== null) {
                if (total !== null) {
                    total = parseInt(total);
                    switch (operation) {
                        case '+': total = total + currentInt;
                            break;
                        case '-': total = total - currentInt;
                            break;
                        case '×': total = total * currentInt;
                            break;
                        case '÷': total = total / currentInt;
                            break;
                        default: break;
                    }
                } else {
                    total = currentInt;
                }
                current = null;
                setLastOperation(operation);
                operation = null;
            }

            if (current !== null) {
                current = current.concat(key);
            } else {
                current = key;
            }

            setDisplay(display => display.concat(key));
            setAll(current, total, operation);

        } else if (keypadOperations.includes(key)) {
            setOperation(key);
            setDisplay(display => display.concat(key));
        } else {
            if (key === 'C') {
                setDisplay('');
                setAll(null, null, null);
            } else {
                let result;
                switch (lastOperation) {
                    case '+': result = total + currentInt;
                        break;
                    case '-': result = total - currentInt;
                        break;
                    case '×': result = total * currentInt;
                        break;
                    case '÷': result = total / currentInt;
                        break;
                    default: break;
                }
                setAll(result, null, null)
            }
        }
        
    }

    const setAll = (current, total, operation) => {
        setValue(current);
        setTotal(total);
        setOperation(operation);
    };



    return (
        <div className="calculator">
            <div className="container">
                <div className="screen">
                    <div className="input">{currentValue}</div>
                    <div className="display">{display}</div>
                </div>
                <div className="keypad">
                    <div className="keypad-number">
                        {keypadNumber.map((key, index) =>
                            <div className="key-number" key={index}
                                onClick={() => { keyEntry(key) }}>{key}</div>
                        )}
                    </div>
                    <div className="keypad-operation">
                        {keypadOperations.map((key, index) =>
                            <div className="key-operation" key={index}
                                onClick={() => { keyEntry(key) }}>{key}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Calculator;


// class Calculator extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentValue: null,
//             currentOperation: null,
//             currentTotal: null
//         }
//     }

//     componentDidMount() {
//         this.props.changeRoute('calculator');
//     }

//     keyEntry = (key) => {

//         let current = this.state.currentValue;
//         let operation = this.state.currentOperation;
//         let total = this.state.currentTotal;

//         if (key !== 'C' && key !== '=' && !keypadOperations.includes(key)) {
//             if (operation !== null) {
//                 let currentInt = parseInt(current);
//                 if (total !== null) {
//                     total = parseInt(total);
//                     switch (operation) {
//                         case '+': total = total + currentInt;
//                             break;
//                         case '-': total = total - currentInt;
//                             break;
//                         case '×': total = total * currentInt;
//                             break;
//                         case '÷': total = total / currentInt;
//                             break;
//                         default: break;
//                     }
//                 } else {
//                     total = currentInt;
//                 }
//                 current = null;
//                 operation = null;
//             }

//             if (current !== null) {
//                 current = current.concat(key);
//             } else {
//                 current = key;
//             }
//             this.setState({
//                 currentValue: current,
//                 currentTotal: total,
//                 currentOperation: operation
//             }, () => console.log(this.state.currentValue, this.state.currentOperation, this.state.currentTotal))
//         } else if (keypadOperations.includes(key)) {
//             this.setState({
//                 currentOperation: key
//             })
//         } else {
//             if (key === 'C') {
//                 this.setState({
//                     currentValue: null,
//                     currentTotal: null,
//                     currentOperation: null
//                 })
//             } else {
//                 this.setState({
//                     currentValue: total,
//                     currentTotal: null,
//                     currentOperation: null
//                 })
//             }
//         }
//     }

//     render() {
//         return (
//             <div className="calculator">
//                 <div className="container">
//                     <div className="screen">
//                         <div className="input">{this.state.currentValue}</div>
//                     </div>
//                     <div className="keypad">
//                         <div className="keypad-number">
//                             {keypadNumber.map((key, index) =>
//                                 <div className="key-number" key={index}
//                                     onClick={() => { this.keyEntry(key) }}>{key}</div>
//                             )}
//                         </div>
//                         <div className="keypad-operation">
//                             {keypadOperations.map((key, index) =>
//                                 <div className="key-operation" key={index}
//                                     onClick={() => { this.keyEntry(key) }}>{key}</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }