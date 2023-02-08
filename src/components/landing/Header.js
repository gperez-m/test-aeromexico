import { Button, Collapse, Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, Slide, SvgIcon, TextField } from "@mui/material";
import { ReactComponent as Bookmark } from 'assets/img/icons/icon_bookmark.svg';
import { ReactComponent as IconAdd } from 'assets/img/icons/icon_add.svg';
import { useRef, useState } from "react";
import { ReactComponent as IconCloseOutlined } from 'assets/img/icons/icon_close_outlined.svg';
import { ReactComponent as IconTrash } from 'assets/img/icons/icon_trash.svg';
import { saveStudent } from "services/students";
import { useDispatch, useSelector } from "react-redux";
import { removeBookmark } from "reducers/bookmarkReducer";
import { isMobile } from "components/Dimensions";

export default function Header (props) {
    const bookmark = useSelector(state => state);
    const dispatch = useDispatch();
    const initialValues = {
        name : '',
        birthday: '',
        eyes: '',
        hair: '',
        genere: 'female',
        position: 'student'
    }

    const [openModal, setOpenModal] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const addNewCharacter = async () => {
        setDisabled(true)
        try {
            await saveStudent(form)
            props.reloadServices();
            setDisabled(false);
            openModal(false);
            resetForm()
        } catch (err) {
            console.error(err);
            setDisabled(false);
        }
    }

    const resetForm = () => {
        setForm(initialValues);
    }

    const [form, setForm] = useState(initialValues);
    const [activeBookmark, setActiveBookmark] = useState(false)

    const handleChange = (prop)=> (event) => {
        console.log(prop, event.target.value);
        setForm({...form, [prop]: event.target.value})
    }

    const toggleBookmark = () => {
        setActiveBookmark((prev) =>  !prev);
    }

    const callBookmark = character => {
        dispatch(removeBookmark(character));
    }
    const containerRef = useRef(null);

    return (
        <>
            <div className="flex flex-row bookmark" >
                <div className="btn-fav text-white font-semibold " >
                    <div className="flex justify-center cursor-pointer uppercase" onClick={() => toggleBookmark() }>
                        Favoritos
                        <SvgIcon 
                            component={Bookmark} 
                            style={{width: 22, paddingLeft: 5}} 
                            />
                    </div>
                </div>
                <div className="btn-add text-white font-semibold" >
                    <div className="flex justify-center cursor-pointer uppercase" onClick={()=> setOpenModal(true)}>
                        Agregar
                        <SvgIcon component={IconAdd} style={{width: 22, paddingLeft: 5, paddingBottom: 3}} />
                    </div>
                </div>
                    {
                        isMobile()?
                            <Slide direction="up" in={activeBookmark} container={containerRef.current}>
                                <div className="bookmark-list">
                                    { 
                                        bookmark.length > 0 ? 
                                        bookmark.map( (character, i) => {
                                            return (
                                                <div className="bookmark-wrap" key={i}>
                                                    <div className="flex flex-wrap justify-between items-center font-semibold text-lg text-white">
                                                        <div
                                                            className='card-image-bookmark' 
                                                            style={{backgroundImage: `url(${character.image})`}}
                                                            />
                                                        {character.name}
                                                        <IconTrash className="cursor-pointer" onClick={() => callBookmark(character)} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="bookmark-wrap text-white text-center" > No cuentas con favoritos </div>
                                    }
                                </div>
                            </Slide>
                            :
                            <div className="bookmark-list">
                                <Collapse in={activeBookmark}>
                                    { 
                                        bookmark.length > 0 ? 
                                        bookmark.map( (character, i) => {
                                            return (
                                                <div className="bookmark-wrap" key={i}>
                                                    <div className="flex flex-wrap justify-between items-center font-semibold text-lg text-white">
                                                        <div
                                                            className='card-image-bookmark' 
                                                            style={{backgroundImage: `url(${character.image})`}}
                                                            />
                                                        {character.name}
                                                        <IconTrash className="cursor-pointer" onClick={() => callBookmark(character)} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="bookmark-wrap text-white text-center" > No cuentas con favoritos </div>
                                    }
                                </Collapse>
                            </div>
                            
                    }
            </div>
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" >
                <DialogContent>
                    <div className="flex flex-wrap" style={{width: 675}}>
                        <div className="w-full flex flex-wrap items-center pb-6" >
                            <div className="font-semibold text-2xl" style={{width: "90%"}}>
                                Agrega un personaje
                            </div>
                            <div className="flex justify-end" style={{width: "10%"}}>
                                <IconCloseOutlined onClick={() => setOpenModal(false)} />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 pr-5 pb-10" >
                            <div className="uppercase text-sm pb-2">Nombre</div>
                            <TextField 
                                id="name" 
                                variant="filled" 
                                fullWidth 
                                onChange={handleChange('name')}
                                value={form.name}
                                />
                        </div>
                        <div className="w-full lg:w-6/12 pl-5" >
                            <div className="uppercase text-sm pb-2" >Cumpleaños</div>
                            <TextField 
                                id="birthday" 
                                variant="filled"
                                fullWidth 
                                onChange={handleChange('birthday')}
                                value={form.birthday}
                                />
                        </div>
                        <div className="w-full lg:w-6/12 pr-5 pb-10" >
                            <div className="uppercase text-sm pb-2">Color de ojos</div>
                            <TextField 
                                id="eyes" 
                                variant="filled" 
                                fullWidth 
                                onChange={handleChange('eyes')}    
                                value={form.eyes}
                                />
                        </div>
                        <div className="w-full lg:w-6/12 pl-5" >
                            <div className="uppercase text-sm pb-2" >Color de pelo</div>
                            <TextField 
                                id="hair" 
                                variant="filled" 
                                fullWidth 
                                onChange={handleChange('hair')}
                                value={form.hair}
                                />
                        </div>
                        <div className="w-full lg:w-6/12" >
                            <div className="uppercase text-sm pb-2" >Género</div>
                            <RadioGroup
                                row
                                aria-labelledby="group-genere-label"
                                defaultValue="Mujer"
                                name="group-genere"
                                className="justify-around"
                                onChange={handleChange('genere')}
                                value={form.genere}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Mujer" />
                                <FormControlLabel value="Male" control={<Radio />} label="Hombre" />
                            </RadioGroup>
                        </div>
                        <div className="w-full lg:w-6/12" >
                            <div className="uppercase text-sm pb-2" >Posición</div>
                            <RadioGroup
                                row
                                aria-labelledby="group-position-label"
                                defaultValue="Estudiante"
                                name="group-position"
                                className="justify-around"
                                onChange={handleChange('position')}
                                value={form.position}
                            >
                                <FormControlLabel value="student" control={<Radio />} label="Estudiante" />
                                <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                            </RadioGroup>
                        </div>
                        <div className="py-10" >
                            FOTOGRAFIA (input type file)
                        </div>
                        <div className="w-full flex justify-center">
                            <Button  
                                className="btn-modal uppercase flex items-center justify-center"
                                variant="outlined"
                                disabled={disabled}
                                onClick={ ()=> addNewCharacter()}>
                                Guardar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
        
    );
}