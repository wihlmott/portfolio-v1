import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext, useReducer } from "react";
import { EducatorContext } from "../Context/Context";
import QuestionBtn from "./QuestionBtn";

const reducer = (state, action) => {
    if(action.type === 'COMMENT')return {...state, [`${action.question}-comment`]:action.comment}
    if(action.type === 'CHECKED')return {...state, [`${action.question}-check`]:action.checked}
};

const CheckForm = ({formType, formQuestions}) => {

    const [educator, setEducator] = useContext(EducatorContext);
    const name = `${educator.firstname} ${educator.lastname}`

    const [formState, dispatchReducer] = useReducer(reducer, {});

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
    }

    const sendCheck = (e) => {
        dispatchReducer({type: 'CHECKED', question:e.question, checked:e.checked});
    }
    const sendComment = (e) => {
        dispatchReducer({type: 'COMMENT', question:e.question, comment:e.comment});
    }

    return (
        <form onSubmit={formSubmit}>
            <Typography variant='h6' align='center'>{`${formType} Form -- for ${name}`}</Typography>
            {formQuestions.map((el)=>{
                return (
                <div key={el}>
                    <QuestionBtn question={el} sendCheck={sendCheck} sendComment={sendComment}/>
                    <br/>
                </div>)
                })}
            <Button variant="contained" type='submit'>submit</Button>
        </form>
    )
}

export default CheckForm;