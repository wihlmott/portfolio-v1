import InfoStrip from "./InfoStrip";
import Button from "@mui/material/Button";

const profile_dummy = {firstName: 'wihl',lastName: 'valentine',email: 'test@email.com',cell: '021 987 9879'}

const Profile = () => {
    const entries = Object.entries(profile_dummy);

    const saveNewDataHandler = () => {
        console.log(`update data`);
    }
    const logoutHandler = () => {
        console.log(`logout user`);
    }

    return <div>
        {entries.map((el)=>{
            return <InfoStrip infoTitle={el[0]} information={el[1]}/>
        })}
        <Button sx={{m:2}} variant='contained' onClick={saveNewDataHandler}>save</Button>
        <br/>
        <Button sx={{m:2}} variant='contained' onClick={logoutHandler}>logout</Button>
    </div>
}

export default Profile;