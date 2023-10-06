
import { DropdownMenu, DropdownItem, ButtonDropdown, DropdownToggle } from "reactstrap"
import { useState, useEffect} from 'react';


export const DropDownSection = ({sections, seleccionado}) => {
    
    const [ dropdownOpen, setOpen] = useState(false);
    const [ seccInDrop, setSeccInDrop] = useState(0);

    const onClickItem = ({target}) => {
        console.log(target.value); //Asignamos el valor al combo
        setSeccInDrop(target.value);
        seleccionado.id_seccion = target.value;
    }

    useEffect(() => {
        setSeccInDrop(seleccionado.id_seccion)
        
      },[])

    return (
        <div style={{
            display: 'block', width: 500, padding: 15
            }}>
        <ButtonDropdown  toggle={() => { setOpen(!dropdownOpen) }}
            isOpen={dropdownOpen}>
            <DropdownToggle className="button-6" caret>
                Seccion:  {seccInDrop}
            </DropdownToggle>
            <DropdownMenu>
                {
                  sections.map((x)=> (<DropdownItem value={x.seccion} 
                    onClick={onClickItem}>{x.seccion}</DropdownItem>))
                }
            </DropdownMenu>
        </ButtonDropdown>
        </div >
    )
}