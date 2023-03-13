import { useContext } from 'react';
import {PageContext, EducatorContext} from '../../Context/Context';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

const EducatorBtn = (props) => {
    const [page, setPage] = useContext(PageContext);
    const [educator, setEducator] = useContext(EducatorContext);

    const clickHandler = (e) => {
        setEducator(props.educator);
        if(!e.target.dataset.type)return setPage('EDUCATOR_PROFILE_PAGE');
        setPage(e.target.dataset.type);
    }

    return (
        <Card elevation={2} onClick={clickHandler}>
            <CardHeader action={
            <IconButton>
                <ContentPasteIcon data-type={'ASSESSMENT_CHECK_FORM'}/>
                <FolderOpenIcon data-type={'PLANNING_CHECK_FORM'}/>
                <SettingsIcon data-type={'EDUCATOR_SETTINGS'}/>
            </IconButton>}
            subheader={props.educator}/>
        </Card>
    )
}

export default EducatorBtn;