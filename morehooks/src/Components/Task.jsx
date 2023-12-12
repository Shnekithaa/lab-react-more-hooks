import React, { useReducer, useRef } from 'react';


const reducer = (initState, action) => {
    switch(action.type){
        case "ADDTASK":
            return [...initState, {id: Date.now(), text: action.payload, isVisible: true}];
        case "TOGGLETASK":
            return initState.map((ele) => {
                return ele.id === action.payload ? {...ele, isVisible : !ele.isVisible} : ele;
            })
        default:
            return initState;
    }
}


const Task = () => {
    const inputRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, []);
    const addTask = (e) => {
        dispatch({type: "ADDTASK", payload: e.target.value})
    }

    const toggleTask = (taskId) => {
        dispatch({type: "TOGGLETASK", payload: taskId})
    }
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"}),
        inputRef.current.focus()
    }
  return (
    <>
        <div>
            <input type="text" ref={inputRef} onKeyDown={(e) => {
                if(e.key === "Enter"){
                    addTask(e)}
                }
             } />
             <div>
                {
                    state.map((ele) => {
                        return <li key={ele.id}>
                            {
                                ele.isVisible ? <div>
                                    {ele.text}
                                    <button onClick={() => toggleTask(ele.id)} className='toggle'>Toggle</button>
                                </div> : <div>
                                    The content is hidden
                                    <button onClick={() => toggleTask(ele.id)} className='toggle'>Toggle</button>
                                </div>
                            }
                        </li>
                    })
                }
             </div>
        </div>
        <button onClick={() => scrollToTop()}>Scroll to top</button>
    </>
  );
}

export default Task;
