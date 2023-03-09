import InfoStrip from "./InfoStrip";

const profile_dummy = {firstName: 'wihl',lastName: 'valentine',email: 'test@email.com',cell: '021 987 9879'}

const Profile = () => {
    const entries = Object.entries(profile_dummy);

    return <div>
        {entries.map((el)=>{
            return <InfoStrip infoTitle={el[0]} information={el[1]}/>
        })}
    </div>
}

export default Profile;