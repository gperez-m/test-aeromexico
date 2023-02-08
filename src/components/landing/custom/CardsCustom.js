import { useEffect, useState } from 'react';
import { getAll as getAllStudents } from 'services/students';
import { getAll as getAllStaff } from 'services/staff';
import { isMobile } from 'components/Dimensions';
import { ReactComponent as BookmarkIcon } from 'assets/img/icons/icon-bookmark-transparent.svg';
import { useDispatch } from 'react-redux';
import { createBookmark } from 'reducers/bookmarkReducer';

export default function CardsCustom ({filter}) {
    const dispatch = useDispatch()
    const [cards, setCards] = useState();
    const callBookmark = (character) => {
        dispatch(createBookmark(character))
    }
    const createCards = (characters, student) => {
        let cardsCreate = []
        let type = student === 'students'? 'Estudiante' : 'Staff'
        characters.forEach((character, i) => {
            let aliveString = character.alive ? "VIVO" : "FINADO";
            const PanelTwo = ()=> {
                return (
                <div className={'panelTwo font-semibold' + (character.alive? '' : ' shadow')}  >
                    <div
                        className='flex flex-wrap uppercase text-sm'
                    >
                        <div className='w-8/12' >{ aliveString } / {type}</div>
                        <div className='w-4/12 flex justify-end cursor-pointer' >
                            <BookmarkIcon onClick={() => callBookmark(character)} />
                        </div>
                    </div>
                    <div className='flex items-center text-3xl py-6 name' >
                        {character.alive ? '' : '†' } {character.name}
                    </div>
                    <div className='font-bold'>
                        <div>
                            Cumpleaños: <span className='font-normal'>{character.dateOfBirth}</span>
                        </div>
                        <div>
                            Género: <span className='font-normal'>{character.gender}</span>
                        </div>
                        <div>
                            Color de ojos: <span className='font-normal'>{character.eyeColour}</span>
                        </div>
                        <div>
                            Color de pelo: <span className='font-normal'>{character.hairColour}</span>
                        </div>
                    </div>
                </div>)
            }

            const PanelTwoMobile = () => {
                return (
                    <div className={'panelTwo font-semibold' + (character.alive? '' : ' shadow')}  >
                    <div className='flex items-center text-lg name' >
                        {character.alive? '' : '-' } {character.name}
                    </div>
                    <div
                        className='uppercase text-sm flex flex-wrap justify-between items-center'
                    >
                        <div>
                            <div>{ aliveString }</div>
                            <div>{ type }</div>
                        </div>
                        <div><BookmarkIcon onClick={() => callBookmark(character)} /></div>
                    </div>
                </div>
                )
            }

            cardsCreate.push(
                <div className="w-6/12 " key={i}>
                    <div className={'card'+ (i%2? '':' ml-auto') }>
                        <div className='flex lg:flex-row flex-col bg-white'>
                            <div className={`flex items-center panelOne ${character.house}`} >
                                <div
                                    className='mx-auto card-image' 
                                style={character.image? {
                                    backgroundImage: `url(${character.image})`,
                                } : {
                                    backgroundColor: 'white'
                                }} />
                            </div>
                            {isMobile() ? <PanelTwoMobile />:<PanelTwo />}
                        </div>
                    </div>
                </div>
            )
        })

        setCards(cardsCreate);
    }

    useEffect(() => {
        const fetch = async () => {
            let result = filter === 'students'? await getAllStudents() : await getAllStaff();
            createCards(result, filter);
        }
        fetch()
    }, [filter]);

    return (<>{cards}</>)
}