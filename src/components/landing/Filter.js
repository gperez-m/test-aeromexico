import { ReactComponent as LogoHP } from 'assets/img/logos/logo-hp.svg';
import { useState } from 'react';
import CardsCustom from './custom/CardsCustom';

export default function Filter() {
    const [selected, setSelected] = useState('students');

    const activeService = (btnSelected) => {
        setSelected(btnSelected);
    }

    return (
        <div className='container max-w-7xl mx-auto bg-filter'>
            <LogoHP className='mx-auto'/>
            <div className='text-4xl text-white text-center' >
                Selecciona tu filtro
            </div>
            <div className='buttons flex flex-wrap text-white'>
                <div className={'w-full lg:w-6/12 flex justify-end lg:pr-14 pr-1'} >
                    <div 
                        className={'flex lg:py-5 lg:px-14 align-middle items-center justify-center btn-filter text-center cursor-pointer font-semibold uppercase' + (selected === 'students'? ' selected': '' )} 
                        onClick={() => activeService('students')}
                    >
                        Estudiantes
                    </div>
                </div>
                <div className='w-full lg:w-6/12 flex lg:justify-start lg:pl-14 pl-1'>
                    <div 
                        className={'flex lg:py-5 lg:px-14 items-center justify-center btn-filter cursor-pointer font-semibold uppercase' + (selected === 'staff'? ' selected': '' )} 
                        onClick={() => activeService('staff')}
                    >
                        Staff
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap' style={{padding: "30px 0"}} >
                <CardsCustom filter={selected} />
            </div>
        </div>
    )
}
